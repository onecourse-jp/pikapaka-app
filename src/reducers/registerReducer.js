/* Login Reducer
 * handles login states in the app
 */
import createReducer from "src/lib/createReducer";
import * as types from "src/actions/types";
const initialState = {
  requesting: false,
  successful: false,
  errors: null,
  data: null,
};

export const registerReducer = createReducer(initialState, {
  [types.REGISTER_REQUEST](state, action) {
    // console.log(action);
    // let requestingState = true;
    // let dataState = action;
    // if(action == undefined || action.email == undefined){
    //   requestingState = false;
    //   dataState = null;
    // }
    return {
      ...state,
      requesting: true,
      successful: false,
      errors: null,
      data: action,
    };
  },
  [types.REGISTER_SUCCESS](state, action) {
    return {
      ...state,
      requesting: false,
      successful: true,
      errors: null,
      data: action,
    };
  },
  [types.REGISTER_FAILED](state, action) {
    return {
      ...state,
      requesting: false,
      successful: true,
      errors: action,
      data: null,
    };
  },
  [types.REGISTER_RESET](state, action) {
    return {
      ...state,
      requesting: false,
      successful: false,
      errors: null,
      data: null,
    };
  },
});
