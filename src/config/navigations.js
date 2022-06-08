import React from "react";
import {Image, Text, Platform} from "react-native";
import Colors from "@config/styles";
import {TouchableOpacity} from "react-native";

const screenOptions = ({navigation}) => ({
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "#333333",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  keyboardHidesTabBar: true,
  headerTitleAlign: "center",
  headerHideShadow: true,
  headerLeft: (props) => {
    if (navigation.canGoBack()) {
      return (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 15,
            paddingRight: 20,
          }}
        >
          <Image source={require("@assets/images/icons/ic_back.png")} resizeMode="cover" />
        </TouchableOpacity>
      );
    }
    return null;
  },
  // headerBackImageSource: require("@assets/images/icons/ic_back.png"),
});
const defaultStackNavigation = {screenOptions};
export {defaultStackNavigation};
