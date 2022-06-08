import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import FaqLabel from "./FaqLabel";
import VectorUp from "@assets/images/SvgComponents/VectorUp";
import VectorDown from "@assets/images/SvgComponents/VectorDown";

export default function BlockFaq({title = "サービスについて", borderColor = "#276FB9", bgFaqType = "#E8F1F8", data = []}) {
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
          {data.map((item, index) => {
            return (
              <FaqLabel
                key={`item-qa-${borderColor}-${index}`}
                item={item}
                borderColor={borderColor}
                index={index}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}
