import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import styles from "./styles";
import Headercomponent from "@components/Layout/Header";
import TabHeaderComponent from "@components/Layout/TabHeader";
import {SCREEN_TOP, SCREEN_NEWS, SCREEN_FAQ} from "@screens/screens.constants";
import FooterComponent from "@components/Layout/Footer";
import ButtonBooking from "../Home/components/ButtonBooking";

export default function ({navigation}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const container = [
    "ここにテキストが入ります。\nここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。",
    "ここにテキストが入ります。\nここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。",
  ];
  const textFAQ = "お客さまから寄せられたよくある質問を掲載しています。\nお問い合わせ前にご確認ください。";
  const inquiryPhone = "0120-927-232（通話料無料）\n受付時間 9:00～19:00（年中無休）";
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <Headercomponent />
      <TabHeaderComponent />
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{backgroundColor: colors.backgroundTheme}}>
          <View style={{padding: 40, flexDirection: "column"}}>
            <View style={{alignItems: "center", marginBottom: 40}}>
              <Text style={{fontWeight: "700", fontSize: 32, lineHeight: 48, color: colors.textHiragino}}>お問い合わせ</Text>
            </View>
            <View>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={{height: 23, marginRight: 12, width: 0, borderWidth: 5, borderColor: colors.headerComponent}}></View>
                <Text style={{fontSize: 22, lineHeight: 27, color: colors.textHiragino, fontWeight: "700", letterSpacing: 0.22}}>
                  よくある質問
                </Text>
              </View>
              <Text
                style={{fontSize: 14, lineHeight: 21, color: colors.textHiragino, marginTop: 8, marginBottom: 20, letterSpacing: 14 * 0.05}}
              >
                {textFAQ}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(SCREEN_FAQ)}
                style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-end"}}
              >
                <Text
                  style={{
                    marginRight: 8,
                    color: colors.headerComponent,
                    fontWeight: "700",
                    fontSize: 14,
                    lineHeight: 21,
                    letterSpacing: 0.7,
                  }}
                >
                  よくある質問はこちら
                </Text>
                <Image source={require("@assets/images/arrow_right_blue.png")}></Image>
              </TouchableOpacity>
            </View>
            <View style={{height: 1, marginVertical: 40, backgroundColor: colors.lineGray02}}></View>
            <View>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={{height: 23, marginRight: 12, width: 0, borderWidth: 5, borderColor: colors.headerComponent}}></View>
                <Text style={{fontSize: 22, letterSpacing: 0.22, lineHeight: 27, color: colors.textHiragino, fontWeight: "700"}}>
                  お問い合わせ先
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  letterSpacing: 0.8,
                  lineHeight: 24,
                  color: colors.textHiragino,
                  marginVertical: 20,
                  fontWeight: "700",
                }}
              >
                フォームでのお問い合わせ
              </Text>
              <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity
                  onPress={() => {
                    global.showWebView({
                      url: "https://docs.google.com/forms/d/e/1FAIpQLSdLQiPQIbCkjvr2HwBHD3ktb0WQHwFmdatHcCGzCnnlGhA4CQ/viewform",
                    });
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: colors.headerComponent,
                      paddingVertical: 15,
                      width: 255,
                      borderRadius: 30,
                    }}
                  >
                    <Text
                      style={{
                        marginRight: 8,
                        color: colors.white,
                        fontWeight: "700",
                        fontSize: 16,
                        lineHeight: 24,
                      }}
                    >
                      お問い合わせ
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 30, marginBottom: 40}}>
              <Text style={{fontSize: 16, lineHeight: 24, letterSpacing: 0.8, fontWeight: "700", color: colors.textHiragino}}>
                お電話でのお問い合わせ
              </Text>
              <Text style={{fontSize: 16, lineHeight: 24, letterSpacing: 0.8, color: colors.textHiragino}}>{inquiryPhone}</Text>
            </View>
          </View>
          <FooterComponent />
        </ScrollView>
        <ButtonBooking bgColor={"rgba(0, 176, 80, 0.7)"} />
      </View>
    </SafeAreaView>
  );
}
