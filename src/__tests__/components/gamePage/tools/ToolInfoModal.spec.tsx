import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { AppStatuses, GameSliceState } from 'types';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import initGameState from 'data/initGameState';
import ToolInfoModal from 'components/gamePage/tools/ToolInfoModal';

jest.useFakeTimers();

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  modalStatus: 'closed',
  gameState: {
    ...initGameState,
  },
  marketStatus: 'buy',
  currentModal: '',
  gamePanel: 'market',
};

describe('ToolInfoModal', () => {
  it('renders component', () => {
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
    const mockProps = {
      selectedItemId: 'capacity_1',
      closeInfoModal: jest.fn(),
    };
    render(
      <Provider store={mockStore}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ToolInfoModal {...mockProps} />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const mktPanel = screen.getByTestId('modal');
    expect(mktPanel).toBeInTheDocument();
  });

  it('handles close button', async () => {
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
    const mockProps = {
      selectedItemId: 'capacity_1',
      closeInfoModal: jest.fn(),
    };
    render(
      <Provider store={mockStore}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ToolInfoModal {...mockProps} />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-tools-info-close'));
    });
    const mktPanel = screen.getByTestId('modal');
    expect(mktPanel).toBeInTheDocument();
  });
});
