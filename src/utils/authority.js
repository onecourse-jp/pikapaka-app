import {Platform} from "react-native";
let SInfo;
if (Platform.OS !== "web") SInfo = require("react-native-sensitive-info");
else SInfo = require("react-native-web-storage").storage;
const DEFAULT_PREF = "mySharedPrefs";
const DEFAULT_KEYCHAINSERVICE = "myKeychain";
let GraphRequest;
if (Platform.OS !== "web") GraphRequest = require("react-native-fbsdk").GraphRequest;
let GraphRequestManager;
if (Platform.OS !== "web") GraphRequestManager = require("react-native-fbsdk").GraphRequestManager;
let LoginManager;
if (Platform.OS !== "web") LoginManager = require("react-native-fbsdk").LoginManager;
import {appleAuth} from "@invertase/react-native-apple-authentication";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {SCREEN_WELCOME} from "../screens/screens.constants";
import {CommonActions} from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import Config from "react-native-config";
import {updateUserProfile} from "@actions/users";

export async function getAuthority() {
  const s = await SInfo.getItem("@authority", {
    sharedPreferencesName: DEFAULT_PREF,
    keychainService: DEFAULT_KEYCHAINSERVICE,
  });

  if (s) {
    const obj = JSON.parse(s);
    return obj;
  }
  return null;
}

export async function setAuthority(authority) {
  const savingFirstData = await SInfo.setItem("@authority", JSON.stringify(authority), {
    sharedPreferencesName: DEFAULT_PREF,
    keychainService: DEFAULT_KEYCHAINSERVICE,
  });
  console.log("savingFirstData", savingFirstData);
}
export function removeAuthority() {
  return SInfo.deleteItem("@authority", {
    sharedPreferencesName: DEFAULT_PREF,
    keychainService: DEFAULT_KEYCHAINSERVICE,
  });
}
export async function isLogin() {
  const authority = await getAuthority();
  console.log("authority", authority);
  if (authority && authority?.data?.access_token) return true;
  return false;
}

const handleLogOutFacebook = async () => {
  const _responseInfoCallback = (error, result) => {
    if (error) {
      console.log("Error fetching data: " + error.toString());
    } else {
      LoginManager.logOut();
    }
  };

  // Create a graph request asking for user information with a callback to handle the response.
  try {
    const infoRequest = new GraphRequest("/me", null, _responseInfoCallback);
    new GraphRequestManager().addRequest(infoRequest).start();
  } catch (ex) {
    console.log(ex);
  }
};
const handleLogOutGoogle = async () => {
  GoogleSignin.configure({
    webClientId: Config.GOOGLE_CLIENT_ID,
  });
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};
const handleLogOutApple = async () => {
  if (Platform === "ios") {
    try {
      await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGOUT,
      });
    } catch (error) {
      console.error(error);
    }
  }
};
export const resetReduxState = async () => {};

const handleLogoutFirebase = async () => {
  try {
    messaging().deleteToken();
  } catch (err) {
    console.log(err);
  }
};

export const handleLogOut = async (navigation, dispatch) => {
  try {
    dispatch(updateUserProfile(null));
    removeAuthority();
    // console.log('remove token success');
    // global.socket.disconnect();
    // global.socket = null;
    await Promise.all([
      resetReduxState(),
      handleLogOutFacebook(),
      handleLogOutGoogle(),
      handleLogOutApple(),

      // handleLogoutFirebase(),
    ]);
  } catch (error) {
    console.log("remove token false", error);
  }
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: SCREEN_WELCOME}],
  });
  navigation.dispatch(resetAction);
};
