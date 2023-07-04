import { useEffect } from 'react';
import { useGameSliceSelector } from 'store/reduxHooks';
import { GameTabSlugs } from 'types';
import { Slices } from 'store/gameSlice';
import MarketPanel from './market/MarketPanel';
import TravelPanel from './travel/TravelPanel';

const GamePanelDisplay = () => {
  const { gamePanel } = useGameSliceSelector((state: Slices) => state.game);
  // Scroll to the top of the page when the game panel value changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gamePanel]);

  switch (gamePanel) {
    case GameTabSlugs.Travel.toLowerCase():
      return <TravelPanel />;
    case GameTabSlugs.Market.toLowerCase():
      return <MarketPanel />;
    default:
      return <div data-testid="default-panel">DEFAULT PANEL</div>;
  }
};

export default GamePanelDisplay;
