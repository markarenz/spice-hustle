import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import initGameState from 'data/initGameState';
import { AppStatuses, GameSliceState } from 'types';
import BankAmountModal from 'components/gamePage/bank/BankAmountModal';

jest.useFakeTimers();

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: {
    ...initGameState,
  },
  subPanelStatus: 'savings',
  currentModal: 'deposit',
  gamePanel: 'bank',
};
describe('BankAmountModal', () => {
  it('renders the component: deposit', () => {
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
          <BankAmountModal />
        </IntlProvider>
      </Provider>,
    );
    expect(screen.getByTestId('bank-amount-modal-deposit')).toBeInTheDocument();
  });

  it('renders the component: withdrawal', () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: { ...initialState, currentModal: 'withdrawal' },
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
          <BankAmountModal />
        </IntlProvider>
      </Provider>,
    );
    expect(screen.getByTestId('bank-amount-modal-withdrawal')).toBeInTheDocument();
  });

  it('handles cancel', async () => {
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
          <BankAmountModal />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('bank-modal-btn-cancel'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/setModalStatus', payload: 'closing' },
      { type: 'game/setCurrentModal', payload: '' },
      { type: 'game/setModalStatus', payload: 'closed' },
    ];
    expect(args).toEqual(expected);
  });

  it('handles input change, ok button: deposit', async () => {
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
          <BankAmountModal />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.change(screen.getByTestId('bank-amount-input'), { target: { value: '10' } });
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('bank-amount-input');
    expect(element.getAttribute('value')).toBe('10');
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('bank-modal-btn-ok'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });

    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/processBankDepositWithdrawal', payload: 10 },
      { type: 'game/setModalStatus', payload: 'closing' },
      { type: 'game/setCurrentModal', payload: '' },
      { type: 'game/setModalStatus', payload: 'closed' },
    ];
    expect(args).toEqual(expected);
  });

  it('handles input change, ok button: withdrawal', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        gameState: {
          ...initialState.gameState,
          savings: 50,
        },
        currentModal: 'withdrawal',
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
          <BankAmountModal />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.change(screen.getByTestId('bank-amount-input'), { target: { value: '10' } });
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('bank-amount-input');
    expect(element.getAttribute('value')).toBe('10');
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('bank-modal-btn-ok'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });

    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/processBankDepositWithdrawal', payload: -10 },
      { type: 'game/setModalStatus', payload: 'closing' },
      { type: 'game/setCurrentModal', payload: '' },
      { type: 'game/setModalStatus', payload: 'closed' },
    ];
    expect(args).toEqual(expected);
  });

  it('handles input change, negative', async () => {
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
          <BankAmountModal />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.change(screen.getByTestId('bank-amount-input'), { target: { value: '-10' } });
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('bank-amount-input');
    expect(element.getAttribute('value')).toBe('0');
  });

  it('handles max button click', async () => {
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
          <BankAmountModal />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('bank-modal-btn-max'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });

    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/processBankDepositWithdrawal', payload: 100 },
      { type: 'game/setModalStatus', payload: 'closing' },
      { type: 'game/setCurrentModal', payload: '' },
      { type: 'game/setModalStatus', payload: 'closed' },
    ];
    expect(args).toEqual(expected);
  });
});
