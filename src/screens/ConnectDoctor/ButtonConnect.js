import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";

export default function ({status = false, onPress = () => {}}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  return (
    <TouchableOpacity onPress={onPress} disabled={!status} style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
      <View
        style={{
          width: 355,
          height: 47,
          backgroundColor: status ? colors.paginationCurentPage : colors.gray4,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          opacity: status ? 1 : 0.9,
        }}
      >
        <Text style={{color: colors.white}}>医師へ接続する</Text>
      </View>
    </TouchableOpacity>
  );
}
