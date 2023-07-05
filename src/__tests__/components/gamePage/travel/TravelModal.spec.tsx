import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { Locations, TravelState } from 'types';
import TravelModal from 'components/gamePage/travel/TravelModal';
import mockRoute from '__tests__/__fixtures__/travel/mockRoute';
import mockDanger from '__tests__/__fixtures__/travel/mockDanger';
import { IntlProvider } from 'react-intl';
import messages from 'locales/en-US/copy.json';

jest.useFakeTimers();

const mockTravelState: TravelState = {
  destination: Locations.Oskah,
  routeDays: 2,
  route: mockRoute,
  progress: 0,
  danger: mockDanger,
  dice: {
    encounterCheck1: 0,
    encounterCheck2: 0,
  },
};

const mockTravelStateNoEncounter: TravelState = {
  destination: Locations.Oskah,
  routeDays: 2,
  route: mockRoute,
  progress: 0,
  danger: null,
  dice: {
    encounterCheck1: 0.7,
    encounterCheck2: 0.7,
  },
};

const mockProps = {
  travelState: mockTravelState,
  travelModalStatus: 'open',
  handleTravelContinue: jest.fn(),
  closeModal: jest.fn(),
  titleKey: 'travel__modal__title__oskah',
  travelTransitionStatus: '',
};
describe('TravelModal', () => {
  it('renders component', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <TravelModal {...mockProps} />
        </IntlProvider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('travel-modal');
    expect(element).toBeInTheDocument();
  });
  it('renders component - no encounter', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <TravelModal {...mockProps} travelState={mockTravelStateNoEncounter} />
        </IntlProvider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    const element = screen.getByTestId('travel-modal');
    expect(element).toBeInTheDocument();
  });

  it('triggers close function when background is clicked', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <TravelModal {...mockProps} />
      </IntlProvider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('travel-modal-bg-btn'));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(mockProps.closeModal).toHaveBeenCalled();
  });

  it('triggers close function when cancel is clicked', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <TravelModal {...mockProps} />
      </IntlProvider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('travel-btn-cancel'));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(mockProps.closeModal).toHaveBeenCalled();
  });

  it('calls travelContinue when OK is clicked', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <TravelModal {...mockProps} />
      </IntlProvider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('travel-btn-ok'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    expect(mockProps.handleTravelContinue).toHaveBeenCalled();
  });

  it('calls travelContinue when OK is clicked', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <TravelModal {...mockProps} />
      </IntlProvider>,
    );
    act(() => {
      jest.advanceTimersByTime(550);
    });
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('travel-btn-ok'));
    });
    act(() => {
      jest.advanceTimersByTime(550);
    });
    expect(mockProps.handleTravelContinue).toHaveBeenCalled();
  });

  it('renders component - closing', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <TravelModal {...mockProps} travelTransitionStatus="closing" />
        </IntlProvider>,
      );
    });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    const element = screen.getByTestId('travel-modal-card-wrap');
    expect(element.className.includes('opacity-0')).toBe(true);
  });
});
