import { DangerTypes } from 'types';
import IconDangerBandits from './IconDangerBandits';
import IconDangerFlood from './IconDangerFlood';
import IconDangerRockSlide from './IconDangerRockSlide';
import IconDangerTricksters from './IconDangerTricksters';
import IconDangerWolves from './IconDangerWolves';

type Props = {
  type: string;
};
const IconDanger: React.FC<Props> = ({ type }) => {
  switch (type) {
    case DangerTypes.Bandits:
      return <IconDangerBandits />;
    case DangerTypes.Flood:
      return <IconDangerFlood />;
    case DangerTypes.RockSlide:
      return <IconDangerRockSlide />;
    case DangerTypes.Tricksters:
      return <IconDangerTricksters />;
    case DangerTypes.Wolves:
    default:
      return <IconDangerWolves />;
  }
};

export default IconDanger;
