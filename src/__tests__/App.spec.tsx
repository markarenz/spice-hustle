import { IntlProvider } from 'react-intl';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <App />
        </IntlProvider>
      </Provider>,
    );
    let element = null;
    await waitFor(async () => {
      element = screen.getByTestId('app');
    });
    expect(element).toBeInTheDocument();
  });
  it('opens the game panel when the start new game button is clicked', async () => {
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <App />
        </IntlProvider>
      </Provider>,
    );
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

  it('opens about page when load about button clicked', async () => {
    const spy = jest.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <App />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-how-to-play'));
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      {
        type: 'game/setAppStatus',
        payload: 'aboutPage',
      },
    ];
    expect(args).toEqual(expected);
  });
});
