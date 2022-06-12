import React, {useContext} from "react";
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
import TermsOfService from "@screens/TCareClinic/TermsOfService";
import PrivacyPolicy from "@screens/TCareClinic/PrivacyPolicy";
import CommercialLaw from "@screens/TCareClinic/CommercialLaw";
import CompanyInfo from "@screens/TCareClinic/CompanyInfo";
import Inquiry from "@screens/Inquiry";
import EditProfile from "@screens/Profile/EditProfile";
import ChangePassword from "@screens/Profile/ChangePassword";
import ConnectDoctor from "../screens/ConnectDoctor";
import ModalWebView from "../components/modals/modalWebView";
import CallScreen from "@screens/Call";
import DateTime from "@screens/EditCalendar/DateTime";
import ExaminationItem from "@screens/EditCalendar/ExaminationItem";
import ExaminationContent from "@screens/EditCalendar/ExaminationContent";
import DeliveryAddress from "@screens/EditCalendar/DeliveryAddress";
import DeliveryAddressPayment from "@screens/Payment/EditDeliveryAdrress";
import Confirm from "@screens/EditCalendar/Confirm";
import PaymentScreen from "@screens/Payment";
import EditName from "@screens/Profile/EditProfile/EditName";
import EditFurigana from "@screens/Profile/EditProfile/EditFurigana";
import EditGender from "@screens/Profile/EditProfile/EditGender";
import EditAllergy from "@screens/Profile/EditProfile/EditAllergy";
import EditMedicine from "@screens/Profile/EditProfile/EditMedicine";

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
  SCREEN_CALL,
  SCREEN_EDIT_CALENDAR_DATETIME,
  SCREEN_EDIT_CALENDAR_EXAMINATION_ITEM,
  SCREEN_EDIT_CALENDAR_EXAMINATION_CONTENT,
  SCREEN_EDIT_CALENDAR_ADDRESS,
  SCREEN_EDIT_CALENDAR_CONFIRM,
  SCREEN_EDIT_DELIVERY_ADDRESS,
  SCREEN_EDIT_NAME,
  SCREEN_EDIT_FURIGANA,
  SCREEN_EDIT_GENDER,
  SCREEN_EDIT_ALLERGY,
  SCREEN_EDIT_MEDICINE,
} from "@screens/screens.constants";
import {navigationRef} from "./NavigationService";

const Stack = createNativeStackNavigator();

function App() {
  const {t} = useContext(LocalizationContext);
  global.t = t;

  const linking = {
    prefixes: Config.LINKING_PREFIXES.split("|"),
    config: {
      // navigator (NavigationStack.js)
      // screens: {
      //   [SCREEN_MAIN]: {
      //     // MainStack.js
      //     screens: {
      //       Tabbar: {
      //         // BottomTabbarNavigator.js
      //         screens: {
      //           Search: {
      //             // SearchStack.js
      //             screens: { SearchIndex: 'search' },
      //           },
      //           [SCREEN_LIKE]: 'like', // thích từ đối phương
      //           [SCREEN_CHAT]: {
      //             path: 'chat/:user?',
      //             parse: {
      //               user: (user) =>
      //                 user
      //                   ? {
      //                       id: parseInt(user),
      //                     }
      //                   : undefined,
      //             },
      //           }, // 2 tabs in screen (1: matches, 2: talking/calling) // TODO: pass parameter
      //           [SCREEN_PROFILE]: {
      //             path: 'profile',
      //             screens: {
      //               [SCREEN_NOTIFICATION]: {
      //                 path: 'notification',
      //                 exact: true,
      //               },
      //               // [SCREEN_PROFILE_EDIT]: 'edit',
      //             },
      //           },
      //           // SCREEN_CHAT_STACK: {
      //           //   //(~'Chat') ChatStack.js
      //           //   screens: {
      //           //     SCREEN_CHAT:'' // Chat tab of the navigator
      //           //   },
      //           //   // Chat
      //           // },
      //         },
      //       },
      //       // [SCREEN_CHATTING]: {
      //       //   path: 'chat/:user',
      //       // },
      //     },
      //   },
      //   [SCREEN_VERIFY]: 'memberships',
      //   ['PaymentSuccess']: 'payment/success',
      //   ['PaymentFailer']: 'payment/canceled',
      //   [SCREEN_PROFILE_EDIT]: 'profile/edit',
      //   NotFound: '*',
      // },
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
          <Stack.Screen name={SCREEN_REGISTER} component={RegisterScreen} options={{title: "メールアドレスで新規登録"}} />
          <Stack.Screen name={SCREEN_WELCOME} component={Welcome} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_LOGIN} component={Login} options={{title: "メールアドレスでログイン"}} />
          <Stack.Screen name={SCREEN_WEB_VIEW} component={ModalWebView} options={{headerShown: true}} />
          <Stack.Screen name={SCREEN_PROFILE} component={ProfileScreen} options={{title: "マイページ"}} />

          <Stack.Screen name={SCREEN_EDIT_NAME} component={EditName} options={{title: "名前を変更"}} />
          <Stack.Screen name={SCREEN_EDIT_FURIGANA} component={EditFurigana} options={{title: "名前を変更"}} />
          <Stack.Screen name={SCREEN_EDIT_GENDER} component={EditGender} options={{title: "性別を変更"}} />
          <Stack.Screen name={SCREEN_EDIT_ALLERGY} component={EditAllergy} options={{title: "アレルギーの変更"}} />
          <Stack.Screen name={SCREEN_EDIT_MEDICINE} component={EditMedicine} options={{title: "服薬中の薬の変更"}} />

          <Stack.Screen name={SCREEN_EDIT_PROFILE} component={EditProfile} options={{title: "情報編集"}} />
          <Stack.Screen name={SCREEN_CALL} component={CallScreen} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_CHANGE_PASSWORD} component={ChangePassword} options={{title: "パスワードを変更"}} />
          <Stack.Screen name={SCREEN_TERMS_OF_SERVICE} component={TermsOfService} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_PRIVACY_POLICY} component={PrivacyPolicy} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_COMMERCIAL_LAW} component={CommercialLaw} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_COMPANY_INFO} component={CompanyInfo} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_INQUIRY} component={Inquiry} options={{headerShown: false}} />
          <Stack.Screen name={SCREEN_CONNECT_DOCTOR} component={ConnectDoctor} options={{title: ""}} />

          <Stack.Screen name={SCREEN_EDIT_CALENDAR_DATETIME} component={DateTime} options={{title: "予約日時変更"}} />
          <Stack.Screen name={SCREEN_EDIT_CALENDAR_EXAMINATION_ITEM} component={ExaminationItem} options={{title: "診察項目変更"}} />
          <Stack.Screen name={SCREEN_EDIT_CALENDAR_EXAMINATION_CONTENT} component={ExaminationContent} options={{title: "診察内容変更"}} />
          <Stack.Screen name={SCREEN_EDIT_CALENDAR_ADDRESS} component={DeliveryAddress} options={{title: "配送先を指定"}} />
          <Stack.Screen name={SCREEN_EDIT_CALENDAR_CONFIRM} component={Confirm} options={{title: "変更内容確認"}} />
          <Stack.Screen name={SCREEN_EDIT_DELIVERY_ADDRESS} component={DeliveryAddressPayment} options={{title: "配送先を指定"}} />
          <Stack.Screen
            name={SCREEN_RESET_PASSWORD}
            component={ResetPassword}
            options={{
              title: "パスワードを再設定",
            }}
          />
          <Stack.Screen
            name={SCREEN_FORGOT_PASSWORD}
            component={ForgotPassword}
            options={{
              title: "パスワードを再設定",
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
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
