import React, {useEffect} from "react";
import {View, Text, Image, Dimensions} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from "react-native-table-component";
import ButtonLinkService from "@components/Button/ButtonLinkService";
const {width} = Dimensions.get("window");

export default function ExternalMedicine() {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const CircleInCircle = (value) => (
    <View style={{margin: 10, flexDirection: "column", alignItems: "center"}}>
      <Image style={{width: 20, height: 20, marginBottom: 2}} source={require("@assets/images/circle_in_circle.png")} />
      <Text style={{color: colors.textHiragino, fontSize: 13, fontWeight: "400", fontFamily: fonts.Hiragino}}>{value}</Text>
    </View>
  );
  const image_skincare = (value) => (
    <View style={{alignItems: "center", justifyContent: "center"}}>
      <Image style={{width: 20, height: 20}} source={value} />
    </View>
  );

  const table1 = {
    header: ["医療用 \n医薬品", "医薬 \n部外品", "化粧品"],
    col_left: ["", "有効成分 \n濃度", "効果", "医師による判断", "アフター\nフォロー"],
    dataContent: [
      [
        CircleInCircle("医療用の高濃度"),
        image_skincare(require("@assets/images/circle_skincare.png")),
        image_skincare(require("@assets/images/triangle_skincare.png")),
      ],
      [
        CircleInCircle("臨床データーあり、効果が出る可能性が高い"),
        image_skincare(require("@assets/images/circle_skincare.png")),
        image_skincare(require("@assets/images/triangle_skincare.png")),
      ],
      [
        CircleInCircle("医師により必要な薬を処方"),
        image_skincare(require("@assets/images/triangle_skincare.png")),
        image_skincare(require("@assets/images/x_skincare.png")),
      ],
      [
        CircleInCircle("副作用発現時は医師または薬剤師が適切な処置を行う"),
        image_skincare(require("@assets/images/x_skincare.png")),
        image_skincare(require("@assets/images/x_skincare.png")),
      ],
    ],
  };
  const table2 = {
    col_0: ["", "FACE \n 美肌", "FACE \n保湿", "BODY \n保湿"],
    col_1: [
      "トレチノイン0.025%（10g）",
      "トレチノイン 0.05%（10g）",
      "トレチノイン 0.1%（10g）",
      "ヒルドイドソフト軟膏（クリーム）（50g）",
      "ヘパリンローション（化粧水）（50g）",
      "ヘパリン泡スプレー（100g）",
    ],
    header: ["", "1本"],
    col_2: ["2,000円", "2,300円", "2,800円", "2,090円", "730円", "2,340円"],
  };
  return (
    <View style={{backgroundColor: colors.white, borderRadius: 18, paddingVertical: 40, paddingHorizontal: 20, flexDirection: "column"}}>
      <Text
        style={{fontSize: width < 380 ? 20 : 24, fontWeight: "700", color: colors.buttonSkincare, marginBottom: 15, textAlign: "center"}}
      >
        {global.t("external_medicine")}
      </Text>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <View style={{height: 2, width: 20, marginBottom: 4, backgroundColor: colors.buttonSkincare}}></View>
      </View>
      <View style={{backgroundColor: colors.buttonSkincare, borderRadius: 4, height: 36, marginTop: 20}}>
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
          {global.t("type_of_external_medicine")}
        </Text>
      </View>
      <Text style={{fontSize: 14, lineHeight: 21, marginTop: 8, marginBottom: 10, fontFamily: fonts.Hiragino, color: colors.textHiragino}}>
        {global.t("direct_approach_to_dryness_aim_for_more_beautiful")}
      </Text>
      {/* bang 1 */}
      <Table borderStyle={{borderWidth: 1, borderColor: colors.buttonSkincare}}>
        <TableWrapper style={{flexDirection: "row"}}>
          <TableWrapper style={{flex: 1}}>
            <Col
              data={table1.col_left}
              heightArr={[46, 78, 114, 78, 114]}
              style={{backgroundColor: colors.colorSkincare04}}
              textStyle={{
                marginVertical: 21,
                marginHorizontal: 6,
                lineHeight: 18,
                color: colors.textHiragino,
                fontFamily: fonts.Hiragino,
                fontSize: 14,
              }}
            />
          </TableWrapper>
          <TableWrapper style={{flex: 3}}>
            <Row
              data={table1.header}
              style={{height: 46, backgroundColor: colors.colorSkincare04}}
              flexArr={[3, 2, 2]}
              textStyle={{textAlign: "center", color: colors.textHiragino, lineHeight: 18, fontFamily: fonts.Hiragino, fontSize: 14}}
            />
            <Rows
              data={table1.dataContent}
              flexArr={[3, 2, 2]}
              heightArr={[78, 114, 78, 114]}
              textStyle={{color: colors.textHiragino, lineHeight: 18, fontFamily: fonts.Hiragino, fontSize: 14}}
            />
          </TableWrapper>
        </TableWrapper>
      </Table>
      <View style={{backgroundColor: colors.buttonSkincare, borderRadius: 4, height: 36, marginTop: 20, marginBottom: 10}}>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
            color: colors.white,
            fontWeight: "bold",
            fontFamily: fonts.Hiragino,
            paddingVertical: 6,
            paddingLeft: 10,
          }}
        >
          {global.t("single_plan")}
        </Text>
      </View>
      {/* bang 2 */}
      <Table borderStyle={{borderWidth: 1, borderColor: colors.buttonSkincare}}>
        <Row
          data={["お薬代（税込）"]}
          style={{height: 28, backgroundColor: colors.colorSkincare04}}
          textStyle={{textAlign: "center", color: colors.textHiragino, lineHeight: 18, fontFamily: fonts.Hiragino, fontSize: 14}}
        />
        <TableWrapper style={{flexDirection: "row"}}>
          <TableWrapper style={{flex: 2}}>
            <Col
              data={table2.col_0}
              heightArr={[28, 166, 111, 55]}
              style={{backgroundColor: colors.colorSkincare04}}
              textStyle={{color: colors.textHiragino, lineHeight: 18, marginLeft: 6, fontSize: 14, fontFamily: fonts.Hiragino}}
            />
          </TableWrapper>
          <TableWrapper style={{flex: 7}}>
            <Row
              data={table2.header}
              style={{height: 28, backgroundColor: colors.colorSkincare02}}
              flexArr={[2, 1]}
              textStyle={{textAlign: "center", color: colors.textHiragino, fontFamily: fonts.Hiragino, fontSize: 13}}
            />
            {/* <Rows data={table1.dataContent} flexArr={[3, 2, 2]} heightArr={[78, 114, 78, 114]} textStyle={{color: colors.textHiragino}} /> */}
            <TableWrapper style={{flexDirection: "row"}}>
              <Col
                data={table2.col_1}
                heightArr={[55, 55, 56, 55, 56, 55]}
                style={{backgroundColor: colors.colorSkincare02, flex: 2}}
                textStyle={{
                  color: colors.textHiragino,
                  textAlign: "left",
                  marginHorizontal: 10,
                  lineHeight: 18,
                  fontSize: 13,
                  fontFamily: fonts.Hiragino,
                }}
              />
              <Col
                data={table2.col_2}
                heightArr={[55, 55, 56, 55, 56, 55]}
                style={{flex: 1}}
                textStyle={{color: colors.textHiragino, textAlign: "center", fontSize: 13, fontFamily: fonts.Hiragino}}
              />
              {/* <Rows data={table2.col_2}  textStyle={{color: colors.textHiragino}} /> */}
            </TableWrapper>
          </TableWrapper>
        </TableWrapper>
      </Table>

      <Text style={{marginTop: 8, fontFamily: fonts.Hiragino, color: colors.textHiragino}}>
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
  );
}
