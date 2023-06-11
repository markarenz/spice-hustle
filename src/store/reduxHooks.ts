import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, GameDispatch } from './store';

export const useGameSliceDispatch = () => useDispatch<GameDispatch>();
export const useGameSliceSelector: TypedUseSelectorHook<RootState> = useSelector;
