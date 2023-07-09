import { render, screen } from '@testing-library/react';
import IconDanger from 'components/icons/dangers/IconDanger';
describe('IconDanger', () => {
  const items = ['bandits', 'flood', 'rockSlide', 'tricksters', 'wolves'];
  items.forEach((item) => {
    it('renders icon', () => {
      render(<IconDanger type={item} />);
      expect(screen.getByTestId(`danger-${item}`)).toBeInTheDocument();
    });
  });
});
