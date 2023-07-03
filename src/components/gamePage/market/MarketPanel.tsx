import { useGameSliceSelector } from 'store/reduxHooks';
import BuySubPanel from './BuySubPanel';
import SellSubPanel from './SellSubPanel';
import MarketActionTabButton from './MarketActionTabButton';

const MarketPanel = () => {
  const { marketStatus } = useGameSliceSelector((state) => state.game);
  return (
    <div data-testid="market-panel">
      <div className="bg-orange-500">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {['buy', 'sell'].map((slug) => (
              <MarketActionTabButton slug={slug} key={slug} />
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8">
        {marketStatus === 'buy' && <BuySubPanel />}
        {marketStatus === 'sell' && <SellSubPanel />}
      </div>
    </div>
  );
};

export default MarketPanel;
