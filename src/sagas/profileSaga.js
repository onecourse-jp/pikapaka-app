import { call, put } from 'redux-saga/effects';
import { loginTotp } from '@services/auth';
import { Alert } from 'react-native';
import { getErrorCode } from '@utils/error';
import {
  OTPRegisterSuccess,
  OTPRegisterFailed,
} from '@actions/otpRegisterAction';
import * as navigationActions from 'src/actions/navigationActions';
import AsyncStorage from '@react-native-community/async-storage';
import { setAuthority, getAuthority } from '@utils/authority';
import Config from 'react-native-config';
import { getMe } from '@services/profile';
import { UPDATE_PROFILE } from '../actions/types';

export default function* profileSaga({ resolve, reject }) {
  try {
    yield put({
      type: UPDATE_PROFILE,
      payload: { loading: true, error: false },
    });
    const { response, data } = yield call(getMe);

    if (response && (response.status === 201 || response.status === 200)) {
      yield put({
        type: UPDATE_PROFILE,
        payload: { ...data },
      });
      if (resolve) {
        resolve(data);
      }
    } else {
      if (reject) {
        reject({ response, data });
      }
    }
  } catch (e) {
    if (reject) {
      reject(e);
    }
    console.log('====================================');
    console.log('registerSaga:', e);
    console.log('====================================');
  }
}
