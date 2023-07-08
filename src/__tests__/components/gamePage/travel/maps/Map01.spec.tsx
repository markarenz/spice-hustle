import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import Map01 from 'components/gamePage/travel/maps/Map01';

jest.useFakeTimers();

const mockProps = {
  location: 'oskah',
  availableLocations: ['tabbith'],
  handleLocationSelect: jest.fn(),
};
describe('Map01', () => {
  it('renders component: oskah', () => {
    render(<Map01 {...mockProps} />);
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('marker-oskah');
    expect(element).toBeInTheDocument();
  });

  it('renders component: butre', () => {
    render(<Map01 {...mockProps} location={'butre'} />);
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('marker-butre');
    expect(element).toBeInTheDocument();
  });

  it('renders component: tabbith', () => {
    render(<Map01 {...mockProps} location={'tabbith'} availableLocations={['oskah', 'butre']} />);
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('marker-tabbith');
    expect(element).toBeInTheDocument();
  });

  it('handles location click', async () => {
    render(<Map01 {...mockProps} />);
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('btn-tabbith'));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(mockProps.handleLocationSelect).toHaveBeenCalled();
  });
});
