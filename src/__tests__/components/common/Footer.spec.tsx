import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import Footer from 'components/common/Footer';

describe('Footer', () => {
  it('renders component', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Footer />
      </IntlProvider>,
    );
    const element = screen.getByTestId('page-footer');
    expect(element).toBeInTheDocument();
  });
});
