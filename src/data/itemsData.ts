import { Locations, ItemsInfo } from 'types';

const itemsData: ItemsInfo = {
  potat: {
    itemId: 'potat',
    volume: 2,
    weight: 2.5,
    prices: [
      {
        locations: [Locations.Oskah, Locations.Butre, Locations.Luci],
        seasons: [0, 1],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 10,
        priceMax: 17,
        guildDiscount: 1,
      },
      {
        locations: [Locations.Oskah, Locations.Butre, Locations.Luci],
        seasons: [2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 7,
        priceMax: 9,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Tabbith, Locations.Winnie],
        seasons: [0, 1],
        actions: ['buy', 'sell'],
        qtyMin: 1,
        qtyMax: 10,
        priceMin: 3,
        priceMax: 5,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Tabbith, Locations.Winnie],
        seasons: [2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 1,
        priceMax: 3,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Tigi],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 20,
        priceMax: 30,
        guildDiscount: 0,
      },
    ],
  },
  apple: {
    itemId: 'apple',
    volume: 1,
    weight: 1,
    prices: [
      {
        locations: [Locations.Oskah, Locations.Tabbith, Locations.Butre, Locations.Luci],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 4,
        priceMax: 7,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Winnie],
        seasons: [1, 2],
        actions: ['sell'],
        qtyMin: 0,
        qtyMax: 20,
        priceMin: 2,
        priceMax: 8,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Clionne],
        seasons: [0],
        actions: ['sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 40,
        priceMax: 55,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Clionne],
        seasons: [1, 2, 3],
        actions: ['sell'],
        qtyMin: 0,
        qtyMax: 4,
        priceMin: 30,
        priceMax: 45,
        guildDiscount: 0,
      },
    ],
  },
  // Oskah
  hotsauce: {
    itemId: 'hotsauce',
    volume: 1,
    weight: 2,
    prices: [
      {
        locations: [Locations.Oskah],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 20,
        priceMax: 40,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Winnie, Locations.Tigi],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 120,
        priceMax: 150,
        guildDiscount: 0,
      },
    ],
  },
  saltlick: {
    itemId: 'saltlick',
    volume: 2,
    weight: 4,
    prices: [
      {
        locations: [Locations.Oskah],
        seasons: [0, 1, 2],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 2,
        priceMax: 5,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Winnie, Locations.Tigi, Locations.Butre, Locations.Luci],
        seasons: [1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 4,
        priceMax: 6,
        guildDiscount: 0,
      },
    ],
  },
  oskahtea: {
    itemId: 'oskahtea',
    volume: 1,
    weight: 2,
    prices: [
      {
        locations: [Locations.Oskah],
        seasons: [0, 1],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 2,
        priceMax: 5,
        guildDiscount: 1,
      },
      {
        locations: [Locations.Luci, Locations.Tabbith, Locations.Tigi],
        seasons: [0, 1],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 4,
        priceMax: 7,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Luci, Locations.Tabbith, Locations.Tigi],
        seasons: [2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 10,
        priceMax: 20,
        guildDiscount: 0,
      },
    ],
  },
  tunic: {
    itemId: 'tunic',
    volume: 3,
    weight: 1,
    prices: [
      {
        locations: [Locations.Oskah],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 20,
        priceMax: 30,
        guildDiscount: 5,
      },
      {
        locations: [Locations.Butre, Locations.Clionne, Locations.Winnie],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 25,
        priceMax: 30,
        guildDiscount: 0,
      },
    ],
  },
  // Tabbith
  wool: {
    itemId: 'wool',
    volume: 5,
    weight: 1,
    prices: [
      {
        locations: [Locations.Tabbith],
        seasons: [2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 2,
        qtyMax: 8,
        priceMin: 10,
        priceMax: 20,
        guildDiscount: 5,
      },
      {
        locations: [Locations.Clionne, Locations.Tigi, Locations.Luci],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 12,
        priceMax: 25,
        guildDiscount: 0,
      },
    ],
  },
  cinnamon: {
    itemId: 'cinnamon',
    volume: 2,
    weight: 2,
    prices: [
      {
        locations: [Locations.Tabbith],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 2,
        qtyMax: 8,
        priceMin: 80,
        priceMax: 120,
        guildDiscount: 10,
      },
      {
        locations: [Locations.Winnie, Locations.Tigi],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 150,
        priceMax: 200,
        guildDiscount: 0,
      },
    ],
  },
  cozytea: {
    itemId: 'cozytea',
    volume: 2,
    weight: 2,
    prices: [
      {
        locations: [Locations.Tabbith],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 20,
        priceMin: 12,
        priceMax: 20,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Butre, Locations.Clionne, Locations.Winnie],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 20,
        priceMax: 30,
        guildDiscount: 0,
      },
    ],
  },
  // Butre
  rings: {
    itemId: 'rings',
    volume: 1,
    weight: 1,
    prices: [
      {
        locations: [Locations.Butre],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 20,
        priceMin: 6,
        priceMax: 8,
        guildDiscount: 2,
      },
      {
        locations: [Locations.Clionne, Locations.Tabbith, Locations.Tigi],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 8,
        priceMax: 10,
        guildDiscount: 0,
      },
    ],
  },
  glass: {
    itemId: 'glass',
    volume: 2,
    weight: 8,
    prices: [
      {
        locations: [Locations.Butre],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 40,
        priceMax: 50,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Clionne, Locations.Winnie],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 45,
        priceMax: 55,
        guildDiscount: 0,
      },
    ],
  },
  nutmeg: {
    itemId: 'nutmeg',
    volume: 10,
    weight: 10,
    prices: [
      {
        locations: [Locations.Butre],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 200,
        priceMax: 250,
        guildDiscount: 25,
      },
      {
        locations: [Locations.Clionne, Locations.Luci],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 290,
        priceMax: 350,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Winnie],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 330,
        priceMax: 440,
        guildDiscount: 0,
      },
    ],
  },
  // Luci
  lamp: {
    itemId: 'lamp',
    volume: 2,
    weight: 4,
    prices: [
      {
        locations: [Locations.Luci],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 5,
        priceMin: 1100,
        priceMax: 2000,
        guildDiscount: 90,
      },
      {
        locations: [Locations.Clionne, Locations.Winnie],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 5,
        priceMin: 1200,
        priceMax: 2500,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Tigi],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 5,
        priceMin: 2000,
        priceMax: 3000,
        guildDiscount: 0,
      },
    ],
  },
  melange: {
    itemId: 'melange',
    volume: 10,
    weight: 20,
    prices: [
      {
        locations: [Locations.Luci],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 20,
        priceMin: 10,
        priceMax: 15,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Oskah, Locations.Tabbith],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 25,
        priceMax: 30,
        guildDiscount: 0,
      },
    ],
  },
  sporty: {
    itemId: 'sporty',
    volume: 5,
    weight: 5,
    prices: [
      {
        locations: [Locations.Luci],
        seasons: [2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 5,
        priceMin: 500,
        priceMax: 550,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Butre, Locations.Tabbith],
        seasons: [0, 1],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 5,
        priceMin: 600,
        priceMax: 900,
        guildDiscount: 0,
      },
    ],
  },
  ginger: {
    itemId: 'ginger',
    volume: 10,
    weight: 10,
    prices: [
      {
        locations: [Locations.Luci],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 20,
        priceMin: 8000,
        priceMax: 8500,
        guildDiscount: 250,
      },
      {
        locations: [Locations.Clionne, Locations.Winnie],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 20,
        priceMin: 12000,
        priceMax: 15000,
        guildDiscount: 0,
      },
    ],
  },
  jolt: {
    itemId: 'jolt',
    volume: 1,
    weight: 2,
    prices: [
      {
        locations: [Locations.Luci],
        seasons: [0, 1, 2],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 100,
        priceMin: 80,
        priceMax: 85,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Clionne, Locations.Winnie],
        seasons: [1, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 50,
        priceMin: 85,
        priceMax: 90,
        guildDiscount: 0,
      },
    ],
  },
  // Clionne
  cinnamonroll: {
    itemId: 'cinnamonroll',
    volume: 2,
    weight: 4,
    prices: [
      {
        locations: [Locations.Clionne],
        seasons: [0, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 25,
        priceMin: 400,
        priceMax: 450,
        guildDiscount: 80,
      },
      {
        locations: [Locations.Clionne],
        seasons: [1, 2],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 20,
        priceMin: 500,
        priceMax: 550,
        guildDiscount: 80,
      },
      {
        locations: [Locations.Winnie, Locations.Luci, Locations.Tabbith],
        seasons: [1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 25,
        priceMin: 520,
        priceMax: 600,
        guildDiscount: 0,
      },
    ],
  },
  processedwool: {
    itemId: 'processedwool',
    volume: 3,
    weight: 5,
    prices: [
      {
        locations: [Locations.Clionne],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 30,
        priceMin: 650,
        priceMax: 900,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Tigi, Locations.Winnie],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 30,
        priceMin: 1600,
        priceMax: 1800,
        guildDiscount: 0,
      },
    ],
  },
  silverspoon: {
    itemId: 'silverspoon',
    volume: 1,
    weight: 2,
    prices: [
      {
        locations: [Locations.Clionne],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 20,
        priceMin: 5000,
        priceMax: 5500,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Oskah, Locations.Luci, Locations.Tigi],
        seasons: [1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 20,
        priceMin: 6000,
        priceMax: 6500,
        guildDiscount: 0,
      },
    ],
  },
  rug: {
    itemId: 'rug',
    volume: 5,
    weight: 5,
    prices: [
      {
        locations: [Locations.Clionne],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 5,
        priceMin: 9000,
        priceMax: 10000,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Clionne, Locations.Winnie],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 20000,
        priceMax: 30000,
        guildDiscount: 0,
      },
    ],
  },

  // Winnie
  pepper: {
    itemId: 'pepper',
    volume: 2,
    weight: 4,
    prices: [
      {
        locations: [Locations.Winnie],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 100,
        priceMin: 250,
        priceMax: 300,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Butre, Locations.Luci],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 100,
        priceMin: 350,
        priceMax: 400,
        guildDiscount: 0,
      },
    ],
  },
  secretspice: {
    itemId: 'secretspice',
    volume: 5,
    weight: 10,
    prices: [
      {
        locations: [Locations.Winnie],
        seasons: [1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 5,
        priceMin: 12000,
        priceMax: 13000,
        guildDiscount: 250,
      },
      {
        locations: [Locations.Tigi, Locations.Clionne],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 30000,
        priceMax: 50000,
        guildDiscount: 0,
      },
    ],
  },
  fish: {
    itemId: 'fish',
    volume: 2,
    weight: 2,
    prices: [
      {
        locations: [Locations.Winnie],
        seasons: [0, 1],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 5,
        priceMin: 150,
        priceMax: 200,
        guildDiscount: 20,
      },
      {
        locations: [Locations.Winnie],
        seasons: [2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 5,
        priceMin: 200,
        priceMax: 250,
        guildDiscount: 20,
      },
      {
        locations: [Locations.Oskah, Locations.Tabbith, Locations.Clionne],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 200,
        priceMax: 250,
        guildDiscount: 0,
      },
    ],
  },
  brochure: {
    itemId: 'brochure',
    volume: 1,
    weight: 1,
    prices: [
      {
        locations: [Locations.Winnie],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 5,
        priceMin: 5,
        priceMax: 10,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Tigi, Locations.Luci],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 150,
        priceMax: 180,
        guildDiscount: 0,
      },
    ],
  },

  // Tiggi
  statuette: {
    itemId: 'statuette',
    volume: 1,
    weight: 10,
    prices: [
      {
        locations: [Locations.Tigi],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 20,
        priceMin: 5000,
        priceMax: 5500,
        guildDiscount: 0,
      },
      {
        locations: [Locations.Clionne],
        seasons: [0, 1, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 20,
        priceMin: 8000,
        priceMax: 9900,
        guildDiscount: 0,
      },
    ],
  },
  paperlantern: {
    itemId: 'paperlantern',
    volume: 5,
    weight: 1,
    prices: [
      {
        locations: [Locations.Tigi],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 30,
        priceMin: 10,
        priceMax: 20,
        guildDiscount: 2,
      },
      {
        locations: [Locations.Oskah, Locations.Butre, Locations.Luci],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 30,
        priceMin: 50,
        priceMax: 70,
        guildDiscount: 0,
      },
    ],
  },
  silkkimono: {
    itemId: 'silkkimono',
    volume: 5,
    weight: 3,
    prices: [
      {
        locations: [Locations.Tigi],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 100,
        priceMin: 1200,
        priceMax: 3000,
        guildDiscount: 200,
      },
      {
        locations: [],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 100,
        priceMin: 35000,
        priceMax: 60000,
        guildDiscount: 0,
      },
    ],
  },
  vase: {
    itemId: 'vase',
    volume: 4,
    weight: 8,
    prices: [
      {
        locations: [Locations.Tigi],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 200000,
        priceMax: 250000,
        guildDiscount: 0,
      },
      {
        locations: [],
        seasons: [0, 1, 2, 3],
        actions: ['buy', 'sell'],
        qtyMin: 0,
        qtyMax: 10,
        priceMin: 700000,
        priceMax: 950000,
        guildDiscount: 0,
      },
    ],
  },
};

export default itemsData;
