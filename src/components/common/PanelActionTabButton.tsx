import { FormattedMessage } from 'react-intl';
import { useGameSliceSelector, useGameSliceDispatch } from 'store/reduxHooks';
import { setSubPanelStatus } from 'store/gameSlice';

type Props = {
  slug: string;
};
const PanelActionTabButton: React.FC<Props> = ({ slug }) => {
  const dispatch = useGameSliceDispatch();
  const { subPanelStatus } = useGameSliceSelector((state) => state.game);
  const handleClick = () => {
    dispatch(setSubPanelStatus(slug));
  };
  const isActive = subPanelStatus === slug;
  return (
    <button
      data-testid={`market-tab-btn-${slug}`}
      className={`relative p-4 w-full uppercase font-bold group ${
        isActive ? 'pointer-events-none' : ''
      }`}
      onClick={handleClick}
    >
      <div
        className="absolute w-full left-0 transition-all duration-150 bg-gradient-to-b from-orange-500 to-orange-900 opacity-50 h-0 top-[100%] group-hover:top-0 group-hover:h-full"
        aria-hidden="true"
      />
      <div
        data-testid="market-tab-btn-label-wrap"
        className={`absolute w-full left-0 bottom-0 transition-all duration-150 w-full bg-gray-900 ${
          isActive ? 'h-full' : 'h-0'
        }`}
        aria-hidden="true"
      />

      <span
        className={`relative transition-colors duration-150 ${
          subPanelStatus === slug ? 'text-gray-200' : 'text-gray-800'
        }`}
      >
        <FormattedMessage id={`subpanel_tab__${slug}`} />
      </span>
    </button>
  );
};

export default PanelActionTabButton;
