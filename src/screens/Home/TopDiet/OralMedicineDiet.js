import React, {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, FlatList} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from "react-native-table-component";
import DashedLine from "react-native-dashed-line";
import TypeAndEffectOfInternalMedicine from "../components/TypeAndEffectOfInternalMedicine";
import ButtonLinkService from "@components/Button/ButtonLinkService";

export default function OralMedicineDiet() {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const tableWhite = {
    tableHead: [global.t("medicine_fee_tax_included")],
    tableData1: ["", global.t("one_month"), global.t("three_month")],
    tablePrice1: ["35,000" + global.t("yen"), "103,200" + global.t("yen")],
  };
  const contentWhite1 = (value) => (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino}}>
        {global.t("basic_set_aimed_at_dieting")}
      </Text>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino05}}>
        {global.t("set_content")}
      </Text>
    </View>
  );
  const tableSinglePlan = {
    col1: ["スーグラ（25）", "スーグラ（50）	", "サノレックス(14日分)	", "サノレックス(30日分)	"],
    head: ["お薬代（税込）"],
    row1: ["13,800円", "39,600円"],
    row2: ["16,500円", "47,700円"],
    row3: ["7,420円"],
    row4: ["15,900円"],
  };
  const listMedicine = [
    {
      image: require("@assets/images/medicine_diet_1.png"),
      name: "スーグラ（糖排泄薬）",
      description:
        "腎臓で糖を再吸収する役割を持つたんぱく質。（SGLT2）を阻害し、血中に過剰に存在する糖を尿中へ排泄するお薬です。薬の作用によって１日あたり約４００キロカロリーのブドウ糖が尿中へ排出されるため、ダイエット効果を発揮します。",
    },
    {
      image: require("@assets/images/medicine_diet_2.png"),
      name: "サノレックス（食欲抑制）",
      description: "視床下部にある食欲中枢に作用し、摂食行動を抑制することで、少ない食事量で満腹感が得られ、空腹感が出にくくなります。",
    },
    {
      image: require("@assets/images/medicine_diet_3.png"),
      name: "アカルボース（糖吸収抑制）",
      description: "インスリンの分泌をコントロールし、糖分の吸収を抑制します。",
    },
    {
      image: require("@assets/images/medicine_diet_4.png"),
      name: "エゼチミブ（脂質吸収抑制）",
      description:
        "エゼチミブは食事性及び胆汁性コレステロールの吸収を阻害し、食事に含まれる脂肪分を吸収さません。\nカロリーオーバーの予防薬として、食後1時間以内に1錠の服用。",
    },
  ];

  return (
    <View style={{backgroundColor: colors.white, borderRadius: 18, padding: 20, flexDirection: "column"}}>
      <Text style={{fontSize: 24, fontWeight: "700", color: colors.textDiet, marginBottom: 15, textAlign: "center"}}>{global.t("oral_medicine")}</Text>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <View style={{height: 2, width: 20, marginBottom: 4, backgroundColor: colors.textDiet}}></View>
      </View>
      <TypeAndEffectOfInternalMedicine styleColor={colors.textDiet} bgListColor={colors.textDiet02} listMedicine={listMedicine} />
      <View>
        <View style={{backgroundColor: colors.bgDietText, borderRadius: 4, height: 36, marginTop: 20}}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: colors.white,
              fontFamily: fonts.Hiragino,
              paddingVertical: 6,
            fontWeight: "bold",
            paddingLeft: 10,
            }}
          >
            {global.t("set_plan")}
          </Text>
        </View>
        <View style={{marginTop: 8, marginBottom: 10}}>
          <Text style={{fontSize: 14, lineHeight: 21, fontWeight: "400", color: colors.textHiragino}}>
            {global.t("we_have_prepared_set_recommended_diet_with_oral_medicine")}
          </Text>
        </View>
        {/* bang gia thuoc */}
        <View style={{}}>
          <Table borderStyle={{borderWidth: 1, borderColor: colors.textDiet}}>
            <Row
              textStyle={{textAlign: "center", color: colors.textHiragino}}
              data={tableWhite.tableHead}
              style={{backgroundColor: colors.textDiet04, fontSize: 14, lineHeight: 18, height: 28}}
            />
            <Row
              textStyle={{textAlign: "center", color: colors.textHiragino}}
              data={tableWhite.tableData1}
              flexArr={[]}
              style={{backgroundColor: colors.textDiet02, fontSize: 14, lineHeight: 18, height: 28}}
            />
            <TableWrapper style={{flexDirection: "row"}}>
              <TableWrapper style={{flex: 1}}>
                <Col
                  data={[global.t("whitening_basic_set")]}
                  style={{flex: 1, backgroundColor: colors.textDiet02}}
                  textStyle={{textAlign: "center", color: colors.textHiragino}}
                />
              </TableWrapper>
              <TableWrapper style={{flex: 2}}>
                <Row
                  textStyle={{textAlign: "center", color: colors.textHiragino}}
                  data={tableWhite.tablePrice1}
                  style={{fontSize: 13, lineHeight: 18, height: 28}}
                />
                <Row textStyle={{textAlign: "center"}} data={[contentWhite1()]} style={{flex: 1}} />
              </TableWrapper>
            </TableWrapper>
          </Table>
        </View>
      </View>

      {/* het bang gia thuoc */}
      <View style={{backgroundColor: colors.bgDietText, borderRadius: 4, height: 36, marginTop: 20, marginBottom: 10}}>
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
      {/* bang Single plan (medicine only) */}
      <View style={{}}>
        <Table borderStyle={{borderWidth: 1, borderColor: colors.textDiet}}>
          <Row
            textStyle={{textAlign: "center", color: colors.textHiragino}}
            data={tableWhite.tableHead}
            style={{backgroundColor: colors.textDiet04, fontSize: 14, lineHeight: 18, height: 28}}
          />
          <Row
            textStyle={{textAlign: "center", color: colors.textHiragino}}
            data={tableWhite.tableData1}
            flexArr={[4, 5, 5]}
            style={{backgroundColor: colors.textDiet02, fontSize: 14, lineHeight: 18, height: 28}}
          />
          <TableWrapper style={{flexDirection: "row"}}>
            <TableWrapper style={{flex: 2}}>
              <Col
                data={tableSinglePlan.col1}
                style={{flex: 1, backgroundColor: colors.textDiet02}}
                textStyle={{textAlign: "center", color: colors.textHiragino}}
              />
            </TableWrapper>
            <TableWrapper style={{flex: 5}}>
              <Row
                textStyle={{textAlign: "center", color: colors.textHiragino, paddingVertical: 14, fontSize: 13}}
                data={tableSinglePlan.row1}
                style={{fontSize: 13, lineHeight: 18}}
              />
              <Row
                textStyle={{textAlign: "center", color: colors.textHiragino, paddingVertical: 14, fontSize: 13}}
                data={tableSinglePlan.row2}
                style={{fontSize: 13, lineHeight: 18}}
              />
              <Row
                textStyle={{textAlign: "center", color: colors.textHiragino, paddingVertical: 14, fontSize: 13}}
                data={tableSinglePlan.row3}
                style={{flex: 1}}
              />
              <Row
                textStyle={{textAlign: "center", color: colors.textHiragino, paddingVertical: 14, fontSize: 13}}
                data={tableSinglePlan.row4}
                style={{flex: 1}}
              />
            </TableWrapper>
          </TableWrapper>
        </Table>
      </View>

      {/* het bang Single plan (medicine only) */}
      <Text style={{marginTop: 8, color: colors.textHiragino}}>{global.t("all_listed_prices_include_tax")}</Text>
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
  );
}
