import { put, call, takeEvery } from "redux-saga/effects";
import * as types from "@actions/types";

import * as usersAction from "@actions/users";
import { getMe } from "@services/profile";

export default function* me() {
  try {
    const { response, data } = yield call(getMe);
    yield put(usersAction.getUserInfoSuccess(data));
  } catch (err) {
    // yield put(masterDataAction.masterDataFailed(err));
  }
}
