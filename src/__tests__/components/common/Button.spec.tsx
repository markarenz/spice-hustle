import { IntlProvider } from 'react-intl';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import Button from 'components/common/Button';

const mockProps = {
  onClick: jest.fn(),
  labelKey: 'title_page__btn_start_new',
  testId: 'test-testid',
  variant: 'primary',
};
const mockPropsNoTestId = {
  onClick: jest.fn(),
  labelKey: 'title_page__btn_start_new',
  variant: 'primary',
};

describe('Button', () => {
  it('renders component', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Button {...mockProps} />
      </IntlProvider>,
    );
    const element = screen.getByTestId('test-testid');
    expect(element).toBeInTheDocument();
  });
  it('calls click handler on click', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Button {...mockProps} />
      </IntlProvider>,
    );
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('test-testid'));
    });
    expect(mockProps.onClick).toHaveBeenCalled();
  });

  it('uses labelKey for testId when none is provided', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Button {...mockPropsNoTestId} />
      </IntlProvider>,
    );
    const element = screen.getByTestId(mockProps.labelKey);
    expect(element).toBeInTheDocument();
  });

  it('renders component - secondary', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Button {...mockProps} variant="secondary" />
      </IntlProvider>,
    );
    const element = screen.getByTestId('test-testid');
    // bg-transparent is a class for secondary variant only
    expect(element.className.includes('bg-transparent')).toBe(true);
  });

  it('includes the labelValue if one is provided', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Button {...mockProps} labelKey="max" labelValue={12} />
      </IntlProvider>,
    );
    const element = screen.getByTestId('btn-label');
    expect(element.textContent).toEqual('Max: 12');
  });

  it('renders component while disabled (loan not paid)', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <Button {...mockProps} disabled />
      </IntlProvider>,
    );
    const element = screen.getByTestId('test-testid');
    expect(element.className.includes('bg-gray-400')).toBe(true);
  });
});
