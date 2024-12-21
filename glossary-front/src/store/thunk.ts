import axios from 'axios';
import { AppDispatch } from './store';
import {
  fetchTermsStart,
  fetchTermsSuccess,
  fetchTermsFailure,
} from './glossary';
import { IGlossaryItem } from '../model/model';

const API_URL = 'http://localhost:8000/terms';

export const fetchTerms = () => async (dispatch: AppDispatch) => {
  dispatch(fetchTermsStart());
  try {
    const response = await axios.get<IGlossaryItem[]>(API_URL);
    dispatch(fetchTermsSuccess(response.data));
  } catch (error) {
    dispatch(fetchTermsFailure((error as Error).message));
  }
};

export const addTerm = (termData: IGlossaryItem) => async (dispatch: AppDispatch) => {
  try {
    await axios.post(API_URL, termData);
    dispatch(fetchTerms());
  } catch (error) {
    console.error(error);
  }
};

export const deleteTerm = (term: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/${term}`);
    dispatch(fetchTerms());
  } catch (error) {
    console.error(error);
  }
};