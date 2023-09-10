import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Button from 'components/common/Button';
import { TableFieldLabel } from 'types';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import CapacityDisplay from './CapacityDisplay';
import { setModalStatus, sellItem, setCurrentModal } from 'store/gameSlice';
import Table from 'components/common/Table';
import QtyModal from './QtyModal';
import itemsData from 'data/itemsData';
import ItemInfoModal from './ItemInfoModal';
import { getHasOverdueLoanForLocation } from 'utils/utils';

const SellSubPanel = () => {
  const dispatch = useGameSliceDispatch();
  const [selectedItem, setSelectedItem] = useState<any>({});
  const { formatMessage } = useIntl();
  const { gameState, modalStatus, currentModal } = useGameSliceSelector((state) => state.game);
  const hasOverdueLoan = getHasOverdueLoanForLocation(gameState, gameState.location);
  const isModalOpen = modalStatus !== 'closed' && ['sellQty', 'info'].includes(currentModal);
  const { inventory, prices } = gameState;

  const hasGuildMembership = gameState.flags[`guild__${gameState.location.toLowerCase()}`];
  const inventoryItems = Object.keys(itemsData)
    .filter((key) => !!inventory[key] && inventory[key]?.qty > 0)
    .map((key) => ({
      ...prices[key],
      id: key,
      guildDependentTitle: formatMessage({ id: `items__${key}__title` }),
      discountablePrice: prices[key]?.value || 0,
      hasGuildMembership: hasGuildMembership,
      qty: inventory[key]?.qty,
    }));
  const openModal = (slug: string) => {
    dispatch(setCurrentModal(slug));
    dispatch(setModalStatus('opening'));
    setTimeout(() => {
      dispatch(setModalStatus('open'));
    }, 510);
  };
  const closeModal = () => {
    dispatch(setModalStatus('closing'));
    setTimeout(() => {
      dispatch(setModalStatus('closed'));
    }, 510);
  };
  const handleItemClick = (id: string, slug: string) => {
    const foundItem = inventoryItems.find((item: any) => item.id === id);
    setSelectedItem({ ...foundItem });
    openModal(slug);
  };
  const handleQtyClose = () => {
    closeModal();
  };
  const handleSellConfirm = (sellQty: number) => {
    const price = hasGuildMembership
      ? selectedItem.value - selectedItem.guildDiscount
      : selectedItem.value;
    dispatch(
      sellItem({
        qty: sellQty,
        itemId: selectedItem.id,
        price,
        action: 'sell',
      }),
    );
    handleQtyClose();
  };
  const sellTableActions = (id: string) => (
    <div className="px-4">
      <span className="mr-4 mb-2">
        <Button
          onClick={() => handleItemClick(id, 'info')}
          labelKey="market__buy__table___btn_info"
          variant="secondary"
          testId={`btn-info-${id}`}
        />
      </span>
      {prices[id]?.actions.includes('sell') && (
        <span className="mr-4 mb-2 block lg:inline w-full lg:w-auto">
          <Button
            onClick={() => handleItemClick(id, 'sellQty')}
            labelKey="market__sell__table___btn_sell"
            variant="secondary"
            testId={`btn-sell-${id}`}
            disabled={hasOverdueLoan}
          />
        </span>
      )}
    </div>
  );
  const fieldLabels: TableFieldLabel[] = [
    { slug: 'guildDependentTitle', titleKey: 'market__sell__table_field__itemName' },
    { slug: 'discountablePrice', titleKey: 'market__sell__table_field__price' },
    { slug: 'qty', titleKey: 'market__sell__table_field__qty' },
  ];

  return (
    <div data-testid="sell-subpanel">
      <h2 className="text-xl font-bold uppercase mb-4">
        <FormattedMessage id="market__sell_title" />
      </h2>
      <div className="text-gray-800 bg-gray-100">
        <Table
          data={inventoryItems}
          fieldLabels={fieldLabels}
          actions={sellTableActions}
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
      {isModalOpen && currentModal === 'sellQty' && (
        <QtyModal
          action="sell"
          selectedItem={selectedItem}
          handleConfirm={handleSellConfirm}
          handleQtyClose={handleQtyClose}
        />
      )}
    </div>
  );
};

export default SellSubPanel;
