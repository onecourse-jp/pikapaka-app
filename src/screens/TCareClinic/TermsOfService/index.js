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
  const container = [
    "ここにテキストが入ります。\nここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。",
    "ここにテキストが入ります。\nここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。",
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <Headercomponent />
      <TabHeaderComponent />
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{backgroundColor: colors.backgroundTheme}}>
          <View style={{padding: 40, flexDirection: "column"}}>
            <View style={{alignItems: "center", marginBottom: 40}}>
              <Text style={{fontWeight: "700", fontSize: 32, lineHeight: 48, color: colors.textHiragino}}>利用規約</Text>
            </View>
            {container.map((item, index) => {
              return (
                <View key={index} style={{marginBottom: 20}}>
                  <Text style={{color: colors.textHiragino}}>{container[index]}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <FooterComponent />
      </View>
    </SafeAreaView>
  );
}
