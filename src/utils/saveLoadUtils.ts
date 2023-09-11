import { GameState, GameSaveListItem } from 'types';
import { localStorageKeys } from 'data/constants';

const getSaveListItemFromGameState = (gameState: GameState): GameSaveListItem => ({
  id: gameState.id,
  location: gameState.location,
  numTurns: gameState.numTurns,
  netWealth: gameState.netWealth,
  modifiedAt: `${new Date().getTime()}`,
});

export const saveGameLocal = async (gameState: GameState, isQuickSave: boolean) => {
  const gameStateNow: GameState = {
    ...gameState,
    modifiedAt: `${new Date().getTime()}`,
  };
  try {
    const saveKey = isQuickSave
      ? localStorageKeys.quickSaveKey
      : `${localStorageKeys.savePrefix}${gameState.id}`;
    localStorage.setItem(saveKey, JSON.stringify(gameStateNow));

    if (!isQuickSave) {
      const savesListRaw = localStorage.getItem(localStorageKeys.savesIndex);
      let savesList = [];
      if (savesListRaw && savesListRaw.length > 1) {
        savesList = await JSON.parse(savesListRaw);
      }
      const saveListItem = getSaveListItemFromGameState(gameStateNow);
      const isNew = !savesList.some((item: GameSaveListItem) => item.id === gameState.id);
      const newSavesList = isNew
        ? [getSaveListItemFromGameState(gameStateNow), ...savesList]
        : savesList
            .map((item: GameSaveListItem) => (item.id === gameState.id ? saveListItem : item))
            .sort((a: GameSaveListItem, b: GameSaveListItem) => {
              if (a.modifiedAt > b.modifiedAt) {
                return 1;
              }
              if (a.modifiedAt < b.modifiedAt) {
                return -1;
              }
              return 0;
            });
      localStorage.setItem(localStorageKeys.savesIndex, JSON.stringify(newSavesList));
    }
  } catch (err) {
    console.error('Save Game Error', err);
  }
};

const zpadDateTime = (v: number) => (v > 9 ? `${v}` : `0${v}`);

export const getShortRealDate = (timestamp: string) => {
  const d = new Date(parseInt(`${timestamp}`, 10));
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const h = d.getHours();
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} @${
    h > 12 ? zpadDateTime(h - 12) : zpadDateTime(h)
  }:${zpadDateTime(d.getMinutes())}${h > 11 ? 'PM' : 'AM'}`;
};
const localSavesListAdapter = (localSavesList: GameSaveListItem[]) =>
  localSavesList.map((item) => ({
    ...item,
    location: `${item.location.charAt(0).toUpperCase()}${item.location.substring(1)}`,
    netWealth: item.netWealth,
    modifiedAt: getShortRealDate(item.modifiedAt),
  }));

export const getLocalSavesList = async () => {
  try {
    const savesListRaw = await localStorage.getItem(localStorageKeys.savesIndex);
    let savesList = [];
    if (savesListRaw && savesListRaw.length > 1) {
      savesList = await JSON.parse(savesListRaw);
    }
    return savesList.length > 0 ? localSavesListAdapter(savesList) : [];
  } catch (err) {
    console.error('get save list error', err);
    return [];
  }
};

export const getQuickSave = async () => {
  try {
    const gameSaveRaw = localStorage.getItem(localStorageKeys.quickSaveKey);
    const gameState = await JSON.parse(`${gameSaveRaw}`);
    return gameState;
  } catch (err) {
    console.error('Load QuickSave Error', err);
    return null;
  }
};

export const getLocalGameSave = async (gameId: string) => {
  try {
    const gameSaveRaw = localStorage.getItem(`${localStorageKeys.savePrefix}${gameId}`);
    const gameState = await JSON.parse(`${gameSaveRaw}`);
    return gameState;
  } catch (err) {
    console.error('Load Save Error', err);
    return null;
  }
};

export const deleteSaveItem = async (gameId: string) => {
  try {
    localStorage.removeItem(`${localStorageKeys.savePrefix}${gameId}`);
    const savesListRaw = await localStorage.getItem(localStorageKeys.savesIndex);
    let savesList = [];
    if (savesListRaw && savesListRaw.length > 1) {
      savesList = await JSON.parse(savesListRaw);
      const newSavesList = savesList.filter((save: GameSaveListItem) => save.id !== gameId);
      localStorage.setItem(localStorageKeys.savesIndex, JSON.stringify(newSavesList));
    }
  } catch (err) {
    console.error('Delete Save Error', err);
  }
};
