import React, {useEffect} from "react";
import {View, Text, Image, Dimensions} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";

const {width} = Dimensions.get("window");

export default function RecommendOnlineMedicalCare({
  textFormat = [],
  styleColor = "",
  title = "こんな方におすすめ",
  description = [],
  circleColor = "",
  note = "",
}) {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  return (
    <View style={{backgroundColor: colors.white, borderRadius: 18, paddingVertical: 40, paddingHorizontal: 20, flexDirection: "column"}}>
      <Text style={{fontSize: width < 380 ? 20 : 24, fontWeight: "700", color: styleColor, marginBottom: 15, textAlign: "center"}}>
        {title}
      </Text>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <View style={{height: 2, width: 20, marginBottom: 20, backgroundColor: styleColor}}></View>
      </View>
      <View style={{marginBottom: 10}}>
        {description.map((item, index) => {
          return (
            <Text
              key={index}
              style={{fontFamily: fonts.Hiragino, fontSize: 14, lineHeight: 21, fontWeight: "400", color: colors.textHiragino}}
            >
              {item}
            </Text>
          );
        })}
      </View>
      {textFormat.map((item, index) => {
        return (
          <View key={`item.text-${index}`} style={{flexDirection: "row", marginBottom: 8}}>
            <View style={{width: 11, height: 11, borderRadius: 11, backgroundColor: circleColor, marginRight: 9, marginTop: 5}}></View>
            <Text
              style={{
                fontFamily: fonts.Hiragino,
                fontSize: 14,
                color: colors.textHiragino,
                lineHeight: 21,
                textAlign: "left",
                flex: 1,
              }}
            >
              {item}
            </Text>
          </View>
        );
      })}
      {note.length > 0 && (
        <View style={{marginBottom: 10}}>
          <Text style={{fontFamily: fonts.Hiragino, fontSize: 14, lineHeight: 21, fontWeight: "400", color: colors.textHiragino}}>
            {note}
          </Text>
        </View>
      )}
    </View>
  );
}
