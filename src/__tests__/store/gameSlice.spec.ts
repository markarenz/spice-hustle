import { gameSlice } from 'store/gameSlice';
import { GameSliceState, AppStatuses, Transaction } from 'types';
import initGameState from 'data/initGameState';
import { store } from 'store/store';
import {
  initState,
  startNewGame,
  setAppStatus,
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
  buyUpgrade,
} from 'store/gameSlice';
import mockGameState from '__tests__/__fixtures__/mockGameState';
import mockDanger from '__tests__/__fixtures__/travel/mockDanger';

const mockInitialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: initGameState,
  marketStatus: 'buy',
  currentModal: '',
  gamePanel: 'market',
};

describe('gameSlice', () => {
  it('should load initial state', () => {
    const result = gameSlice.reducer(mockInitialState, {
      type: 'initState',
      payload: '',
    });
    expect(result.appStatus).toEqual('startPage');
  });
});

describe('initState', () => {
  it('updates state to initial value', () => {
    store.dispatch(initState());
    const result = store.getState().game;
    expect(result.appStatus).toBe('startPage');
  });
});

describe('startNewGame', () => {
  it('starts new game', () => {
    store.dispatch(startNewGame());
    const result = store.getState().game;
    expect(result.appStatus).toBe('game');
  });
});

describe('setAppStatus', () => {
  it('sets the app status', () => {
    store.dispatch(setAppStatus(AppStatuses.AboutPage));
    const result = store.getState().game;
    expect(result.appStatus).toBe(AppStatuses.AboutPage);
  });
});

describe('setModalStatus', () => {
  it('updates modalStatus', () => {
    store.dispatch(setModalStatus('opening'));
    const result = store.getState().game;
    expect(result.modalStatus).toBe('opening');
  });
  it('updates modalStatus and currentModal when payload is a blank string', () => {
    store.dispatch(setModalStatus(''));
    const result = store.getState().game;
    expect(result.currentModal).toBe('');
    expect(result.modalStatus).toBe('');
  });
});

describe('loadSavedGame', () => {
  it('updates modalStatus', () => {
    store.dispatch(loadSavedGame({ ...mockGameState, numTurns: 100 }));
    const result = store.getState().game.gameState;
    expect(result.numTurns).toBe(100);
  });
});

describe('setGamePanel', () => {
  it('updates gamePanel', () => {
    store.dispatch(setGamePanel('market'));
    const result = store.getState().game.gamePanel;
    expect(result).toBe('market');
  });
});

describe('closeGame', () => {
  it('closes game', () => {
    store.dispatch(closeGame());
    const result = store.getState().game.appStatus;
    expect(result).toBe('startPage');
  });
});

describe('setMarketStatus', () => {
  it('closes game', () => {
    store.dispatch(setMarketStatus('buy'));
    const result = store.getState().game.marketStatus;
    expect(result).toBe('buy');
  });
});

describe('buyItem', () => {
  it('handles buy item', () => {
    store.dispatch(startNewGame());
    const mockTransaction: Transaction = {
      action: 'buy',
      qty: 2,
      itemId: 'apple',
      price: 3,
    };
    store.dispatch(buyItem(mockTransaction));
    const result = store.getState().game.gameState;
    expect(result.inventory.apple.qty).toBe(2);
  });
});

describe('sellItem', () => {
  it('handles sell item', () => {
    store.dispatch(startNewGame());
    const mockTransactionBuy: Transaction = {
      action: 'buy',
      qty: 2,
      itemId: 'apple',
      price: 3,
    };
    store.dispatch(buyItem(mockTransactionBuy));
    const mockTransaction: Transaction = {
      action: 'sell',
      qty: 2,
      itemId: 'apple',
      price: 3,
    };
    store.dispatch(sellItem(mockTransaction));
    const result = store.getState().game.gameState;
    expect(result.inventory.apple.qty).toBe(0);
  });
});

describe('relocate', () => {
  it('updates location', () => {
    const newLocation = 'tabbith';
    store.dispatch(relocate(newLocation));
    const result = store.getState().game.gameState.location;
    expect(result).toBe(newLocation);
  });
});

