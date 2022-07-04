import React, {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, FlatList} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {SCREEN_SERVICE_STEP1} from "@screens/screens.constants";

export default function ButtonBooking(props) {
  const {bgColor = "rgba(143, 197, 118, 0.7)", dataBooking = null} = props;
  const navigation = useNavigation();
  const colors = useThemeColors();

  const goToBooking = () => {
    navigation.navigate("SERVICE");
    global.showLoadingView();
    setTimeout(() => {
      global.hideLoadingView();
      navigation.navigate(SCREEN_SERVICE_STEP1, {data: dataBooking});
    }, 200);
  };

  return (
    <View style={{position: "absolute", bottom: 10, right: 10}}>
      <TouchableOpacity
        onPress={goToBooking}
        style={{
          width: 80,
          height: 80,
          borderRadius: 80,
          paddingHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bgColor,
        }}
      >
        <Text style={{fontSize: 12, textAlign: "center", color: colors.white, fontWeight: "bold"}}>診療予約は こちら</Text>
      </TouchableOpacity>
    </View>
  );
}
