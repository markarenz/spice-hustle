import { render, screen } from '@testing-library/react';
import IconItem from 'components/icons/items/IconItem';

describe('IconItem', () => {
  const items = [
    'potat',
    'apple',
    'hotsauce',
    'saltlick',
    'oskahtea',
    'tunic',
    'wool',
    'cinnamon',
    'cozytea',
    'rings',
    'glass',
    'nutmeg',
    'lamp',
    'melange',
    'sporty',
    'ginger',
    'jolt',
    'cinnamonroll',
    'processedwool',
    'silverspoon',
    'rug',
    'pepper',
    'secretspice',
    'fish',
    'brochure',
    'statuette',
    'paperlantern',
    'silkkimono',
    'vase',
  ];
  items.forEach((item) => {
    it('renders icon', () => {
      render(<IconItem type={item} />);
      expect(screen.getByTestId(item)).toBeInTheDocument();
    });
  });
});
