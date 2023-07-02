import { IntlProvider } from 'react-intl';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import Footer from 'components/common/Footer';

describe('Footer', () => {
  it('renders component', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <Footer />
        </IntlProvider>,
      );
    });
    const element = screen.getByTestId('page-footer');
    expect(element).toBeInTheDocument();
  });
});
