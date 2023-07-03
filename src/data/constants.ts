import { CapacityData } from 'types';
export const localStorageKeys = {
  savesIndex: 'sh_saves_index',
  savePrefix: 'sh_save__',
};

export const dateConfig = {
  numDaysInSeason: 30,
  maxNumYears: 5,
};

export const capacityData: CapacityData = {
  // You cannot carry much with just your hands, silly.
  default: {
    weight: 5,
    volume: 5,
  },
  pack: {
    weight: 100,
    volume: 30,
  },
  largePack: {
    weight: 300,
    volume: 100,
  },
  cart: {
    weight: 1000,
    volume: 500,
  },
  largeCart: {
    weight: 3000,
    volume: 1200,
  },
};
