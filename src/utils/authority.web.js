import { Platform } from 'react-native';
// import * as SInfo from 'react-native-sensitive-info';

const DEFAULT_PREF = 'mySharedPrefs';
const DEFAULT_KEYCHAINSERVICE = 'myKeychain';
// import {
//   LoginManager,
//   GraphRequestManager,
//   GraphRequest,
// } from 'react-native-fbsdk';
// let GraphRequest;
// if (Platform.OS !== 'web')
//   GraphRequest = require('react-native-fbsdk').GraphRequest;
// let GraphRequestManager;
// if (Platform.OS !== 'web')
//   GraphRequestManager = require('react-native-fbsdk').GraphRequestManager;
// let LoginManager;
// if (Platform.OS !== 'web')
//   LoginManager = require('react-native-fbsdk').LoginManager;
// import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import { appleAuth } from '@invertase/react-native-apple-authentication';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SCREEN_LOGIN } from '../screens/screens.constants';
import { CommonActions } from '@react-navigation/native';
// import messaging from '@react-native-firebase/messaging';

export async function getAuthority() {
  const s = localStorage.getItem('@authority');

  if (s) {
    const obj = JSON.parse(s);
    return obj;
  }
  return null;
}

export async function setAuthority(authority) {
  const savingFirstData = localStorage.setItem(
    '@authority',
    JSON.stringify(authority)
  );
  console.log('savingFirstData', savingFirstData);
}
export function removeAuthority() {
  return localStorage.removeItem('@authority', {
    sharedPreferencesName: DEFAULT_PREF,
    keychainService: DEFAULT_KEYCHAINSERVICE,
  });
}
export async function isLogin() {
  const authority = await getAuthority();
  if (authority && authority.access_token) return true;
  return false;
}

const handleLogOutFacebook = async () => {
  const _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      // LoginManager.logOut();
    }
  };

  // Create a graph request asking for user information with a callback to handle the response.
  try {
    // const infoRequest = new GraphRequest('/me', null, _responseInfoCallback);
    // new GraphRequestManager().addRequest(infoRequest).start();
  } catch (ex) {
    console.log(ex);
  }
};
const handleLogOutGoogle = async () => {
  // try {
  //   await GoogleSignin.signOut();
  //   this.setState({ user: null }); // Remember to remove the user from your app's state as well
  // } catch (error) {
  //   console.error(error);
  // }
};
// const handleLogOutApple = async () => {
//   await appleAuth.performRequest({
//     requestedOperation: appleAuth.Operation.LOGOUT,
//   });
// };
export const resetReduxState = async () => {};

const handleLogoutFirebase = async () => {
  // try {
  //   messaging().deleteToken();
  // } catch (err) {
  //   console.log(err);
  // }
};
export const handleLogOut = async (navigation) => {
  try {
    removeAuthority();
    console.log('remove token success');
    await Promise.allSettled([
      resetReduxState(),
      handleLogOutFacebook(),
      handleLogOutGoogle(),
      // handleLogOutApple(),
      handleLogoutFirebase(),
    ]);
  } catch (error) {
    console.log('remove token false', error);
  }
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: SCREEN_LOGIN }],
  });
  navigation.dispatch(resetAction);
};
