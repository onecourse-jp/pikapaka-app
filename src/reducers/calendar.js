import createReducer from "src/lib/createReducer";
import {UPDATE_CALENDAR, RESET_CALENDAR, CHANGE_STATUS} from "@actions/types";
const initialState = {
  currentStep: 1,
  finish: false,
  data: null,
  status: false,
};

export const calendar = createReducer(initialState, {
  [UPDATE_CALENDAR](state, {payload, type}) {
    return {...state, currentStep: payload?.currentStep, finish: payload?.finish || false, data: {...state.data, ...payload?.data}};
  },
  [RESET_CALENDAR](state, {payload, type}) {
    return initialState;
  },
  [CHANGE_STATUS](state, {payload, type}) {
    return {...state, status: !state.status};
  },
});
