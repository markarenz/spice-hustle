import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Button from 'components/common/Button';
import { TableFieldLabel } from 'types';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import CapacityDisplay from './CapacityDisplay';
import { setModalStatus, sellItem, setCurrentModal } from 'store/gameSlice';
import Table from 'components/common/Table';
import QtyModal from './QtyModal';

const SellSubPanel = () => {
  const dispatch = useGameSliceDispatch();
  const [selectedItem, setSelectedItem] = useState<any>({});
  const { formatMessage } = useIntl();
  const { gameState, modalStatus, currentModal } = useGameSliceSelector((state) => state.game);
  const isModalOpen = modalStatus !== 'closed' && currentModal === 'sellQty';
  const { inventory, prices } = gameState;
  const inventoryItems = Object.keys(gameState.prices)
    .filter(
      (key) => prices[key].actions.includes('sell') && !!inventory[key] && inventory[key]?.qty > 0,
    )
    .map((key) => ({
      ...prices[key],
      title: formatMessage({ id: `items__${prices[key].id}__title` }),
      priceValue: prices[key].value,
      qty: inventory[key]?.qty,
    }));
  const openModal = () => {
    dispatch(setCurrentModal('sellQty'));
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
  const handleSellClick = (id: string) => {
    const foundItem = inventoryItems.find((item: any) => item.id === id);
    setSelectedItem({ ...foundItem });
    openModal();
  };
  const handleQtyClose = () => {
    closeModal();
  };
  const handleSellConfirm = (sellQty: number) => {
    dispatch(
      sellItem({
        qty: sellQty,
        itemId: selectedItem.id,
        price: selectedItem.value,
        action: 'sell',
      }),
    );
    handleQtyClose();
  };
  const sellTableActions = (id: string) => (
    <div className="px-4">
      <span className="mr-4 mb-2 block lg:inline w-full lg:w-auto">
        <Button
          onClick={() => handleSellClick(id)}
          labelKey="market__sell__table___btn_sell"
          variant="secondary"
          testId={`btn-sell-${id}`}
        />
      </span>
    </div>
  );
  const fieldLabels: TableFieldLabel[] = [
    { slug: 'title', titleKey: 'market__sell__table_field__itemName' },
    { slug: 'priceValue', titleKey: 'market__sell__table_field__price' },
    { slug: 'qty', titleKey: 'market__sell__table_field__qty' },
  ];

  return (
    <div data-testid="sell-subpanel">
      <h2 className="text-xl font-bold uppercase mb-4">
        <FormattedMessage id="market__sell_title" />
      </h2>
      <div className="text-gray-800 bg-gray-100">
        <Table data={inventoryItems} fieldLabels={fieldLabels} actions={sellTableActions} />
      </div>
      <div className="text-right py-2">
        <CapacityDisplay />
      </div>
      {isModalOpen && (
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
