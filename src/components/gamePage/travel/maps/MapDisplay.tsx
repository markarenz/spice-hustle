import Map01 from './Map01';
import Map02 from './Map02';
import Map03 from './Map03';

type Props = {
  mapVersion: number;
  location: string;
  availableLocations: string[];
  handleLocationSelect: (destination: string) => void;
};
const MapDisplay: React.FC<Props> = ({
  mapVersion,
  location,
  availableLocations,
  handleLocationSelect,
}) => {
  switch (mapVersion) {
    case 1:
      return (
        <Map02
          location={location}
          availableLocations={availableLocations}
          handleLocationSelect={handleLocationSelect}
        />
      );
    case 2:
      return (
        <Map03
          location={location}
          availableLocations={availableLocations}
          handleLocationSelect={handleLocationSelect}
        />
      );
    default:
      return (
        <Map01
          location={location}
          availableLocations={availableLocations}
          handleLocationSelect={handleLocationSelect}
        />
      );
  }
};

export default MapDisplay;
