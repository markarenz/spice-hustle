import { saveGameLocal, deleteSaveItem, getLocalSavesList } from 'utils/saveLoadUtils';
import mockGameState from '__tests__/__fixtures__/mockGameState';
import mockGameSavesList from '__tests__/__fixtures__/mockGameSavesList';

jest.spyOn(Storage.prototype, 'setItem');
afterEach(() => {
  jest.clearAllMocks();
});
describe('saveGameLocal', () => {
  it('saves game data to local storage', async () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(mockGameSavesList));
    await saveGameLocal(mockGameState);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });
  it('saves handles thrown error', async () => {
    Storage.prototype.getItem = jest.fn().mockRejectedValue(null);
    await saveGameLocal(mockGameState);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});

describe('deleteSaveItem', () => {
  it('calls setItem with filtered array of items', async () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(mockGameSavesList));
    await deleteSaveItem('1686433533366');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('handles bad value', async () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue('');
    await deleteSaveItem('1686433533366');
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
  it('handles thrown error', async () => {
    Storage.prototype.getItem = jest.fn().mockRejectedValue(null);
    await deleteSaveItem('1686433533366');
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});

describe('getLocalSavesList', () => {
  it('returns a list from local storage', async () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(mockGameSavesList));
    const result = await getLocalSavesList();
    expect(result.length).toBe(2);
  });
  it('handles bad value', async () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue('');
    const result = await getLocalSavesList();
    expect(result.length).toBe(0);
  });
  it('handles thrown error', async () => {
    Storage.prototype.getItem = jest.fn().mockRejectedValue(null);
    const result = await getLocalSavesList();
    expect(result.length).toBe(0);
  });
});
