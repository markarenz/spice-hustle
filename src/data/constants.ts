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
  0: {
    weight: 5,
    volume: 5,
  },
  1: {
    // pack
    weight: 100,
    volume: 30,
  },
  2: {
    // largePack
    weight: 300,
    volume: 100,
  },
  3: {
    // cart
    weight: 1000,
    volume: 500,
  },
  4: {
    // largeCart
    weight: 3000,
    volume: 1200,
  },
};
