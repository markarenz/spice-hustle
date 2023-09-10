import {
  saveGameLocal,
  deleteSaveItem,
  getLocalSavesList,
  getLocalGameSave,
} from 'utils/saveLoadUtils';
import mockGameState from '__tests__/__fixtures__/mockGameState';
import mockGameSavesList from '__tests__/__fixtures__/mockGameSavesList';

jest.spyOn(Storage.prototype, 'setItem');
afterEach(() => {
  jest.clearAllMocks();
});
// Mocking console.error to prevent the deliberately thrown errors from appearing in the test telemetry
const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('saveGameLocal', () => {
  it('saves game data to local storage: new', async () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(mockGameSavesList));
    await saveGameLocal(mockGameState, false);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it('saves game data to local storage: update - sort', async () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(mockGameSavesList));
    await saveGameLocal({ ...mockGameState, id: mockGameSavesList[0].id }, false);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it('saves game data to local storage: update - sort rev', async () => {
    Storage.prototype.getItem = jest
      .fn()
      .mockReturnValue(
        JSON.stringify([mockGameSavesList[1], mockGameSavesList[0], mockGameSavesList[0]]),
      );
    await saveGameLocal({ ...mockGameState, id: mockGameSavesList[0].id }, false);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });

  // it('handles empty saves list string', async () => {
  //   Storage.prototype.getItem = jest.fn().mockReturnValue('');
  //   await saveGameLocal({ ...mockGameState, id: mockGameSavesList[0].id }, false);
  //   expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  // });

  // it('saves handles thrown error', async () => {
  //   Storage.prototype.getItem = jest.fn().mockRejectedValue(null);
  //   await saveGameLocal(mockGameState, false);
  //   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  //   expect(consoleError).toHaveBeenCalled();
  // });
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
    expect(consoleError).toHaveBeenCalled();
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
    expect(consoleError).toHaveBeenCalled();
  });
});

describe('getLocalGameSave', () => {
  it('returns saved game data', async () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(mockGameState));
    const result = await getLocalGameSave('test-123');
    expect(result.location).toEqual(mockGameState.location);
  });
  // it('handles error', async () => {
  //   Storage.prototype.getItem = jest.fn().mockRejectedValue('');
  //   const result = await getLocalGameSave('test-123');
  //   expect(result).toBe(null);
  // });
});
