import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { AppStatuses, GameSliceState } from 'types';
import { getLocalPrices } from 'utils/utils';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import initGameState from 'data/initGameState';
import TravelPanel from 'components/gamePage/travel/TravelPanel';

jest.useFakeTimers();

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: {
    ...initGameState,
    prices: getLocalPrices(initGameState.location, 1),
    capacity: { used: { weight: 0, volume: 0 }, max: { weight: 10, volume: 10 } },
    mapVersion: 0,
  },
  subPanelStatus: 'buy',
  currentModal: '',
  gamePanel: 'market',
};

describe('TravelPanel', () => {
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
          <TravelPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const travelPanel = screen.getByTestId('travel-panel');
    expect(travelPanel).toBeInTheDocument();
  });

  it('handles start travel click', async () => {
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
          <TravelPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const btnButre = screen.getByTestId('btn-butre');
    await waitFor(async () => {
      fireEvent.click(btnButre);
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('travel-btn-ok'));
    });
    const travelPanel = screen.getByTestId('travel-modal');
    expect(travelPanel).toBeInTheDocument();
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      {
        type: 'game/processTravelDay',
        payload: {
          danger: null,
          upgradeUsed: false,
        },
      },
      { type: 'game/relocate', payload: 'butre' },
    ];
    expect(args).toEqual(expected);
  });

  it('handles start travel click - continue 2 day journey', async () => {
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
          <TravelPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-tabbith'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('travel-btn-ok'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/processTravelDay', payload: { danger: null, upgradeUsed: false } },
      { type: 'game/processTravelDay', payload: { danger: null, upgradeUsed: false } },
    ];
    expect(args).toEqual(expected);
  });

  it('handles cancel travel click BG', async () => {
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
          <TravelPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-butre'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('travel-modal-bg-btn'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const travelPanel = screen.queryByTestId('travel-modal');
    expect(travelPanel).not.toBeInTheDocument();
  });

  it('handles danger encounter', async () => {
    global.Math.random = () => 0;
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
          <TravelPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-butre'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      {
        type: 'game/processTravelDay',
        payload: {
          danger: {
            type: 'flood',
            chance: 0.2,
            effects: [
              { type: 'delay', severity: 'sm' },
              { type: 'inventory', severity: 'sm' },
            ],
            positions: {
              0: { x: 23.5, y: 53 },
              1: { x: 28, y: 51.5 },
              2: { x: 35.5, y: 51 },
            },
          },
          upgradeUsed: false,
        },
      },
    ];
    expect(args).toEqual(expected);
  });
});
