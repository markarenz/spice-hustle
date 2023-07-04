import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GameSliceState,
  GameState,
  AppStatuses,
  GameTabSlugs,
  Transaction,
  RouteDanger,
} from 'types';
import { getLocalPrices, getNetWealth, getCapacity, getRandRange } from 'utils/utils';
import { getInitialState } from './storeUtils';
import initGameState from 'data/initGameState';
import { saveGameLocal } from 'utils/saveLoadUtils';

export type Slices = {
  game: GameSliceState;
};

const getNewGameData = () => ({
  ...initGameState,
  id: `${new Date().getTime()}`,
  prices: getLocalPrices(initGameState.location, 0),
  capacity: getCapacity({}, {}),
});
export const gameSlice = createSlice({
  name: 'game',
  initialState: getInitialState(),
  reducers: {
    initState: (state) => {
      state.appStatus = AppStatuses.StartPage;
      const newGameData = getNewGameData();
      state.gameState = { ...newGameData };
      state.gamePanel = GameTabSlugs.Market;
    },
    startNewGame: (state) => {
      const newGameData = getNewGameData();
      state.marketStatus = 'buy';
      state.appStatus = AppStatuses.Game;
      state.gameState = { ...newGameData };
      saveGameLocal({ ...newGameData });
      state.gamePanel = GameTabSlugs.Market;
    },
    setModalStatus: (state, action: PayloadAction<string>) => {
      state.modalStatus = `${action.payload}`;
      if (action.payload === '') {
        state.currentModal = '';
      }
    },
    setCurrentModal: (state, action: PayloadAction<string>) => {
      state.currentModal = action.payload;
    },
    loadSavedGame: (state, action: PayloadAction<GameState>) => {
      state.appStatus = AppStatuses.Game;
      state.gameState = action.payload;
      state.gamePanel = GameTabSlugs.Market;
      state.modalStatus = 'closed';
    },
    setGamePanel: (state, action: PayloadAction<string>) => {
      state.gamePanel = action.payload;
      state.modalStatus = 'closed';
    },
    closeGame: (state) => {
      state.appStatus = AppStatuses.StartPage;
      state.modalStatus = 'closed';
    },
    setMarketStatus: (state, action: PayloadAction<string>) => {
      state.marketStatus = action.payload;
      state.modalStatus = 'closed';
    },
    buyItem: (state, action: PayloadAction<Transaction>) => {
      const { qty, itemId, price } = action.payload;
      const cost = qty * price;
      const newPrices = {
        ...state.gameState.prices,
        [itemId]: {
          ...state.gameState.prices[itemId],
          qty: state.gameState.prices[itemId].qty - qty,
        },
      };
      const newCash = state.gameState.cash - cost;
      const newNetWealth = getNetWealth(newCash, state.gameState.loans);
      const newInventory = {
        ...state.gameState.inventory,
        [itemId]: { itemId, qty: (state.gameState.inventory[itemId]?.qty || 0) + qty },
      };
      const newGameState = {
        ...state.gameState,
        cash: newCash,
        netWealth: newNetWealth,
        prices: { ...newPrices },
        inventory: newInventory,
        capacity: getCapacity(newInventory, state.gameState.flags),
      };
      state.gameState = {
        ...newGameState,
      };
      saveGameLocal({ ...newGameState });
    },
    sellItem: (state, action: PayloadAction<Transaction>) => {
      const { qty, itemId, price } = action.payload;
      const cost = qty * price;
      const newPrices = {
        ...state.gameState.prices,
        [itemId]: {
          ...state.gameState.prices[itemId],
          qty: state.gameState.prices[itemId].qty + qty,
        },
      };
      const newCash = state.gameState.cash + cost;
      const newNetWealth = getNetWealth(newCash, state.gameState.loans);
      const newInventory = {
        ...state.gameState.inventory,
        [itemId]: { itemId, qty: state.gameState.inventory[itemId]?.qty - qty },
      };
      const newGameState = {
        ...state.gameState,
        cash: newCash,
        netWealth: newNetWealth,
        prices: { ...newPrices },
        inventory: newInventory,
        capacity: getCapacity(newInventory, state.gameState.flags),
      };
      state.gameState = {
        ...newGameState,
      };
      saveGameLocal({ ...newGameState });
    },
    processTravelDay: (state, action: PayloadAction<RouteDanger | null>) => {
      const danger = action.payload;
      let daysLost = 1;
      let cashLost = 0;
      const currentCash = state.gameState.cash;
      const newInventory = { ...state.gameState.inventory };
      if (danger?.effects) {
        danger?.effects.forEach((effect) => {
          switch (effect.type) {
            case 'inventory':
              // ??
              break;
            case 'delay':
              // advance days
              if (effect.severity === 'sm') {
                daysLost = getRandRange(2, 6);
              } else if (effect.severity === 'md') {
                daysLost = getRandRange(7, 14);
              } else {
                // lg
                daysLost = getRandRange(15, 40);
              }
              break;
            case 'cash':
            default:
              // reduce cash
              if (effect.severity === 'sm') {
                cashLost = Math.floor(currentCash * getRandRange(0.05, 0.1));
              } else if (effect.severity === 'md') {
                cashLost = Math.floor(currentCash * getRandRange(0.11, 0.4));
              } else {
                // lg
                cashLost = Math.floor(currentCash * getRandRange(0.41, 0.6));
              }
              break;
          }
        });
      }
      const newCash = Math.max(state.gameState.cash - cashLost, 0);
      // const newNumTurns = state.gameState.numTurns + 0
      const newGameState: GameState = {
        ...state.gameState,
        numTurns: state.gameState.numTurns + daysLost,
        cash: newCash,
        inventory: newInventory,
        netWealth: getNetWealth(newCash, state.gameState.loans),
      };
      state.gameState = {
        ...newGameState,
      };
      saveGameLocal({ ...newGameState });
    },
    relocate: (state, action: PayloadAction<string>) => {
      // TODO: add bandits
      // TODO: add duration for long treks
      const newGameState = {
        ...state.gameState,
        prices: getLocalPrices(action.payload, 0),
        // numTurns: state.gameState.numTurns + 1,
        location: action.payload,
      };
      state.modalStatus = 'closed';
      state.gamePanel = 'market';
      state.gameState = {
        ...newGameState,
      };
      state.marketStatus = 'buy';
      saveGameLocal({ ...newGameState });
    },
  },
});

export const {
  initState,
  startNewGame,
  setModalStatus,
  loadSavedGame,
  setGamePanel,
  closeGame,
  setMarketStatus,
  buyItem,
  sellItem,
  relocate,
  setCurrentModal,
  processTravelDay,
} = gameSlice.actions;

export default gameSlice.reducer;
