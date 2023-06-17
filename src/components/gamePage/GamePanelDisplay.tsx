import { useGameSliceSelector } from 'store/reduxHooks';
import { GameTabSlugs } from 'types';
import { Slices } from 'store/gameSlice';
import MarketPanel from './market/MarketPanel';
import TravelPanel from './travel/TravelPanel';

const GamePanelDisplay = () => {
  const { gamePanel } = useGameSliceSelector((state: Slices) => state.game);
  switch (gamePanel) {
    case GameTabSlugs.Travel.toLowerCase():
      return <TravelPanel />;
    case GameTabSlugs.Market.toLowerCase():
      return <MarketPanel />;
    default:
      return <div>DEFAULT PANEL</div>;
  }
};

export default GamePanelDisplay;
