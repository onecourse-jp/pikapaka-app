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
        name={SCREEN_FAQ}
        component={FAQScreen}
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
    </HomeStack.Navigator>
    // </ChatProvider>
  );
}

export default HomeStackScreen;
