import { useState } from 'react';
import { Map, RouteDanger, TravelState } from 'types';
import { FormattedMessage } from 'react-intl';
import { Slices, processTravelDay, relocate } from 'store/gameSlice';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import MapDisplay from './maps/MapDisplay';
import { getRnd1d6 } from 'utils/utils';
import { maps } from 'data/maps';
import TravelModal from './TravelModal';

const TravelPanel = () => {
  const initTravelState: TravelState = {
    destination: '',
    progress: 0,
    routeDays: 0,
    route: null,
    danger: null,
    upgradeUsed: false,
    dice: {
      encounterCheck1: 0,
      encounterCheck2: 0,
    },
  };
  const [travelState, setTravelState] = useState<TravelState>(initTravelState);
  const [travelModalStatus, setTravelModalStatus] = useState('');
  const [travelTransitionStatus, setTravelTransitionStatus] = useState('');
  const { gameState } = useGameSliceSelector((state: Slices) => state.game);
  const isModalOpen = travelModalStatus !== '';
  const { location, mapVersion } = gameState;
  const mapData: Map = maps[mapVersion];
  const availableLocations: string[] = [];
  const dispatch = useGameSliceDispatch();
  mapData.routes.forEach((route) => {
    if (route.locations.map((loc) => `${loc}`).includes(location)) {
      const otherLocation = route.locations.find((loc) => loc !== location);
      availableLocations.push(`${otherLocation}`);
    }
  });
  const openModal = () => {
    setTravelModalStatus('opening');
    setTravelTransitionStatus('opening');
    setTimeout(() => {
      setTravelModalStatus('open');
      setTravelTransitionStatus('');
    }, 510);
  };
  const closeModal = () => {
    setTravelModalStatus('closing');
    setTimeout(() => {
      setTravelModalStatus('');
      setTravelState({ ...initTravelState });
    }, 510);
  };

  const handleTravelTurn = (initTravelState?: TravelState | null) => {
    const tempTravelState: TravelState = initTravelState || travelState;
    const rolls = [getRnd1d6(), getRnd1d6(), getRnd1d6(), getRnd1d6()];
    const perc = (rolls[0] + rolls[1] - 2) / 10;
    let thresh = 0;
    let dangerEncountered: RouteDanger | null = null;
    let upgradeUsed = false;
    const { route, destination, progress, routeDays } = tempTravelState;
    const reversedSections = route?.locations[0] !== location;
    if (route) {
      if (progress >= routeDays) {
        dispatch(relocate(destination));
      } else {
        const routeSectionDangers =
          route.sections[reversedSections ? routeDays - 1 - progress : progress].dangers;
        routeSectionDangers.forEach((danger) => {
          if (!dangerEncountered) {
            thresh += danger.chance;
            if (perc <= thresh) {
              dangerEncountered = danger;
              upgradeUsed = !!gameState.flags[`upgrade__counterDanger__${dangerEncountered.type}`];
            }
          }
        });
        const newTravelState = {
          destination,
          progress: progress + 1,
          route,
          routeDays: route.sections.length,
          danger: dangerEncountered,
          upgradeUsed,
          dice: {
            encounterCheck1: rolls[0],
            encounterCheck2: rolls[1],
          },
        };
        setTravelState(newTravelState);
        dispatch(processTravelDay({ danger: dangerEncountered, upgradeUsed }));
      }
    }
  };
  const handleTravelStart = (destination: string) => {
    const route = mapData.routes.find(
      (item) =>
        item.locations.map((loc) => `${loc}`).includes(location) &&
        item.locations.map((loc) => `${loc}`).includes(destination),
    );
    if (route) {
      const initTravelState = {
        destination,
        progress: 0,
        route,
        routeDays: route.sections.length,
        danger: null,
        upgradeUsed: false,
        dice: {
          encounterCheck1: 0,
          encounterCheck2: 0,
        },
      };
      setTravelState({ ...initTravelState });
      handleTravelTurn(initTravelState);
      openModal();
    }
  };
  const handleTravelContinue = () => {
    if (travelState.progress < travelState.routeDays) {
      setTravelTransitionStatus('closing');
      setTimeout(() => {
        setTravelTransitionStatus('off');
        setTimeout(() => {
          handleTravelTurn();
          setTravelTransitionStatus('opening');
        }, 10);
        setTimeout(() => {
          setTravelTransitionStatus('');
        }, 500);
      }, 500);
    } else {
      handleTravelTurn();
    }
  };
  return (
    <div data-testid="travel-panel">
      <div className="container mx-auto">
        <div className="p-4">
          <div className="text-center italic">
            <FormattedMessage id="travel__explainer" />
          </div>
          <MapDisplay
            mapVersion={gameState.mapVersion}
            location={location}
            availableLocations={availableLocations}
            handleLocationSelect={handleTravelStart}
          />
          <div className="text-right pb-4">
            <FormattedMessage id={`travel__map_version_${mapVersion}`} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TravelModal
          travelState={travelState}
          travelModalStatus={travelModalStatus}
          travelTransitionStatus={travelTransitionStatus}
          handleTravelContinue={handleTravelContinue}
          closeModal={closeModal}
          titleKey={`travel__modal__title__${travelState.destination}`}
        />
      )}
    </div>
  );
};

export default TravelPanel;
