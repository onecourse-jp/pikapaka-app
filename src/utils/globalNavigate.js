import * as RootNavigator from "src/navigation/NavigationService";
import {Platform, Linking, Alert} from "react-native";
import {CommonActions} from "@react-navigation/native";
import {
  SCREEN_WELCOME,
  SCREEN_WEB_VIEW,
  SCREEN_CALL,
  SCREEN_SERVICE_STEP3,
  SCREEN_MODAL_LOADER,
  SCREEN_MODAL_BOTTOM,
} from "../screens/screens.constants";
import {setAuthority} from "./authority";
import {dataMedicalHistory} from "../data";
import AsyncStorage from "@react-native-community/async-storage";

export const ColorWithStatus = [
  {text: "#D38A34", background: "#FBD68F"},
  {text: "#F65151", background: "#FFAFAF"},
  {text: "#2C94C0", background: "#CEE3EC"},
  {text: "#835DD2", background: "#EBD6F5"},
  {text: "#FFFFFF", background: "#F65151"},
  {text: "#52C41A", background: "#F6FFED"},
  {text: "#666666", background: "#D9D9D9"},
];

export const goToMain = () => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: "Tabbar"}],
  });
  RootNavigator.dispatch(resetAction);
};
export const goToServiceStep3 = () => {
  RootNavigator.navigate(SCREEN_SERVICE_STEP3);
};
export const goToWelcome = () => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: SCREEN_WELCOME}],
  });
  RootNavigator.dispatch(resetAction);
};

export const showWebView = (options) => {
  if (Platform.OS !== "web") {
    if (options?.defaultWebApp) {
      Linking.openURL(options.url, "_blank");
    } else {
      RootNavigator.navigate(SCREEN_WEB_VIEW, options);
    }
  } else {
    console.log(options.url);
    const urlToOpen = new URL(options.url).toString();
    // window.open(urlToOpen);
    Linking.openURL(options.url, "_blank");
    // window.location.href = options.url;
  }
};
export const processSignIn = async (data) => {
  await setAuthority(data);
  const jsonValue = JSON.stringify(data);
  await AsyncStorage.setItem("@otp", jsonValue);
  if (data.isFromStep2) {
    goToServiceStep3();
  } else {
    goToMain();
  }
};
export const showCallScreen = async (remoteMessage) => {
  RootNavigator.navigate(SCREEN_CALL, {remoteMessage});
};

export const showFirstMessagePicker = async (onOkCallback) => {
  RootNavigator.navigate("FirstMessagePicker", {onOkCallback});
};

export const showLoadingView = (options) => {
  RootNavigator.navigate(SCREEN_MODAL_LOADER, options ?? {});
};

export const showModalBottom = (options, callback) => {
  RootNavigator.navigate(SCREEN_MODAL_BOTTOM, {
    callback,
    ...options,
  });
};

export const hideLoadingView = () => {
  if (RootNavigator?.getCurrentRoute()?.name === SCREEN_MODAL_LOADER) {
    RootNavigator.goBack();
  }
};

export const alertNeedLogin = () => {
  Alert.alert("", "ログインする必要があります", [
    {
      text: "キャンセル",
      onPress: () => {},
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => goToWelcome(),
    },
  ]);
};

export const renderMedicalHistory = (array) => {
  let result = "";
  if (array) {
    if (typeof array === "string" || typeof array === "number") {
      result += `${dataMedicalHistory[array]?.label}`;
    } else {
      array?.map((item, index) => {
        result += `${dataMedicalHistory[item]?.label}${index + 1 < array.length ? "\n" : ""}`;
      });
    }
  }
  if (result.length === 0) return null;
  return result;
};

export const renderContentAllergies = (content_allergies) => {
  let result = "";
  if (content_allergies) {
    if (typeof content_allergies === "string") {
      try {
        const newArray = JSON.parse(content_allergies);
        newArray.map((item, index) => {
          if (item != null) {
            result += `${item}${index + 1 < newArray.length ? "\n" : ""}`;
          }
        });
      } catch (error) {
        console.log("err", error);
      }
    } else {
      content_allergies?.map((item, index) => {
        if (item != null) {
          result += `${item}${index + 1 < content_allergies.length ? "\n" : ""}`;
        }
      });
    }
  }
  if (result.length === 0) return null;
  return result;
};

export const renderColorStatus = ({type = "text", status = 1}) => {
  if (type == "text") {
    return ColorWithStatus[status - 1].text;
  } else if (type == "background") {
    return ColorWithStatus[status - 1].background;
  }
};

global.goToMain = goToMain;
global.renderColorStatus = renderColorStatus;
global.showLoadingView = showLoadingView;
global.showModalBottom = showModalBottom;
global.hideLoadingView = hideLoadingView;
global.processSignIn = processSignIn;
global.alertNeedLogin = alertNeedLogin;
global.showWebView = showWebView;
global.renderMedicalHistory = renderMedicalHistory;
global.renderContentAllergies = renderContentAllergies;
global.goToServiceStep3 = goToServiceStep3;
