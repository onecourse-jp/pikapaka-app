import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import ButtonLinkService from "@components/Button/ButtonLinkService";
import {
  SCREEN_TERMS_OF_SERVICE,
  SCREEN_PRIVACY_POLICY,
  SCREEN_COMMERCIAL_LAW,
  SCREEN_COMPANY_INFO,
  SCREEN_INQUIRY,
} from "@screens/screens.constants";

export default function FooterComponent() {
  const navigation = useNavigation();
  const colors = useThemeColors();
  const fonts = useThemeFonts();

  return (
    <>
      <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 20}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN_PRIVACY_POLICY, {currentIndex: 1});
          }}
        >
          <Text style={{fontSize: 12, lineHeight: 24, letterSpacing: 0.05 * 12, color: colors.textHiragino}}>｜プライバシーポリシー｜</Text>
        </TouchableOpacity>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SCREEN_COMMERCIAL_LAW, {currentIndex: 1});
            }}
          >
            <Text style={{fontSize: 12, lineHeight: 24, letterSpacing: 0.05 * 12, color: colors.textHiragino}}>
              ｜特定商取引法に基づく表示
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SCREEN_TERMS_OF_SERVICE, {currentIndex: 1});
            }}
          >
            <Text style={{fontSize: 12, lineHeight: 24, letterSpacing: 0.05 * 12, color: colors.textHiragino}}>｜利用規約｜</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN_COMPANY_INFO, {currentIndex: 1});
          }}
        >
          <Text style={{fontSize: 12, lineHeight: 24, letterSpacing: 0.05 * 12, color: colors.textHiragino}}>
            ©PikaPaka Corp. All Rights Reserved.
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View
        style={{
          marginTop: 20,
          width: "100%",
          height: 90,
          backgroundColor: "#F2F2F3",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonLinkService />
      </View> */}
    </>
  );
}
