import React from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";

export default function ButtonSocialLogin({
  image = require("@assets/images/logo-google-login.png"),
  backgroundColor = "black",
  textColor = "white",
  title = "hehe",
  boderColor = "#CCCCCC",
  onPress = () => {},
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 5,
        borderColor: boderColor,
        borderWidth: 1,
        minHeight: 47,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <View style={{width: 47, height: 47, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <Image source={image}></Image>
        </View>
        <View style={{flexDirection: "row", paddingRight: 30, justifyContent: "center", flex: 1}}>
          <Text style={{color: textColor, textAlign: "center", fontSize: 15, fontWeight: "600"}}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
