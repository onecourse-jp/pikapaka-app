import createReducer from 'src/lib/createReducer';
import * as types from 'src/actions/types';

const initialState = {
  isWaiting: false,
};

export const payments = createReducer(initialState, {
  [types.WAITING_PAYMENT](state, action) {
    console.log('action', action);
    return {
      ...state,
      isWaiting: action.payload.isWaiting,
    };
  },
});
