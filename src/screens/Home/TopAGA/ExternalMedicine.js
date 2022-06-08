import React, {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, FlatList, ScrollView} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from "react-native-table-component";
import ButtonLinkService from "@components/Button/ButtonLinkService";

export default function ExternalMedicine() {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();

  const table1 = {
    header: ["プロペシア", "ザガーロ"],
    col_left: ["", "成分", "特長・効能", "効果部位", "献血", "併用禁忌薬", "禁忌"],
    dataContent: [
      ["フィナステリド", "デュタステリド"],
      ["男性脱毛症の進行遅延\n5α-還元酵素Ⅱ型阻害", "男性脱毛症の改善\n5α-還元酵素Ⅰ型Ⅱ型阻害"],
      ["頭頂、後頭部", "前頭部、頭頂部、後頭部"],
      ["服用中止後、1ヵ月間不可", "服用中止後、6ヵ月間不可"],
      ["なし", "なし"],
      [
        "本剤の成分および他の \n5α還元酵素阻害薬に対し、過敏症の既往歴のある患者。 \n女性。小児等。",
        "本剤の成分および他の\n5α還元酵素阻害薬に対し、過敏症の既往歴のある患者。\n女性。\n小児等重度の肝機能障害のある患者。",
      ],
    ],
  };

  const tableSkin = {
    tableHead: [global.t("medicine_fee_tax_included")],
    tableData1: ["", global.t("one_month"), global.t("three_month"), global.t("six_month")],
    tablePrice1: ["13,000" + global.t("yen"), "37,200" + global.t("yen"), "74,400" + global.t("yen")],
    tablePrice2: ["16,000" + global.t("yen"), "46,200" + global.t("yen"), "92,400" + global.t("yen")],
    tablePrice3: ["17,000" + global.t("yen"), "49,200" + global.t("yen"), "98,400" + global.t("yen")],
    col1_1: ["AGA基本プラン"],
    col1_2: ["フィナステリドミノアップ"],
    col1_3: ["発毛即効プラン"],
    content1_1: "AGAの基本セット。\nAGAは初めてという方におすすめのセットになっております。",
    content1_2: "セット内容：フィナステリド、カプロニウム外用液",
    content2_1: "基本プランと発毛即効プランの中間。\n基本プランで物足りなさを感じたらこちら。",
    content2_2: 'セット内容：フィナステリド、ミノアップ"',
    content3_1: "短期間で発毛を目指すセット。\n確実にという方におすすめのセットになっております。",
    content3_2: "セット内容：ザガーロ（0.5）、ミノアップ（ミノキシジル外用薬）",
  };
  const contentSkin1 = (value) => (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino}}>{tableSkin.content1_1}</Text>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino05}}>{tableSkin.content1_2}</Text>
    </View>
  );
  const contentSkin2 = (value) => (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino}}>{tableSkin.content2_1}</Text>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino05}}>{tableSkin.content2_2}</Text>
    </View>
  );
  const table3 = {
    tableHead: ["お薬代（税込）"],
    tableRow1: ["", "1ヶ月分", "3ヶ月分", "6ヶ月分"],
    col1_1: ["プロペシア"],
    col1_2: ["フィナステリド"],
    col1_3: ["ザガーロ"],
    col1_4: ["ザガーロ後発品"],
    row2: ["13,000円", "37,200円", "74,400円"],
    row3: ["8,000円	", "22,200円	", "44,400円"],
    row4: ["13,000円", "37,200円	", "74,400円"],
    row5: ["9,000円", "25,200円", "50,400円"],
  };
  const contentSkin3 = (value) => (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino}}>{tableSkin.content3_1}</Text>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino05}}>{tableSkin.content3_2}</Text>
    </View>
  );
  return (
    <View style={{backgroundColor: colors.white, borderRadius: 18, padding: 20, flexDirection: "column"}}>
      <Text style={{fontSize: 24, fontWeight: "700", color: colors.colorAGA, marginBottom: 15, textAlign: "center"}}>
        {global.t("Therapeutic_drug")}
      </Text>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <View style={{height: 2, width: 20, marginBottom: 4, backgroundColor: colors.colorAGA}}></View>
      </View>
      <View style={{backgroundColor: colors.colorAGA, borderRadius: 4, height: 36, marginTop: 20}}>
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
          {global.t("Types_and_effects_of_therapeutic_agents")}
        </Text>
      </View>
      <Text style={{fontSize: 14, lineHeight: 21, marginTop: 8, marginBottom: 10, fontFamily: fonts.Hiragino, color: colors.textHiragino}}>
        {global.t("aga_medicine_has_propecia")}
      </Text>
      {/* bang 1 */}
      <ScrollView horizontal={true} contentContainerStyle={{paddingBottom: 10}} pinchGestureEnabled={true}>
        <Table borderStyle={{borderWidth: 1, borderColor: colors.colorAGA}}>
          <TableWrapper style={{flexDirection: "row"}}>
            <TableWrapper>
              <Col
                data={table1.col_left}
                heightArr={[28, 38, 110, 56, 74, 74, 146]}
                style={{backgroundColor: colors.colorAGA04, width: 85}}
                textStyle={{
                  paddingVertical: 8,
                  textAlign: "justify",
                  marginHorizontal: 6,
                  color: colors.textHiragino,
                  fontFamily: fonts.Hiragino,
                  fontSize: 14,
                }}
              />
            </TableWrapper>

            <TableWrapper style={{flex: 3}}>
              <Row
                data={table1.header}
                style={{height: 28, backgroundColor: colors.colorAGA04}}
                widthArr={[157, 157]}
                flexArr={[1, 1, 1]}
                textStyle={{textAlign: "center", color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14}}
              />
              <Rows
                data={table1.dataContent}
                widthArr={[157, 157]}
                flexArr={[1, 1]}
                heightArr={[38, 110, 56, 74, 74, 146]}
                textStyle={{color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14, padding: 10}}
              />
            </TableWrapper>
          </TableWrapper>
        </Table>
      </ScrollView>
      <View style={{backgroundColor: colors.colorAGA, borderRadius: 4, height: 36, marginTop: 20, marginBottom: 10}}>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
            color: colors.white,
            fontFamily: fonts.Hiragino,
            fontWeight: "bold",
            paddingVertical: 6,
            paddingLeft: 10,
          }}
        >
          {global.t("set_plan")}
        </Text>
      </View>
      {/* bang 2 */}
      <View style={{}}>
        <Table borderStyle={{borderWidth: 1, borderColor: colors.colorAGA}}>
          <Row
            textStyle={{textAlign: "center", color: colors.textHiragino}}
            data={tableSkin.tableHead}
            style={{backgroundColor: colors.colorAGA04, fontSize: 14, lineHeight: 18, height: 28}}
          />
          <Row
            textStyle={{textAlign: "center", color: colors.textHiragino}}
            data={tableSkin.tableData1}
            style={{backgroundColor: colors.colorAGA02, fontSize: 14, lineHeight: 18, height: 28}}
          />
          <TableWrapper style={{flexDirection: "column"}}>
            <TableWrapper style={{flexDirection: "row"}}>
              <Col
                data={tableSkin.col1_1}
                style={{flex: 1, backgroundColor: colors.colorAGA02}}
                textStyle={{textAlign: "justify", color: colors.textHiragino, paddingLeft: 6}}
              />
              <TableWrapper style={{flex: 3}}>
                <Row
                  textStyle={{textAlign: "center", color: colors.textHiragino}}
                  data={tableSkin.tablePrice1}
                  style={{fontSize: 13, lineHeight: 18, height: 28}}
                />
                <Row textStyle={{textAlign: "center"}} data={[contentSkin1()]} style={{flex: 1}} />
              </TableWrapper>
            </TableWrapper>
            <TableWrapper style={{flexDirection: "row"}}>
              <Col
                data={tableSkin.col1_2}
                style={{flex: 1, backgroundColor: colors.colorAGA02}}
                textStyle={{textAlign: "justify", color: colors.textHiragino, paddingLeft: 6}}
              />
              <TableWrapper style={{flex: 3}}>
                <Row
                  textStyle={{textAlign: "center", color: colors.textHiragino}}
                  data={tableSkin.tablePrice2}
                  style={{fontSize: 13, lineHeight: 18, height: 28}}
                />
                <Row textStyle={{textAlign: "center"}} data={[contentSkin2()]} style={{flex: 1}} />
              </TableWrapper>
            </TableWrapper>
            <TableWrapper style={{flexDirection: "row"}}>
              <Col
                data={tableSkin.col1_3}
                he
                style={{flex: 1, backgroundColor: colors.colorAGA02}}
                textStyle={{textAlign: "justify", color: colors.textHiragino, paddingLeft: 6}}
              />
              <TableWrapper style={{flex: 3}}>
                <Row
                  textStyle={{textAlign: "center", color: colors.textHiragino}}
                  data={tableSkin.tablePrice3}
                  style={{fontSize: 13, lineHeight: 18, height: 28}}
                />
                <Row textStyle={{textAlign: "center"}} data={[contentSkin3()]} style={{flex: 1}} />
              </TableWrapper>
            </TableWrapper>
          </TableWrapper>
        </Table>
      </View>
      <View style={{backgroundColor: colors.colorAGA, borderRadius: 4, height: 36, marginTop: 20, marginBottom: 10}}>
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
          {global.t("single_plan")}
        </Text>
      </View>
      <View>
        <Table borderStyle={{borderWidth: 1, borderColor: colors.colorAGA}}>
          <Row
            textStyle={{textAlign: "center", color: colors.textHiragino}}
            data={table3.tableHead}
            style={{backgroundColor: colors.colorAGA04, fontSize: 14, lineHeight: 18, height: 28}}
          />
          <Row
            textStyle={{textAlign: "center", color: colors.textHiragino}}
            data={table3.tableRow1}
            style={{backgroundColor: colors.colorAGA02, fontSize: 14, lineHeight: 18, height: 28}}
          />
          <TableWrapper style={{flexDirection: "column"}}>
            <TableWrapper style={{flexDirection: "row"}}>
              <Col
                data={table3.col1_1}
                style={{flex: 1, backgroundColor: colors.colorAGA02}}
                textStyle={{textAlign: "justify", color: colors.textHiragino, padding: 6, height: 48}}
              />
              <Row
                textStyle={{textAlign: "center", color: colors.textHiragino}}
                data={table3.row2}
                style={{fontSize: 13, lineHeight: 18, flex: 3}}
              />
            </TableWrapper>
            <TableWrapper style={{flexDirection: "row"}}>
              <Col
                data={table3.col1_2}
                style={{flex: 1, backgroundColor: colors.colorAGA02}}
                textStyle={{textAlign: "justify", color: colors.textHiragino, padding: 6, height: 48}}
              />
              <Row
                textStyle={{textAlign: "center", color: colors.textHiragino}}
                data={table3.row3}
                style={{fontSize: 13, lineHeight: 18, flex: 3}}
              />
            </TableWrapper>
            <TableWrapper style={{flexDirection: "row"}}>
              <Col
                data={table3.col1_3}
                style={{flex: 1, backgroundColor: colors.colorAGA02}}
                textStyle={{textAlign: "justify", color: colors.textHiragino, padding: 6, height: 48}}
              />
              <Row
                textStyle={{textAlign: "center", color: colors.textHiragino}}
                data={table3.row4}
                style={{fontSize: 13, lineHeight: 18, flex: 3}}
              />
            </TableWrapper>
            <TableWrapper style={{flexDirection: "row"}}>
              <Col
                data={table3.col1_4}
                style={{flex: 1, backgroundColor: colors.colorAGA02}}
                textStyle={{textAlign: "justify", color: colors.textHiragino, padding: 6, height: 48}}
              />
              <Row
                textStyle={{textAlign: "center", color: colors.textHiragino}}
                data={table3.row5}
                style={{fontSize: 13, lineHeight: 18, flex: 3}}
              />
            </TableWrapper>
          </TableWrapper>
        </Table>
      </View>
      <Text style={{color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 13, marginTop: 10}}>
        {global.t("All_listed_prices_include_tax")}
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
  );
}
