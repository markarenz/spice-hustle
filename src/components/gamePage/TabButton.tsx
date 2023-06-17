import { useIntl } from 'react-intl';
import { useGameSliceDispatch } from 'store/reduxHooks';
import { setGamePanel } from 'store/gameSlice';
type Props = {
  slug: string;
  isActive: boolean;
};
const TabButton: React.FC<Props> = ({ slug, isActive }) => {
  const dispatch = useGameSliceDispatch();
  const { formatMessage } = useIntl();
  const slugLowerCase = slug.toLowerCase();
  const title = formatMessage({ id: `game_tabs__${slugLowerCase}_title` });
  const label = formatMessage({ id: `game_tabs__${slugLowerCase}_label` });
  const handleTabClick = () => {
    dispatch(setGamePanel(slugLowerCase));
  };
  return (
    <button className="py-4 w-full relative group" title={title} onClick={handleTabClick}>
      <div
        aria-hidden="true"
        className="absolute top-0 left-[50%] group-hover:left-0 w-0 group-hover:w-full h-full bg-orange-700 transition-all duration-150 shadow-[inset_0_0_20px_5px_rgba(249,115,22,1.0)]"
      />
      <div
        aria-hidden="true"
        className={`absolute bottom-0 h-2 bg-orange-500 transition-all duration-150 ${
          isActive ? 'left-0 w-full' : 'left-[50%] w-0'
        }`}
      />
      <span
        className={`relative text-[0.8rem] lg:text-lg text-gray-200 drop-shadow-[1px_1px_2px_rgba(0,0,0,.9)] uppercase font-bold transition-colors duration-300 ${
          isActive ? 'text-orange-300' : 'text-gray-300'
        } group-hover:text-orange-100`}
      >
        {label}
      </span>
    </button>
  );
};

export default TabButton;
