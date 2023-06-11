import { IntlProvider } from 'react-intl';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import messages from 'locales/en-US/copy.json';
import Modal from 'components/common/Modal';

jest.useFakeTimers();
const mockProps = {
  titleKey: 'title_page__saved_game_modal__title',
  handleClose: jest.fn(),
};

describe('Modal', () => {
  it('renders component', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <Modal {...mockProps}>
            <div>Content goes here</div>
          </Modal>
        </IntlProvider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('modal');
    expect(element).toBeInTheDocument();
  });
  it('calls handleClose when close button clicked', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <Modal {...mockProps}>
            <div>Content goes here</div>
          </Modal>
        </IntlProvider>,
      );
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-close'));
    });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(mockProps.handleClose).toHaveBeenCalled();
  });

  it('calls handleClose when BG clicked', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <Modal {...mockProps}>
            <div>Content goes here</div>
          </Modal>
        </IntlProvider>,
      );
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('modal-bg-btn'));
    });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(mockProps.handleClose).toHaveBeenCalled();
  });
});
