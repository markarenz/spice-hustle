import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from 'locales/en-US/copy.json';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { GameSliceState, AppStatuses } from 'types';
import initGameState from 'data/initGameState';
import MarketActionTabButton from 'components/gamePage/market/MarketActionTabButton';

jest.useFakeTimers();

const initialState: GameSliceState = {
  appStatus: AppStatuses.Game,
  modalStatus: 'open',
  gameState: {
    ...initGameState,
  },
  marketStatus: 'buy',
  currentModal: 'info',
  gamePanel: 'market',
};

describe('MarketActionTabButton', () => {
  it('renders component: active', () => {
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
          <MarketActionTabButton slug="buy" />
        </IntlProvider>
      </Provider>,
    );
    const btn = screen.getByTestId('market-tab-btn-buy');
    expect(btn).toBeInTheDocument();
    const element = screen.getByTestId('market-tab-btn-label-wrap');
    // Inactive classes
    expect(element.className.includes('h-full')).toBe(true);
  });

  it('renders component: inactive', () => {
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
          <MarketActionTabButton slug="buy" />
        </IntlProvider>
      </Provider>,
    );
    const btn = screen.getByTestId('market-tab-btn-buy');
    expect(btn).toBeInTheDocument();
    const element = screen.getByTestId('market-tab-btn-label-wrap');
    // Inactive classes
    expect(element.className.includes('h-full')).toBe(false);
  });

  it('handles click', async () => {
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
    const spy = jest.spyOn(mockStore, 'dispatch');
    render(
      <Provider store={mockStore}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <MarketActionTabButton slug="buy" />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('market-tab-btn-buy'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [{ type: 'game/setMarketStatus', payload: 'buy' }];
    expect(args).toEqual(expected);
  });
});
