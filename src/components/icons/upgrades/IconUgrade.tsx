import IconUpgradeCapacity0 from './IconUpgradeCapacity0';
import IconUpgradeCapacity1 from './IconUpgradeCapacity1';
import IconUpgradeCapacity2 from './IconUpgradeCapacity2';
import IconUpgradeCapacity3 from './IconUpgradeCapacity3';
import IconUpgradeCapacity4 from './IconUpgradeCapacity4';
import IconUpgradeCounterDangerBandits from './IconUpgradeCounterDangerBandits.tsx';
import IconUpgradeCounterDangerFlood from './IconUpgradeCounterDangerFlood';
import IconUpgradeCounterDangerRockSlide from './IconUpgradeCounterDangerRockSlide';
import IconUpgradeCounterDangerTricksters from './IconUpgradeCounterDangerTricksters';
import IconUpgradeCounterDangerWolves from './IconUpgradeCounterDangerWolves';
import IconUpgradeMap1 from './IconUpgradeMap1';
import IconUpgradeMap2 from './IconUpgradeMap2';
import IconDummy from 'components/icons/IconDummy';

type Props = {
  type: string;
};
const IconUpgrade: React.FC<Props> = ({ type }) => {
  switch (type) {
    case 'capacity_0':
      return <IconUpgradeCapacity0 />;
    case 'capacity_1':
      return <IconUpgradeCapacity1 />;
    case 'capacity_2':
      return <IconUpgradeCapacity2 />;
    case 'capacity_3':
      return <IconUpgradeCapacity3 />;
    case 'capacity_4':
      return <IconUpgradeCapacity4 />;
    case 'map_1':
      return <IconUpgradeMap1 />;
    case 'map_2':
      return <IconUpgradeMap2 />;
    case 'counterDanger__bandits':
      return <IconUpgradeCounterDangerBandits />;
    case 'counterDanger__flood':
      return <IconUpgradeCounterDangerFlood />;
    case 'counterDanger__rockSlide':
      return <IconUpgradeCounterDangerRockSlide />;
    case 'counterDanger__tricksters':
      return <IconUpgradeCounterDangerTricksters />;
    case 'counterDanger__wolves':
      return <IconUpgradeCounterDangerWolves />;
    default:
      return <IconDummy />;
  }
};

export default IconUpgrade;
