import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { AppStatuses, GameSliceState } from 'types';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import initGameState from 'data/initGameState';
import GuildPanel from 'components/gamePage/guild/GuildPanel';

jest.useFakeTimers();

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: {
    ...initGameState,
    cash: 10000,
    flags: {
      guild__tabbith: true,
    },
  },
  subPanelStatus: 'buy',
  currentModal: '',
  gamePanel: 'market',
};
describe('GuildPanel', () => {
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
          <GuildPanel />
        </IntlProvider>
      </Provider>,
    );
    const element = screen.getByTestId('guild-panel');
    expect(element).toBeInTheDocument();
  });

  it('renders component with exclusive upgrade', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        gameState: {
          ...initialState.gameState,
          location: 'butre',
          flags: {},
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
          <GuildPanel />
        </IntlProvider>
      </Provider>,
    );
    const element = screen.getByTestId('guild-exclusive-upgrades');
    expect(element.childNodes.length).toEqual(1);
  });

  it('renders component with no exclusive items', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        gameState: {
          ...initialState.gameState,
          location: 'luci',
          flags: {},
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
          <GuildPanel />
        </IntlProvider>
      </Provider>,
    );
    const element = screen.getByTestId('guild-exclusive-items');
    expect(element.childNodes.length).toEqual(3);
  });

  it('handles guild purchase', async () => {
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
          <GuildPanel />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('guild-purchase-btn'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected: any = [{ type: 'game/purchaseGuildMembership', payload: 'oskah' }];
    expect(args).toEqual(expected);
  });
});
