/*
 * Reducer actions related with login
 */
import * as types from "./types";

export function updateMedicalHistory(data) {
  return {
    type: types.UPDATE_MEDICAl_HISTORY,
    payload: data,
  };
}
export function resetMedicalHistory(data) {
  return {
    type: types.RESET_MEDICAl_HISTORY,
    data,
  };
}
