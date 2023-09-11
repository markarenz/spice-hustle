import IconDanger from 'components/icons/dangers/IconDanger';
import { RouteDanger } from 'types';

type Props = {
  dangerIcons: RouteDanger[];
  mapVersion: number;
};
const MapDangers: React.FC<Props> = ({ dangerIcons, mapVersion }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {dangerIcons.map((icon, idx) => (
        <div
          key={`dangerIcon-${idx}`}
          className="w-[3.5%] absolute rounded-full bg-gray-200/80 p-1"
          style={{
            top: `${icon.positions[mapVersion].y}%`,
            left: `${icon.positions[mapVersion].x}%`,
          }}
        >
          <IconDanger type={icon.type} />
        </div>
      ))}
    </div>
  );
};

export default MapDangers;
