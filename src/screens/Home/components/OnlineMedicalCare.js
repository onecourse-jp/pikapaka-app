import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, FlatList, Dimensions, Platform} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import RenderHtml from "react-native-render-html";
import DashedLine from "react-native-dashed-line";

const {width} = Dimensions.get("window");

export default function OnlineMedicalCare({title = "診療内容", textFormat = [], styleColor = "", lineColor = ""}) {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const screenWidth = width - 80;
  const [heightEleArr, setHeightEleArr] = useState([]);
  let lenghtArr = 555;
  const setDashLine = () => {
    let i = 1;
    let arr = [];
    while (i < lenghtArr / 34) {
      i++;
      arr.push(i);
    }
    setHeightEleArr([...arr]);
    console.log("arrarr", arr);
  };

  useEffect(() => {
    setDashLine();
  }, []);
  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: 18,
        paddingVertical: 40,
        paddingHorizontal: 20,
        flexDirection: "column",
        zIndex: 0,
      }}
    >
      <Text style={{fontSize: width < 380 ? 19 : 22, fontWeight: "700", color: styleColor, marginBottom: 15, textAlign: "center"}}>
        {title}
      </Text>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <View style={{height: 2, width: 20, marginBottom: 20, backgroundColor: styleColor}}></View>
      </View>
      <View style={{position: "relative"}}>
        {/* <RenderHtml contentWidth={width - 40} source={{html: textFormat ? textFormat : ""}} /> */}
        <View style={{position: "relative", marginBottom: 20, overflow: "hidden"}}>
          {textFormat.map((item, index) => {
            return (
              <View key={`OnlineMedicalCare-${index}-${item.toString()}`} style={{position: "relative"}}>
                <Text
                  style={{
                    fontFamily: fonts.Hiragino,
                    fontSize: 14,
                    color: colors.textHiragino,
                    lineHeight: 34,
                    textAlign: "left",
                    position: "relative",
                    width: Math.floor(screenWidth),
                  }}
                >
                  {item}
                </Text>
              </View>
            );
          })}
          <View style={{position: "absolute", top: 34, width: Math.floor(screenWidth), zIndex: 0}}>
            {heightEleArr.map((item, index) => (
              <DashedLine
                key={`DashedLine-${index}`}
                style={{marginBottom: Platform.OS === "ios" ? 32 : 32.4}}
                dashLength={5}
                dashGap={5}
                dashColor={lineColor}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
