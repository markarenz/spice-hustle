import { IntlProvider } from 'react-intl';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import AboutPage from 'components/aboutPage/AboutPage';
import { Provider } from 'react-redux';
import { store } from 'store/store';

describe('AboutPage', () => {
  it('renders component', () => {
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <AboutPage />
        </IntlProvider>
      </Provider>,
    );
    const elements = screen.getAllByRole('heading');
    expect(elements.length).toBe(6);
  });

  it('dispatches a return to the title page when close button is clicked', async () => {
    const spy = jest.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <AboutPage />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-close'));
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [{ type: 'game/setAppStatus', payload: 'startPage' }];
    expect(args).toEqual(expected);
  });
});
