/*
 * Reducer actions related with login
 */
import * as types from "./types";

export function updateCalendar(data) {
  return {
    type: types.UPDATE_CALENDAR,
    payload: data,
  };
}
export function changeStatusCalendar(data) {
  return {
    type: types.CHANGE_STATUS,
    payload: data,
  };
}

export function resetCalendar(data) {
  return {
    type: types.RESET_CALENDAR,
    data,
  };
}
