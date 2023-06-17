import { GameState, Locations } from '../types';

const initGameState: GameState = {
  id: `${new Date().getTime()}`,
  location: Locations.Oskah,
  numTurns: 0,
  cash: 100,
  savings: 0,
  loans: [],
  netWealth: 100,
  prices: {},
  inventory: {},
  capacity: {
    used: {
      weight: 0,
      volume: 0,
    },
    max: {
      weight: 0,
      volume: 0,
    },
  },
  flags: {
    isInitialized: true,
  },
  createdAt: `${new Date().getTime()}`,
  modifiedAt: `${new Date().getTime()}`,
};

export default initGameState;
