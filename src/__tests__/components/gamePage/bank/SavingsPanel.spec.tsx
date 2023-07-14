import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import initGameState from 'data/initGameState';
import { AppStatuses, GameSliceState } from 'types';
import SavingsPanel from 'components/gamePage/bank/SavingsPanel';

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
    ],
  },
  subPanelStatus: 'savings',
  currentModal: '',
  gamePanel: 'bank',
};
describe('SavingsPanel', () => {
  it('renders the component', () => {
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
          <SavingsPanel />
        </IntlProvider>
      </Provider>,
    );
    expect(screen.getByTestId('savings-panel')).toBeInTheDocument();
  });

  it('handles deposit click', async () => {
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
          <SavingsPanel />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('bank-btn-deposit'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/setCurrentModal', payload: 'deposit' },
      { type: 'game/setModalStatus', payload: 'opening' },
      { type: 'game/setModalStatus', payload: 'open' },
    ];
    expect(args).toEqual(expected);
  });

  it('handles withdraw click', async () => {
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
          <SavingsPanel />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('bank-btn-withdraw'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/setCurrentModal', payload: 'withdrawal' },
      { type: 'game/setModalStatus', payload: 'opening' },
      { type: 'game/setModalStatus', payload: 'open' },
    ];
    expect(args).toEqual(expected);
  });

  it('renders the component, modal open', () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        modalStatus: 'open',
        currentModal: 'deposit',
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
          <SavingsPanel />
        </IntlProvider>
      </Provider>,
    );
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});
