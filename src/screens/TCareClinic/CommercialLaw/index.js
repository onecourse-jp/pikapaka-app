import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import styles from "../styles";
import Headercomponent from "@components/Layout/Header";
import TabHeaderComponent from "@components/Layout/TabHeader";
import FooterComponent from "@components/Layout/Footer";

export default function () {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const content = [
    {name: "販売業者の名称", content: "良藤 健二", reqireForm: false},
    {name: "販売責任者名", content: "原 基記", reqireForm: false},
    {name: "販売業者の住所", content: "東京都港区浜松町二丁目十三番九号 G1ビル", reqireForm: false},
    {name: "販売業者の連絡先", content: "電話番号 0120-927-232", reqireForm: true, text: "お問い合わせフォーム >"},
    {name: "商品代金以外の必要料金", content: "商品代金以外には、消費税をお支払いいただきます。", reqireForm: false},
    {
      name: "引き渡し時期",
      content: "商品（＝薬）の　引き渡し時期＝診察日。\n商品（＝薬）は、医師との診察、決済完了後に発送。",
      reqireForm: false,
    },
    {
      name: "返品・キャンセル",
      content: "医師の診察後や処方箋を発行した後でのキャンセルは行うことができません。返金なし。",
      reqireForm: false,
    },
  ];
  const title = "特定商取引法に\n基づく表記";

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
                  <Text style={{fontWeight: "400", fontSize: 14, lineHeight: 21, textAlign: "justify", color: colors.textHiragino}}>
                    {item.content}
                  </Text>
                  {item.reqireForm ? (
                    <TouchableOpacity style={{marginTop: 20}}>
                      <Text style={{textDecorationLine: "underline", color: colors.headerComponent, fontWeight: "700"}}>{item.text}</Text>
                    </TouchableOpacity>
                  ) : (
                    <></>
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
