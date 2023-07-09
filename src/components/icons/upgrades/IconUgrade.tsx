import IconUpgradeCapacity0 from './IconUpgradeCapacity0';
import IconUpgradeCapacity1 from './IconUpgradeCapacity1';
import IconUpgradeCapacity2 from './IconUpgradeCapacity2';
import IconUpgradeCapacity3 from './IconUpgradeCapacity3';
import IconUpgradeCounterDangerBandits from './IconUpgradeCounterDangerBandits.tsx';
import IconUpgradeCounterDangerFlood from './IconUpgradeCounterDangerFlood';
import IconUpgradeCounterDangerRockSlide from './IconUpgradeCounterDangerRockSlide';
import IconUpgradeCounterDangerTricksters from './IconUpgradeCounterDangerTricksters';
import IconUpgradeCounterDangerWolves from './IconUpgradeCounterDangerWolves';

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
    case 'counterDanger__bandits':
      return <IconUpgradeCounterDangerBandits />;
    case 'counterDanger__flood':
      return <IconUpgradeCounterDangerFlood />;
    case 'counterDanger__rockSlide':
      return <IconUpgradeCounterDangerRockSlide />;
    case 'counterDanger__tricksters':
      return <IconUpgradeCounterDangerTricksters />;
    case 'counterDanger__wolves':
    default:
      return <IconUpgradeCounterDangerWolves />;
  }
};

export default IconUpgrade;
