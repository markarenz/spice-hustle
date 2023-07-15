import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import CurrencyDisplay from 'components/common/CurrencyDisplay';

describe('Button', () => {
  it('renders component', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <CurrencyDisplay value={1000} />
      </IntlProvider>,
    );
    // thousands commas
    const element = screen.getByTestId('currency-display');
    expect(element.textContent?.includes(',')).toBe(true);
  });

  it('renders component - negative value', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <CurrencyDisplay value={-100} />
      </IntlProvider>,
    );
    const element = screen.getByTestId('currency-display');
    expect(element.textContent?.includes('-')).toBe(true);
  });
});
