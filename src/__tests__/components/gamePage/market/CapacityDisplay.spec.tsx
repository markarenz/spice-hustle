import { IntlProvider } from 'react-intl';
import messages from 'locales/en-US/copy.json';
import { Provider } from 'react-redux';
import { AppStatuses, GameSliceState } from 'types';
import { getLocalPrices } from 'utils/utils';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, act } from '@testing-library/react';
import initGameState from 'data/initGameState';
import CapacityDisplay from 'components/gamePage/market/CapacityDisplay';

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

describe('CapacityDisplay', () => {
  it('renders component under capacity', () => {
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
    act(() => {
      render(
        <Provider store={mockStore}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <CapacityDisplay />
          </IntlProvider>
        </Provider>,
      );
    });
    const element = screen.getByTestId('market-capacity');
    expect(element.className.includes('font-bold')).toBe(false);
  });

  it('renders component - at capacity: weight', () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        gameState: {
          ...initialState.gameState,
          capacity: { used: { weight: 10, volume: 5 }, max: { weight: 10, volume: 10 } },
        },
      },
      reducers: {},
    });
    const mockStore = configureStore({
      reducer: {
        game: mockGameSlice.reducer,
      },
    });
    act(() => {
      render(
        <Provider store={mockStore}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <CapacityDisplay />
          </IntlProvider>
        </Provider>,
      );
    });
    const element = screen.getByTestId('market-capacity');
    expect(element.className.includes('font-bold')).toBe(true);
  });

  it('renders component - at capacity: volume', () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        gameState: {
          ...initialState.gameState,
          capacity: { used: { weight: 5, volume: 10 }, max: { weight: 10, volume: 10 } },
        },
      },
      reducers: {},
    });
    const mockStore = configureStore({
      reducer: {
        game: mockGameSlice.reducer,
      },
    });
    act(() => {
      render(
        <Provider store={mockStore}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <CapacityDisplay />
          </IntlProvider>
        </Provider>,
      );
    });
    const element = screen.getByTestId('market-capacity');
    expect(element.className.includes('font-bold')).toBe(true);
  });
});
