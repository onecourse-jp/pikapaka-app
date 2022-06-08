import React, {useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useThemeColors, Button} from "react-native-theme-component";

export default function ItemCoinMarket({data, showBorder = true}) {
  const colors = useThemeColors();
  console.log("WelcomeScreen");
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: showBorder ? 1 : 0,
        borderBottomColor: colors.white,
        paddingTop: 15,
        paddingBottom: 13,
      }}
    >
      
    </View>
  );
}
const styles = StyleSheet.create({});
