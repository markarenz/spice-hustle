import { GameState, GameSaveListItem } from 'types';
import { localStorageKeys } from 'data/constants';

const getSaveListItemFromGameState = (gameState: GameState): GameSaveListItem => ({
  id: gameState.id,
  location: gameState.location,
  numTurns: gameState.numTurns,
  netWealth: gameState.netWealth,
  modifiedAt: gameState.modifiedAt,
});

export const saveGameLocal = async (gameState: GameState) => {
  const gameStateNow: GameState = {
    ...gameState,
    modifiedAt: `${new Date().getTime()}`,
  };
  try {
    localStorage.setItem(
      `${localStorageKeys.savePrefix}${gameState.id}`,
      JSON.stringify(gameStateNow),
    );
    const savesListRaw = await localStorage.getItem(localStorageKeys.savesIndex);
    let savesList = [];
    if (savesListRaw && savesListRaw.length > 1) {
      savesList = await JSON.parse(savesListRaw);
    }
    const newSavesList = [getSaveListItemFromGameState(gameStateNow), ...savesList];
    localStorage.setItem(localStorageKeys.savesIndex, JSON.stringify(newSavesList));
  } catch (err) {
    console.error('Save Game Error', err);
  }
};

const zpadDateTime = (v: number) => (v > 9 ? `${v}` : `0${v}`);

const getShortRealDate = (timestamp: string) => {
  const d = new Date(parseInt(`${timestamp}`, 10));
  const h = d.getHours();
  return `${zpadDateTime(d.getDay())}/${zpadDateTime(d.getMonth())}/${d.getFullYear()} @${
    h > 12 ? zpadDateTime(h - 12) : zpadDateTime(h)
  }:${zpadDateTime(d.getMinutes())}${h > 11 ? 'PM' : 'AM'}`;
};
const localSavesListAdapter = (localSavesList: GameSaveListItem[]) =>
  localSavesList.map((item) => ({
    ...item,
    location: `${item.location.charAt(0).toUpperCase()}${item.location.substring(1)}`,
    netWealth: `⌾${item.netWealth}`,
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

export const loadGameLocal = (gameId: string) => {};

export const deleteSaveItem = async (gameId: string) => {
  try {
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
