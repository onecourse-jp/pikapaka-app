import createReducer from "src/lib/createReducer";
import * as types from "src/actions/types";

const initialState = {
  requesting: false,
  successful: true,
  errors: null,
  data: null,
};

export const otpReducer = createReducer(initialState, {
 
  [types.OTP_REGISTER_REQUEST](state, action) {
    return {
        ...state,
        requesting: true,
        successful: false,
        data: action,
        errors: null,
    }
  },
  [types.OTP_REGISTER_SUCCESS](state, action){
    return{
        ...state,
        errors: null,
        requesting: false,
        successful: true,
        data:action
    }
  },
  [types.OTP_REGISTER_FAILED](state, action) {
    return {
        ...state,
        errors: action,
        data: null,
        requesting: false,
        successful: false,
    }
  }
});
