import { call, put } from "redux-saga/effects";
import { postProfile } from "@services/profile";
import { Alert } from "react-native";
import {
  OTPRegisterSuccess,
  OTPRegisterFailed,
} from "@actions/otpRegisterAction";
import * as navigationActions from "src/actions/navigationActions";
import AsyncStorage from "@react-native-community/async-storage";

export default function* otpProfile(action) {
  try {
    const response = yield call(postProfile, {
        userId: action.userId,
        dataProfiles: action.dataProfiles,
    });
    // const { data } = response;
    // const jsonValue = JSON.stringify(response.data);
    // if (response.response.status === 201) {
    //   yield put(OTPRegisterSuccess(response.data));
    //   yield call(
    //     AsyncStorage.setItem,
    //     "@access_token",
    //     response.data.access_token
    //   );
    //   yield call(AsyncStorage.setItem, "@otp", jsonValue);

    //   if (data.profile) {
    //     yield call(navigationActions.navigateToWelcome("Home"));
    //   } else {
    //     yield call(navigationActions.navigateToWelcome(""));
    //   }
    // } else {
    //   yield put(OTPRegisterFailed(response));
    //   setTimeout(() => {
    //     Alert.alert("Error", response.data.message);
    //   }, 200);
    // }
  } catch (e) {
    console.log("====================================");
    console.log("registerSaga:" + e);
    console.log("====================================");
  }
}
