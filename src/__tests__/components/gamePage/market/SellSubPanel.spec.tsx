import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { AppStatuses, GameSliceState } from 'types';
import { getLocalPrices } from 'utils/utils';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import initGameState from 'data/initGameState';
import SellSubPanel from 'components/gamePage/market/SellSubPanel';

jest.useFakeTimers();

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: {
    ...initGameState,
    prices: getLocalPrices(initGameState.location, 1),
    capacity: { used: { weight: 1, volume: 1 }, max: { weight: 10, volume: 10 } },
    inventory: {
      apple: { itemId: 'apple', qty: 5 },
    },
  },
  marketStatus: 'sell',
  currentModal: '',
  gamePanel: 'market',
};
describe('SellSubPanel', () => {
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
          <SellSubPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('sell-subpanel');
    expect(element).toBeInTheDocument();
  });

  it('renders component - no inventory', async () => {
    const mockInitialState = {
      ...initialState,
      gameState: {
        ...initialState.gameState,
        inventory: {
          apple: { qty: null },
        },
      },
    };
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: { ...mockInitialState },
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
          <SellSubPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('sell-subpanel');
    expect(element).toBeInTheDocument();
  });

  it('handles sell click', async () => {
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
          <SellSubPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-sell-apple'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/setCurrentModal', payload: 'sellQty' },
      { type: 'game/setModalStatus', payload: 'opening' },
      { type: 'game/setModalStatus', payload: 'open' },
    ];
    expect(args).toEqual(expected);
  });

  it('handles sell confirm click', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        modalStatus: 'open',
        currentModal: 'sellQty',
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
          <SellSubPanel />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-sell-apple'));
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
      { type: 'game/setCurrentModal', payload: 'sellQty' },
      { type: 'game/setModalStatus', payload: 'opening' },
      { type: 'game/setModalStatus', payload: 'open' },
      {
        type: 'game/sellItem',
        payload: {
          action: 'sell',
          itemId: 'apple',
          price: 5,
          qty: 5,
        },
      },
      { type: 'game/setModalStatus', payload: 'closing' },
      { type: 'game/setModalStatus', payload: 'closed' },
    ];
    expect(args).toEqual(expected);
  });

  // it('handles buy click - opens QTY modal', async () => {
  //   const mockGameSlice = createSlice({
  //     name: 'game',
  //     initialState: {
  //       ...initialState,
  //     },
  //     reducers: {},
  //   });
  //   const mockStore = configureStore({
  //     reducer: {
  //       game: mockGameSlice.reducer,
  //     },
  //   });
  //   const spy = jest.spyOn(mockStore, 'dispatch');
  //   act(() => {
  //     render(
  //       <Provider store={mockStore}>
  //         <IntlProvider messages={messages} locale="en" defaultLocale="en">
  //           <BuySubPanel />
  //         </IntlProvider>
  //       </Provider>,
  //     );
  //   });
  //   act(() => {
  //     jest.advanceTimersByTime(550);
  //   });
  //   await waitFor(async () => {
  //     fireEvent.click(screen.getByTestId('btn-buy-apple'));
  //   });
  //   act(() => {
  //     jest.advanceTimersByTime(550);
  //   });
  //   const args = spy.mock.calls.map((arg) => arg[0]);
  //   const expected = [
  //     { type: 'game/setCurrentModal', payload: 'qty' },
  //     { type: 'game/setModalStatus', payload: 'opening' },
  //     { type: 'game/setModalStatus', payload: 'open' },
  //   ];
  //   expect(args).toEqual(expected);
  // });

  // it('handles info click - opens Info modal', async () => {
  //   const mockGameSlice = createSlice({
  //     name: 'game',
  //     initialState: {
  //       ...initialState,
  //     },
  //     reducers: {},
  //   });
  //   const mockStore = configureStore({
  //     reducer: {
  //       game: mockGameSlice.reducer,
  //     },
  //   });
  //   const spy = jest.spyOn(mockStore, 'dispatch');
  //   act(() => {
  //     render(
  //       <Provider store={mockStore}>
  //         <IntlProvider messages={messages} locale="en" defaultLocale="en">
  //           <BuySubPanel />
  //         </IntlProvider>
  //       </Provider>,
  //     );
  //   });
  //   act(() => {
  //     jest.advanceTimersByTime(550);
  //   });
  //   await waitFor(async () => {
  //     fireEvent.click(screen.getByTestId('btn-info-apple'));
  //   });
  //   act(() => {
  //     jest.advanceTimersByTime(550);
  //   });
  //   const args = spy.mock.calls.map((arg) => arg[0]);
  //   const expected = [
  //     { type: 'game/setCurrentModal', payload: 'info' },
  //     { type: 'game/setModalStatus', payload: 'opening' },
  //     { type: 'game/setModalStatus', payload: 'open' },
  //   ];
  //   expect(args).toEqual(expected);
  // });

  // it('displays info modal', async () => {
  //   const mockGameSlice = createSlice({
  //     name: 'game',
  //     initialState: {
  //       ...initialState,
  //     },
  //     reducers: {
  //       setCurrentModal: (state, action: PayloadAction<string>) => {
  //         state.currentModal = action.payload;
  //       },
  //       setModalStatus: (state, action: PayloadAction<string>) => {
  //         state.modalStatus = `${action.payload}`;
  //         if (action.payload === '') {
  //           state.currentModal = '';
  //         }
  //       },
  //     },
  //   });
  //   const mockStore = configureStore({
  //     reducer: {
  //       game: mockGameSlice.reducer,
  //     },
  //   });
  //   const spy = jest.spyOn(mockStore, 'dispatch');
  //   act(() => {
  //     render(
  //       <Provider store={mockStore}>
  //         <IntlProvider messages={messages} locale="en" defaultLocale="en">
  //           <BuySubPanel />
  //         </IntlProvider>
  //       </Provider>,
  //     );
  //   });
  //   act(() => {
  //     jest.advanceTimersByTime(550);
  //   });
  //   await waitFor(async () => {
  //     fireEvent.click(screen.getByTestId('btn-info-apple'));
  //   });
  //   act(() => {
  //     jest.advanceTimersByTime(550);
  //   });
  //   const args = spy.mock.calls.map((arg) => arg[0]);
  //   const expected = [
  //     { type: 'game/setCurrentModal', payload: 'info' },
  //     { type: 'game/setModalStatus', payload: 'opening' },
  //     { type: 'game/setModalStatus', payload: 'open' },
  //   ];
  //   expect(args).toEqual(expected);
  // });

  // it('displays info modal', async () => {
  //   const mockGameSlice = createSlice({
  //     name: 'game',
  //     initialState: {
  //       ...initialState,
  //     },
  //     reducers: {
  //       setCurrentModal: (state, action: PayloadAction<string>) => {
  //         state.currentModal = action.payload;
  //       },
  //       setModalStatus: (state, action: PayloadAction<string>) => {
  //         state.modalStatus = `${action.payload}`;
  //         if (action.payload === '') {
  //           state.currentModal = '';
  //         }
  //       },
  //     },
  //   });
  //   const mockStore = configureStore({
  //     reducer: {
  //       game: mockGameSlice.reducer,
  //     },
  //   });
  //   const spy = jest.spyOn(mockStore, 'dispatch');
  //   act(() => {
  //     render(
  //       <Provider store={mockStore}>
  //         <IntlProvider messages={messages} locale="en" defaultLocale="en">
  //           <BuySubPanel />
  //         </IntlProvider>
  //       </Provider>,
  //     );
  //   });
  //   act(() => {
  //     jest.advanceTimersByTime(550);
  //   });
  //   await waitFor(async () => {
  //     fireEvent.click(screen.getByTestId('btn-info-apple'));
  //   });
  //   act(() => {
  //     jest.advanceTimersByTime(550);
  //   });
  //   const args = spy.mock.calls.map((arg) => arg[0]);
  //   const expected = [
  //     { type: 'game/setCurrentModal', payload: 'info' },
  //     { type: 'game/setModalStatus', payload: 'opening' },
  //     { type: 'game/setModalStatus', payload: 'open' },
  //   ];
  //   expect(args).toEqual(expected);
  // });

  // it('handles buy click - closes modal', async () => {
  //   const mockGameSlice = createSlice({
  //     name: 'game',
  //     initialState: {
  //       ...initialState,
  //       currentModal: 'qty',
  //       modalStatus: 'open',
  //     },
  //     reducers: {},
  //   });
  //   const mockStore = configureStore({
  //     reducer: {
  //       game: mockGameSlice.reducer,
  //     },
  //   });
  //   const spy = jest.spyOn(mockStore, 'dispatch');
  //   act(() => {
  //     render(
  //       <Provider store={mockStore}>
  //         <IntlProvider messages={messages} locale="en" defaultLocale="en">
  //           <BuySubPanel />
  //         </IntlProvider>
  //       </Provider>,
  //     );
  //   });
  //   act(() => {
  //     jest.advanceTimersByTime(550);
  //   });
  //   await waitFor(async () => {
  //     fireEvent.click(screen.getByTestId('btn-buy-apple'));
  //   });
  //   act(() => {
  //     jest.advanceTimersByTime(550);
  //   });
  //   await waitFor(async () => {
  //     fireEvent.click(screen.getByTestId('qty-btn-max'));
  //   });
  //   act(() => {
  //     jest.advanceTimersByTime(550);
  //   });
  //   const args = spy.mock.calls.map((arg) => arg[0]);
  //   const expected = [
  //     { type: 'game/setCurrentModal', payload: 'qty' },
  //     { type: 'game/setModalStatus', payload: 'opening' },
  //     { type: 'game/setModalStatus', payload: 'open' },
  //     { type: 'game/buyItem', payload: { qty: 5, itemId: 'apple', price: 5, action: 'buy' } },
  //     { type: 'game/setModalStatus', payload: 'closing' },
  //     { type: 'game/setModalStatus', payload: 'closed' },
  //   ];
  //   expect(args).toEqual(expected);
  // });
});
