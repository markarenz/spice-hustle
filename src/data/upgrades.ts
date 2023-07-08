import { UpgradeData } from 'types';
const upgradesData: UpgradeData = {
  capacity_1: {
    slug: 'capacity_1',
    dependencies: [],
    prices: [
      {
        price: 100,
        locations: ['oskah', 'butre'],
      },
      {
        price: 90,
        locations: ['tabbith'],
      },
    ],
  },

  water_wings: {
    slug: 'water_wings',
    dependencies: ['upgrade__capacity_1'],
    prices: [
      {
        price: 10,
        locations: ['oskah', 'butre', 'tabbith'],
      },
    ],
  },
};

export default upgradesData;
