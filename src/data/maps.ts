import { Map, RouteDangerEffect, Locations, DangerTypes } from 'types';

type EffectList = {
  [key: string]: RouteDangerEffect;
};

const effects: EffectList = {
  cashSm: {
    type: 'cash',
    severity: 'sm',
  },
  cashMd: {
    type: 'cash',
    severity: 'md',
  },
  cashLg: {
    type: 'cash',
    severity: 'lg',
  },
  inventorySm: {
    type: 'inventory',
    severity: 'sm',
  },
  inventoryMd: {
    type: 'inventory',
    severity: 'md',
  },
  inventoryLg: {
    type: 'inventory',
    severity: 'lg',
  },
  delaySm: {
    type: 'delay',
    severity: 'sm',
  },
  delayMd: {
    type: 'delay',
    severity: 'md',
  },
  delayLg: {
    type: 'delay',
    severity: 'lg',
  },
};

const mapDefault: Map = {
  slug: 'default',
  locations: [Locations.Oskah, Locations.Tabbith, Locations.Butre],
  routes: [
    {
      locations: [Locations.Oskah, Locations.Tabbith],
      sections: [
        {
          dangers: [
            {
              type: DangerTypes.RockSlide,
              chance: 0.1,
              effects: [effects.delayMd, effects.inventorySm],
              positions: {
                0: { x: 33, y: 27.5 },
                1: { x: 33, y: 36 },
                2: { x: 40, y: 38 },
              },
            },
            {
              type: DangerTypes.Bandits,
              chance: 0.1,
              effects: [effects.cashSm, effects.inventorySm],
              positions: {
                0: { x: 40, y: 26 },
                1: { x: 40, y: 35 },
                2: { x: 45, y: 37 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.3,
              effects: [effects.cashSm, effects.inventorySm],
              positions: {
                0: { x: 64, y: 28.5 },
                1: { x: 54, y: 36.5 },
                2: { x: 56, y: 38 },
              },
            },
          ],
        },
      ],
    },
    {
      locations: [Locations.Butre, Locations.Tabbith],
      sections: [
        {
          dangers: [
            {
              type: DangerTypes.Wolves,
              chance: 0.2,
              effects: [effects.inventoryMd],
              positions: {
                0: { x: 43, y: 62 },
                1: { x: 42, y: 57 },
                2: { x: 46, y: 55 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.1,
              effects: [effects.cashSm, effects.inventorySm],
              positions: {
                0: { x: 70, y: 52.5 },
                1: { x: 58, y: 51.5 },
                2: { x: 59, y: 50 },
              },
            },
          ],
        },
      ],
    },
    {
      locations: [Locations.Butre, Locations.Oskah],
      sections: [
        {
          dangers: [
            {
              type: DangerTypes.Flood,
              chance: 0.2,
              effects: [effects.delaySm, effects.inventorySm],
              positions: {
                0: { x: 23.5, y: 53 },
                1: { x: 28, y: 51.5 },
                2: { x: 35.5, y: 51 },
              },
            },
          ],
        },
      ],
    },
  ],
};

const mapTwo: Map = {
  slug: 'two',
  locations: [
    Locations.Oskah,
    Locations.Tabbith,
    Locations.Butre,
    Locations.Luci,
    Locations.Clionne,
  ],
  routes: [
    ...mapDefault.routes,
    {
      locations: [Locations.Oskah, Locations.Luci],
      sections: [
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.3,
              effects: [effects.cashSm, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 15, y: 45 },
                2: { x: 24, y: 45 },
              },
            },
          ],
        },
      ],
    },
    {
      locations: [Locations.Luci, Locations.Butre],
      sections: [
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.2,
              effects: [effects.cashSm, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 16, y: 56.5 },
                2: { x: 25, y: 55 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Tricksters,
              chance: 0.2,
              effects: [effects.cashSm, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 25.5, y: 57 },
                2: { x: 33, y: 55 },
              },
            },
          ],
        },
      ],
    },
    {
      locations: [Locations.Tabbith, Locations.Clionne],
      sections: [
        {
          dangers: [
            {
              type: DangerTypes.Wolves,
              chance: 0.2,
              effects: [effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 74, y: 39.5 },
                2: { x: 73, y: 41 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.RockSlide,
              chance: 0.2,
              effects: [effects.delayMd, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 86, y: 49 },
                2: { x: 85, y: 48 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.2,
              effects: [effects.cashMd, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 93, y: 56 },
                2: { x: 90, y: 53 },
              },
            },
            {
              type: DangerTypes.Tricksters,
              chance: 0.2,
              effects: [effects.cashMd, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 88, y: 60 },
                2: { x: 85, y: 57.5 },
              },
            },
          ],
        },
      ],
    },
  ],
};

const mapThree: Map = {
  slug: 'three',
  locations: [
    Locations.Oskah,
    Locations.Tabbith,
    Locations.Butre,
    Locations.Luci,
    Locations.Clionne,
    Locations.Winnie,
    Locations.Tigi,
  ],
  routes: [
    ...mapDefault.routes,
    ...mapTwo.routes,

    {
      locations: [Locations.Luci, Locations.Winnie],
      sections: [
        {
          dangers: [
            {
              type: DangerTypes.Wolves,
              chance: 0.2,
              effects: [effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 60, y: 24 },
                2: { x: 10, y: 48 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.RockSlide,
              chance: 0.2,
              effects: [effects.delayMd, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 60, y: 24 },
                2: { x: 7, y: 34 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.2,
              effects: [effects.cashLg, effects.inventoryLg],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 60, y: 24 },
                2: { x: 11.5, y: 22 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Tricksters,
              chance: 0.2,
              effects: [effects.cashSm, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 60, y: 24 },
                2: { x: 6, y: 9 },
              },
            },
          ],
        },
      ],
    },

    {
      locations: [Locations.Clionne, Locations.Tigi],
      sections: [
        {
          dangers: [
            {
              type: DangerTypes.Wolves,
              chance: 0.3,
              effects: [effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 60, y: 24 },
                2: { x: 89, y: 65 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.RockSlide,
              chance: 0.2,
              effects: [effects.delayMd, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 60, y: 24 },
                2: { x: 93, y: 75 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.2,
              effects: [effects.cashLg, effects.inventoryLg],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 60, y: 24 },
                2: { x: 92, y: 85 },
              },
            },
          ],
        },
      ],
    },
  ],
};
type MapsData = {
  [key: number]: Map;
};

export const maps: MapsData = {
  0: mapDefault,
  1: mapTwo,
  2: mapThree,
};
