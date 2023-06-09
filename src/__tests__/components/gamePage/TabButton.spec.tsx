import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { GameTabSlugs } from 'types';
import { store } from 'store/store';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import TabButton from 'components/gamePage/TabButton';

jest.useFakeTimers();

const mockProps = {
  slug: GameTabSlugs.Market,
  isActive: true,
};

describe('TabButton', () => {
  it('renders component', () => {
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <TabButton {...mockProps} />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId(`tab-button-${mockProps.slug}`);
    expect(element).toBeInTheDocument();
  });

  it('handles button click', async () => {
    const spy = jest.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <TabButton {...mockProps} />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId(`tab-button-${mockProps.slug}`));
    });
    const args = spy.mock.calls.map((arg) => arg[0]);
    const expected = [{ type: 'game/setGamePanel', payload: 'market' }];
    expect(args).toEqual(expected);
  });
});
