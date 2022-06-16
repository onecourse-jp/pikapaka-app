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
import EditPhoneNumber from "../screens/Profile/EditProfile/EditPhoneNumber";
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
      <ServiceStack.Screen name={SCREEN_EDIT_NAME} component={EditName} options={{title: "名前を変更"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_FURIGANA} component={EditFurigana} options={{title: "名前を変更"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_GENDER} component={EditGender} options={{title: "性別を変更"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_ALLERGY} component={EditAllergy} options={{title: "アレルギーの変更"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_MEDICINE} component={EditMedicine} options={{title: "服薬中の薬の変更"}} />
      <ServiceStack.Screen name={SCREEN_EDIT_PHONE_NUMBER} component={EditPhoneNumber} options={{title: "電話番号"}} />
      <ServiceStack.Screen
        name={SCREEN_EDIT_POSTAL_CODE}
        component={EditPostalCode}
        options={{
          title: "郵便番号",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_EDIT_BIRTHDAY}
        component={EditBirthday}
        options={{
          title: "生年月日",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_EDIT_ADDRESS}
        component={EditAddress}
        options={{
          title: "住所",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_EDIT_YES_NO_FORM}
        component={EditYesNoForm}
        options={{
          title: "情報編集",
        }}
      />
      <ServiceStack.Screen
        name={SCREEN_EDIT_MEDICAL_HISTORY}
        component={EditMedicalHistory}
        options={{
          title: "情報編集",
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
