import createReducer from 'src/lib/createReducer';
import { INIT_FORM_SEARCH } from '../actions/types';
const initialState = {
  dataFormSearch: [],
};

export const formSearch = createReducer(initialState, {
  [INIT_FORM_SEARCH](state, { payload, type }) {
    return { ...state, ...payload };
  },
});
