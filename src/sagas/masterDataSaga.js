import { put, call, takeEvery } from 'redux-saga/effects';
import * as types from '@actions/types';

import * as masterDataAction from '@actions/masterDataAction';
import { masterData } from '@services/masterData';

export default function* masterDataSaga({ resolve, reject }) {
  try {
    const { response, data } = yield call(masterData);

    yield put(masterDataAction.getMasterDataSuccess(response));
    yield put(masterDataAction.masterDataProcess(data));
    if (resolve) {
      resolve(data);
    }
  } catch (err) {
    yield put(masterDataAction.masterDataFailed(err));
    if (reject) {
      reject(err);
    }
  }
}
