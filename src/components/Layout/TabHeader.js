import React, {useState} from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {
  SCREEN_TOP,
  SCREEN_TOP_SKIN_CARE,
  SCREEN_TOP_DIET,
  SCREEN_TOP_PILL,
  SCREEN_TOP_ED,
  SCREEN_TOP_AGA,
} from "@screens/screens.constants";
import {useNavigation} from "@react-navigation/native";
import {useThemeColors, Button, CheckBox} from "react-native-theme-component";

export default function TabHeaderComponent({tab = null}) {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const DataStep = [
    {
      currentIndex: 1,
      label: "スキンケア",
      imageUrl: require("@assets/images/icons/ic_tab_1.png"),
      action: () => {
        navigation.navigate(SCREEN_TOP, {currentIndex: 1});
      },
    },
    {
      currentIndex: 2,
      label: "ダイエット",
      disable: true,
      imageUrl: require("@assets/images/icons/ic_tab_2.png"),
      action: () => {
        navigation.navigate(SCREEN_TOP, {currentIndex: 2});
      },
    },
    {
      currentIndex: 3,
      label: "ピル",
      imageUrl: require("@assets/images/icons/ic_tab_3.png"),
      action: () => {
        navigation.navigate(SCREEN_TOP, {currentIndex: 3});
      },
    },
    {
      currentIndex: 4,
      label: "ED",
      imageUrl: require("@assets/images/icons/ic_tab_4.png"),
      action: () => {
        navigation.navigate(SCREEN_TOP, {currentIndex: 4});
      },
    },
    {
      currentIndex: 5,
      label: "AGA",
      disable: true,
      imageUrl: require("@assets/images/icons/ic_tab_5.png"),
      action: () => {
        navigation.navigate(SCREEN_TOP, {currentIndex: 5});
      },
    },
  ];
  const listColor = [colors.buttonSkincare, colors.textDiet, colors.colorPill, colors.colorED07, colors.colorAGA07];
  return (
    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: colors.colorHome04}}>
      {DataStep.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={item.action}
            key={`step-${index}`}
            disabled={item?.disable}
            style={{
              flexDirection: "column",
              width: "20%",
              alignItems: "center",
              borderRightWidth: index + 1 < DataStep.length ? 1 : 0,
              borderRightColor: colors.white,
              paddingVertical: 7,
              backgroundColor: item?.disable ? colors.gray7 : tab == index + 1 ? listColor[index] : colors.colorHome02,
            }}
          >
            <View>
              <Image source={item.imageUrl} />
            </View>
            <Text style={{color: colors.white, fontSize: 12, fontWeight: "700", marginTop: 5}}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({});
