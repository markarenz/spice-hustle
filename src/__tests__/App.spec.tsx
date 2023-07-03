import { IntlProvider } from 'react-intl';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { initState } from 'store/gameSlice';
import messages from 'locales/en-US/copy.json';
import App from '../App';
import mockGameSavesList from '__tests__/__fixtures__/mockGameSavesList';

jest.useFakeTimers();
beforeEach(() => {
  store.dispatch(initState());
});

describe('App', () => {
  it('renders component', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <App />
          </IntlProvider>
        </Provider>,
      );
    });
    let element = null;
    await waitFor(async () => {
      element = screen.getByTestId('app');
    });
    expect(element).toBeInTheDocument();
  });
  it('opens the game panel when the start new game button is clicked', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <App />
          </IntlProvider>
        </Provider>,
      );
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-start-new'));
    });
    expect(await screen.findByTestId('game')).toBeInTheDocument();
  });
  it('opens modal when load save button clicked', async () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(mockGameSavesList));
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <App />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-load-save'));
    });
    expect(await screen.findByTestId('modal')).toBeInTheDocument();
  });
});
