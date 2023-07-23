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
                0: { x: 33, y: 30.5 },
                1: { x: 33, y: 33 },
                2: { x: 40, y: 34.5 },
              },
            },
            {
              type: DangerTypes.Bandits,
              chance: 0.2,
              effects: [effects.cashSm, effects.inventorySm],
              positions: {
                0: { x: 40, y: 23 },
                1: { x: 40, y: 32 },
                2: { x: 45, y: 39 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.4,
              effects: [effects.cashSm, effects.inventorySm],
              positions: {
                0: { x: 60, y: 26 },
                1: { x: 55, y: 34 },
                2: { x: 56, y: 35.5 },
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
              chance: 0.3,
              effects: [effects.inventoryMd],
              positions: {
                0: { x: 43, y: 65 },
                1: { x: 42, y: 55 },
                2: { x: 46, y: 52.5 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.2,
              effects: [effects.cashSm, effects.inventorySm],
              positions: {
                0: { x: 70, y: 55 },
                1: { x: 58, y: 54 },
                2: { x: 59, y: 52 },
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
              chance: 0.3,
              effects: [effects.delaySm, effects.inventorySm],
              positions: {
                0: { x: 27, y: 53 },
                1: { x: 25, y: 51 },
                2: { x: 37, y: 49 },
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
              chance: 0.4,
              effects: [effects.cashSm, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 13, y: 42 },
                2: { x: 24, y: 40 },
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
              chance: 0.3,
              effects: [effects.cashSm, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 17, y: 54 },
                2: { x: 26, y: 52 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Tricksters,
              chance: 0.3,
              effects: [effects.cashSm, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 26, y: 56 },
                2: { x: 33, y: 54 },
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
              chance: 0.3,
              effects: [effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 74, y: 37 },
                2: { x: 73, y: 38 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.RockSlide,
              chance: 0.3,
              effects: [effects.delayMd, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 86, y: 46 },
                2: { x: 85, y: 44 },
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
                1: { x: 93, y: 60 },
                2: { x: 92, y: 54 },
              },
            },
            {
              type: DangerTypes.Tricksters,
              chance: 0.2,
              effects: [effects.cashMd, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 88, y: 57 },
                2: { x: 87, y: 52 },
              },
            },
          ],
        },
        // {
        //   dangers: [
        //     {
        //       type: DangerTypes.Tricksters,
        //       chance: 0.3,
        //       effects: [effects.cashSm, effects.inventoryMd],
        //       positions: {
        //         0: { x: 0, y: 0 },
        //         1: { x: 60, y: 24 },
        //         2: { x: 33, y: 54 },
        //       },
        //     },
        //   ],
        // },
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
              chance: 0.3,
              effects: [effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 60, y: 24 },
                2: { x: 12, y: 47 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.RockSlide,
              chance: 0.3,
              effects: [effects.delayMd, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 60, y: 24 },
                2: { x: 9, y: 34 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.3,
              effects: [effects.cashLg, effects.inventoryLg],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 60, y: 24 },
                2: { x: 8.5, y: 22 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Tricksters,
              chance: 0.3,
              effects: [effects.cashSm, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 60, y: 24 },
                2: { x: 6, y: 5.5 },
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
                2: { x: 86, y: 66 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.RockSlide,
              chance: 0.3,
              effects: [effects.delayMd, effects.inventoryMd],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 60, y: 24 },
                2: { x: 90, y: 76 },
              },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.3,
              effects: [effects.cashLg, effects.inventoryLg],
              positions: {
                0: { x: 0, y: 0 },
                1: { x: 60, y: 24 },
                2: { x: 94, y: 87 },
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
