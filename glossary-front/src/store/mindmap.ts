import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMindMap } from '../model/model';

export interface MindMapState {
  mindmap: IMindMap | null;
  loading: boolean;
  error: string | null;
}

const initialState: MindMapState = {
  mindmap: null,
  loading: false,
  error: null,
};

const mindmapSlice = createSlice({
  name: 'mindmap',
  initialState,
  reducers: {
    fetchMindMapStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMindMapSuccess: (state, action: PayloadAction<IMindMap | null>) => {
      state.loading = false;
      state.mindmap = action.payload;
    },
    fetchMindMapFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMindMapStart, fetchMindMapSuccess, fetchMindMapFailure } =
  mindmapSlice.actions;

export default mindmapSlice.reducer;