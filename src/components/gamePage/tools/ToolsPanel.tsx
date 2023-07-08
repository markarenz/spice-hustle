import { useState } from 'react';
import { Slices } from 'store/gameSlice';
import upgradesData from 'data/upgrades';
import Table from 'components/common/Table';
import { FormattedMessage, useIntl } from 'react-intl';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import { buyUpgrade, setModalStatus, setCurrentModal } from 'store/gameSlice';
import Modal from 'components/common/Modal';
import { Transaction, TableFieldLabel } from 'types';
import Button from 'components/common/Button';

const ToolsPanel = () => {
  const [selectedItemId, setSelectedItemId] = useState('');
  const { gameState, modalStatus, currentModal } = useGameSliceSelector(
    (state: Slices) => state.game,
  );
  const dispatch = useGameSliceDispatch();
  const { formatMessage } = useIntl();
  const { location, flags } = gameState;
  const flagsArr = Object.keys(flags);
  const upgradesOnOffer = Object.values(upgradesData)
    .filter((item) =>
      item.prices.some(
        (price) =>
          price.locations.includes(location) &&
          item.dependencies.every((dep) => flagsArr.includes(dep)),
      ),
    )
    .map((item) => ({
      id: item.slug,
      title: formatMessage({ id: `upgrades__${item.slug}__title` }),
      price: item.prices.find((price) => price.locations.includes(location))?.price,
      owned: Object.keys(gameState.flags).includes(`upgrade__${item.slug}`),
    }));
  const getUpgradePrice = (id: string) =>
    upgradesOnOffer.find((item) => item.id === id)?.price ?? 0;
  const handleBuyUpgrade = (itemId: string, price: number) => {
    if (gameState.cash >= price) {
      const transaction: Transaction = {
        itemId,
        action: 'buy',
        qty: 1,
        price,
      };
      dispatch(buyUpgrade(transaction));
    }
  };
  const handleInfoClick = (id: string) => {
    setSelectedItemId(id);
    dispatch(setCurrentModal('upgrade-info'));
    dispatch(setModalStatus('opening'));
    setTimeout(() => {
      dispatch(setModalStatus('open'));
    }, 510);
  };
  const closeInfoModal = () => {
    dispatch(setModalStatus('closing'));
    setTimeout(() => {
      dispatch(setModalStatus('closed'));
      setCurrentModal('');
    }, 510);
  };

  const buyTableActions = (id: string) => (
    <div>
      <span className="mr-4 mb-2">
        <Button
          onClick={() => handleInfoClick(id)}
          labelKey="market__buy__table___btn_info"
          variant="secondary"
          testId={`upgrade-btn-info-${id}`}
        />
      </span>
      <span className="block mb-2 lg:inline w-full lg:w-auto">
        {!gameState.flags[`upgrade__${id}`] && (
          <Button
            onClick={() => handleBuyUpgrade(id, getUpgradePrice(id))}
            labelKey="market__buy__table___btn_buy"
            variant="primary"
            testId={`upgrade-btn-buy-${id}`}
          />
        )}
      </span>
    </div>
  );
  const fieldLabels: TableFieldLabel[] = [
    { slug: 'title', titleKey: 'upgrades__buy__table_field__itemName' },
    { slug: 'price', titleKey: 'upgrades__buy__table_field__price' },
    { slug: 'owned', titleKey: 'upgrades__buy__table_field__owned' },
  ];
  const isModalOpen = modalStatus !== 'closed' && currentModal === 'upgrade-info';

  return (
    <div data-testid="tools-panel">
      <div className="container mx-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold uppercase mb-4">
            <FormattedMessage id="upgrades__buy_title" />
          </h2>
          <div className="text-gray-800 bg-gray-100">
            <Table data={upgradesOnOffer} fieldLabels={fieldLabels} actions={buyTableActions} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal titleKey={`upgrades__${selectedItemId}__title`}>
          <div>
            <div className="text-gray-800 pb-4">
              <FormattedMessage id={`upgrades__${selectedItemId}__description`} />
            </div>
            <div className="text-center">
              <Button variant="primary" labelKey="ok" onClick={() => closeInfoModal()} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ToolsPanel;
