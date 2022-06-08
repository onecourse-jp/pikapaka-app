import React from "react";
import {View, Text, Dimensions, TouchableOpacity, Image, Platform} from "react-native";
import {styles} from "./styles";

export default function LikedModal(props) {
  return (
    <View style={[styles.container]}>
      <View
        style={{
          width: 200,
          height: 200,
          position: "relative",
          top: -100,
          opacity: 0.8,
        }}
      >
        <View></View>
      </View>
    </View>
  );
}
