import { render, screen } from '@testing-library/react';
import IconItem from 'components/icons/items/IconItem';

describe('IconItem', () => {
  const items = ['apple', 'potat'];
  items.forEach((item) => {
    it('renders icon', () => {
      render(<IconItem type={item} />);
      expect(screen.getByTestId(item)).toBeInTheDocument();
    });
  });
});
