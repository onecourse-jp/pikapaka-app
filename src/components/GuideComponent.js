import React, {useState} from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";

export default function GuideComponent({title = "", content = "", note = ""}) {
  const fonts = useThemeFonts();
  const colors = useThemeColors();

  return (
    <View style={{width: "100%", paddingHorizontal: 16, flexDirection: "row", alignItems: "center", backgroundColor: colors.serviceStep}}>
      <View>
        <Image style={{marginRight: 12}} source={require("@assets/images/pay.png")} />
      </View>
      <View style={{flex: 1, paddingVertical: 14, borderRadius: 4}}>
        <Text style={{fontSize: 14, lineHeight: 21, fontFamily: fonts.Hiragino, fontWeight: "700", color: colors.colorTextBlack}}>
          {title}
        </Text>
        {content?.length > 0 && (
          <Text style={{fontSize: 12, lineHeight: 18, fontFamily: fonts.Hiragino, fontWeight: "400", color: colors.colorTextBlack}}>
            {content}
          </Text>
        )}
        {note?.length > 0 && (
          <Text style={{fontSize: 12, lineHeight: 18, fontFamily: fonts.Hiragino, fontWeight: "400", color: colors.textRed}}>{note}</Text>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
