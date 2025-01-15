import axios from 'axios';
import { AppDispatch } from './store';
import {
  fetchTermsStart,
  fetchTermsSuccess,
  fetchTermsFailure,
} from './glossary';
import { IGlossaryItem, IMindMap } from '../model/model';
import { 
  fetchMindMapStart,
  fetchMindMapSuccess,
  fetchMindMapFailure
} from './mindmap';

const API_URL = 'http://localhost:8100';

export const fetchTerms = () => async (dispatch: AppDispatch) => {
  dispatch(fetchTermsStart());
  try {
    const response = await axios.get<IGlossaryItem[]>(`${API_URL}/glossary`);
    dispatch(fetchTermsSuccess(response.data));
  } catch (error) {
    dispatch(fetchTermsFailure((error as Error).message));
  }
};

export const fetchMindMap = () => async (dispatch: AppDispatch) => {
  dispatch(fetchMindMapStart());
  try {
    const response = await axios.get<IMindMap>(`${API_URL}/mind-map`);
    dispatch(fetchMindMapSuccess(response.data));
  } catch (error) {
    dispatch(fetchMindMapFailure((error as Error).message));
  }
};