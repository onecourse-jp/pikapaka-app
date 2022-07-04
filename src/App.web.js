/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React, {useEffect, useCallback, useContext} from "react";
import {ActivityIndicator, BackHandler, Platform, Text} from "react-native";
import {Provider, useSelector} from "react-redux";
import {PersistGate} from "redux-persist/es/integration/react";
import {DefaultTheme, Provider as PaperProvider, configureFonts} from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";

import Navigator from "./navigation";
import I18n from "src/i18n/index";
import LocalizationContext from "@context/LocalizationContext";
import configureStore from "./store/configureStore";
const {persistor, store} = configureStore();
global.store = store;
import {LogBox} from "react-native";
// console.disableYellowBox = true;
LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
import "src/config";
// import messaging from '@react-native-firebase/messaging';
// import {
//   InAppNotificationProvider,
//   withInAppNotification,
// } from 'react-native-in-app-notification';

import Config from "react-native-config";
import {handleNotification, notificationToDestination} from "./notificationHandler";
// import { useToast } from 'react-native-toast-notifications';
import Toast from "react-native-toast-notifications";
import {TouchableOpacity} from "react-native-gesture-handler";

import {ThemeProvider} from "react-native-theme-component";
import {yourThemeData} from "./customTheme";

const fontConfig = {
  web: {
    regular: {
      fontFamily: "NotoSansJP-Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "NotoSansJP-Medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "NotoSansJP-Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "NotoSansJP-Thin",
      fontWeight: "normal",
    },
  },
  ios: {
    regular: {
      fontFamily: "NotoSansJP-Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "NotoSansJP-Medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "NotoSansJP-Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "NotoSansJP-Thin",
      fontWeight: "normal",
    },
  },
  android: {
    regular: {
      fontFamily: "NotoSansJP-Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "NotoSansJP-Medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "NotoSansJP-Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "NotoSansJP-Thin",
      fontWeight: "normal",
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  padding: 16,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
    // primary: '#3498db',
    // accent: '#f1c40f',
  },
  fonts: configureFonts(fontConfig),
};

// Register background handler
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('Message handled in the background!', remoteMessage);
//   console.log(global.store.getState());
//   console.log(global.store.getState()._persist);
//   // wait for redux store to rehydrated if notification received when the app is not running (quit)
//   while (!global.store.getState()?._persist?.rehydrated) {
//     await new Promise((resolve) => setTimeout(resolve, 100));
//   }
//   console.log(global.store.getState()._persist);
//   handleNotification(remoteMessage);
// });

function Entrypoint() {
  const [locale, setLocale] = React.useState("ja");
  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  //   };
  // }, [handleBackButton]);
  const handleBackButton = useCallback(() => {
    return true;
  });
  useEffect(async () => {
    const value = await AsyncStorage.getItem("@language");
    if (value !== null) {
      setLocale(value);
    }
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
            <Toast
              ref={(ref) => (global["toast"] = ref)}
              successColor="rgba(82, 196, 26, 1)"
              offset={80}
              textStyle={{width: "100%", textAlign: "center"}}
            />
          </LocalizationContext.Provider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
export default Entrypoint;
// export default withInAppNotification(Entrypoint);
