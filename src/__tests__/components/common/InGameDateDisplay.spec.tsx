import { IntlProvider } from 'react-intl';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import InGameDateDisplay from 'components/common/InGameDateDisplay';

describe('InGameDateDisplay', () => {
  it('renders in-game date with data provided turn 0', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <InGameDateDisplay numTurns={0} />
        </IntlProvider>,
      );
    });
    const element = screen.getByTestId('in-game-date-display');
    expect(element.textContent).toEqual('1st of Winter, Year 1');
  });

  it('renders in-game date with data provided turn 70', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <InGameDateDisplay numTurns={70} />
        </IntlProvider>,
      );
    });
    const element = screen.getByTestId('in-game-date-display');
    expect(element.textContent).toEqual('11th of Summer, Year 1');
  });

  it('renders in-game date with data provided turn 121', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <InGameDateDisplay numTurns={121} />
        </IntlProvider>,
      );
    });
    const element = screen.getByTestId('in-game-date-display');
    expect(element.textContent).toEqual('2nd of Winter, Year 2');
  });

  it('renders in-game date with data provided turn 400', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <InGameDateDisplay numTurns={412} />
        </IntlProvider>,
      );
    });
    const element = screen.getByTestId('in-game-date-display');
    expect(element.textContent).toEqual('23rd of Spring, Year 4');
  });
});
