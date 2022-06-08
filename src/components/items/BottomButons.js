import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Button,
} from "react-native";

export function BottomButons(props) {

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Image source={require("@assets/svg/back_button.svg")}></Image>
      </TouchableOpacity>
      <TouchableOpacity title="Learn More" onPress={onPress}>
        <Image source={require("@assets/svg/like_button.svg")}></Image>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
