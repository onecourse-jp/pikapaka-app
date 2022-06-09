import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TouchableOpacity, Platform, Image, View} from "react-native";
import {defaultStackNavigation} from "@config/navigations";
import LocalizationContext from "@context/LocalizationContext";
import {
  SCREEN_HISTORY,
  SCREEN_DETAIL_CALENDAR,
  SCREEN_PAYMENT,
  SCREEN_EDIT_CALENDAR,
  SCREEN_QUESIONAIRE_STEP2,
  SCREEN_QUESIONAIRE_STEP3,
  SCREEN_QUESIONAIRE_STEP4,
} from "../screens/screens.constants";
import MedicalHistoryScreen from "@screens/History";
import DetailCalender from "@screens/DetailCalendar";
import PaymentScreen from "@screens/Payment";
import EditCalendar from "../screens/EditCalendar";
import QuestionaireStep2 from "../screens/Questionnaire/Step2";
import QuestionaireStep3 from "../screens/Questionnaire/Step3";
import QuestionaireStep4 from "../screens/Questionnaire/Step4";

const MedicalHistoryStack = createNativeStackNavigator();
function MedicalHistoryStackScreen() {
  const {t} = React.useContext(LocalizationContext);
  return (
    // <ChatProvider>
    <MedicalHistoryStack.Navigator screenOptions={defaultStackNavigation.screenOptions}>
      <MedicalHistoryStack.Screen
        name={SCREEN_HISTORY}
        component={MedicalHistoryScreen}
        options={{
          title: "診察履歴",
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
      />
      <MedicalHistoryStack.Screen
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
      <MedicalHistoryStack.Screen name={SCREEN_PAYMENT} component={PaymentScreen} options={{title: "お会計"}} />
      <MedicalHistoryStack.Screen
        name={SCREEN_EDIT_CALENDAR}
        component={EditCalendar}
        options={{
          title: "予約詳細",
        }}
      />
      <MedicalHistoryStack.Screen
        name={SCREEN_QUESIONAIRE_STEP2}
        component={QuestionaireStep2}
        options={{
          title: "オンライン診療予約",
          headerLeft: (props) => {
            return null;
          },
        }}
      />
      <MedicalHistoryStack.Screen
        name={SCREEN_QUESIONAIRE_STEP3}
        component={QuestionaireStep3}
        options={{
          title: "オンライン診療予約",
        }}
      />
      <MedicalHistoryStack.Screen
        name={SCREEN_QUESIONAIRE_STEP4}
        component={QuestionaireStep4}
        options={{
          title: "問診票登録完了",
        }}
      />
    </MedicalHistoryStack.Navigator>
    // </ChatProvider>
  );
}

export default MedicalHistoryStackScreen;
