import React, {useContext, useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TouchableOpacity, Platform, Image} from "react-native";
import LocalizationContext from "@context/LocalizationContext";
import Config from "react-native-config";
import {defaultStackNavigation} from "@config/navigations";
import Colors from "@config/styles";
import Login from "@screens/Login";
import HomeScreen from "@screens/Home";
import RegisterScreen from "@screens/Register";
import ProfileScreen from "@screens/Profile";
import HistoryScreen from "@screens/History";
import Splash from "@screens/Splash/index";
import Home from "@screens/Home";
import Welcome from "@screens/Welcome";
import ResetPassword from "@screens/ResetPassword";
import ForgotPassword from "@screens/ForgotPassword";
import BottomTabbarNavigator from "./BottomTabbarNavigator";

import LoadingView from "../components/LoadingView";
import ModalBottom from "@components/modals/ModalBottomAction";
import ModalViewListImageOnCall from "@components/modals/ModalViewListImageOnCall";

import PrivacyPolicy from "@screens/TCareClinic/PrivacyPolicy";
import CommercialLaw from "@screens/TCareClinic/CommercialLaw";
import CompanyInfo from "@screens/TCareClinic/CompanyInfo";
import Inquiry from "@screens/Inquiry";
import EditProfile from "@screens/Profile/EditProfile";
import ChangePassword from "@screens/Profile/ChangePassword";
import ConnectDoctor from "../screens/ConnectDoctor";
import ModaConnectView from "../screens/ConnectDoctor/ModaConnectView";

import ModalWebView from "../components/modals/modalWebView";

import Confirm from "@screens/EditCalendar/Confirm";
import FAQScreen from "@screens/FAQs";
import NewsScreen from "@screens/News";

import {
  SCREEN_LOGIN,
  SCREEN_HOME,
  SCREEN_WELCOME,
  SCREEN_PROFILE,
  SCREEN_EDIT_PROFILE,
  SCREEN_HISTORY,
  SCREEN_SPLASH,
  SCREEN_REGISTER,
  SCREEN_FORGOT_PASSWORD,
  SCREEN_RESET_PASSWORD,
  SCREEN_MODAL_LOADER,
  SCREEN_MODAL_BOTTOM,
  SCREEN_TERMS_OF_SERVICE,
  SCREEN_PRIVACY_POLICY,
  SCREEN_COMMERCIAL_LAW,
  SCREEN_COMPANY_INFO,
  SCREEN_INQUIRY,
  SCREEN_CHANGE_PASSWORD,
  SCREEN_CONNECT_DOCTOR,
  SCREEN_WEB_VIEW,
  SCREEN_FAQ,
  SCREEN_NEWS,
  SCREEN_MODAL_LIST_IMAGE_CALL,
  SCREEN_CONNECT_VIEW,
  SCREEN_DETAIL_CALENDAR,
} from "@screens/screens.constants";
import {navigationRef} from "./NavigationService";
import {useNavigation} from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function App() {
  const {t} = useContext(LocalizationContext);
  global.t = t;

  const linking = {
    // prefixes: ["pikapaka:/"],
    prefixes: Config.LINKING_PREFIXES.split("|"),
    config: {
      screens: {
        Tabbar: {
          // BottomTabbarNavigator.js
          screens: {
            SERVICE: {
              // SearchStack.js
              screens: {
                [SCREEN_DETAIL_CALENDAR]: {
                  path: "reservation/:reservationId?",
                  parse: {
                    user: (reservationId) =>
                      reservationId
                        ? {
                            id: parseInt(reservationId),
                          }
                        : undefined,
                  },
                },
              },
            },
            ProfileStack: {
              // SearchStack.js
              screens: {
                [SCREEN_PROFILE]: {
                  path: "mypage",
                },
              },
            },
          },
        },
        NotFound: "*",
      },
    },
  };

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name={SCREEN_SPLASH} component={Splash} options={{headerShown: false}} />
        <Stack.Screen
          name="Tabbar"
          // component={BottomTabbarNavigator}
          options={{headerShown: false}}
        >
          {() => {
            return <BottomTabbarNavigator />;
          }}
        </Stack.Screen>

        <Stack.Group screenOptions={defaultStackNavigation.screenOptions}>
          <Stack.Screen name={SCREEN_REGISTER} component={RegisterScreen} options={{title: "????????????????????????????????????"}} />
          <Stack.Screen name={SCREEN_WELCOME} component={Welcome} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_LOGIN} component={Login} options={{title: "????????????????????????????????????"}} />
          <Stack.Screen name={SCREEN_PROFILE} component={ProfileScreen} options={{title: "???????????????"}} />
          <Stack.Screen
            name={SCREEN_NEWS}
            component={NewsScreen}
            options={{
              title: "",
              headerShown: false,
            }}
          />

          <Stack.Screen name={SCREEN_EDIT_PROFILE} component={EditProfile} options={{title: "????????????"}} />
          <Stack.Screen name={SCREEN_CHANGE_PASSWORD} component={ChangePassword} options={{title: "????????????????????????"}} />
          <Stack.Screen name={SCREEN_PRIVACY_POLICY} component={PrivacyPolicy} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_COMMERCIAL_LAW} component={CommercialLaw} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_COMPANY_INFO} component={CompanyInfo} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_INQUIRY} component={Inquiry} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_CONNECT_DOCTOR} component={ConnectDoctor} options={{title: ""}} />

          <Stack.Screen
            name={SCREEN_RESET_PASSWORD}
            component={ResetPassword}
            options={{
              title: "???????????????????????????",
            }}
          />
          <Stack.Screen
            name={SCREEN_FORGOT_PASSWORD}
            component={ForgotPassword}
            options={{
              title: "???????????????????????????",
            }}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            presentation: "transparentModal",
            modalBackgroundOpacity: 0.5,
            animationEnabled: true,
            headerShown: false,
            cardStyle: {backgroundColor: "transparent"},
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({current: {progress}}) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: "clamp",
                }),
              },
            }),
          }}
        >
          <Stack.Screen name={SCREEN_MODAL_LOADER} component={LoadingView} options={{headerShown: false, animation: "none"}} />
          <Stack.Screen name={SCREEN_MODAL_BOTTOM} component={ModalBottom} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_MODAL_LIST_IMAGE_CALL} component={ModalViewListImageOnCall} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_CONNECT_VIEW} component={ModaConnectView} options={{headerShown: true, title: ""}} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            presentation: "fullScreenModal",
          }}
        >
          <Stack.Screen name={SCREEN_WEB_VIEW} component={ModalWebView} options={{headerShown: true}} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
