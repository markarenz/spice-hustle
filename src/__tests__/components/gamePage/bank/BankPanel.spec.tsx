import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import initGameState from 'data/initGameState';
import { AppStatuses, GameSliceState } from 'types';
import BankPanel from 'components/gamePage/bank/BankPanel';

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: {
    ...initGameState,
  },
  subPanelStatus: 'savings',
  currentModal: '',
  gamePanel: 'bank',
};
describe('BankPanel', () => {
  // subPanelStatus
  it('renders the bank panel default savings', () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState,
      reducers: {},
    });
    const mockStore = configureStore({
      reducer: {
        game: mockGameSlice.reducer,
      },
    });
    render(
      <Provider store={mockStore}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <BankPanel />
        </IntlProvider>
      </Provider>,
    );
    expect(screen.getByTestId('savings-panel')).toBeInTheDocument();
  });

  it('renders the bank panel loans', () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        gamePanel: 'bank',
        subPanelStatus: 'loans',
      },
      reducers: {},
    });
    const mockStore = configureStore({
      reducer: {
        game: mockGameSlice.reducer,
      },
    });
    render(
      <Provider store={mockStore}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <BankPanel />
        </IntlProvider>
      </Provider>,
    );
    expect(screen.getByTestId('loans-panel')).toBeInTheDocument();
  });
});
