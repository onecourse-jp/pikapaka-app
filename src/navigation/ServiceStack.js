import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TouchableOpacity, Platform, Image, View} from "react-native";
import {
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
  SCREEN_EDIT_NAME,
  SCREEN_EDIT_FURIGANA,
  SCREEN_EDIT_GENDER,
  SCREEN_EDIT_ALLERGY,
  SCREEN_EDIT_MEDICINE,
  SCREEN_EDIT_POSTAL_CODE,
  SCREEN_EDIT_ADDRESS,
  SCREEN_EDIT_YES_NO_FORM,
  SCREEN_EDIT_MEDICAL_HISTORY,
  SCREEN_EDIT_PHONE_NUMBER,
  SCREEN_EDIT_BIRTHDAY,
  SCREEN_EDIT_EMAIL_ADDRESS,
  SCREEN_EDIT_CALENDAR_CONFIRM,
  SCREEN_EDIT_CALENDAR_DATETIME,
  SCREEN_EDIT_CALENDAR_EXAMINATION_ITEM,
  SCREEN_EDIT_CALENDAR_EXAMINATION_CONTENT,
  SCREEN_EDIT_DELIVERY_ADDRESS,
  SCREEN_EDIT_CALENDAR_ADDRESS,
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
import EditCalendar from "@screens/EditCalendar";
import {defaultStackNavigation} from "@config/navigations";
import LocalizationContext from "@context/LocalizationContext";
import PaymentScreen from "@screens/Payment";
import EditName from "@screens/Profile/EditProfile/EditName";
import EditFurigana from "@screens/Profile/EditProfile/EditFurigana";
import EditGender from "@screens/Profile/EditProfile/EditGender";
import EditAllergy from "@screens/Profile/EditProfile/EditAllergy";
import EditMedicine from "@screens/Profile/EditProfile/EditMedicine";
import EditPostalCode from "@screens/Profile/EditProfile/EditPostalCode";
import EditAddress from "@screens/Profile/EditProfile/EditAddress";
import EditYesNoForm from "@screens/Profile/EditProfile/EditYesNoForm";
import EditMedicalHistory from "@screens/Profile/EditProfile/EditMedicalHistory";
import EditBirthday from "@screens/Profile/EditProfile/EditBirthday";
import EditEmailAddress from "@screens/Profile/EditProfile/EditEmailAddress";
import EditPhoneNumber from "../screens/Profile/EditProfile/EditPhoneNumber";
import DateTime from "@screens/EditCalendar/DateTime";
import ExaminationItem from "@screens/EditCalendar/ExaminationItem";
import ExaminationContent from "@screens/EditCalendar/ExaminationContent";
import DeliveryAddress from "@screens/EditCalendar/DeliveryAddress";
import DeliveryAddressPayment from "@screens/Payment/EditDeliveryAdrress";
import Confirm from "@screens/EditCalendar/Confirm";

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
          title: "????????????",
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
          title: "????????????",
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
          headerLeft: () => null,
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_DETAIL_CALENDAR}
        component={DetailCalender}
        options={{
          title: "?????????????????????",
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
          headerLeft: () => <></>,
        }}
      />
      <ServiceStack.Screen name={SCREEN_EDIT_CALENDAR_CONFIRM} component={Confirm} options={{title: "??????????????????"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_CALENDAR_DATETIME} component={DateTime} options={{title: "??????????????????"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_CALENDAR_EXAMINATION_ITEM} component={ExaminationItem} options={{title: "??????????????????"}} />
      <ServiceStack.Screen
        name={SCREEN_EDIT_CALENDAR_EXAMINATION_CONTENT}
        component={ExaminationContent}
        options={{title: "??????????????????"}}
      />
      <ServiceStack.Screen name={SCREEN_EDIT_CALENDAR_ADDRESS} component={DeliveryAddress} options={{title: "??????????????????"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_DELIVERY_ADDRESS} component={DeliveryAddressPayment} options={{title: "??????????????????"}} />
      {/* <ServiceStack.Screen name={SCREEN_EDIT_CALENDAR_CONFIRM} component={Confirm} options={{title: "??????????????????"}} /> */}
      <ServiceStack.Screen name={SCREEN_EDIT_EMAIL_ADDRESS} component={EditEmailAddress} options={{title: "?????????????????????"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_NAME} component={EditName} options={{title: "???????????????"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_FURIGANA} component={EditFurigana} options={{title: "???????????????"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_GENDER} component={EditGender} options={{title: "???????????????"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_ALLERGY} component={EditAllergy} options={{title: "????????????????????????"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_MEDICINE} component={EditMedicine} options={{title: "????????????????????????"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_PHONE_NUMBER} component={EditPhoneNumber} options={{title: "????????????"}} />
      <ServiceStack.Screen
        name={SCREEN_EDIT_POSTAL_CODE}
        component={EditPostalCode}
        options={{
          title: "????????????",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_EDIT_BIRTHDAY}
        component={EditBirthday}
        options={{
          title: "????????????",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_EDIT_ADDRESS}
        component={EditAddress}
        options={{
          title: "??????",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_EDIT_YES_NO_FORM}
        component={EditYesNoForm}
        options={{
          title: "????????????",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_EDIT_MEDICAL_HISTORY}
        component={EditMedicalHistory}
        options={{
          title: "????????????",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_DETAIL_CALENDAR_AFTER_PAYMENT}
        component={DetailAfterPayment}
        options={{
          title: "????????????",
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
          title: "????????????",
          headerLeft: () => <></>,
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_EDIT_CALENDAR}
        component={EditCalendar}
        options={{
          title: "????????????",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_SERVICE_STEP2}
        component={ServiceStep2}
        options={{
          title: "??????????????????",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_SERVICE_STEP3}
        component={ServiceStep3}
        options={{
          title: "??????????????????",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_SERVICE_STEP4}
        component={ServiceStep4}
        options={{
          title: "??????????????????",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_SERVICE_STEP5}
        component={ServiceStep5}
        options={{
          title: "????????????",
          headerLeft: () => <></>,
        }}
      />

      <ServiceStack.Screen
        name={SCREEN_QUESIONAIRE_STEP2}
        component={QuestionaireStep2}
        options={{
          title: "???????????????????????????",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_QUESIONAIRE_STEP3}
        component={QuestionaireStep3}
        options={{
          title: "???????????????????????????",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_QUESIONAIRE_STEP4}
        component={QuestionaireStep4}
        options={{
          title: "?????????????????????",
          headerLeft: () => <></>,
        }}
      />
      <ServiceStack.Screen name={SCREEN_PAYMENT} component={PaymentScreen} options={{title: "?????????"}} />
    </ServiceStack.Navigator>
    // </ChatProvider>
  );
}

export default ServiceStackScreen;
