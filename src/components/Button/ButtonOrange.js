import React from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";

export default function ButtonOrange({
  backgroundColor = "#EA9649",
  textColor = "white",
  title = "hehe",
  boderColor = "#CCCCCC",
  onPress = () => {},
  disabled = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 3,
        borderColor: boderColor,
        borderWidth: 1,
        minHeight: 47,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 13}}>
        <View style={{flexDirection: "row", justifyContent: "center", flex: 1}}>
          <Text style={{color: textColor, fontFamily: "Hiragino Kaku Gothic Pro W3", textAlign: "center", fontSize: 15, fontWeight: "600"}}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
