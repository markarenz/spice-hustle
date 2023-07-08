import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { AppStatuses, GameSliceState } from 'types';
import { getLocalPrices } from 'utils/utils';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import initGameState from 'data/initGameState';
import BuySubPanel from 'components/gamePage/market/BuySubPanel';

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
describe('BuySubPanel', () => {
  it('renders component', async () => {
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
          <BuySubPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('buy-subpanel');
    expect(element).toBeInTheDocument();
  });

  it('handles buy click - opens QTY modal', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
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
          <BuySubPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-buy-apple'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/setCurrentModal', payload: 'qty' },
      { type: 'game/setModalStatus', payload: 'opening' },
      { type: 'game/setModalStatus', payload: 'open' },
    ];
    expect(args).toEqual(expected);
  });

  it('handles info click - opens Info modal', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
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
          <BuySubPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-info-apple'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/setCurrentModal', payload: 'info' },
      { type: 'game/setModalStatus', payload: 'opening' },
      { type: 'game/setModalStatus', payload: 'open' },
    ];
    expect(args).toEqual(expected);
  });

  it('displays info modal', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
      },
      reducers: {
        setCurrentModal: (state, action: PayloadAction<string>) => {
          state.currentModal = action.payload;
        },
        setModalStatus: (state, action: PayloadAction<string>) => {
          state.modalStatus = `${action.payload}`;
          if (action.payload === '') {
            state.currentModal = '';
          }
        },
      },
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
          <BuySubPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-info-apple'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/setCurrentModal', payload: 'info' },
      { type: 'game/setModalStatus', payload: 'opening' },
      { type: 'game/setModalStatus', payload: 'open' },
    ];
    expect(args).toEqual(expected);
  });

  it('handles buy click - closes modal', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        currentModal: 'qty',
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
          <BuySubPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-buy-apple'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('qty-btn-max'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/setCurrentModal', payload: 'qty' },
      { type: 'game/setModalStatus', payload: 'opening' },
      { type: 'game/setModalStatus', payload: 'open' },
      { type: 'game/buyItem', payload: { qty: 5, itemId: 'apple', price: 5, action: 'buy' } },
      { type: 'game/setModalStatus', payload: 'closing' },
      { type: 'game/setModalStatus', payload: 'closed' },
    ];
    expect(args).toEqual(expected);
  });
});
