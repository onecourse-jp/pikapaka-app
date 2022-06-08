import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import FaqLabel from "./FaqLabel";
import VectorUp from "@assets/images/SvgComponents/VectorUp";
import VectorDown from "@assets/images/SvgComponents/VectorDown";

export default function BlockFaqService({title = "サービスについて", borderColor = "#276FB9", bgFaqType = "#E8F1F8", data = []}) {
  const user = useSelector((state) => state.users);
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const [isShowGroupFaq, setIsShowGroupFaq] = useState(false);
  const listLabel = ["診療について", "ご予約について", "決済について", "発送について"];

  return (
    <View style={{paddingHorizontal: 20}}>
      <TouchableOpacity
        onPress={() => setIsShowGroupFaq(!isShowGroupFaq)}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderColor: borderColor,
          height: 54,
          flex: 1,
          borderWidth: 2,
          borderRadius: 4,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{color: borderColor, fontSize: 16}}>{title}</Text>
        {isShowGroupFaq ? <VectorUp color={borderColor} /> : <VectorDown color={borderColor} />}
      </TouchableOpacity>
      {isShowGroupFaq && (
        <View>
          {listLabel.map((item, index) => {
            let listRender = data.filter((item) => item?.label?.includes(index + 1));
            if (listRender.length > 0) {
              return (
                <View
                  key={`label-${index}`}
                  style={{backgroundColor: bgFaqType, borderRadius: 4, marginBottom: 10, paddingHorizontal: 20, paddingVertical: 35}}
                >
                  <View style={{paddingLeft: 10, marginBottom: 23, borderLeftColor: colors.textHiragino, borderLeftWidth: 5}}>
                    <Text style={{fontSize: 14, fontWeight: "700", fontFamily: fonts.Hiragino, color: colors.textHiragino}}>{item}</Text>
                  </View>
                  {listRender.map((item, index) => {
                    return (
                      <FaqLabel
                        key={`item-qa-${borderColor}-${index}`}
                        item={item}
                        borderColor={borderColor}
                        lengthItem={listRender.length}
                        index={index}
                      />
                    );
                  })}
                </View>
              );
            }
          })}
        </View>
      )}
    </View>
  );
}
