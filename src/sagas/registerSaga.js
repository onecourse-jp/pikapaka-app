import { call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { register } from '@services/auth';
import * as registerAction from '@actions/registerAction';
import * as navigationActions from 'src/actions/navigationActions';
import { getErrorCode } from '@utils/error';

export default function* registerSaga(action) {
  try {
    const response = yield call(register, { email: action.email });
    console.log('responseresponse', response);

    if (response.response.status === 201 || response.response.status === 200) {
      yield put(registerAction.registerRequestSuccess(response.data));
      yield call(
        navigationActions.navigateToOTPRegister({ email: action.email }),
      );
    } else if (response.response.status === 409) {
      yield put(registerAction.registerRequestFailure(response.data));
    } else {
      yield put(registerAction.registerRequestFailure(response.data));
      yield call(
        navigationActions.navigationAlert({
          titleError: global.t(`error.${getErrorCode(response.data.message)}`),
          titleAction: global.t('text_action'),
        }),
      );
    }
  } catch (e) {
    console.log('e1', e);
  }
}
