import DieOneDSix from 'components/gamePage/travel/DieOneDSix';
import { render, screen, act } from '@testing-library/react';

jest.useFakeTimers();
describe('DieOneDSix', () => {
  const values = [1, 2, 3, 4, 5, 6];
  values.forEach((value) => {
    it(`renders die value ${value}`, () => {
      const idx = value % 2;
      act(() => {
        render(<DieOneDSix value={value} idx={idx} />);
      });
      act(() => {
        jest.advanceTimersByTime(550);
      });
      const element = screen.getByTestId(`die1d6-${idx}`);
      expect(element).toBeInTheDocument();
    });
  });
});
