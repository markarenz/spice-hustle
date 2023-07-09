import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { AppStatuses } from 'types';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, act } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import GamePanelDisplay from 'components/gamePage/GamePanelDisplay';
import initGameState from 'data/initGameState';
import { GameSliceState } from 'types';

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: initGameState,
  marketStatus: 'buy',
  currentModal: '',
  gamePanel: 'market',
};

jest.useFakeTimers();

describe('GamePanelDisplay', () => {
  it('renders component: default panel', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: { ...initialState, gamePanel: 'test' },
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
          <GamePanelDisplay />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('default-panel');
    expect(element).toBeInTheDocument();
  });

  it('renders component: market panel', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: { ...initialState, gamePanel: 'market' },
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
          <GamePanelDisplay />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('market-panel');
    expect(element).toBeInTheDocument();
  });

  it('renders component: travel panel', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: { ...initialState, gamePanel: 'travel' },
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
          <GamePanelDisplay />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('travel-panel');
    expect(element).toBeInTheDocument();
  });

  it('renders component: tools panel', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: { ...initialState, gamePanel: 'tools' },
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
          <GamePanelDisplay />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('tools-panel');
    expect(element).toBeInTheDocument();
  });
});
