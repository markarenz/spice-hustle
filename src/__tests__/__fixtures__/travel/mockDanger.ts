import { DangerTypes } from 'types';

const mockDanger = {
  type: DangerTypes.Bandits,
  chance: 0.4,
  effects: [
    { type: 'cash', severity: 'sm' },
    { type: 'inventory', severity: 'sm' },
  ],
};

export default mockDanger;
