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
import loansData from 'data/loansData';
import upgradesData from 'data/upgrades';
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
        guildDiscount: price.guildDiscount,
      };
      prices[priceListItem.id] = { ...priceListItem };
    }
  });
  return prices;
};

export const getNetWealth = (cash: number, savings: number, loans: Loan[]) => {
  const loansTotal = loans.reduce((sum, item) => sum + item.principal, 0);
  return cash + savings - loansTotal;
};

export const getCapacityMax = (flags: Flags): VolWeight => {
  let max: VolWeight = capacityData[0];
  Object.keys(capacityData).forEach((key) => {
    if (flags[`upgrade__capacity_${key}`]) {
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

export const getMaxQty = (
  gameState: GameState,
  selectedItem: any,
  itemsData: ItemsInfo,
): number => {
  const itemData = itemsData[selectedItem.id];
  if (!itemData) {
    console.log('missing selected item id in itemsData:', selectedItem);
    return 1;
  }

  const res = Math.min(
    selectedItem.qty,
    Math.floor(gameState.cash / selectedItem.value),
    Math.floor((gameState.capacity.max.volume - gameState.capacity.used.volume) / itemData.volume),
    Math.floor((gameState.capacity.max.weight - gameState.capacity.used.weight) / itemData.weight),
  );

  return res;
};

export const getRnd1d6 = () => Math.floor(Math.random() * 6) + 1;

export const getHasLocalLoan = (loans: Loan[], location: string): boolean =>
  loans.some((loan) => loan.location === location);

export const getLoanByLocation = (loans: Loan[], location: string) =>
  loans.find((loan) => loan.location === location);

export const getHasOverdueLoanForLocation = (gameState: GameState, location: string): boolean =>
  gameState.loans.some((loan) => loan.location === location && loan.dueDate < gameState.numTurns);

export const getGuildBenefitsByLocation = (location: string) => {
  const exclusiveItems: string[] = [];
  const exclusiveUpgrades: string[] = [];
  let exclusiveLoan = false;
  Object.values(itemsData).forEach((item) => {
    if (
      item.prices.some((price) => price.locations.includes(location) && price.guildDiscount > 0)
    ) {
      exclusiveItems.push(item.itemId);
    }
  });
  Object.values(upgradesData).forEach((upgrade) => {
    if (upgrade.prices.some((price) => price.locations.includes(location) && price.guildOnly)) {
      exclusiveUpgrades.push(upgrade.slug);
    }
  });
  Object.values(loansData).forEach((loan) => {
    if (loan.location === location && loan.guildOnly) {
      exclusiveLoan = true;
    }
  });
  return {
    exclusiveItems,
    exclusiveUpgrades,
    exclusiveLoan,
  };
};

export const getMapVersion = (gameState: GameState) => {
  if (gameState.flags['upgrade__map_2']) {
    return 2;
  }
  if (gameState.flags['upgrade__map_1']) {
    return 1;
  }
  return 0;
};
