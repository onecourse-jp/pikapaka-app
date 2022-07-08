import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TouchableOpacity, Platform, Image, View} from "react-native";
import {defaultStackNavigation} from "@config/navigations";
import Colors from "@config/styles";
import LocalizationContext from "@context/LocalizationContext";
import {

  SCREEN_FAQ,
} from "../screens/screens.constants";
import MedicalHistoryScreen from "@screens/History";
import DetailCalender from "@screens/DetailCalendar";
import FAQScreen from "@screens/FAQs";
import PaymentScreen from "@screens/Payment";
import EditCalendar from "../screens/EditCalendar";
import QuestionaireStep2 from "../screens/Questionnaire/Step2";
import QuestionaireStep3 from "../screens/Questionnaire/Step3";
import QuestionaireStep4 from "../screens/Questionnaire/Step4";
import Confirm from "@screens/EditCalendar/Confirm";
import DeliveryAddressPayment from "@screens/Payment/EditDeliveryAdrress";

const MedicalHistoryStack = createNativeStackNavigator();
function MedicalHistoryStackScreen() {
  const {t} = React.useContext(LocalizationContext);
  return (
    // <ChatProvider>
    <MedicalHistoryStack.Navigator screenOptions={defaultStackNavigation.screenOptions}>

      <MedicalHistoryStack.Screen
        name={SCREEN_FAQ}
        component={FAQScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />

    </MedicalHistoryStack.Navigator>
    // </ChatProvider>
  );
}

export default MedicalHistoryStackScreen;
