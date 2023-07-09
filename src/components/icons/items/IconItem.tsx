import IconItemApple from './IconItemApple';
import IconItemPotat from './IconItemPotat';

type Props = {
  type: string;
};
const IconItem: React.FC<Props> = ({ type }) => {
  switch (type) {
    case 'apple':
      return <IconItemApple />;
    case 'potat':
    default:
      return <IconItemPotat />;
  }
};

export default IconItem;
