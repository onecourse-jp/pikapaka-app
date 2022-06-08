/* global require */
import React, {createRef, useContext, useEffect, useRef, useState} from "react";
import {View, Text, Pressable, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import LocalizationContext from "@context/LocalizationContext";
import Colors from "@config/styles";
export default function CustomModal({navigation, route}) {
  const {t} = useContext(LocalizationContext);
  const {color = Colors.color.COLOR_PRIMARY, size = 60, title = undefined, startAction, showCancelButton = false} = route.params;
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable style={[StyleSheet.absoluteFill, {backgroundColor: "rgba(0, 0, 0, 0.5)"}]} onPress={() => {}} />
      <View style={styles.container}>
        <View
          style={{
            ...styles.activityIndicatorWrapper,
          }}
        >
          <ActivityIndicator animating={true} color={color} size={size} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    backgroundColor: "transparent",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    paddingTop: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  imageWarn: {
    margin: 32,
    alignSelf: "center",
  },
  topTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.color.COLOR_BLACK,
    marginTop: 30,
  },
});
