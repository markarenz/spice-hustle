import { Locations } from 'types';
import { Slices, relocate } from 'store/gameSlice';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';

const TravelPanel = () => {
  const { gameState } = useGameSliceSelector((state: Slices) => state.game);
  const { location } = gameState;
  const dispatch = useGameSliceDispatch();
  const handleLocationChange = (location: string) => {
    dispatch(relocate(location));
  };
  return (
    <div data-testid="travel-panel">
      <div className="container mx-auto">
        <div className="p-4">
          <h2>TRAVEL PANEL</h2>

          {Object.keys(Locations).map((locationOption) => (
            <div key={locationOption}>
              <button onClick={() => handleLocationChange(locationOption.toLowerCase())}>
                <span
                  className={`text-xl ${
                    location === locationOption.toLowerCase() ? 'font-bold' : 'font-normal'
                  }`}
                >
                  {locationOption}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelPanel;
