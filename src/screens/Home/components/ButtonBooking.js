import React, {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, FlatList} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";

export default function ButtonBooking(props) {
  const {bgColor = "rgba(143, 197, 118, 0.7)"} = props;
  const navigation = useNavigation();
  const colors = useThemeColors();

  return (
    <View style={{position: "absolute", bottom: 10, right: 10}}>
      <TouchableOpacity
        onPress={() => navigation.navigate("SERVICE")}
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
