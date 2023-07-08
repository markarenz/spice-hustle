import { IntlProvider } from 'react-intl';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { initState } from 'store/gameSlice';
import messages from 'locales/en-US/copy.json';
import TitlePage from 'components/titlePage/TitlePage';

const spy = jest.spyOn(store, 'dispatch');

jest.useFakeTimers();
beforeEach(() => {
  store.dispatch(initState());
});

describe('TitlePage', () => {
  it('renders component', async () => {
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <TitlePage />
        </IntlProvider>
      </Provider>,
    );
    let element = null;
    await waitFor(async () => {
      element = screen.getByTestId('title-page');
    });
    expect(element).toBeInTheDocument();
  });
  it('handles start button click', async () => {
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <TitlePage />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-start-new'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/initState', payload: undefined },
      { type: 'game/startNewGame', payload: undefined },
    ];
    expect(args).toEqual(expected);
  });

  it('handles load button click', async () => {
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <TitlePage />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-load-save'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [
      { type: 'game/initState', payload: undefined },
      { type: 'game/setModalStatus', payload: 'opening' },
      { type: 'game/setModalStatus', payload: 'open' },
    ];
    expect(args).toEqual(expected);
  });
});
