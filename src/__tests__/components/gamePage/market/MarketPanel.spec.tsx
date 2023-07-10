import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { AppStatuses, GameSliceState } from 'types';
import { getLocalPrices } from 'utils/utils';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, act } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import initGameState from 'data/initGameState';
import MarketPanel from 'components/gamePage/market/MarketPanel';

jest.useFakeTimers();

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: {
    ...initGameState,
    prices: getLocalPrices(initGameState.location, 1),
    capacity: { used: { weight: 0, volume: 0 }, max: { weight: 10, volume: 10 } },
  },
  marketStatus: 'buy',
  currentModal: '',
  gamePanel: 'market',
};
describe('MarketPanel', () => {
  it('renders component: buy', async () => {
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
          <MarketPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const mktPanel = screen.getByTestId('market-panel');
    expect(mktPanel).toBeInTheDocument();
    const element = screen.getByTestId('buy-subpanel');
    expect(element).toBeInTheDocument();
  });
  it('renders component: sell', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        marketStatus: 'sell',
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
          <MarketPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('sell-subpanel');
    expect(element).toBeInTheDocument();
  });
});
