import { Route, DangerTypes, Locations } from 'types';

const mockRoute: Route = {
  locations: [Locations.Oskah, Locations.Tabbith],
  sections: [
    {
      dangers: [
        {
          type: DangerTypes.RockSlide,
          chance: 0.1,
          effects: [
            { type: 'delay', severity: 'md' },
            { type: 'inventory', severity: 'sm' },
          ],
        },
        {
          type: DangerTypes.Bandits,
          chance: 0.2,
          effects: [
            { type: 'cash', severity: 'sm' },
            { type: 'inventory', severity: 'sm' },
          ],
        },
      ],
    },
    {
      dangers: [
        {
          type: DangerTypes.Bandits,
          chance: 0.1,
          effects: [
            { type: 'cash', severity: 'sm' },
            { type: 'inventory', severity: 'sm' },
          ],
        },
        {
          type: DangerTypes.RockSlide,
          chance: 0.2,
          effects: [
            { type: 'delay', severity: 'md' },
            { type: 'inventory', severity: 'sm' },
          ],
        },
      ],
    },
  ],
};

export default mockRoute;
