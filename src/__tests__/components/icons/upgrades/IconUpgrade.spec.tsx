import { render, screen } from '@testing-library/react';
import IconUpgrade from 'components/icons/upgrades/IconUgrade';
describe('IconUpgrade', () => {
  const items = [
    'capacity_0',
    'capacity_1',
    'capacity_2',
    'capacity_3',
    'counterDanger__bandits',
    'counterDanger__flood',
    'counterDanger__rockSlide',
    'counterDanger__tricksters',
    'counterDanger__wolves',
  ];
  items.forEach((item) => {
    it('renders icon', () => {
      render(<IconUpgrade type={item} />);
      expect(screen.getByTestId(item)).toBeInTheDocument();
    });
  });
});
