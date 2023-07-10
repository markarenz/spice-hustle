import { IntlProvider } from 'react-intl';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import messages from 'locales/en-US/copy.json';
import SavedGameModal from 'components/titlePage/SavedGameModal';
import mockGameSavesListStrWealth from '__tests__/__fixtures__/mockGameSavesListStrWealth';

jest.useFakeTimers();

afterEach(() => {
  jest.resetAllMocks();
});

describe('SavedGameModal', () => {
  it('renders component and handles load click', async () => {
    Storage.prototype.getItem = jest
      .fn()
      .mockReturnValue(JSON.stringify(mockGameSavesListStrWealth));
    render(
      <Provider store={store}>
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <SavedGameModal />
        </IntlProvider>
      </Provider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-load-1686430723693'));
    });
    expect(await screen.findByTestId('modal')).toBeInTheDocument();
  });
});
