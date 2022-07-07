import React, {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import DashedLine from "react-native-dashed-line";

export default function BenefitOnlineMedicalCare() {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const DATA = [
    {
      index: 1,
      title: "待ち時間なし",
      content: "事前予約制だから、病院などでよくある待ち時間はありません。",
      imageUrl: require("@assets/images/benefit_care_1.png"),
    },
    {
      index: 2,
      title: "安心の価格表示",
      content: "診察料は無料。薬代、送料のみです。\n※診察のみの場合、診察料をいただく場合がございます。",
      imageUrl: require("@assets/images/benefit_care_2.png"),
    },
    {
      index: 3,
      title: "誰にも知られずに",
      content: "全てのサービスが自宅で完結するので、誰にも知られません。",
      imageUrl: require("@assets/images/benefit_care_3.png"),
    },
    {
      index: 4,
      title: "薬はご自宅に配送",
      content: "診療後、お薬はご希望の場所（ご自宅・職場など）へ配送します。",
      imageUrl: require("@assets/images/benefit_care_4.png"),
    },
    {
      index: 5,
      title: "土日祝も対応",
      content: "年中無休で土日祝も対応しているので、ご都合に合わせられます。",
      imageUrl: require("@assets/images/benefit_care_5.png"),
    },
  ];
  return (
    <View style={{backgroundColor: colors.white, borderRadius: 18, paddingVertical: 40, paddingHorizontal: 20, flexDirection: "column"}}>
      <Text style={{fontSize: 24, fontWeight: "700", color: colors.colorHome10, marginBottom: 15, textAlign: "center"}}>オンライン診療のメリット</Text>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <View style={{height: 2, width: 20, marginBottom: 20, backgroundColor: colors.colorHome10}}></View>
      </View>
      {DATA.map((item, index) => {
        return (
          <View key={`benefit-item-${index}`} style={[{backgroundColor: colors.bgBenefitItemComponent}, styles.benefitItem]}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", position: "relative", width: 85}}>
              <Image source={item.imageUrl} />
              <Text style={{position: "absolute", top: -15, left: 5, fontSize: 28, fontFamily: fonts.FuturaBold, color: colors.textHiragino, fontWeight: "700"}}>{item.index}</Text>
            </View>
            <View style={{flex: 1, paddingVertical: 12, paddingHorizontal: 17, backgroundColor: colors.white}}>
              <Text style={{fontFamily: fonts.Hiragino, fontWeight: "bold", fontSize: 16, lineHeight: 24, color: colors.colorHome10}}>
                {item.title}
              </Text>
              <Text style={{fontFamily: fonts.Hiragino, fontWeight: "400", fontSize: 14, lineHeight: 21, color: colors.textHiragino}}>{item.content}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  benefitItem: {
    minHeight: 112,
    flexDirection: "row",
    borderRadius: 4,
    marginBottom: 20,
    paddingBottom: 1,
    borderColor: "#eeeeee",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
