import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { AppStatuses, GameSliceState } from 'types';
import { getLocalPrices } from 'utils/utils';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import initGameState from 'data/initGameState';
import QtyModal from 'components/gamePage/market/QtyModal';

jest.useFakeTimers();

const prices = getLocalPrices(initGameState.location, 1);
const mockData = {
  action: 'buy',
  selectedItem: prices.apple,
  handleConfirm: jest.fn(),
  handleQtyClose: jest.fn(),
};

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'open',
  gameState: {
    ...initGameState,
    prices,
    capacity: { used: { weight: 0, volume: 0 }, max: { weight: 10, volume: 10 } },
  },
  marketStatus: 'buy',
  currentModal: 'qty',
  gamePanel: 'market',
};
describe('BuySubPanel', () => {
  it('renders component: buy', async () => {
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
    act(() => {
      render(
        <Provider store={mockStore}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <QtyModal {...mockData} />
          </IntlProvider>
        </Provider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('qty-input');
    expect(element).toBeInTheDocument();
  });

  it('renders component: buy', async () => {
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
    act(() => {
      render(
        <Provider store={mockStore}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <QtyModal {...mockData} />
          </IntlProvider>
        </Provider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('explainer-buy');
    expect(element).toBeInTheDocument();
  });

  it('renders component: sell', async () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: {
        ...initialState,
        marketStatus: 'sell',
      },
      reducers: {},
    });
    const mockStore = configureStore({
      reducer: {
        game: mockGameSlice.reducer,
      },
    });
    act(() => {
      render(
        <Provider store={mockStore}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <QtyModal {...mockData} action="sell" />
          </IntlProvider>
        </Provider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('explainer-sell');
    expect(element).toBeInTheDocument();
  });

  it('handles input change', async () => {
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
    act(() => {
      render(
        <Provider store={mockStore}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <QtyModal {...mockData} />
          </IntlProvider>
        </Provider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.change(screen.getByTestId('qty-input'), { target: { value: '1' } });
    });
    const element = screen.getByTestId('qty-input');
    expect(element.getAttribute('value')).toBe('1');
  });

  it('handles input change: Negative', async () => {
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
    act(() => {
      render(
        <Provider store={mockStore}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <QtyModal {...mockData} />
          </IntlProvider>
        </Provider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.change(screen.getByTestId('qty-input'), { target: { value: '-1' } });
    });
    const element = screen.getByTestId('qty-input');
    expect(element.getAttribute('value')).toBe('1');
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('qty-modal-btn-ok'));
    });
  });

  it('handles input change: Max', async () => {
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
    act(() => {
      render(
        <Provider store={mockStore}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <QtyModal {...mockData} />
          </IntlProvider>
        </Provider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.change(screen.getByTestId('qty-input'), { target: { value: '9' } });
    });
    const element = screen.getByTestId('qty-input');
    expect(element.getAttribute('value')).toBe('5');
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
    act(() => {
      render(
        <Provider store={mockStore}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <QtyModal {...mockData} />
          </IntlProvider>
        </Provider>,
      );
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
    expect(mockData.handleConfirm).toHaveBeenCalledWith(5);
  });

  it('handles invalid selecteItem', async () => {
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
    act(() => {
      render(
        <Provider store={mockStore}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <QtyModal {...mockData} selectedItem={{}} />
          </IntlProvider>
        </Provider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.queryByTestId('qty-input');
    expect(element).not.toBeInTheDocument();
  });
});
