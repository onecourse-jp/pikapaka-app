import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TouchableOpacity, Platform, Image, View} from "react-native";
import {
  SCREEN_HOME,
  SCREEN_TOP_SKIN_CARE,
  SCREEN_TOP_DIET,
  SCREEN_NEWS,
  SCREEN_TOP_PILL,
  SCREEN_TOP_ED,
  SCREEN_TOP_AGA,
  SCREEN_FAQ,
  SCREEN_TOP,
  SCREEN_TERMS_OF_SERVICE,
  SCREEN_PRIVACY_POLICY,
  SCREEN_COMMERCIAL_LAW,
  SCREEN_COMPANY_INFO,
  SCREEN_INQUIRY,
} from "@screens/screens.constants";
import HomeScreen from "@screens/Home";
import TopSkinCareScreen from "@screens/Home/TopSkinCare";
import TopDietScreen from "@screens/Home/TopDiet";
import TopPillScreen from "@screens/Home/TopPill";
import TopEDcreen from "@screens/Home/TopED";
import TopAGAScreen from "@screens/Home/TopAGA";
import NewsScreen from "@screens/News";
import FAQScreen from "@screens/FAQs";
import Top from "@screens/Home/Top";
import {defaultStackNavigation} from "@config/navigations";
import Colors from "@config/styles";
import I18n from "src/i18n";
import LocalizationContext from "@context/LocalizationContext";
import PrivacyPolicy from "@screens/TCareClinic/PrivacyPolicy";
import CommercialLaw from "@screens/TCareClinic/CommercialLaw";
import CompanyInfo from "@screens/TCareClinic/CompanyInfo";
import Inquiry from "@screens/Inquiry";
import TermsOfService from "@screens/TCareClinic/TermsOfService";

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  const {t} = React.useContext(LocalizationContext);
  return (
    // <ChatProvider>
    <HomeStack.Navigator screenOptions={defaultStackNavigation.screenOptions}>
      <HomeStack.Screen
        name={SCREEN_HOME}
        component={HomeScreen}
        options={{
          title: "",
          headerTitleAlign: "center",
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.color.COLOR_BACKGROUND,
          },
          headerTintColor: "#9384EF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          shadowOpacity: 0, // remove shadow on iOS
          elevation: 0, // remove shadow on Android
        }}
      />
      <HomeStack.Screen
        name={SCREEN_TOP_SKIN_CARE}
        component={TopSkinCareScreen}
        options={{
          title: "",
          headerTitleAlign: "center",
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.color.COLOR_BACKGROUND,
          },
          headerTintColor: "#9384EF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          shadowOpacity: 0, // remove shadow on iOS
          elevation: 0, // remove shadow on Android
        }}
      />
      <HomeStack.Screen
        name={SCREEN_TOP_DIET}
        component={TopDietScreen}
        options={{
          title: "",
          headerTitleAlign: "center",
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.color.COLOR_BACKGROUND,
          },
          headerTintColor: "#9384EF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          shadowOpacity: 0, // remove shadow on iOS
          elevation: 0, // remove shadow on Android
        }}
      />
      <HomeStack.Screen
        name={SCREEN_TOP_PILL}
        component={TopPillScreen}
        options={{
          title: "",
          headerTitleAlign: "center",
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.color.COLOR_BACKGROUND,
          },
          headerTintColor: "#9384EF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          shadowOpacity: 0, // remove shadow on iOS
          elevation: 0, // remove shadow on Android
        }}
      />
      <HomeStack.Screen
        name={SCREEN_TOP_ED}
        component={TopEDcreen}
        options={{
          title: "",
          headerTitleAlign: "center",
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.color.COLOR_BACKGROUND,
          },
          headerTintColor: "#9384EF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          shadowOpacity: 0, // remove shadow on iOS
          elevation: 0, // remove shadow on Android
        }}
      />
      <HomeStack.Screen
        name={SCREEN_TOP_AGA}
        component={TopAGAScreen}
        options={{
          title: "",
          headerTitleAlign: "center",
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.color.COLOR_BACKGROUND,
          },
          headerTintColor: "#9384EF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          shadowOpacity: 0, // remove shadow on iOS
          elevation: 0, // remove shadow on Android
        }}
      />
      <HomeStack.Screen
        name={SCREEN_NEWS}
        component={NewsScreen}
        options={{
          title: "",
          headerTitleAlign: "center",
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.color.COLOR_BACKGROUND,
          },
          headerTintColor: "#9384EF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          shadowOpacity: 0, // remove shadow on iOS
          elevation: 0, // remove shadow on Android
        }}
      />
      <HomeStack.Screen
        name={SCREEN_TOP}
        component={Top}
        options={{
          title: "",
          headerTitleAlign: "center",
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.color.COLOR_BACKGROUND,
          },
          headerTintColor: "#9384EF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          shadowOpacity: 0, // remove shadow on iOS
          elevation: 0, // remove shadow on Android
        }}
      />
      <HomeStack.Screen name={SCREEN_TERMS_OF_SERVICE} component={TermsOfService} options={{headerShown: false}} />
      <HomeStack.Screen name={SCREEN_PRIVACY_POLICY} component={PrivacyPolicy} options={{headerShown: false}} />
      <HomeStack.Screen name={SCREEN_COMMERCIAL_LAW} component={CommercialLaw} options={{headerShown: false}} />
      <HomeStack.Screen name={SCREEN_COMPANY_INFO} component={CompanyInfo} options={{headerShown: false}} />
      <HomeStack.Screen name={SCREEN_INQUIRY} component={Inquiry} options={{headerShown: false}} />
    </HomeStack.Navigator>
    // </ChatProvider>
  );
}

export default HomeStackScreen;
