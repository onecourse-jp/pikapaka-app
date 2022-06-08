import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import VectorUp from "@assets/images/SvgComponents/VectorUp";
import VectorDown from "@assets/images/SvgComponents/VectorDown";

export default function FaqLabel({item = {}, borderColor = "", lengthItem = 0, index = 0}) {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const [isShowFaq, setIsShowFaq] = useState(false);
  const handleShow = () => {
    setIsShowFaq(!isShowFaq);
  };
  return (
    <TouchableOpacity onPress={handleShow}>
      <View style={{flexDirection: "row", paddingHorizontal: 20, flex: 1, justifyContent: "space-between"}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: "row"}}>
            <Text style={{fontFamily: fonts.Futura, fontSize: 18, fontWeight: "500", color: borderColor}}>Q</Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 21,
                fontFamily: fonts.Hiragino,
                color: colors.textHiragino,
                marginLeft: 5,
                paddingRight: 20,
              }}
            >
              {item.question}
            </Text>
          </View>
          {isShowFaq && (
            <View style={{flexDirection: "row", marginTop: 11}}>
              <Text style={{fontFamily: fonts.Futura, fontSize: 18, fontWeight: "500", color: colors.textColorAnswer}}>A</Text>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 21,
                  fontFamily: fonts.Hiragino,
                  color: colors.textHiragino,
                  marginLeft: 5,
                  paddingRight: 20,
                }}
              >
                {item.answer}
              </Text>
            </View>
          )}
          {lengthItem == index + 1  ? (
            <></>
          ) : (
            <View style={{borderTopWidth: 1, borderTopColor: colors.lineGray02, marginTop: 10, marginBottom: 13}} />
          )}
        </View>
        {!isShowFaq ? <VectorDown color={borderColor} /> : <VectorUp color={borderColor} />}
      </View>
    </TouchableOpacity>
  );
}
