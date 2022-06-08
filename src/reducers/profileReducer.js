import createReducer from 'src/lib/createReducer';
import * as types from 'src/actions/types';
const initialState = {};

export const profileReducer = createReducer(initialState, {
  [types.GET_PROFILE_USER](state, action) {
    return {
      ...state,
      action,
    };
  },
});
