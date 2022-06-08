import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function MoreButton({ onPress, text, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...style }}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}
