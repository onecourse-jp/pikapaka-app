/**
 *  Redux saga class init
 */
import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import loginSaga from './loginSaga';
import masterDataSaga from './masterDataSaga';
import registerSaga from './registerSaga';
import otpRegisterSaga from './otpSaga';
import profileSaga from './profileSaga';

export default function* watch() {
  yield takeLatest(types.REGISTER_REQUEST, registerSaga);
  yield takeLatest(types.GET_PROFILE_USER, profileSaga);
  yield takeLatest(types.GET_MASTER_DATA_REQUEST, masterDataSaga);
  // yield takeLatest(types.OTP_REGISTER_REQUEST, otpRegisterSage);
  yield all([
    takeEvery(types.LOGIN_REQUEST, loginSaga),
    takeEvery(types.OTP_REGISTER_REQUEST, otpRegisterSaga),
    // takeEvery(types.GET_MASTER_DATA_REQUEST, masterDataSaga),
  ]);
}
