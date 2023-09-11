import { UpgradeData, Locations } from 'types';
const upgradesData: UpgradeData = {
  // CAPACITY
  capacity_1: {
    // Small Pack
    slug: 'capacity_1',
    dependencies: [],
    prices: [
      {
        price: 350,
        locations: [Locations.Oskah, Locations.Tabbith, Locations.Luci],
        guildOnly: false,
      },
      {
        price: 250,
        locations: [Locations.Butre],
        guildOnly: true,
      },
    ],
  },
  capacity_2: {
    // Large Pack
    slug: 'capacity_2',
    dependencies: ['upgrade__capacity_1'],
    prices: [
      {
        price: 2500,
        locations: [Locations.Luci, Locations.Winnie],
        guildOnly: false,
      },
      {
        price: 2000,
        locations: [Locations.Clionne],
        guildOnly: true,
      },
    ],
  },
  capacity_3: {
    // Small Cart
    slug: 'capacity_3',
    dependencies: ['upgrade__capacity_2'],
    prices: [
      {
        price: 12000,
        locations: [Locations.Luci, Locations.Winnie],
        guildOnly: true,
      },
    ],
  },
  capacity_4: {
    // Large Cart
    slug: 'capacity_4',
    dependencies: ['upgrade__capacity_3'],
    prices: [
      {
        price: 12000,
        locations: [Locations.Luci, Locations.Winnie],
        guildOnly: true,
      },
    ],
  },

  // MAPS
  map_1: {
    slug: 'map_1',
    dependencies: [],
    prices: [
      {
        price: 9000,
        locations: [Locations.Oskah, Locations.Butre],
        guildOnly: false,
      },
      {
        price: 6000,
        locations: [Locations.Tabbith],
        guildOnly: true,
      },
    ],
  },
  map_2: {
    slug: 'map_2',
    dependencies: ['upgrade__map_1'],
    prices: [
      {
        price: 25000,
        locations: [Locations.Luci, Locations.Clionne],
        guildOnly: true,
      },
    ],
  },

  // COUNTER DANGERS
  counterDanger__bandits: {
    slug: 'counterDanger__bandits',
    dependencies: [],
    prices: [
      {
        price: 500,
        locations: [Locations.Oskah, Locations.Luci, Locations.Winnie, Locations.Tigi],
        guildOnly: false,
      },
      {
        price: 300,
        locations: [Locations.Clionne, Locations.Tabbith],
        guildOnly: true,
      },
    ],
  },
  counterDanger__flood: {
    slug: 'counterDanger__flood',
    dependencies: [],
    prices: [
      {
        price: 150,
        locations: [Locations.Oskah, Locations.Butre, Locations.Tabbith],
        guildOnly: false,
      },
    ],
  },
  counterDanger__rockSlide: {
    slug: 'counterDanger__rockSlide',
    dependencies: [],
    prices: [
      {
        price: 80,
        locations: [Locations.Winnie, Locations.Butre, Locations.Tabbith, Locations.Luci],
        guildOnly: false,
      },
    ],
  },
  counterDanger__tricksters: {
    slug: 'counterDanger__tricksters',
    dependencies: [],
    prices: [
      {
        price: 350,
        locations: [Locations.Oskah, Locations.Tigi, Locations.Butre, Locations.Clionne],
        guildOnly: false,
      },
    ],
  },
  counterDanger__wolves: {
    slug: 'counterDanger__wolves',
    dependencies: [],
    prices: [
      {
        price: 350,
        locations: [Locations.Butre, Locations.Tabbith, Locations.Luci, Locations.Winnie],
        guildOnly: false,
      },
    ],
  },
};

export default upgradesData;
