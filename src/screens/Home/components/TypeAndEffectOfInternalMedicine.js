import React, {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, FlatList} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import DashedLine from "react-native-dashed-line";

export default function TypeAndEffectOfInternalMedicine({
  styleColor = "red",
  bgListColor = "blue",
  planDescription = [],
  listMedicine = [{image: "", name: "", description: ""}],
  title1 = global.t("type_and_effect_of_internal_medicine")
}) {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const listMedicine2 = [
    {
      image: "@assets/images/sugra_medicine.png",
      name: "スーグラ（糖排泄薬）",
      description:
        "腎臓で糖を再吸収する役割を持つたんぱく質。（SGLT2）を阻害し、血中に過剰に存在する糖を尿中へ排泄するお薬です。薬の作用によって１日あたり約４００キロカロリーのブドウ糖が尿中へ排出されるため、ダイエット効果を発揮します。",
    },
    {
      image: "@assets/images/sugra_medicine.png",
      name: "スーグラ（糖排泄薬）",
      description:
        "腎臓で糖を再吸収する役割を持つたんぱく質。（SGLT2）を阻害し、血中に過剰に存在する糖を尿中へ排泄するお薬です。薬の作用によって１日あたり約４００キロカロリーのブドウ糖が尿中へ排出されるため、ダイエット効果を発揮します。",
    },
    {
      image: "@assets/images/sugra_medicine.png",
      name: "スーグラ（糖排泄薬）",
      description:
        "腎臓で糖を再吸収する役割を持つたんぱく質。（SGLT2）を阻害し、血中に過剰に存在する糖を尿中へ排泄するお薬です。薬の作用によって１日あたり約４００キロカロリーのブドウ糖が尿中へ排出されるため、ダイエット効果を発揮します。",
    },
  ];
  return (
    <View>
      <View style={{backgroundColor: styleColor, borderRadius: 4, height: 36, marginTop: 20}}>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
            color: colors.white,
            fontFamily: fonts.Hiragino,
            paddingVertical: 6,
            paddingLeft: 10,
          }}
        >
         {title1}
        </Text>
      </View>
      <View style={{marginTop: 8, marginBottom: 10}}>
        {planDescription.map((item, index) => {
          return (
            <Text key={index} style={{fontSize: 14, lineHeight: 21, fontFamily: fonts.Hiragino, color: colors.textHiragino}}>
              {item}
            </Text>
          );
        })}
      </View>
      <View>
        {listMedicine.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                borderRadius: 4,
                marginBottom: 8,
                backgroundColor: index % 2 == 0 ? bgListColor : colors.bgDietListMedicine2,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image style={{marginLeft: 21}} source={item.image}></Image>
              <View style={{width: 168, marginVertical: 16, marginHorizontal: 20}}>
                <View>
                  <Text style={{fontSize: 14, lineHeight: 21, color: colors.textHiragino, fontWeight: "700"}}>{item.name}</Text>
                </View>
                <View>
                  <Text style={{fontSize: 13, lineHeight: 18, color: colors.textHiragino, fontWeight: "400"}}>{item.description}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
