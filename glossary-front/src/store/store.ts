import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import glossaryReducer, { GlossaryState } from './glossary';
import mindmapReducer, { MindMapState } from './mindmap';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type ReducerType = {
  glossary: GlossaryState;
  mindmap: MindMapState;
};

const store = configureStore({
  reducer: {
    glossary: glossaryReducer,
    mindmap: mindmapReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
});


export default store;