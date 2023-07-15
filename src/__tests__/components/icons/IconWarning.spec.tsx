import { render, screen } from '@testing-library/react';
import IconWarning from 'components/icons/IconWarning';

describe('IconWarning', () => {
  it('renders component', () => {
    render(<IconWarning />);
    const element = screen.getByTestId('icon-warning');
    expect(element).toBeInTheDocument();
  });
});
