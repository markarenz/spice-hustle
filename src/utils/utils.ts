import {
  InGameDate,
  Price,
  Loan,
  GameState,
  Capacity,
  VolWeight,
  Inventory,
  Flags,
  ItemsInfo,
} from 'types';
import itemsData from 'data/itemsData';
import { dateConfig, capacityData } from 'data/constants';

export const getInGameDate = (numTurns: number): InGameDate => {
  const daysInYear = dateConfig.numDaysInSeason * 4;
  const years = Math.floor(numTurns / daysInYear);
  const season = Math.floor((numTurns % daysInYear) / dateConfig.numDaysInSeason);
  const day = (numTurns % dateConfig.numDaysInSeason) + 1;
  return { day, season, years };
};

export const getRandRange = (min: number, max: number): number =>
  min + Math.floor(Math.random() * (max - min));

export const getLocalPrices = (location: string, numTurns: number) => {
  const daysInYear = dateConfig.numDaysInSeason * 4;
  const season = Math.floor((numTurns % daysInYear) / dateConfig.numDaysInSeason);
  const prices: { [key: string]: Price } = {};
  Object.values(itemsData).forEach((item) => {
    const { itemId, volume, weight } = item;
    const price = item.prices.find(
      (price) => price.locations.includes(location) && price.seasons.includes(season),
    );
    if (!!price) {
      const value = getRandRange(price.priceMin, price.priceMax);
      const qty = getRandRange(price.qtyMin, price.qtyMax);
      const priceListItem: Price = {
        id: itemId,
        value,
        actions: price.actions,
        qty,
        volume,
        weight,
      };
      prices[priceListItem.id] = { ...priceListItem };
    }
  });
  return prices;
};

export const getNetWealth = (cash: number, loans: Loan[]) => {
  const loansTotal = loans.reduce((sum, item) => sum + item.principal, 0);
  return cash - loansTotal;
};

export const getCapacityMax = (flags: Flags): VolWeight => {
  let max: VolWeight = capacityData['default'];
  Object.keys(capacityData).forEach((key) => {
    if (flags[`capacity_${key}`]) {
      max = capacityData[key];
    }
  });
  return max;
};

const sigFigs = (num: number) => Math.floor(num * 100) / 100;

export const getCapacity = (inventory: Inventory, flags: Flags): Capacity => {
  const max = getCapacityMax(flags);
  let usedWeight = 0;
  let usedVolume = 0;
  Object.keys(inventory).forEach((key) => {
    usedWeight += itemsData[key].weight * inventory[key].qty;
    usedVolume += itemsData[key].volume * inventory[key].qty;
  });
  return {
    used: {
      weight: sigFigs(usedWeight),
      volume: sigFigs(usedVolume),
    },
    max,
  };
};

export const getMaxQty = (gameState: GameState, selectedItem: any, itemsData: ItemsInfo): number =>
  Math.min(
    selectedItem.qty,
    Math.floor(gameState.cash / selectedItem.value),
    Math.floor(
      gameState.capacity.max.volume /
        ((itemsData[selectedItem.id]?.volume || 0) + gameState.capacity.used.volume),
    ),
    Math.floor(
      gameState.capacity.max.weight /
        ((itemsData[selectedItem.id]?.weight || 0) + gameState.capacity.used.weight),
    ),
  );
