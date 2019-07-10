import { combineReducers, Reducer } from 'redux';
import { reducers } from '../models';
import { EnhanceState } from './../../indexs';

declare global {
  type RootState = Readonly<ReturnType<typeof rootReducers>>;
}

export const rootReducers: Reducer<EnhanceState<typeof reducers>> = combineReducers(reducers);
