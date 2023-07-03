import { configureStore, createSlice } from '@reduxjs/toolkit';
import { gameSlice } from 'store/gameSlice';
import { GameSliceState, AppStatuses, Transaction } from 'types';
import initGameState from 'data/initGameState';
import { store } from 'store/store';
import {
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
} from 'store/gameSlice';
import mockGameState from '__tests__/__fixtures__/mockGameState';

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
