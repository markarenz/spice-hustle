import { UpgradeData } from 'types';
const upgradesData: UpgradeData = {
  capacity_1: {
    slug: 'capacity_1',
    dependencies: [],
    prices: [
      {
        price: 100,
        locations: ['oskah', 'tabbith'],
        guildOnly: false,
      },
      {
        price: 80,
        locations: ['butre'],
        guildOnly: true,
      },
    ],
  },

  water_wings: {
    slug: 'counterDanger__flood',
    dependencies: ['upgrade__capacity_1'],
    prices: [
      {
        price: 10,
        locations: ['oskah', 'butre', 'tabbith'],
        guildOnly: false,
      },
    ],
  },
};

export default upgradesData;
