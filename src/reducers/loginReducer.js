/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'src/lib/createReducer';
import * as types from 'src/actions/types';
const initialState = {
  requesting: false,
  successful: true,
  errors: null,
  data: null,
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state, action) {
    return {
      ...state,
      requesting: true,
      successful: false,
      data: action.email,
      errors: null,
    };
  },
  [types.LOGIN_RESPONSE](state, action) {
    return {
      ...state,
      errors: null,
      requesting: false,
      successful: true,
      data: action,
    };
  },
  [types.LOGIN_FAILED](state, action) {
    return {
      ...state,
      errors: action,
      data: null,
      requesting: false,
      successful: false,
    };
  },
  [types.CLEAR_ERROR_LOGIN](state, action) {
    return {
      ...state,
      errors: null,
    };
  },
});
