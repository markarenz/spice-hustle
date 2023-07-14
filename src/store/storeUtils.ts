import { GameSliceState, AppStatuses } from 'types';
import initGameState from 'data/initGameState';

export const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: initGameState,
  subPanelStatus: 'buy',
  currentModal: '',
  gamePanel: 'market',
};

export const getInitialState = (): GameSliceState => ({
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: initGameState,
  subPanelStatus: 'buy',
  currentModal: '',
  gamePanel: 'market',
});
