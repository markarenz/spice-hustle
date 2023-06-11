import { IntlProvider } from 'react-intl';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import messages from 'locales/en-US/copy.json';
import SavedGameModal from 'components/titlePage/SavedGameModal';
import mockGameSavesList from '__tests__/__fixtures__/mockGameSavesList';

jest.useFakeTimers();
const mockProps = {
  handleToggleModal: jest.fn(),
};
describe('SavedGameModal', () => {
  it('renders component and handles delete click', async () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(mockGameSavesList));
    act(() => {
      render(
        <Provider store={store}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <SavedGameModal {...mockProps} />
          </IntlProvider>
        </Provider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-delete-1686430723693'));
    });
    expect(await screen.findByTestId('modal')).toBeInTheDocument();
  });
});
