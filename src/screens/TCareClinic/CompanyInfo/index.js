import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import {Linking} from "react-native";
import styles from "../styles";
import Headercomponent from "@components/Layout/Header";
import TabHeaderComponent from "@components/Layout/TabHeader";
import FooterComponent from "@components/Layout/Footer";

export default function () {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const content = [
    {name: "社名", content: "株式会社ピカパカ", reqireForm: false},
    {name: "本社所在地", content: "〒105-0011\n東京都港区芝公園3-1-8　芝公園アネックス4階", reqireForm: false},
    {
      name: "事業内容",
      content:
        "・ヘルスケア事業\n　・医療機関向けDX支援サービス\n　・PCR検査センター企画・運営サービス\n・福利厚生事業\n　・法人出張サポートサービス",
      reqireForm: false,
    },
    {name: "設立", content: "2018年12月", reqireForm: false},
    {name: "代表者", content: "代表取締役　原 基記", reqireForm: false},
    {name: "企業情報", content: "", reqireForm: true, link: "https://www.pikapaka.co.jp/company/"},
  ];
  const title = "運営会社情報";

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <Headercomponent />
      <TabHeaderComponent />
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{backgroundColor: colors.backgroundTheme}}>
          <View style={{padding: 40, flexDirection: "column"}}>
            <View style={{alignItems: "center", marginBottom: 40}}>
              <Text style={{fontWeight: "700", textAlign: "center", fontSize: 32, lineHeight: 48, color: colors.textHiragino}}>
                {title}
              </Text>
            </View>
            {content.map((item, index) => {
              return (
                <View key={index} style={{marginBottom: 20}}>
                  <Text style={{fontWeight: "700", fontSize: 14, lineHeight: 21, textAlign: "justify", color: colors.textHiragino}}>
                    {item.name}
                  </Text>

                  {item.reqireForm ? (
                    <Text
                      style={{
                        textDecorationLine: "underline",
                        color: colors.headerComponent,
                        fontWeight: "700",
                        fontSize: 14,
                        lineHeight: 21,
                        letterSpacing: 1.4,
                      }}
                      onPress={() => Linking.openURL(item.link)}
                    >
                      {item.link}
                    </Text>
                  ) : (
                    <Text style={{fontWeight: "400", fontSize: 14, lineHeight: 21, textAlign: "justify", color: colors.textHiragino}}>
                      {item.content}
                    </Text>
                  )}
                  <View style={{height: 1, backgroundColor: colors.lineGray02, marginTop: 20}}></View>
                </View>
              );
            })}
          </View>
          <FooterComponent />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
