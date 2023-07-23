import IconItemApple from './IconItemApple';
import IconItemPotat from './IconItemPotat';
import IconDummy from 'components/icons/IconDummy';

type Props = {
  type: string;
};
const IconItem: React.FC<Props> = ({ type }) => {
  switch (type) {
    case 'apple':
      return <IconItemApple />;
    case 'potat':
      return <IconItemPotat />;
    default:
      return <IconDummy />;
  }
};

export default IconItem;
