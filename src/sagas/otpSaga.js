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
console.log('config', Config);
export default function* otpSaga(action) {
  try {
    const response = yield call(loginTotp, {
      token: action.token,
      code: action.code,
    });
    const { data } = response;
    // console.log('===>response', data);

    const jsonValue = JSON.stringify(response.data);
    if (response.response.status === 201) {
      yield put(OTPRegisterSuccess(response.data));
      // setAuthority(data);
      yield call(setAuthority, data);
      yield call(AsyncStorage.setItem, '@otp', jsonValue);

      if (data.user.profile || Config.NEED_VERIFY_PROFILE === 'false') {
        // navigationActions.navigateToWelcome("Home");
        global.goToMain();
      } else {
        navigationActions.navigateToWelcome('');
      }
    } else {
      yield put(OTPRegisterFailed(response));
      yield call(
        navigationActions.navigationAlert({
          //   titleError: response.data.message,
          titleError: global.t(`error.${getErrorCode(response.data.message)}`),
          titleAction: global.t('text_action'),
        }),
      );
    }
  } catch (e) {
    console.log('====================================');
    console.log('registerSaga:', e);
    console.log('====================================');
  }
}
