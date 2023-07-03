import ImgLoc1 from 'img/locations/city1.jpg';
import ImgLoc1BG from 'img/locations/city1-1.jpg';
import ImgLoc2 from 'img/locations/city2.jpg';
import ImgLoc2BG from 'img/locations/city2-1.jpg';
import ImgLoc3 from 'img/locations/city3.jpg';
import ImgLoc3BG from 'img/locations/city3-1.jpg';
import ImgLoc4 from 'img/locations/city4.jpg';
import ImgLoc4BG from 'img/locations/city4-1.jpg';
import ImgLoc5 from 'img/locations/city5.jpg';
import ImgLoc5BG from 'img/locations/city5-1.jpg';
import ImgLoc6 from 'img/locations/city6.jpg';
import ImgLoc6BG from 'img/locations/city6-1.jpg';
import ImgLoc7 from 'img/locations/city7.jpg';
import ImgLoc7BG from 'img/locations/city7-1.jpg';

export const getBgImg = (location: string) => {
  switch (location) {
    case 'tigi':
      return [ImgLoc7, ImgLoc7BG];
    case 'winnie':
      return [ImgLoc6, ImgLoc6BG];
    case 'clionne':
      return [ImgLoc5, ImgLoc5BG];
    case 'luci':
      return [ImgLoc4, ImgLoc4BG];
    case 'butre':
      return [ImgLoc3, ImgLoc3BG];
    case 'tabbith':
      return [ImgLoc2, ImgLoc2BG];
    case 'oskah':
    default:
      return [ImgLoc1, ImgLoc1BG];
  }
};
