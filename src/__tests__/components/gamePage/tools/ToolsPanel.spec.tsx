import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { AppStatuses, GameSliceState } from 'types';
import { getLocalPrices } from 'utils/utils';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import initGameState from 'data/initGameState';
import ToolsPanel from 'components/gamePage/tools/ToolsPanel';

jest.useFakeTimers();

// Mocking console.error to prevent output related to intl when we use mock state
jest.spyOn(console, 'error').mockImplementation(() => {});

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: {
    ...initGameState,
    prices: getLocalPrices(initGameState.location, 1),
    capacity: { used: { weight: 0, volume: 0 }, max: { weight: 10, volume: 10 } },
  },
  subPanelStatus: 'buy',
  currentModal: '',
  gamePanel: 'market',
};

describe('ToolsPanel', () => {
  it('renders component', () => {
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
          <ToolsPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('tools-panel');
    expect(element).toBeInTheDocument();
  });

  it('handles upgrade buy click', async () => {
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
    const spy = jest.spyOn(mockStore, 'dispatch');
    render(
      <Provider store={mockStore}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ToolsPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('upgrade-btn-buy-capacity_1'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      // {
      //   type: 'game/buyUpgrade',
      //   payload: {
      //     action: 'buy',
      //     itemId: 'capacity_1',
      //     price: 100,
      //     qty: 1,
      //   },
      // },
    ];
    expect(args).toEqual(expected);
  });

  it('handles upgrade info click', async () => {
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
    const spy = jest.spyOn(mockStore, 'dispatch');
    render(
      <Provider store={mockStore}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ToolsPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('upgrade-btn-info-capacity_1'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      {
        type: 'game/setCurrentModal',
        payload: 'upgrade-info',
      },
      {
        type: 'game/setModalStatus',
        payload: 'opening',
      },
      {
        type: 'game/setModalStatus',
        payload: 'open',
      },
    ];
    expect(args).toEqual(expected);
  });

  it('handles info close', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        currentModal: 'upgrade-info',
        modalStatus: 'open',
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
          <ToolsPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-tools-info-close'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      {
        type: 'game/setModalStatus',
        payload: 'closing',
      },
      {
        type: 'game/setModalStatus',
        payload: 'closed',
      },
    ];
    expect(args).toEqual(expected);
  });

  it('renders component - guild only upgrade - no membership', () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        gameState: {
          ...initialState.gameState,
          location: 'butre',
          flags: [],
        },
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
          <ToolsPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('icon-guild');
    expect(element).toBeInTheDocument();
    const bg = screen.getByTestId('icon-guild-bg');
    expect(bg.getAttribute('fill')).toEqual('#888');
  });

  it('renders component - guild only upgrade - has membership', () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        gameState: {
          ...initialState.gameState,
          location: 'butre',
          flags: { guild__butre: true },
        },
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
          <ToolsPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('icon-guild');
    expect(element).toBeInTheDocument();
    const bg = screen.getByTestId('icon-guild-bg');
    expect(bg.getAttribute('fill')).toEqual('#fa7316');
  });

  it('renders component - invalid location', () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        gameState: {
          ...initialState.gameState,
          location: 'test',
        },
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
          <ToolsPanel />
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
