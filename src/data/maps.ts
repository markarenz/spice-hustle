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
            },
            {
              type: DangerTypes.Bandits,
              chance: 0.2,
              effects: [effects.cashSm, effects.inventorySm],
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.1,
              effects: [effects.cashSm, effects.inventorySm],
            },
            {
              type: DangerTypes.RockSlide,
              chance: 0.2,
              effects: [effects.delayMd, effects.inventorySm],
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
            },
            {
              type: DangerTypes.Flood,
              chance: 0.2,
              effects: [effects.delaySm, effects.inventorySm],
            },
          ],
        },
        {
          dangers: [
            {
              type: DangerTypes.Bandits,
              chance: 0.2,
              effects: [effects.cashSm, effects.inventorySm],
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
              chance: 0.1,
              effects: [effects.delaySm, effects.inventorySm],
            },
            {
              type: DangerTypes.Bandits,
              chance: 0.2,
              effects: [effects.cashSm, effects.inventorySm],
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
};
