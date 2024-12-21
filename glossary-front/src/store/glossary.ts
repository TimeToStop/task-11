import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGlossaryItem } from '../model/model';

export interface GlossaryState {
  terms: IGlossaryItem[];
  loading: boolean;
  error: string | null;
}

const initialState: GlossaryState = {
  terms: [],
  loading: false,
  error: null,
};

const glossarySlice = createSlice({
  name: 'glossary',
  initialState,
  reducers: {
    fetchTermsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTermsSuccess: (state, action: PayloadAction<IGlossaryItem[]>) => {
      state.loading = false;
      state.terms = action.payload;
    },
    fetchTermsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchTermsStart, fetchTermsSuccess, fetchTermsFailure } =
  glossarySlice.actions;

export default glossarySlice.reducer;