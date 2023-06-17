import { FormattedMessage } from 'react-intl';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import { setMarketStatus } from 'store/gameSlice';

type Props = {
  slug: string;
};
const MarketActionTabButton: React.FC<Props> = ({ slug }) => {
  const dispatch = useGameSliceDispatch();
  const { marketStatus } = useGameSliceSelector((state) => state.game);
  const handleClick = () => {
    dispatch(setMarketStatus(slug));
  };
  return (
    <button className="relative p-4 w-full uppercase font-bold group" onClick={handleClick}>
      <div
        className="absolute w-full left-0 transition-all duration-150 bg-gradient-to-b from-orange-500 to-orange-900 opacity-50 h-0 top-[100%] group-hover:top-0 group-hover:h-full"
        aria-hidden="true"
      />
      <div
        className={`absolute w-full left-0 bottom-0 transition-all duration-150 w-full bg-gray-900 ${
          marketStatus === slug ? 'h-full' : 'h-0'
        }`}
        aria-hidden="true"
      />

      <span
        className={`relative transition-colors duration-150 ${
          marketStatus === slug ? 'text-gray-200' : 'text-gray-800'
        }`}
      >
        <FormattedMessage id={`market__${slug}_btn_label`} />
      </span>
    </button>
  );
};

export default MarketActionTabButton;
