import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";

export default function ButtonProfile({title = "情報を編集する", onPress = () => {}, hasBorder = false, color = "red"}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();

  return (
    <View style={{marginBottom: 15, justifyContent: "center", alignItems: "center"}}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: 300,
          height: 32,
          borderWidth: hasBorder ? 1 : 0,
          borderColor: color,
          backgroundColor: hasBorder ? "transparent" : color,
          margin: 0,
        }}
      >
        <Text style={{color: hasBorder ? color : colors.white, textAlign: "center", lineHeight: 22}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
