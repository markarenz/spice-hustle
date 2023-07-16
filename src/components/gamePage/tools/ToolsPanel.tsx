import { useState } from 'react';
import { Slices } from 'store/gameSlice';
import upgradesData from 'data/upgrades';
import Table from 'components/common/Table';
import { FormattedMessage, useIntl } from 'react-intl';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import { buyUpgrade, setModalStatus, setCurrentModal } from 'store/gameSlice';
import { Transaction, TableFieldLabel } from 'types';
import Button from 'components/common/Button';
import ToolInfoModal from './ToolInfoModal';

const ToolsPanel = () => {
  const [selectedItemId, setSelectedItemId] = useState('');
  const { gameState, modalStatus, currentModal } = useGameSliceSelector(
    (state: Slices) => state.game,
  );
  const dispatch = useGameSliceDispatch();
  const { formatMessage } = useIntl();
  const { location, flags } = gameState;
  const hasGuildMembership = flags[`guild__${location}`];
  const flagsArr = Object.keys(flags);
  const upgradesOnOffer = Object.values(upgradesData)
    .filter((item) =>
      item.prices.some(
        (price) =>
          price.locations.includes(location) &&
          item.dependencies.every((dep) => flagsArr.includes(dep)),
      ),
    )
    .map((item) => {
      const thisPrice = item.prices.find((price) => price.locations.includes(location));
      return {
        id: item.slug,
        guildDependentTitle: formatMessage({ id: `upgrades__${item.slug}__title` }),
        price: thisPrice?.price,
        guildOnly: thisPrice?.guildOnly,
        hasGuildMembership: hasGuildMembership,
        owned: Object.keys(gameState.flags).includes(`upgrade__${item.slug}`),
      };
    });
  const getUpgradeGuildOnly = (id: string) =>
    upgradesOnOffer.find((item) => item.id === id)?.guildOnly;

  const getUpgradePrice = (id: string) =>
    upgradesOnOffer.find((item) => item.id === id)?.price || 0;
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
            disabled={getUpgradeGuildOnly(id) && !hasGuildMembership}
          />
        )}
      </span>
    </div>
  );
  const fieldLabels: TableFieldLabel[] = [
    { slug: 'guildDependentTitle', titleKey: 'upgrades__buy__table_field__itemName' },
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
        <ToolInfoModal selectedItemId={selectedItemId} closeInfoModal={closeInfoModal} />
      )}
    </div>
  );
};

export default ToolsPanel;
