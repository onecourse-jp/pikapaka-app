import React, {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, FlatList} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {SCREEN_TOP} from "@screens/screens.constants";

export default function DiagnosisAndTreatment() {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const DATA = [
    {
      action: () => {
        navigation.navigate(SCREEN_TOP, {currentIndex: 1});
      },
      label: "スキンケア",
      imageUrl: require("@assets/images/treatment_cate1.png"),
    },
    {
      action: () => {
        navigation.navigate(SCREEN_TOP, {currentIndex: 2});
      },
      label: "ダイエット",
      disable: true,
      // imageUrl: require("@assets/images/treatment_cate2.png"),
      imageUrl: require("@assets/images/diet_top_disable_treatment.png"),
    },
    {
      action: () => {
        navigation.navigate(SCREEN_TOP, {currentIndex: 3});
      },
      label: "ED",
      imageUrl: require("@assets/images/treatment_cate4.png"),
    },
    {
      action: () => {
        navigation.navigate(SCREEN_TOP, {currentIndex: 4});
      },
      label: "ピル",
      imageUrl: require("@assets/images/treatment_cate3.png"),
    },
    {
      action: () => {
        navigation.navigate(SCREEN_TOP, {currentIndex: 5});
      },
      label: "AGA",
      disable: true,
      // imageUrl: require("@assets/images/treatment_cate5.png"),
      imageUrl: require("@assets/images/aga_top_disable_treatment.png"),
    },
    {
      action: () => {
        global.showWebView({
          url: "https://quickpcr.jp/",
        });
      },
      // imageUrl: require("@assets/images/treatment_cate5.png"),
      imageUrl: require("@assets/images/treatment_cate6.png"),
    },
  ];

  return (
    <View style={{backgroundColor: colors.white, borderRadius: 18, padding: 40, flexDirection: "column", alignItems: "center"}}>
      <Text style={{fontSize: 24, color: colors.colorHome10, marginBottom: 15, textAlign: "center", fontWeight: "700"}}>診療内容</Text>
      <View style={{height: 2, width: 20, backgroundColor: colors.colorHome10, marginBottom: 20}}></View>
      <View style={{maxWidth: 256, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
        {DATA.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={item.action}
              style={{marginBottom: 15, width: 120}}
              key={`item.key-${index}`}
              disabled={item?.disable}
            >
              <Image source={item.imageUrl} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
