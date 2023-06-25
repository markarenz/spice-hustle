import { IntlProvider } from 'react-intl';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import messages from 'locales/en-US/copy.json';
import TitlePage from 'components/titlePage/TitlePage';

describe('TitlePage', () => {
  it('renders component', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <TitlePage />
          </IntlProvider>
        </Provider>,
      );
    });
    let element = null;
    await waitFor(async () => {
      element = screen.getByTestId('title-page');
    });

    expect(element).toBeInTheDocument();
  });
});
