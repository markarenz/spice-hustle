import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GameSliceState,
  GameState,
  AppStatuses,
  GameTabSlugs,
  Transaction,
  TravelTurnDangerResult,
} from 'types';
import {
  getLocalPrices,
  getNetWealth,
  getCapacity,
  getRandRange,
  getMapVersion,
} from 'utils/utils';
import { getInitialState } from './storeUtils';
import initGameState from 'data/initGameState';
import { saveGameLocal } from 'utils/saveLoadUtils';
import loansData from 'data/loansData';
import guildsData from 'data/guildsData';

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
      state.subPanelStatus = 'buy';
      state.appStatus = AppStatuses.Game;
      state.gameState = { ...newGameData };
      saveGameLocal({ ...newGameData }, false);
      state.gamePanel = GameTabSlugs.Market;
    },
    setAppStatus: (state, action: PayloadAction<AppStatuses>) => {
      state.appStatus = action.payload;
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
      state.subPanelStatus = 'buy';
      state.modalStatus = 'closed';
    },
    quickSave: (state) => {
      saveGameLocal(state.gameState, true);
    },
    setGamePanel: (state, action: PayloadAction<string>) => {
      state.gamePanel = action.payload;
      switch (action.payload) {
        case 'market':
          state.subPanelStatus = 'buy';
          break;
        case 'bank':
          state.subPanelStatus = 'savings';
          break;
        default:
          state.subPanelStatus = '';
      }
      state.modalStatus = 'closed';
    },
    closeGame: (state) => {
      state.appStatus = AppStatuses.StartPage;
      state.modalStatus = 'closed';
    },
    setSubPanelStatus: (state, action: PayloadAction<string>) => {
      state.subPanelStatus = action.payload;
      state.modalStatus = 'closed';
    },
    processBankDepositWithdrawal: (state, action: PayloadAction<number>) => {
      // deposits = positive amounts, withdrawals = negative amounts
      const amt = action.payload;
      const newCash = state.gameState.cash - amt;
      const newSavings = state.gameState.savings + amt;
      const newNetWealth = getNetWealth(newCash, newSavings, state.gameState.loans);
      const newGameState = {
        ...state.gameState,
        // numTurns: state.gameState.numTurns + 1,
        cash: newCash,
        netWealth: newNetWealth,
        savings: newSavings,
      };
      state.gameState = {
        ...newGameState,
      };
      saveGameLocal({ ...newGameState }, false);
    },
    purchaseGuildMembership: (state, action: PayloadAction<string>) => {
      const location = action.payload;
      const amt = guildsData[location].price;
      const newCash = state.gameState.cash - amt;
      const newNetWealth = getNetWealth(newCash, state.gameState.savings, state.gameState.loans);
      const newFlags = { ...state.gameState.flags, [`guild__${location}`]: true };
      const newGameState = {
        ...state.gameState,
        numTurns: state.gameState.numTurns + 1,
        cash: newCash,
        netWealth: newNetWealth,
        flags: newFlags,
        // new prices?
      };
      state.gameState = {
        ...newGameState,
      };
      saveGameLocal({ ...newGameState }, false);
    },
    acceptLoanOffer: (state, action: PayloadAction<string>) => {
      const location = action.payload;
      const loan = loansData[location];
      const newLoans = [
        ...state.gameState.loans,
        {
          location,
          initialAmount: loan.amount + loan.markup,
          principal: loan.amount + loan.markup,
          dueDate: state.gameState.numTurns + loan.term,
        },
      ];
      const newCash = state.gameState.cash + loan.amount;
      const newNetWealth = getNetWealth(newCash, state.gameState.savings, newLoans);
      const newGameState = {
        ...state.gameState,
        // numTurns: state.gameState.numTurns + 1,
        cash: newCash,
        netWealth: newNetWealth,
        loans: newLoans,
      };
      state.gameState = {
        ...newGameState,
      };
      saveGameLocal({ ...newGameState }, false);
    },
    makeLoanPayment: (state, action: PayloadAction<number>) => {
      const amt = action.payload;
      const { location, loans } = state.gameState;
      const selectedLoan = state.gameState.loans.find((loan) => loan.location === location);
      if (selectedLoan) {
        const newLoans =
          selectedLoan.principal > amt
            ? loans.map((loan) =>
                loan.location === location
                  ? {
                      ...loan,
                      principal: loan.principal - amt,
                    }
                  : loan,
              )
            : loans.filter((loan) => loan.location !== location);

        const newCash = state.gameState.cash - amt;
        const newNetWealth = getNetWealth(newCash, state.gameState.savings, newLoans);
        const newGameState = {
          ...state.gameState,
          // numTurns: state.gameState.numTurns + 1,
          cash: newCash,
          netWealth: newNetWealth,
          loans: newLoans,
        };
        state.gameState = {
          ...newGameState,
        };
        saveGameLocal({ ...newGameState }, false);
      }
    },
    buyUpgrade: (state, action: PayloadAction<Transaction>) => {
      const { itemId, price } = action.payload;
      const newCash = state.gameState.cash - price;
      const newNetWealth = getNetWealth(newCash, state.gameState.savings, state.gameState.loans);
      const newFlags = { ...state.gameState.flags, [`upgrade__${itemId}`]: true };
      const newGameState = {
        ...state.gameState,
        numTurns: state.gameState.numTurns + 1,
        cash: newCash,
        netWealth: newNetWealth,
        flags: newFlags,
        // other attributes affected by flags?
        capacity: getCapacity(state.gameState.inventory, newFlags),
        mapVersion: getMapVersion({ ...state.gameState, flags: newFlags }),
      };
      state.gameState = {
        ...newGameState,
      };
      saveGameLocal({ ...newGameState }, false);
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
      const newNetWealth = getNetWealth(newCash, state.gameState.savings, state.gameState.loans);
      const newInventory = {
        ...state.gameState.inventory,
        [itemId]: { itemId, qty: (state.gameState.inventory[itemId]?.qty || 0) + qty },
      };
      const newGameState = {
        ...state.gameState,
        numTurns: state.gameState.numTurns + 1,
        cash: newCash,
        netWealth: newNetWealth,
        prices: { ...newPrices },
        inventory: newInventory,
        capacity: getCapacity(newInventory, state.gameState.flags),
      };
      state.gameState = {
        ...newGameState,
      };
      saveGameLocal({ ...newGameState }, false);
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
      const newNetWealth = getNetWealth(newCash, state.gameState.savings, state.gameState.loans);
      const newInventory = {
        ...state.gameState.inventory,
        [itemId]: { itemId, qty: state.gameState.inventory[itemId]?.qty - qty },
      };
      const newGameState = {
        ...state.gameState,
        numTurns: state.gameState.numTurns + 1,
        cash: newCash,
        netWealth: newNetWealth,
        prices: { ...newPrices },
        inventory: newInventory,
        capacity: getCapacity(newInventory, state.gameState.flags),
      };
      state.gameState = {
        ...newGameState,
      };
      saveGameLocal({ ...newGameState }, false);
    },
    processTravelDay: (state, action: PayloadAction<TravelTurnDangerResult>) => {
      const travelTurnDangerResult = action.payload;
      const { danger, upgradeUsed } = travelTurnDangerResult;
      let daysLost = 1;
      let cashLost = 0;
      const currentCash = state.gameState.cash;
      const newInventory = { ...state.gameState.inventory };
      const newFlags = { ...state.gameState.flags };
      if (upgradeUsed && danger) {
        delete newFlags[`upgrade__counterDanger__${danger.type}`];
      }
      if (!upgradeUsed && danger?.effects) {
        danger?.effects.forEach((effect) => {
          switch (effect.type) {
            case 'inventory':
              Object.keys(newInventory).forEach((itemId) => {
                const qty = newInventory[itemId].qty;
                let newQty = qty;
                // Math.floor(currentCash * getRandRange(0.05, 0.1));
                if (effect.severity === 'sm') {
                  newQty = Math.floor(qty * getRandRange(0.92, 0.999));
                } else if (effect.severity === 'md') {
                  newQty = Math.floor(qty * getRandRange(0.7, 0.9));
                } else {
                  // lg
                  newQty = Math.floor(qty * getRandRange(0.5, 0.7));
                }
                newInventory[itemId].qty = newQty;
              });
              break;
            case 'delay':
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
              if (effect.severity === 'sm') {
                cashLost = Math.floor(currentCash * getRandRange(0.01, 0.1));
              } else if (effect.severity === 'md') {
                cashLost = Math.floor(currentCash * getRandRange(0.1, 0.25));
              } else {
                // lg
                cashLost = Math.floor(currentCash * getRandRange(0.25, 0.4));
              }
              break;
          }
        });
      }
      const newCash = Math.max(state.gameState.cash - cashLost, 0);
      const newGameState: GameState = {
        ...state.gameState,
        numTurns: state.gameState.numTurns + daysLost,
        cash: newCash,
        flags: newFlags,
        inventory: newInventory,
        netWealth: getNetWealth(newCash, 0, []),
        capacity: getCapacity(newInventory, state.gameState.flags),
      };
      state.gameState = {
        ...newGameState,
      };
      saveGameLocal({ ...newGameState }, false);
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
      state.subPanelStatus = 'buy';
      saveGameLocal({ ...newGameState }, false);
    },
  },
});

export const {
  initState,
  startNewGame,
  setAppStatus,
  setModalStatus,
  loadSavedGame,
  setGamePanel,
  closeGame,
  setSubPanelStatus,
  buyUpgrade,
  buyItem,
  sellItem,
  relocate,
  setCurrentModal,
  processTravelDay,
  processBankDepositWithdrawal,
  acceptLoanOffer,
  makeLoanPayment,
  purchaseGuildMembership,
  quickSave,
} = gameSlice.actions;

export default gameSlice.reducer;
