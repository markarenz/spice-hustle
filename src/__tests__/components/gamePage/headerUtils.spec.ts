import { Locations } from 'types';
import { getBgImg } from 'components/gamePage/headerUtils';

describe('getBgImg', () => {
  it('returns an image src value', () => {
    // The file naming convention is based on the index # of the location
    const locations = Object.values(Locations);
    locations.forEach((location, idx) => {
      const result = getBgImg(location);
      expect(result[0].includes(`${idx + 1}`) && result[1].includes(`${idx + 1}`)).toBe(true);
    });
  });
});
