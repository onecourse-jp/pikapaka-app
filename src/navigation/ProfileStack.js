import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TouchableOpacity, Platform, Image, View} from "react-native";
import {defaultStackNavigation} from "@config/navigations";
import LocalizationContext from "@context/LocalizationContext";
import {SCREEN_PAYMENT, SCREEN_PROFILE} from "../screens/screens.constants";
import ProfileScreen from "@screens/Profile";
import PaymentScreen from "@screens/Payment";

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
          title: "マイページ",
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
      <ProfileStack.Screen name={SCREEN_PAYMENT} component={PaymentScreen} options={{title: "お会計"}} />
    </ProfileStack.Navigator>
    // </ChatProvider>
  );
}

export default ProfileStackScreen;