describe('setCurrentModal', () => {
  it('updates current modal', () => {
    store.dispatch(setCurrentModal('qty'));
    const result = store.getState().game.currentModal;
    expect(result).toBe('qty');
  });
});

describe('processTravelDay', () => {
  it('updates state for a travel day: safe passage', () => {
    store.dispatch(startNewGame());
    store.dispatch(
      processTravelDay({
        danger: null,
        upgradeUsed: false,
      }),
    );
    const result = store.getState().game.gameState.numTurns;
    expect(result).toBe(1);
  });

  it('updates state for a travel day - danger avoided with upgrade', () => {
    const mockTransaction: Transaction = {
      action: 'buy',
      qty: 10,
      itemId: 'apple',
      price: 1,
    };
    store.dispatch(startNewGame());
    store.dispatch(buyItem(mockTransaction));
    store.dispatch(
      processTravelDay({
        danger: {
          ...mockDanger,
          effects: [
            { type: 'cash', severity: 'sm' },
            { type: 'inventory', severity: 'sm' },
            { type: 'delay', severity: 'sm' },
          ],
        },
        upgradeUsed: true,
      }),
    );
    const result = store.getState().game.gameState;
    expect(result.cash).toEqual(90);
    expect(result.inventory.apple.qty).toEqual(10);
    expect(result.numTurns).toEqual(2);
  });
  it('updates state for a travel day: danger sm', () => {
    const mockTransaction: Transaction = {
      action: 'buy',
      qty: 10,
      itemId: 'apple',
      price: 1,
    };
    store.dispatch(startNewGame());
    store.dispatch(buyItem(mockTransaction));
    store.dispatch(
      processTravelDay({
        danger: {
          ...mockDanger,
          effects: [
            { type: 'cash', severity: 'sm' },
            { type: 'inventory', severity: 'sm' },
            { type: 'delay', severity: 'sm' },
          ],
        },
        upgradeUsed: false,
      }),
    );
    const result = store.getState().game.gameState;
    expect(result.cash).toEqual(86);
    expect(result.inventory.apple.qty).toEqual(8);
    expect(result.numTurns).toEqual(5);
  });
  it('updates state for a travel day: danger md', () => {
    const mockTransaction: Transaction = {
      action: 'buy',
      qty: 15,
      itemId: 'apple',
      price: 1,
    };
    store.dispatch(startNewGame());
    store.dispatch(buyItem(mockTransaction));
    store.dispatch(
      processTravelDay({
        danger: {
          ...mockDanger,
          effects: [
            { type: 'cash', severity: 'md' },
            { type: 'inventory', severity: 'md' },
            { type: 'delay', severity: 'md' },
          ],
        },
        upgradeUsed: false,
      }),
    );
    const result = store.getState().game.gameState;
    expect(result.cash).toEqual(76);
    expect(result.inventory.apple.qty).toEqual(7);
    expect(result.numTurns).toEqual(11);
  });
  it('updates state for a travel day: danger lg', () => {
    const mockTransaction: Transaction = {
      action: 'buy',
      qty: 20,
      itemId: 'apple',
      price: 1,
    };
    store.dispatch(startNewGame());
    store.dispatch(buyItem(mockTransaction));
    store.dispatch(
      processTravelDay({
        danger: {
          ...mockDanger,
          effects: [
            { type: 'cash', severity: 'lg' },
            { type: 'inventory', severity: 'lg' },
            { type: 'delay', severity: 'lg' },
          ],
        },
        upgradeUsed: false,
      }),
    );
    const result = store.getState().game.gameState;
    expect(result.cash).toEqual(48);
    expect(result.inventory.apple.qty).toEqual(2);
    expect(result.numTurns).toEqual(28);
  });
});

describe('buyUpgrade', () => {
  it('processes upgrade purchase', () => {
    const mockTransaction: Transaction = {
      action: 'buy',
      qty: 1,
      itemId: 'capacity_1',
      price: 20,
    };
    store.dispatch(startNewGame());
    store.dispatch(buyUpgrade(mockTransaction));
    const result = store.getState().game.gameState;
    expect(result.cash).toEqual(80);
    expect(result.flags['upgrade__capacity_1']).toBe(true);
  });
});
