/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call } from 'redux-saga/effects';

import { login } from '@services/auth';
import * as loginActions from 'src/actions/loginActions';
import * as navigationActions from 'src/actions/navigationActions';
import { getErrorCode } from '@utils/error';

// Our worker Saga that logins the user
export default function* loginAsync(action) {
  //how to call api
  console.log('responseresponse1111');
  try {
    const response = yield call(login, { email: action.email });
    if (response.response.status === 201 || response.response.status === 200) {
      yield put(loginActions.onLoginResponse(response.data));
      yield call(navigationActions.navigateToOTP({ email: action.email }));
    } else if (response.response.status === 404) {
      yield put(loginActions.loginFailed(response.data));
    } else {
      yield put(loginActions.loginFailed(response.data));
      yield call(
        navigationActions.navigationAlert({
          titleError: global.t(`error.${getErrorCode(response.data.message)}`),
          titleAction: global.t('text_action'),
        }),
      );
    }
  } catch (e) {
    console.log('e1111111111111111', e);
  }
}
