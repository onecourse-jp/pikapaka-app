import createReducer from 'src/lib/createReducer';
import { INIT_APP_LINK } from '../actions/types';
const initialState = null;

export const appLink = createReducer(initialState, {
  [INIT_APP_LINK](state, { payload, type }) {
    return payload;
  },
});
