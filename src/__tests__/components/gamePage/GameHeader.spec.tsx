import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { initState } from 'store/gameSlice';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import { AppStatuses, GameSliceState } from 'types';
import initGameState from 'data/initGameState';
import GameHeader from 'components/gamePage/GameHeader';

jest.useFakeTimers();
beforeEach(() => {
  store.dispatch(initState());
});

describe('GameHeader', () => {
  it('renders component', () => {
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <GameHeader />
        </IntlProvider>
      </Provider>,
    );
    const element = screen.getByTestId('game-header');
    expect(element).toBeInTheDocument();
  });

  it('opens modal when info button is clicked', async () => {
    const spy = jest.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <GameHeader />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('location-info-btn'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/setCurrentModal', payload: 'location' },
      { type: 'game/setModalStatus', payload: 'opening' },
      { type: 'game/setModalStatus', payload: 'open' },
    ];
    expect(args).toEqual(expected);
  });

  it('opens closes game when close button is clicked', async () => {
    const spy = jest.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <GameHeader />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      const buttons = screen.getAllByTestId('btn-close');
      fireEvent.click(buttons[0]);
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/initState', payload: undefined },
      { type: 'game/closeGame', payload: undefined },
    ];
    expect(args).toEqual(expected);
  });
  it('displays warning when a local loan has expired', () => {
    const initialState: GameSliceState = {
      appStatus: AppStatuses.StartPage,
      modalStatus: 'closed',
      gameState: {
        ...initGameState,
        numTurns: 50,
        loans: [
          {
            location: 'oskah',
            initialAmount: 1200,
            principal: 1000,
            dueDate: 10,
          },
        ],
      },
      subPanelStatus: 'buy',
      currentModal: '',
      gamePanel: 'market',
    };
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
          <GameHeader />
        </IntlProvider>
      </Provider>,
    );
    const element = screen.getByTestId('loan-expiration-warning-message');
    expect(element).toBeInTheDocument();
  });
});
