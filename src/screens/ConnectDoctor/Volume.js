import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput, ImageBackground} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";

export default function ({status = false} ) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  return (
    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 17}}>
      <View
        style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}
      >
        <Image style={{marginRight: 16}} source={require("@assets/images/connect_doctor_micro.png")}></Image>
        <Image source={require("@assets/images/connect_doctor_volume.png")}></Image>
      </View>
    </View>
  );
}
