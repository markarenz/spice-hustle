import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { AppStatuses } from 'types';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, act } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import initGameState from 'data/initGameState';
import { GameSliceState } from 'types';
import GamePage from 'components/gamePage/GamePage';

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: initGameState,
  marketStatus: 'buy',
  currentModal: '',
  gamePanel: 'market',
};

jest.useFakeTimers();

describe('GamePage', () => {
  it('renders component', () => {
    const mockGameSlice = createSlice({
      name: 'game',
      initialState: initialState,
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
          <GamePage />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('game');
    expect(element).toBeInTheDocument();
  });
});
