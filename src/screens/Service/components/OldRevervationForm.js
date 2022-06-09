import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";

export default function OldRevervationForm({value, handleChange}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();

  return (
    <View>
      <Text style={{fontFamily: fonts.NSbold, color: colors.colorTextBlack, fontSize: 16, padding: 16}}>
        この科目の受診は初めてですか？
      </Text>
      <View>
      <TouchableOpacity
          style={{
            paddingVertical: 11,
            backgroundColor: colors.white,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.borderGrayE,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
          onPress={() => handleChange(false)}
        >
          <Text style={{fontFamily: fonts.Hiragino, color: colors.colorTextBlack, fontSize: 12, lineHeight: 14}}>はい</Text>
          {value === false && (
            <View>
              <Image source={require("@assets/images/icons/ic_check_form_choose.png")} />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 11,
            backgroundColor: colors.white,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.borderGrayE,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
          onPress={() => handleChange(true)}
        >
          <Text style={{fontFamily: fonts.Hiragino, color: colors.colorTextBlack, fontSize: 12, lineHeight: 14}}>いいえ</Text>
          {value === true && (
            <View>
              <Image source={require("@assets/images/icons/ic_check_form_choose.png")} />
            </View>
          )}
        </TouchableOpacity>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    flexDirection: "column",
  },
  textError: {color: "red", marginTop: 5, textAlign: "right"},
});
