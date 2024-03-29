import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Button from 'components/common/Button';
import { TableFieldLabel } from 'types';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import { setModalStatus, buyItem, setCurrentModal } from 'store/gameSlice';
import CapacityDisplay from './CapacityDisplay';
import Table from 'components/common/Table';
import QtyModal from './QtyModal';
import ItemInfoModal from './ItemInfoModal';
import { getHasOverdueLoanForLocation } from 'utils/utils';

const BuySubPanel = () => {
  const dispatch = useGameSliceDispatch();
  const [selectedItem, setSelectedItem] = useState<any>({});
  const { formatMessage } = useIntl();
  const { gameState, modalStatus, currentModal } = useGameSliceSelector((state) => state.game);
  const hasOverdueLoan = getHasOverdueLoanForLocation(gameState, gameState.location);
  const isModalOpen = modalStatus !== 'closed';
  const prices = gameState.prices;
  const hasGuildMembership = gameState.flags[`guild__${gameState.location.toLowerCase()}`];
  const itemsForSale = Object.keys(gameState.prices)
    .filter((key) => prices[key].actions.includes('buy'))
    .map((key) => ({
      ...prices[key],
      guildDependentTitle: formatMessage({ id: `items__${prices[key].id}__title` }),
      discountablePrice: prices[key].value,
      hasGuildMembership: hasGuildMembership,
    }));

  const openModal = (modalSlug: string) => {
    dispatch(setCurrentModal(modalSlug));
    dispatch(setModalStatus('opening'));
    setTimeout(() => {
      dispatch(setModalStatus('open'));
    }, 510);
  };
  const closeModal = () => {
    dispatch(setModalStatus('closing'));
    setTimeout(() => {
      dispatch(setModalStatus('closed'));
      setCurrentModal('');
    }, 510);
  };
  const handleItemClick = (id: string, modalSlug: string) => {
    const foundItem = itemsForSale.find((item: any) => item.id === id);
    setSelectedItem({ ...foundItem });
    openModal(modalSlug);
  };
  const handleQtyClose = () => {
    closeModal();
  };
  const handleBuyConfirm = (buyQty: number) => {
    const price = hasGuildMembership
      ? selectedItem.value - selectedItem.guildDiscount
      : selectedItem.value;
    dispatch(
      buyItem({
        qty: buyQty,
        itemId: selectedItem.id,
        price,
        action: 'buy',
      }),
    );
    handleQtyClose();
  };
  const buyTableActions = (id: string) => (
    <div>
      <span className="mr-4 mb-2">
        <Button
          onClick={() => handleItemClick(id, 'info')}
          labelKey="market__buy__table___btn_info"
          variant="secondary"
          testId={`btn-info-${id}`}
        />
      </span>
      <span className="block mb-2 lg:inline w-full lg:w-auto">
        {gameState.prices[id].qty > 0 && (
          <Button
            onClick={() => handleItemClick(id, 'qty')}
            labelKey="market__buy__table___btn_buy"
            variant="primary"
            testId={`btn-buy-${id}`}
            disabled={hasOverdueLoan}
          />
        )}
      </span>
    </div>
  );
  const fieldLabels: TableFieldLabel[] = [
    { slug: 'guildDependentTitle', titleKey: 'market__buy__table_field__itemName' },
    { slug: 'discountablePrice', titleKey: 'market__buy__table_field__price' },
    { slug: 'qty', titleKey: 'market__buy__table_field__qty' },
  ];

  return (
    <div className="px-4" data-testid="buy-subpanel">
      <h2 className="text-xl font-bold uppercase mb-4">
        <FormattedMessage id="market__buy_title" />
      </h2>
      <div className="text-gray-800 bg-gray-100">
        <Table
          data={itemsForSale}
          fieldLabels={fieldLabels}
          actions={buyTableActions}
          sortField="guildDependentTitle"
          sortDir="asc"
        />
      </div>
      <div className="text-right py-2">
        <CapacityDisplay />
      </div>
      {isModalOpen && currentModal === 'info' && (
        <ItemInfoModal itemId={selectedItem.id} closeInfoModal={closeModal} />
      )}
      {isModalOpen && currentModal === 'qty' && (
        <QtyModal
          action="buy"
          selectedItem={selectedItem}
          handleConfirm={handleBuyConfirm}
          handleQtyClose={handleQtyClose}
        />
      )}
    </div>
  );
};

export default BuySubPanel;
