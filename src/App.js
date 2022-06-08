/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React, {useEffect, useCallback, useContext, Component} from "react";
import {ActivityIndicator, BackHandler, Platform, Text, View, PermissionsAndroid, Dimensions} from "react-native";
import {Provider, useSelector} from "react-redux";
import {PersistGate} from "redux-persist/es/integration/react";
import {DefaultTheme, Provider as PaperProvider, configureFonts} from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import Config from "react-native-config";
import Navigator from "./navigation";
import I18n from "src/i18n/index";
import LocalizationContext from "@context/LocalizationContext";
import configureStore from "./store/configureStore";
const {persistor, store} = configureStore();
global.store = store;
import SplashScreen from "react-native-splash-screen";
import {LogBox} from "react-native";
// console.disableYellowBox = true;
// LogBox.ignoreAllLogs(true);
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
import "src/config";
import messaging from "@react-native-firebase/messaging";
import codePush from "react-native-code-push";
// import {
//   InAppNotificationProvider,
//   withInAppNotification,
// } from 'react-native-in-app-notification';
import Modal from "react-native-modal";
import crashlytics from "@react-native-firebase/crashlytics";

import {handleNotification, notificationToDestination} from "./notificationHandler";
// import { useToast } from 'react-native-toast-notifications';
import Toast from "react-native-toast-notifications";
import {TouchableOpacity} from "react-native-gesture-handler";
import {ThemeProvider} from "react-native-theme-component";
import {yourThemeData} from "./customTheme";
import {setCustomTouchableOpacity, setCustomTextInput, setCustomText} from "react-native-global-props";
import moment from "moment";

moment.updateLocale("ja", {
  weekdays: ["日", "月", "火", "水", "木", "金", "土"],
});

const {width, height} = Dimensions.get("window");

function Entrypoint() {
  const [locale, setLocale] = React.useState("vn");
  setCustomTextInput({
    style: {
      backgroundColor: "#222C3A",
      minHeight: 54,
      borderColor: "transparent",
      borderRadius: 8,
      paddingHorizontal: 14,
      color: "#FEFEFE",
      fontSize: 17,
    },

    placeholderTextColor: "#F5F5F2",
  });
  const styleCustomTouchableOpacity = {
    hitSlop: {top: 30, right: 30, left: 30, bottom: 30},
  };
  setCustomTouchableOpacity({style: styleCustomTouchableOpacity});
  setCustomText({style: {letterSpacing: 0.7}});
  useEffect(async () => {
    const value = await AsyncStorage.getItem("@language");
    if (value !== null) {
      setLocale(value);
    }
    console.log("hide splash screen");
    SplashScreen.hide();
  }, []);
  // const toast = useToast();
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => I18n.t(scope, {locale, ...options}),
      locale,
      setLocale,
    }),
    [locale],
  );

  return (
    <ThemeProvider theme={yourThemeData}>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <LocalizationContext.Provider value={localizationContext}>
            <Navigator />
            <Toast ref={(ref) => (global["toast"] = ref)} />
          </LocalizationContext.Provider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: "0%",
      isPopUp: false,
    };
  }
  render() {
    const {percent, isPopUp} = this.state;
    return (
      <>
        <Modal
          isVisible={isPopUp}
          animationInTiming={200}
          style={{
            margin: 20,
            maxWidth: 600,
            width: width - 40,
          }}
          animationOutTiming={200}
          backdropTransitionInTiming={200}
          backdropTransitionOutTiming={200}
        >
          <View
            style={{
              position: "relative",
              height: height,
              width: "100%",
            }}
          >
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: 200,
                top: (height - 200) / 2,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 30,
                  paddingVertical: 16,
                  borderRadius: 10,
                }}
              >
                <ActivityIndicator size="large" color="#D87B76" />
                <Text style={{color: "black", marginTop: 10}}>
                  {"Downloading "}
                  {percent}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
        <Entrypoint />
      </>
    );
  }
  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("Checking for updates.");
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("Downloading package.");
        this.setState({isPopUp: true});
        // global.toast.show('showCallUi', {
        //   placement: 'top',
        //   duration: 600000,
        //   animationType: 'slide-in',
        //   offsetTop: height / 2 - 20,
        //   offset: height / 2 - 20, // offset for both top and bottom toasts
        //   swipeEnabled: false,
        //   renderToast: (toastOptions) => {n
        //     return <ActivityIndicator size="large" color="#D87B76" />;
        //   },
        // });
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log("Installing update.");
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log("Up-to-date.");
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log("Update installed.");
        this.setState({isPopUp: false});

        // global.toast.hideAll();
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    let result = (progress.receivedBytes / progress.totalBytes) * 100;
    result = result.toFixed(0).toString() + "%";
    this.setState({percent: result});
    console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
  }
}

const updateDialogOptions = {
  title: "(Phát hiện bản cập nhật mới)",
  mandatoryUpdateMessage: "Bạn có muốn cài đặt bản cập nhật mới không?",
  mandatoryContinueButtonLabel: "(Cập nhật)",
  optionalUpdateMessage: "",
  optionalIgnoreButtonLabel: "Bỏ qua",
  optionalInstallButtonLabel: "Đồng ý",
};

export default codePush({
  updateDialog: updateDialogOptions,
  deploymentKey: Config.CODEPUSH_DEPLOYMENT_KEY,
  installMode: codePush.InstallMode.IMMEDIATE,
})(MyApp);
// export default withInAppNotification(Entrypoint);
