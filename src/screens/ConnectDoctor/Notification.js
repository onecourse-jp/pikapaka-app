import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput, ImageBackground} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";

export default function ({content = ""}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bgConnectDoctor,
        borderRadius: 2,
        paddingVertical: 9,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: colors.bdConnectDoctor
      }}
    >
      <Text style={{color: colors.textConnectDoctor, fontSize: 14, lineHeight: 22, fontWeight: "400"}}>{content}</Text>
    </View>
  );
}
