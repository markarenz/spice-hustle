import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { AppStatuses } from 'types';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import Modal from 'components/common/Modal';
import initGameState from 'data/initGameState';
import { GameSliceState } from 'types';

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: initGameState,
  marketStatus: 'buy',
  currentModal: '',
  gamePanel: 'market',
};

jest.useFakeTimers();
const mockProps = {
  titleKey: 'title_page__saved_game_modal__title',
};

describe('Modal', () => {
  it('renders component: closed', async () => {
    act(() => {
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
            <Modal {...mockProps}>
              <div>Content goes here</div>
            </Modal>
          </IntlProvider>
        </Provider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('modal');
    expect(element).toBeInTheDocument();
  });

  it('renders component: open & click close', async () => {
    // In this test, we are using a mock store to inject our own version of initialState
    act(() => {
      const mockGameSlice = createSlice({
        name: 'game',
        initialState: { ...initialState, modalStatus: 'open' },
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
            <Modal {...mockProps}>
              <div>Content goes here</div>
            </Modal>
          </IntlProvider>
        </Provider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('modal-bg-btn'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('modal');
    expect(element).toBeInTheDocument();
  });
});
