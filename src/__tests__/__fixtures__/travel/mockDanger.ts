import { DangerTypes } from 'types';

const mockDanger = {
  type: DangerTypes.Bandits,
  chance: 0.4,
  effects: [
    { type: 'cash', severity: 'sm' },
    { type: 'inventory', severity: 'sm' },
  ],
  position: { x: 0, y: 0 },
};

export default mockDanger;
