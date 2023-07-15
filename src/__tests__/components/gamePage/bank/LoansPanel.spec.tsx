import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import initGameState from 'data/initGameState';
import { AppStatuses, GameSliceState } from 'types';
import LoansPanel from 'components/gamePage/bank/LoansPanel';

jest.useFakeTimers();

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: {
    ...initGameState,
    loans: [
      {
        location: 'oskah',
        initialAmount: 1200,
        principal: 1000,
        dueDate: 100,
      },
      {
        location: 'tabbith',
        initialAmount: 800,
        principal: 100,
        dueDate: 120,
      },
    ],
  },
  subPanelStatus: 'loans',
  currentModal: '',
  gamePanel: 'bank',
};
describe('LOansPanel', () => {
  // subPanelStatus
  it('renders the loans panel', () => {
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
          <LoansPanel />
        </IntlProvider>
      </Provider>,
    );
    expect(screen.getByTestId('loans-panel')).toBeInTheDocument();
  });

  it('handles accept loan button click', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        gameState: {
          ...initialState.gameState,
          loans: [],
        },
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
          <LoansPanel />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('accept-loan-btn'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [{ type: 'game/acceptLoanOffer', payload: 'oskah' }];
    expect(args).toEqual(expected);
  });
  it('handles pay loan click', async () => {
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
          <LoansPanel />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-pay-loan'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/setCurrentModal', payload: 'loanpayment' },
      { type: 'game/setModalStatus', payload: 'opening' },
      { type: 'game/setModalStatus', payload: 'open' },
    ];
    expect(args).toEqual(expected);
  });
  it('displays warning for expired loans', () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        gameState: {
          ...initialState.gameState,
          loans: [
            {
              location: 'oskah',
              initialAmount: 1200,
              principal: 1000,
              dueDate: 100,
            },
            {
              location: 'tabbith',
              initialAmount: 800,
              principal: 100,
              dueDate: -10,
            },
          ],
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
          <LoansPanel />
        </IntlProvider>
      </Provider>,
    );
    const element = screen.getByTestId('icon-warning');
    expect(element).toBeInTheDocument();
  });
  it('displays the payment modal', () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        currentModal: 'loanpayment',
        modalStatus: 'open',
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
          <LoansPanel />
        </IntlProvider>
      </Provider>,
    );
    const element = screen.getByTestId('modal');
    expect(element).toBeInTheDocument();
  });
});
