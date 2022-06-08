import * as React from "react";
import {Text, View, TouchableOpacity, Image, StyleSheet, Platform, Animated} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {defaultStackNavigation} from "@config/navigations";
import {ChatProvider} from "../providers/chatProvider";
// import CardStackStyleInterpolator from 'react-navigation/lib/views/CardStack/CardStackStyleInterpolator';
const RootStack = createStackNavigator();
const Stack = createNativeStackNavigator();
const MyCustomHeaderBackImage = () => (
  <Image
    source={require("@assets/images/icons/ic_back.png")}
    style={{
      width: 22,
      height: 22,
    }}
  />
);
function BackIcon() {
  return <View style={styles.backIcon} />;
}
const styles = StyleSheet.create({
  backIcon: {
    width: 24,
    height: 24,
    backgroundColor: "black",
  },
});
const forFade = ({current, next}) => {
  const opacity = Animated.add(current.progress, next ? next.progress : 0).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: {opacity},
    rightButtonStyle: {opacity},
    titleStyle: {opacity},
    backgroundStyle: {opacity},
  };
};

function MainStack() {
  const navigation = useNavigation();

  return (
    <ChatProvider>
      <Stack.Navigator screenOptions={defaultStackNavigation.screenOptions}></Stack.Navigator>
    </ChatProvider>
  );
}

export default MainStack;
