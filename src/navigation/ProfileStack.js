import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TouchableOpacity, Platform, Image, View} from "react-native";
import {defaultStackNavigation} from "@config/navigations";
import LocalizationContext from "@context/LocalizationContext";
import {
  SCREEN_PAYMENT,
  SCREEN_PROFILE,
  SCREEN_EDIT_NAME,
  SCREEN_EDIT_FURIGANA,
  SCREEN_EDIT_GENDER,
  SCREEN_EDIT_ALLERGY,
  SCREEN_EDIT_MEDICINE,
  SCREEN_EDIT_POSTAL_CODE,
  SCREEN_EDIT_ADDRESS,
  SCREEN_EDIT_YES_NO_FORM,
  SCREEN_EDIT_MEDICAL_HISTORY,
  SCREEN_EDIT_BIRTHDAY,
  SCREEN_EDIT_PHONE_NUMBER,
  SCREEN_EDIT_EMAIL_ADDRESS,
  SCREEN_HISTORY,
  SCREEN_DETAIL_CALENDAR,
  SCREEN_EDIT_CALENDAR,
  SCREEN_QUESIONAIRE_STEP2,
  SCREEN_QUESIONAIRE_STEP3,
  SCREEN_QUESIONAIRE_STEP4,
  SCREEN_EDIT_CALENDAR_CONFIRM,
  SCREEN_EDIT_DELIVERY_ADDRESS,
} from "../screens/screens.constants";
import ProfileScreen from "@screens/Profile";
import EditName from "@screens/Profile/EditProfile/EditName";
import EditFurigana from "@screens/Profile/EditProfile/EditFurigana";
import EditGender from "@screens/Profile/EditProfile/EditGender";
import EditAllergy from "@screens/Profile/EditProfile/EditAllergy";
import EditMedicine from "@screens/Profile/EditProfile/EditMedicine";
import EditPostalCode from "../screens/Profile/EditProfile/EditPostalCode";
import EditAddress from "../screens/Profile/EditProfile/EditAddress";
import EditYesNoForm from "../screens/Profile/EditProfile/EditYesNoForm";
import EditMedicalHistory from "../screens/Profile/EditProfile/EditMedicalHistory";
import EditBirthday from "../screens/Profile/EditProfile/EditBirthday";
import EditPhoneNumber from "../screens/Profile/EditProfile/EditPhoneNumber";
import EditEmailAddress from "@screens/Profile/EditProfile/EditEmailAddress";
import MedicalHistoryScreen from "@screens/History";
import DetailCalender from "@screens/DetailCalendar";
import PaymentScreen from "@screens/Payment";
import EditCalendar from "../screens/EditCalendar";
import QuestionaireStep2 from "../screens/Questionnaire/Step2";
import QuestionaireStep3 from "../screens/Questionnaire/Step3";
import QuestionaireStep4 from "../screens/Questionnaire/Step4";
import Confirm from "@screens/EditCalendar/Confirm";
import DeliveryAddressPayment from "@screens/Payment/EditDeliveryAdrress";

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
  const {t} = React.useContext(LocalizationContext);
  return (
    // <ChatProvider>
    <ProfileStack.Navigator screenOptions={defaultStackNavigation.screenOptions}>
      <ProfileStack.Screen
        name={SCREEN_PROFILE}
        component={ProfileScreen}
        options={{
          title: "???????????????",
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
      <ProfileStack.Screen
        name={SCREEN_HISTORY}
        component={MedicalHistoryScreen}
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
      />
      <ProfileStack.Screen name={SCREEN_EDIT_EMAIL_ADDRESS} component={EditEmailAddress} options={{title: "?????????????????????"}} />
      <ProfileStack.Screen name={SCREEN_EDIT_NAME} component={EditName} options={{title: "???????????????"}} />
      <ProfileStack.Screen name={SCREEN_EDIT_FURIGANA} component={EditFurigana} options={{title: "???????????????"}} />
      <ProfileStack.Screen name={SCREEN_EDIT_GENDER} component={EditGender} options={{title: "???????????????"}} />
      <ProfileStack.Screen name={SCREEN_EDIT_ALLERGY} component={EditAllergy} options={{title: "????????????????????????"}} />
      <ProfileStack.Screen name={SCREEN_EDIT_MEDICINE} component={EditMedicine} options={{title: "????????????????????????"}} />
      <ProfileStack.Screen name={SCREEN_EDIT_PHONE_NUMBER} component={EditPhoneNumber} options={{title: "????????????"}} />
      <ProfileStack.Screen
        name={SCREEN_EDIT_POSTAL_CODE}
        component={EditPostalCode}
        options={{
          title: "????????????",
        }}
      />
      <ProfileStack.Screen
        name={SCREEN_EDIT_BIRTHDAY}
        component={EditBirthday}
        options={{
          title: "????????????",
        }}
      />
      <ProfileStack.Screen
        name={SCREEN_EDIT_ADDRESS}
        component={EditAddress}
        options={{
          title: "??????",
        }}
      />
      <ProfileStack.Screen
        name={SCREEN_EDIT_YES_NO_FORM}
        component={EditYesNoForm}
        options={{
          title: "????????????",
        }}
      />
      <ProfileStack.Screen
        name={SCREEN_EDIT_MEDICAL_HISTORY}
        component={EditMedicalHistory}
        options={{
          title: "????????????",
        }}
      />
      <ProfileStack.Screen name={SCREEN_PAYMENT} component={PaymentScreen} options={{title: "?????????"}} />
      <ProfileStack.Screen name={SCREEN_EDIT_CALENDAR_CONFIRM} component={Confirm} options={{title: "??????????????????"}} />
      <ProfileStack.Screen
        name={SCREEN_EDIT_CALENDAR}
        component={EditCalendar}
        options={{
          title: "????????????",
        }}
      />
      <ProfileStack.Screen
        name={SCREEN_QUESIONAIRE_STEP2}
        component={QuestionaireStep2}
        options={{
          title: "???????????????????????????",
          headerLeft: (props) => {
            return null;
          },
        }}
      />
      <ProfileStack.Screen
        name={SCREEN_QUESIONAIRE_STEP3}
        component={QuestionaireStep3}
        options={{
          title: "???????????????????????????",
        }}
      />
      <ProfileStack.Screen
        name={SCREEN_QUESIONAIRE_STEP4}
        component={QuestionaireStep4}
        options={{
          title: "?????????????????????",
        }}
      />
      <ProfileStack.Screen name={SCREEN_EDIT_DELIVERY_ADDRESS} component={DeliveryAddressPayment} options={{title: "??????????????????"}} />
    </ProfileStack.Navigator>
    // </ChatProvider>
  );
}

export default ProfileStackScreen;
