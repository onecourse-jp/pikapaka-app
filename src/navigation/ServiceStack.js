import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TouchableOpacity, Platform, Image, View} from "react-native";
import {
  SCREEN_SERVICE,
  SCREEN_QUESIONAIRE_STEP1,
  SCREEN_SERVICE_STEP1,
  SCREEN_DETAIL_CALENDAR,
  SCREEN_EDIT_CALENDAR,
  SCREEN_SERVICE_STEP2,
  SCREEN_SERVICE_STEP3,
  SCREEN_SERVICE_STEP4,
  SCREEN_SERVICE_STEP5,
  SCREEN_QUESIONAIRE_STEP2,
  SCREEN_QUESIONAIRE_STEP3,
  SCREEN_QUESIONAIRE_STEP4,
  SCREEN_PAYMENT,
  SCREEN_DETAIL_CALENDAR_AFTER_PAYMENT,
} from "@screens/screens.constants";
import QuestionaireStep1 from "@screens/Questionnaire/Step1";
import ServiceStep2 from "@screens/Service/Step2";
import ServiceStep3 from "@screens/Service/Step3";
import ServiceStep4 from "@screens/Service/Step4";
import ServiceStep5 from "@screens/Service/Step5";
import QuestionaireStep2 from "../screens/Questionnaire/Step2";
import QuestionaireStep3 from "../screens/Questionnaire/Step3";
import QuestionaireStep4 from "../screens/Questionnaire/Step4";
import ServiceStep1 from "@screens/Service/Step1";
import DetailCalender from "@screens/DetailCalendar";
import DetailAfterPayment from "@screens/DetailCalendar/DetailAfterPayment";
import ServiceScreen from "@screens/Service";
import EditCalendar from "@screens/EditCalendar";
import {defaultStackNavigation} from "@config/navigations";
import Colors from "@config/styles";
import I18n from "src/i18n";
import LocalizationContext from "@context/LocalizationContext";
import PaymentScreen from "@screens/Payment";

const ServiceStack = createNativeStackNavigator();
function ServiceStackScreen() {
  const {t} = React.useContext(LocalizationContext);
  return (
    // <ChatProvider>
    <ServiceStack.Navigator screenOptions={defaultStackNavigation.screenOptions}>
      {/* <ServiceStack.Screen
        name={SCREEN_SERVICE}
        component={ServiceScreen}
        options={{
          title: "診察窓口",
          headerTitleAlign: "center",
          headerStyle: {
            // backgroundColor: Colors.color.COLOR_BACKGROUND,
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "500",
          },
          shadowOpacity: 0, // remove shadow on iOS
          elevation: 0, // remove shadow on Android
          headerLeft: (props) => {
            return null;
          },
        }}
      /> */}

      <ServiceStack.Screen
        name={SCREEN_SERVICE_STEP1}
        component={ServiceStep1}
        options={{
          title: "診察窓口",
          headerTitleAlign: "center",
          headerStyle: {
            // backgroundColor: Colors.color.COLOR_BACKGROUND,
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "500",
          },
          shadowOpacity: 0, // remove shadow on iOS
          elevation: 0, // remove shadow on Android
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_DETAIL_CALENDAR}
        component={DetailCalender}
        options={{
          title: "オンライン診療",
          headerTitleAlign: "center",
          headerStyle: {
            // backgroundColor: Colors.color.COLOR_BACKGROUND,
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "500",
          },
          shadowOpacity: 0, // remove shadow on iOS
          elevation: 0, // remove shadow on Android
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_DETAIL_CALENDAR_AFTER_PAYMENT}
        component={DetailAfterPayment}
        options={{
          title: "履歴詳細",
          headerTitleAlign: "center",
          headerStyle: {
            // backgroundColor: Colors.color.COLOR_BACKGROUND,
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "500",
          },
          shadowOpacity: 0, // remove shadow on iOS
          elevation: 0, // remove shadow on Android
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_QUESIONAIRE_STEP1}
        component={QuestionaireStep1}
        options={{
          title: "診療窓口",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_EDIT_CALENDAR}
        component={EditCalendar}
        options={{
          title: "予約詳細",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_SERVICE_STEP2}
        component={ServiceStep2}
        options={{
          title: "予約日時選択",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_SERVICE_STEP3}
        component={ServiceStep3}
        options={{
          title: "予約情報入力",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_SERVICE_STEP4}
        component={ServiceStep4}
        options={{
          title: "入力内容確認",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_SERVICE_STEP5}
        component={ServiceStep5}
        options={{
          title: "予約完了",
        }}
      />

      <ServiceStack.Screen
        name={SCREEN_QUESIONAIRE_STEP2}
        component={QuestionaireStep2}
        options={{
          title: "オンライン診療予約",
          headerLeft: (props) => {
            return null;
          },
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_QUESIONAIRE_STEP3}
        component={QuestionaireStep3}
        options={{
          title: "オンライン診療予約",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_QUESIONAIRE_STEP4}
        component={QuestionaireStep4}
        options={{
          title: "問診票登録完了",
        }}
      />
      <ServiceStack.Screen name={SCREEN_PAYMENT} component={PaymentScreen} options={{title: "お会計"}} />
    </ServiceStack.Navigator>
    // </ChatProvider>
  );
}

export default ServiceStackScreen;
