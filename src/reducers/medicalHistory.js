import createReducer from "src/lib/createReducer";
import {UPDATE_MEDICAl_HISTORY, RESET_MEDICAl_HISTORY} from "@actions/types";
const initialState = {
  data: null,
};

export const medicalHistory = createReducer(initialState, {
  [UPDATE_MEDICAl_HISTORY](state, {payload, type}) {
    return {...state, ...payload.data};
  },
  [RESET_MEDICAl_HISTORY](state, {payload, type}) {
    return initialState;
  },
});
