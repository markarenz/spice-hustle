import { useEffect } from 'react';
import { useGameSliceSelector } from 'store/reduxHooks';
import { GameTabSlugs } from 'types';
import { Slices } from 'store/gameSlice';
import MarketPanel from './market/MarketPanel';
import BankPanel from './bank/BankPanel';
import TravelPanel from './travel/TravelPanel';
import ToolsPanel from './tools/ToolsPanel';

const GamePanelDisplay = () => {
  const { gamePanel } = useGameSliceSelector((state: Slices) => state.game);
  // Scroll to the top of the page when the game panel value changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gamePanel]);

  switch (gamePanel) {
    case GameTabSlugs.Market.toLowerCase():
      return <MarketPanel />;
    case GameTabSlugs.Bank.toLowerCase():
      return <BankPanel />;
    case GameTabSlugs.Tools.toLowerCase():
      return <ToolsPanel />;
    case GameTabSlugs.Travel.toLowerCase():
      return <TravelPanel />;
    default:
      return <div data-testid="default-panel">DEFAULT PANEL</div>;
  }
};

export default GamePanelDisplay;
