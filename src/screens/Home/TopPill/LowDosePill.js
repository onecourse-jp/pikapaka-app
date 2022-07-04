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

export default function LowDosePill() {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const listMedicine = [
    {
      image: require("@assets/images/medicine_pill_1.png"),
      name: "トリキュラー（28）",
      description: "第２世代：レボノルゲストレルと呼ばれる黄体ホルモンを使用しており、不正出血が起こりにくく安定した周期を作りやすい。",
    },
    {
      image: require("@assets/images/medicine_pill_2.png"),
      name: "ラベルフィーユ（28）",
      description:
        "トリキュラーのジェネリック。第２世代：レボノルゲストレルと呼ばれる黄体ホルモンを使用しており、不正出血が起こりにくく安定した周期を作りやすい。",
    },
    {
      image: require("@assets/images/medicine_pill_3.png"),
      name: "ファボワール（28）",
      description:
        "マーベロンのジェネリック。第３世代：男性ホルモン（アンドロゲン）作用抑制効果が高いので、大人にきびの治療、多毛症の改善に期待が持てます。",
    },
  ];
  const table2 = {
    header: ["お薬代（税込）"],
    row1: ["", "3ヶ月分", "6ヶ月分"],
    col1: ["トリキュラー	", "ラベルフィーユ	", "ファボワール	"],
    col2: ["6,536円", "9,319円"],
  };
  return (
    <View>
      <View style={{height: 10}}></View>
      <OnlineMedicalCare
        title={global.t("what_is_a_low_dose_pill")}
        textFormat={[
          "ピル（経口避妊薬）は、女性の卵巣でつくられる「卵胞ホルモン」と「黄体ホルモン」の女性ホルモンが含まれています。これら女性ホルモンの作用を利用して、妊娠を防ぐ薬です。",
          "また、女性を悩ます生理の予定日をコントロールしたり、症状を軽くしたりできるという、ピルには働く女性にとってたくさんのメリットがあります。",
          "Tケアクリニックでは、国内で承認されたもののみを扱っており、安全性を保っております。",
        ]}
        styleColor={colors.colorPill}
        lineColor={colors.colorPill05}
      />
      <View style={{height: 10}}></View>
      <RecommendOnlineMedicalCare
        textFormat={["避妊(正しく内服をしなければ効果が薄れます。)　", "月経困難症、月経不順、月経前症候群", "にきび"]}
        title={global.t("effect")}
        description={[global.t("low_dose_pill_have_positive_variety")]}
        styleColor={colors.colorPill}
        circleColor={colors.colorPill07}
        note="※感染症は防げません"
      />
      <View style={{height: 10}}></View>
      <RecommendOnlineMedicalCare
        textFormat={["吐き気、嘔吐", "頭痛、めまい", "体重増加", "不正出血", "血栓症", "乳房の張りなどの不快感", "むくみ"]}
        title={global.t("side_effect")}
        description={[global.t("symptom_such_as_nausea_and_abnormal")]}
        styleColor={colors.colorPill}
        circleColor={colors.colorPill07}
      />
      <View style={{height: 10}}></View>
      <View style={{backgroundColor: colors.white, borderRadius: 18, padding: 20, flexDirection: "column"}}>
        <Text style={{fontSize: 24, fontWeight: "700", color: colors.colorPill, marginBottom: 15, textAlign: "center"}}>
          {global.t("low_dose_pill")}
        </Text>
        <View style={{flexDirection: "row", justifyContent: "center"}}>
          <View style={{height: 2, width: 20, marginBottom: 4, backgroundColor: colors.colorPill}}></View>
        </View>
        <TypeAndEffectOfInternalMedicine
          styleColor={colors.colorPill}
          bgListColor={colors.colorPill02}
          listMedicine={listMedicine}
          title1="低用量ピルの種類"
        />
        <View style={{backgroundColor: colors.colorPill, borderRadius: 4, height: 36, marginTop: 20}}>
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
            {global.t("how_to_take")}
          </Text>
        </View>
        <View style={{marginTop: 8}}>
          <Text style={{fontSize: 14, lineHeight: 21, fontFamily: fonts.Hiragino, color: colors.textHiragino}}>
            {global.t("in_the_first_circle_1_table")}
          </Text>
        </View>
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
            <Row
              data={table2.row1}
              style={{height: 28, backgroundColor: colors.colorPill02}}
              flexArr={[3, 2, 2]}
              textStyle={{textAlign: "center", color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14}}
            />
            <TableWrapper style={{flexDirection: "row"}}>
              <Col
                data={table2.col1}
                style={{flex: 3, backgroundColor: colors.colorPill02}}
                textStyle={{textAlign: "center", color: colors.textHiragino, fontFamily: fonts.Hiragino, marginVertical: 5}}
              />
              <Row
                textStyle={{textAlign: "center", color: colors.textHiragino, fontFamily: fonts.Hiragino}}
                data={table2.col2}
                style={{fontSize: 13, lineHeight: 18, flex: 4}}
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
