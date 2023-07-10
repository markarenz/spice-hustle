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
              position: { x: 33, y: 32 },
            },
            {
              type: DangerTypes.Bandits,
              chance: 0.2,
              effects: [effects.cashSm, effects.inventorySm],
              position: { x: 40, y: 22 },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.1,
              effects: [effects.cashSm, effects.inventorySm],
              position: { x: 60, y: 24 },
            },
            {
              type: DangerTypes.RockSlide,
              chance: 0.2,
              effects: [effects.delayMd, effects.inventorySm],
              position: { x: 68, y: 32 },
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
              chance: 0.1,
              effects: [effects.inventoryMd],
              position: { x: 43, y: 65 },
            },
            {
              type: DangerTypes.Flood,
              chance: 0.9,
              effects: [effects.delaySm, effects.inventorySm],
              position: { x: 51, y: 62 },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.2,
              effects: [effects.cashSm, effects.inventorySm],
              position: { x: 70, y: 55 },
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
              type: DangerTypes.Bandits,
              chance: 0.1,
              effects: [effects.cashSm, effects.inventorySm],
              position: { x: 17, y: 50 },
            },
            {
              type: DangerTypes.Flood,
              chance: 0.2,
              effects: [effects.delaySm, effects.inventorySm],
              position: { x: 28, y: 53 },
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
              type: DangerTypes.RockSlide,
              chance: 0.1,
              effects: [effects.delayMd, effects.inventorySm],
              position: { x: 33, y: 32 },
            },
            {
              type: DangerTypes.Bandits,
              chance: 0.2,
              effects: [effects.cashSm, effects.inventorySm],
              position: { x: 40, y: 22 },
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.1,
              effects: [effects.cashSm, effects.inventorySm],
              position: { x: 60, y: 24 },
            },
            {
              type: DangerTypes.RockSlide,
              chance: 0.2,
              effects: [effects.delayMd, effects.inventorySm],
              position: { x: 68, y: 32 },
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
};
