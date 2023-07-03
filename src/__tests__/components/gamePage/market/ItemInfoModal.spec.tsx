import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from 'locales/en-US/copy.json';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { GameSliceState, AppStatuses } from 'types';
import initGameState from 'data/initGameState';
import ItemInfoModal from 'components/gamePage/market/ItemInfoModal';

const initialState: GameSliceState = {
  appStatus: AppStatuses.Game,
  modalStatus: 'open',
  gameState: {
    ...initGameState,
  },
  marketStatus: 'buy',
  currentModal: 'info',
  gamePanel: 'market',
};

describe('ItemInfoModal', () => {
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

    render(
      <Provider store={mockStore}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <ItemInfoModal itemId="apple" />
        </IntlProvider>
      </Provider>,
    );
    const element = screen.getByText('Apple');
    expect(element).toBeInTheDocument();
  });
});
