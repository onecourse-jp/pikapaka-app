import React, {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, FlatList} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from "react-native-table-component";
import OnlineMedicalCare from "../components/OnlineMedicalCare";
import RecommendOnlineMedicalCare from "../components/RecommendOnlineMedicalCare";
import TypeAndEffectOfInternalMedicine from "../components/TypeAndEffectOfInternalMedicine";
import ButtonLinkService from "@components/Button/ButtonLinkService";

export default function AfterPill() {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const listMedicine = [
    {
      image: require("@assets/images/medicine_pill_4.png"),
      name: "ノルレボ",
      description: "アフターピル。性行為後72時間以内に女性ホルモン製剤を服用することで着床を防ぎ、高い確率で避妊することができます。",
    },
    {
      image: require("@assets/images/medicine_pill_5.png"),
      name: "レボノルゲスト　",
      description: "ノルレボの後発品。",
    },
  ];
  const table2 = {
    header: ["お薬代（税込）"],
    col1: ["ノルレボ（1錠）", "レボノルゲスト（1錠）"],
    col2: ["12,000円", "9,000円"],
  };
  return (
    <View>
      <View style={{height: 10}}></View>
      <OnlineMedicalCare
        title={global.t("what_is_a_low_dose_pill")}
        textFormat={[
          "性行為後72時間以内に女性ホルモン製剤を服用することで着床を防ぎ、高い確率で避妊することができます。",
          "Tケアクリニックでは、国内で承認されたもののみを扱っており、安全性を保っております。",
        ]}
        styleColor={colors.colorPill}
        lineColor={colors.colorPill05}
      />
      <View style={{height: 10}}></View>
      <RecommendOnlineMedicalCare
        title={global.t("side_effect")}
        description={[
          "アフターピルの副作用には、頭痛、傾眠、消退出血、不正子宮出血、悪心などが挙げられます。",
          "これらの副作用は24時間以上継続することはありません。",
        ]}
        styleColor={colors.colorPill}
        circleColor={colors.colorPill07}
      />
      <View style={{height: 10}}></View>
      <View style={{backgroundColor: colors.white, borderRadius: 18, padding: 20, flexDirection: "column"}}>
        <Text style={{fontSize: 24, fontWeight: "700", color: colors.colorPill, marginBottom: 15, textAlign: "center"}}>
          {global.t("after_pill")}
        </Text>
        <View style={{flexDirection: "row", justifyContent: "center"}}>
          <View style={{height: 2, width: 20, marginBottom: 4, backgroundColor: colors.colorPill}}></View>
        </View>
        <TypeAndEffectOfInternalMedicine
          styleColor={colors.colorPill}
          bgListColor={colors.colorPill02}
          listMedicine={listMedicine}
          title1="アフターピルの種類"
        />

        <View style={{backgroundColor: colors.colorPill, borderRadius: 4, height: 36, marginTop: 20, marginBottom: 10}}>
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
            {global.t("single_plan_medicine_only")}
          </Text>
        </View>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: colors.colorPill}}>
            <Row
              data={table2.header}
              style={{height: 28, backgroundColor: colors.colorPill04}}
              textStyle={{textAlign: "center", color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14}}
            />

            <TableWrapper style={{flexDirection: "row"}}>
              <Col
                data={table2.col1}
                style={{flex: 3, backgroundColor: colors.colorPill02}}
                textStyle={{textAlign: "center", color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14, paddingVertical: 6}}
              />
              <Col
                data={table2.col2}
                style={{flex: 2}}
                textStyle={{textAlign: "center", color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 13, paddingVertical: 6}}
              />
            </TableWrapper>
          </Table>
        </View>

        <Text style={{marginTop: 8, fontFamily: fonts.Hiragino, color: colors.textHiragino, fontSize: 13, lineHeight: 20}}>
          {global.t("all_listed_prices_include_tax")}
        </Text>
        <View
          style={{
            marginTop: 20,
            height: 90,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ButtonLinkService type={2} />
        </View>
      </View>
    </View>
  );
}
