import React, {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, FlatList} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";

export default function AboutClinic() {
  const navigation = useNavigation()
  const colors = useThemeColors();

  return (
    <View style={{position: "absolute", bottom: 10, right: 10}}>
      <TouchableOpacity
        style={{
          width: 80,
          height: 80,
          borderRadius: 80,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(143, 197, 118, 0.7)",
        }}
      >
        <Text style={{fontSize: 12, textAlign: "center", color: colors.white, fontWeight: "bold"}}>診療予約は こちら</Text>
      </TouchableOpacity>
    </View>
  );
}
