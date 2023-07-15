import { useGameSliceSelector } from 'store/reduxHooks';
import BuySubPanel from './BuySubPanel';
import SellSubPanel from './SellSubPanel';
import PanelActionTabButton from 'components/common/PanelActionTabButton';

const MarketPanel = () => {
  const { subPanelStatus } = useGameSliceSelector((state) => state.game);
  return (
    <div data-testid="market-panel">
      <div className="bg-orange-500">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {['buy', 'sell'].map((slug) => (
              <PanelActionTabButton slug={slug} key={slug} />
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8">
        {subPanelStatus === 'buy' && <BuySubPanel />}
        {subPanelStatus === 'sell' && <SellSubPanel />}
      </div>
    </div>
  );
};

export default MarketPanel;
