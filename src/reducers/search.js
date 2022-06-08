import createReducer from 'src/lib/createReducer';
import { INIT_SEARCH } from '../actions/types';
const initialState = null;

export const search = createReducer(initialState, {
  [INIT_SEARCH](state, { payload, type }) {
    return payload;
  },
});
