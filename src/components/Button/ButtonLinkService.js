import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {SCREEN_SERVICE} from "@screens/screens.constants";

export default function ButtonLinkService({type = 1}) {
  const navigation = useNavigation();
  const colors = useThemeColors();
  const fonts = useThemeFonts();

  return (
    <TouchableOpacity
      onPress={() =>
        global.showWebView({
          url: "https://quickpcr.jp/",
        })
      }
      style={{
        backgroundColor: colors.buttonBocking,
        borderRadius: 30,
        width: type === 1 ? 335 : 255,
        height: 54,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{fontSize: type === 1 ? 18 : 16, lineHeight: 27, textAlign: "center", fontWeight: "700", color: colors.white}}>
        {global.t("click_here_for_online_medical_treatment")}
      </Text>
    </TouchableOpacity>
  );
}
