import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, AppStatuses } from 'types';
import initGameState from 'data/initGameState';
import { saveGameLocal } from 'utils/saveLoadUtils';

// import {
//   getIdHash,
//   saveToStorage,
//   loadFromStorage,
//   getTagsFromStorage,
//   getTagsFromTodos,
//   getTagFilterDefault,
//   saveTagFilter
// } from '../helpers';
// import { Todo, TodoActionById } from '../type.d';

export type GameSliceState = {
  appStatus: string;
  isModalOpen: boolean;
  gameState: GameState | null;
};

const initialState: GameSliceState = {
  appStatus: AppStatuses.StartPage,
  isModalOpen: false,
  gameState: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initState: (state) => {
      state.appStatus = AppStatuses.StartPage;
      state.gameState = { ...initGameState };
    },
    startNewGame: (state) => {
      state.appStatus = AppStatuses.Game;
      state.gameState = { ...initGameState };
      saveGameLocal({ ...initGameState });
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    // saveTodo: (state, action: PayloadAction<string>) => {
    //   const newTodo = {
    //     title: `${action.payload}`,
    //     id: getIdHash(),
    //     dateCreated: `${new Date()}`,
    //     dateCompleted: '',
    //     isComplete: false,
    //     tags: [],
    //   };
    //   const newTodos = [newTodo, ...state.todos];
    //   saveToStorage(newTodos);
    //   state.todos = [newTodo, ...state.todos];
    // },
    // addTag: (state, action: PayloadAction<TodoActionById>) => {
    //   const { id, value } = action.payload;
    //   const newTodos = state.todos.map((t) =>
    //     t.id === id
    //       ? {
    //           ...t,
    //           tags: [...t.tags.filter((tg) => tg !== value), value.toLowerCase()],
    //         }
    //       : t,
    //   );
    //   saveToStorage(newTodos);
    //   state.tags = getTagsFromTodos(newTodos);
    //   state.todos = [...newTodos];
    // },
    // deleteTag: (state, action: PayloadAction<TodoActionById>) => {
    //   const { id, value } = action.payload;
    //   const newTodos = state.todos.map((t) =>
    //     t.id === id
    //       ? {
    //           ...t,
    //           tags: t.tags.filter((tg) => tg !== value),
    //         }
    //       : t,
    //   );
    //   saveToStorage(newTodos);
    //   state.todos = [...newTodos];
    // },
    // deleteTodo: (state, action: PayloadAction<string>) => {
    //   const newTodos = state.todos.filter((t) => t.id !== action.payload);
    //   saveToStorage(newTodos);
    //   state.todos = [...newTodos];
    // },
    // toggleCompleteTodo: (state, action: PayloadAction<string>) => {
    //   const newTodos = state.todos.map((t) =>
    //     t.id === action.payload
    //       ? {
    //           ...t,
    //           isComplete: !t.isComplete,
    //           dateCompleted: !t.isComplete ? `${new Date()}` : '',
    //         }
    //       : t,
    //   );
    //   saveToStorage(newTodos);
    //   state.todos = [...newTodos];
    // },
    // updateTodoTitle: (state, action: PayloadAction<TodoActionById>) => {
    //   const { id, value } = action.payload;
    //   const newTodos = state.todos.map((t) =>
    //     t.id === id
    //       ? {
    //           ...t,
    //           title: value,
    //         }
    //       : t,
    //   );
    //   saveToStorage(newTodos);
    //   state.todos = [...newTodos];
    // },
    // selectTodoTitleForEdit: (state, action: PayloadAction<string>) => {
    //   state.isEditingTodoTitle = true;
    //   state.selectedTodoId = action.payload;
    // },
    // setTodoTitleEditComplete: (state) => {
    //   state.isEditingTodoTitle = false;
    //   state.selectedTodoId = '';
    // },
    // setTagModalOpen: (state, action: PayloadAction<string>) => {
    //   state.selectedTodoId = action.payload;
    //   state.isTagModalOpen = action.payload !== '';
    // },
    // setFilterModalOpen: (state, action: PayloadAction<string>) => {
    //   state.isFilterModalOpen = action.payload === 'open';
    // },
    // setHideCompleted: (state, action: PayloadAction<string>) => {
    //   state.hideCompleted = action.payload === 'hide';
    // },
    // setTagFilter: (state, action: PayloadAction<string>) => {
    //   state.tagFilter = action.payload;
    //   saveTagFilter(action.payload);
    // },
    // clearAll: (state) => {
    //   state.tagFilter = '';
    //   state.tags = [];
    //   state.todos = [];
    //   saveToStorage([]);
    // },
  },
});

export const {
  initState,
  startNewGame,
  toggleModal,
  // saveTodo,
  // deleteTodo,
  // toggleCompleteTodo,
  // initState,
  // deleteTag,
  // addTag,
  // setTagModalOpen,
  // updateTodoTitle,
  // selectTodoTitleForEdit,
  // setTodoTitleEditComplete,
  // setFilterModalOpen,
  // setHideCompleted,
  // setTagFilter,
  // clearAll,
} = gameSlice.actions;

export default gameSlice.reducer;
