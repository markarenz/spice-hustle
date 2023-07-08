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
  },
  marketStatus: 'buy',
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
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-butre'));
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
      { type: 'game/processTravelDay', payload: null },
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
      { type: 'game/processTravelDay', payload: null },
      { type: 'game/processTravelDay', payload: null },
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
    // const travelPanel = screen.getByTestId('travel-modal');
    // expect(travelPanel).toBeInTheDocument();
  });
});
