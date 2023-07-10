import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CloseButton from 'components/common/CloseButton';

const mockProps = {
  handleClose: jest.fn(),
};

describe('CloseButton', () => {
  it('renders component', () => {
    render(<CloseButton {...mockProps} />);
    const element = screen.getByTestId('btn-close');
    expect(element).toBeInTheDocument();
  });
  it('calls close handler on click', async () => {
    render(<CloseButton {...mockProps} />);
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-close'));
    });
    expect(mockProps.handleClose).toHaveBeenCalled();
  });
});
