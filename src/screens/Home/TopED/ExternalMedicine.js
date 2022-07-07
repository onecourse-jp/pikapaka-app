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
    header: ["バイアグラ", "シアリス", "レビトラ"],
    col_left: ["", "特長", "効果", "効果が出るまでの時間持続時間", "食事の影響", "禁忌薬"],
    dataContent: [
      ["シルデナフィル", "タダラフィル", "バルデナフィル"],
      [
        "EDの定番薬\nスタンダードだが世界的に最も有名で安心感がある",
        "ED治療薬シェア世界一他剤と比べてマイルドで、自然な 効き目緩やかに長時間作用し副作用が少ない",
        "一番速効性があり、吸早い人は15分ほどで効く硬さが出やすいことも特長",
      ],
      ["効果発現まで１時間程度作用時間４時間程度", "効果発現まで１時間程度作用時間３６時間", "効果発現まで３０分程度作用時間４〜８時間"],
      ["受けやすい\n食事を取る際は30分前用", "受けにくい", "受けにくい"],
      [
        "ニトログリセリン（ニトロペン）、硝酸イソソルビド（ニトロール）、ニコランジル（シグマート）、ニプラジロール（ハイパジールコーワ）、アミオダロン（アンカロン）、その他",
      ],
    ],
  };
  const table2 = {
    header: ["お薬代（税込）"],
    header2: ["バラ売り（1錠）", "10錠セット", "20錠セット", "30錠セット"],
    col_left: [
      "",
      "バイアグラ（先発品）",
      "バイアグラODフィルム（先発品）",
      "バイアグラ（後発品）",
      "レビトラ（後発品）",
      "レビトラ（後発品）",
      "シアリス（先発品）",
      "シアリス（先発品）",
    ],
    col_left2: ["", "50㎎", "50㎎", "50㎎", "10㎎", "20㎎", "10㎎", "20㎎"],
    dataContent: [
      ["1,938円", "17,580円", "33,380円", "47,500円"],
      ["1,322円", "12,080円", "22,970円", "32,650円"],
      ["1,058円", "9,660円", "18,372円", "26,116円"],
      ["1,630円", "14,830円", "28,184円", "40,075円"],
      ["1,740円", "15,820円", "30,076円", "42,748円"],
      ["1,938円", "17,580円", "33,380円", "47,500円"],
      ["1,938円", "17,580円", "33,380円", "47,500円"],
    ],
  };
  return (
    <View style={{backgroundColor: colors.white, borderRadius: 18, paddingVertical: 40, paddingHorizontal: 20, flexDirection: "column"}}>
      <Text style={{fontSize: 24, fontWeight: "700", color: colors.buttonED, marginBottom: 15, textAlign: "center"}}>
        {global.t("Therapeutic_drug")}
      </Text>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <View style={{height: 2, width: 20, marginBottom: 4, backgroundColor: colors.buttonED}}></View>
      </View>
      <View style={{backgroundColor: colors.buttonED, borderRadius: 4, height: 36, marginTop: 20}}>
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
        {global.t("content_effects_of_therapeutic_agents")}
      </Text>
      {/* bang 1 */}
      <ScrollView horizontal={true} contentContainerStyle={{paddingBottom: 10}} pinchGestureEnabled={true}>
        <Table borderStyle={{borderWidth: 1, borderColor: colors.buttonED}}>
          <TableWrapper style={{flexDirection: "row"}}>
            <TableWrapper>
              <Col
                data={table1.col_left}
                heightArr={[28, 38, 110, 56, 74, 74]}
                style={{backgroundColor: colors.colorEd01, width: 160}}
                textStyle={{paddingHorizontal: 8, color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14}}
              />
            </TableWrapper>

            <TableWrapper style={{flex: 3}}>
              <Row
                data={table1.header}
                style={{height: 28, backgroundColor: colors.colorEd01}}
                widthArr={[170, 170, 170, 170]}
                flexArr={[1, 1, 1]}
                textStyle={{textAlign: "center", color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14}}
              />
              <Rows
                data={table1.dataContent}
                widthArr={[170, 170, 170, 170]}
                flexArr={[1, 1, 1]}
                heightArr={[38, 110, 56, 74, 74]}
                textStyle={{color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14, paddingLeft: 10}}
              />
            </TableWrapper>
          </TableWrapper>
        </Table>
      </ScrollView>
      <View style={{backgroundColor: colors.buttonED, borderRadius: 4, height: 36, marginTop: 20, marginBottom: 10}}>
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
      {/* bang 2 */}
      <ScrollView horizontal={true} contentContainerStyle={{paddingBottom: 10}} pinchGestureEnabled={true}>
        <Table borderStyle={{borderWidth: 1, borderColor: colors.buttonED}}>
          <TableWrapper style={{}}>
            <TableWrapper style={{flex: 3}}>
              <Row
                data={table2.header}
                style={{height: 28, backgroundColor: colors.colorEd01}}
                textStyle={{paddingLeft: 92, color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14}}
              />
            </TableWrapper>
            <TableWrapper style={{flexDirection: "row"}}>
              <TableWrapper style={{flexDirection: "row"}}>
                <Col
                  data={table2.col_left}
                  heightArr={[28, 46, 64, 46, 46, 46, 46, 46, 46, 46]}
                  style={{backgroundColor: colors.colorEd01, width: 92}}
                  textStyle={{
                    paddingVertical: 4,
                    marginHorizontal: 6,
                    color: colors.textHiragino,
                    fontFamily: fonts.Hiragino,
                    fontSize: 14,
                  }}
                />
                <Col
                  data={table2.col_left2}
                  heightArr={[28, 46, 64, 46, 46, 46, 46, 46, 46, 46]}
                  style={{backgroundColor: colors.colorEd01, width: 48}}
                  textStyle={{
                    paddingVertical: 8,
                    marginHorizontal: 6,
                    color: colors.textHiragino,
                    fontFamily: fonts.Hiragino,
                    fontSize: 14,
                  }}
                />
              </TableWrapper>
              <TableWrapper style={{flex: 3}}>
                <Row
                  data={table2.header2}
                  widthArr={[125, 125, 125, 125]}
                  style={{height: 28, backgroundColor: colors.colorEd01}}
                  flexArr={[1, 1, 1]}
                  textStyle={{textAlign: "center", color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14}}
                />
                <Rows
                  data={table2.dataContent}
                  widthArr={[125, 125, 125, 125]}
                  heightArr={[46, 64, 46, 46, 46, 46, 46, 46, 46]}
                  flexArr={[1, 1, 1]}
                  textStyle={{textAlign: "center", color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14, paddingLeft: 10}}
                />
              </TableWrapper>
            </TableWrapper>
          </TableWrapper>
        </Table>
      </ScrollView>
      {/* <Table borderStyle={{borderWidth: 1, borderColor: colors.buttonED}}>
        <TableWrapper style={{}}>
          <TableWrapper style={{flex: 3}}>
            <Row
              data={["お薬代（税込）"]}
              style={{height: 28, backgroundColor: colors.colorEd01}}
              textStyle={{paddingLeft: 6, color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14}}
            />
          </TableWrapper>
          <TableWrapper style={{flexDirection: "row"}}>
            <Col
              data={["タダラフィルZA（100錠）"]}
              style={{height: 28, backgroundColor: colors.colorEd01, flex: 5}}
              textStyle={{color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14}}
            />
            <Col
              data={["30,000円"]}
              style={{height: 28, flex: 3}}
              textStyle={{color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 14, paddingLeft: 16}}
            />
          </TableWrapper>
        </TableWrapper>
      </Table> */}
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
