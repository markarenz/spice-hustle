import {
  getMaxQty,
  getCapacity,
  getCapacityMax,
  getNetWealth,
  getRandRange,
  getLocalPrices,
  getInGameDate,
  getHasLocalLoan,
  getLoanByLocation,
  getHasOverdueLoanForLocation,
} from 'utils/utils';
import mockGameState from '__tests__/__fixtures__/mockGameState';
import itemsData from 'data/itemsData';

describe('getInGameDate', () => {
  it('returns date based on num turns', () => {
    const inputs: number[] = [0, 10, 30, 120, 370];
    const results = inputs.map((n: number) => getInGameDate(n));
    const expectedResults = [
      { day: 1, season: 0, years: 0 },
      { day: 11, season: 0, years: 0 },
      { day: 1, season: 1, years: 0 },
      { day: 1, season: 0, years: 1 },
      { day: 11, season: 0, years: 3 },
    ];
    expect(results).toEqual(expectedResults);
  });
});

describe('getRandRange', () => {
  it('returns expected value', () => {
    const result = getRandRange(1, 10);
    expect(result).toBe(5);
  });
});

describe('getLocalPrices', () => {
  it('returns expected value', () => {
    const result = getLocalPrices('oskah', 1);
    expect(result.potat.value).toBe(13);
    expect(result.apple.value).toBe(5);
  });

  it('handles invalid value', () => {
    const result = getLocalPrices('test-invalid', 1);
    expect(result).toEqual({});
  });
});

describe('getNetWealth', () => {
  it('returns the correct value', () => {
    const result = getNetWealth(500, 50, [
      {
        location: '123',
        initialAmount: 120,
        principal: 100,
        dueDate: 100,
      },
    ]);
    expect(result).toBe(450); // 500 + 50 - 100 = 450
  });
});

describe('getCapacityMax', () => {
  it('returns value for default (lvl 1) capacity', () => {
    const result = getCapacityMax({});
    expect(result).toEqual({ weight: 5, volume: 5 });
  });
  it('returns value for pack (lvl 2) capacity', () => {
    const result = getCapacityMax({ upgrade__capacity_1: true });
    expect(result).toEqual({ weight: 100, volume: 30 });
  });
  it('returns value for largeCart (lvl 5) capacity', () => {
    const result = getCapacityMax({ upgrade__capacity_4: true });
    expect(result).toEqual({ weight: 3000, volume: 1200 });
  });
});

describe('getCapacity', () => {
  it('returns value', () => {
    const result = getCapacity(
      {
        apple: { itemId: 'apple', qty: 1 },
      },
      {},
    );
    const expected = { used: { weight: 1, volume: 1 }, max: { weight: 5, volume: 5 } };
    expect(result).toEqual(expected);
  });
});

describe('getMaxQty', () => {
  it('returns value', () => {
    const result = getMaxQty(
      {
        ...mockGameState,
        capacity: {
          used: {
            weight: 0,
            volume: 0,
          },
          max: {
            weight: 10,
            volume: 10,
          },
        },
      },
      {
        actions: ['buy', 'sell'],
        id: 'potat',
        priceValue: 9,
        qty: 9,
        title: 'Potat',
        value: 9,
        volume: 2,
        weight: 2.5,
      },
      itemsData,
    );
    expect(result).toBe(4);
  });
  it('handles invalid selectedItem', () => {
    const result = getMaxQty(
      {
        ...mockGameState,
        capacity: {
          used: {
            weight: 0,
            volume: 0,
          },
          max: {
            weight: 10,
            volume: 10,
          },
        },
      },
      {
        actions: ['buy', 'sell'],
        id: 'invalid-id',
        priceValue: 9,
        qty: 9,
        title: 'Potat',
        value: 9,
        volume: 2,
        weight: 2.5,
      },
      itemsData,
    );
    expect(result).toBe(9);
  });
});

const mockLoans = [
  {
    location: 'oskah',
    initialAmount: 1200,
    principal: 1000,
    dueDate: 100,
  },
];

describe('getHasLocalLoan', () => {
  it('returns true if we have a loan for this location', () => {
    const result = getHasLocalLoan(mockLoans, 'oskah');
    expect(result).toBe(true);
  });
  it('returns false if we do not have a loan for this location', () => {
    const result = getHasLocalLoan(mockLoans, 'tabbith');
    expect(result).toBe(false);
  });
});
describe('getLoanByLocation', () => {
  it('returns loan for location if it exists', () => {
    const result = getLoanByLocation(mockLoans, 'oskah');
    expect(result?.location).toBe('oskah');
  });
  it('returns nothing if loan for location does not exist', () => {
    const result = getLoanByLocation(mockLoans, 'tabbith');
    expect(result?.location).toBe(undefined);
  });
});

describe('getHasOverdueLoanForLocation', () => {
  const mockGameStateLoans = {
    ...mockGameState,
    location: 'oskah',
    numTurns: 80,
    loans: mockLoans,
  };
  const mockGameStateLoansOverdue = {
    ...mockGameStateLoans,
    numTurns: 110,
  };

  it('returns false when user has loan that is not overdue for this location', () => {
    const result = getHasOverdueLoanForLocation(mockGameStateLoans, 'oskah');
    expect(result).toBe(false);
  });
  it('returns false when user has loan that is overdue for another location', () => {
    const result = getHasOverdueLoanForLocation(mockGameStateLoansOverdue, 'tabbith');
    expect(result).toBe(false);
  });
  it('returns false when user has loan that is overdue for this location', () => {
    const result = getHasOverdueLoanForLocation(mockGameStateLoansOverdue, 'oskah');
    expect(result).toBe(true);
  });
});
