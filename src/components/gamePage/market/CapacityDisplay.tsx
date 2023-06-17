import { FormattedMessage } from 'react-intl';
import { useGameSliceSelector } from 'store/reduxHooks';

const CapacityDisplay = () => {
  const {
    gameState: {
      capacity: { used, max },
    },
  } = useGameSliceSelector((state) => state.game);
  const isOverCapacity = used.volume >= max.volume || used.weight >= max.weight;
  return (
    <span
      className={`text-base ${
        isOverCapacity ? 'text-orange-500 font-bold' : 'text-gray-200 font-normal'
      }`}
    >
      <FormattedMessage
        id="market__capacity"
        values={{
          inventoryWeight: used.weight,
          capacityWeight: max.weight,
          inventoryVolume: used.volume,
          capacityVolume: max.volume,
        }}
      />
    </span>
  );
};

export default CapacityDisplay;
