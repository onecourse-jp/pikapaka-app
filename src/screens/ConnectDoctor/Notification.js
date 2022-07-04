import React from "react";
import {Text, View} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";

export default function ({content = ""}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bgConnectDoctor,
        borderRadius: 2,
        paddingVertical: 9,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: colors.bdConnectDoctor,
      }}
    >
      <Text style={{color: colors.textConnectDoctor, fontSize: 14, lineHeight: 22, fontWeight: "400"}}>{content}</Text>
    </View>
  );
}
