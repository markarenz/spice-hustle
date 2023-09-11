import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import Map03 from 'components/gamePage/travel/maps/Map03';

jest.useFakeTimers();

const mockProps = {
  location: 'oskah',
  availableLocations: ['tabbith', 'luci'],
  handleLocationSelect: jest.fn(),
};

describe('Map03', () => {
  it('renders component: oskah', () => {
    render(<Map03 {...mockProps} />);
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('map-03');
    expect(element).toBeInTheDocument();
  });

  it('renders component: butre', () => {
    render(<Map03 {...mockProps} location={'oskah'} />);
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('marker-oskah');
    expect(element).toBeInTheDocument();
  });

  it('renders component: tabbith', () => {
    render(<Map03 {...mockProps} location={'tabbith'} availableLocations={['oskah', 'butre']} />);
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('marker-tabbith');
    expect(element).toBeInTheDocument();
  });

  it('handles location click', async () => {
    render(<Map03 {...mockProps} />);
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
