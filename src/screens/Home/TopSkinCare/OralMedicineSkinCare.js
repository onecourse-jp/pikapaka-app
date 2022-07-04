import React, {useEffect} from "react";
import {View, Text, Image, Dimensions} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import TypeAndEffectOfInternalMedicine from "../components/TypeAndEffectOfInternalMedicine";
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from "react-native-table-component";
import ButtonLinkService from "@components/Button/ButtonLinkService";
const {width} = Dimensions.get("window");

export default function OralMedicineSkinCare() {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();

  const listMedicine = [
    {
      image: require("@assets/images/medicine_skincare_1.png"),
      name: "トラネキサム（250）",
      description: "トラネキサム酸は、美白効果が期待できる人工的に生成されたアミノ酸の一種です。炎症やアレルギーを引き起こす「プラスミン」の働きを阻害することで、美白や肌荒れの改善、止血などの効能が期待できます。",
    },
    {
      image: require("@assets/images/medicine_skincare_2.png"),
      name: "シナール",
      description:
        "シナールは、ビタミン C（アスコルビン酸）とパントテン酸を配合した複合ビタミン剤です。通常、病気、妊娠中または授乳中など、ビタミン Cやパントテン酸が不足している場合の補給に用いられます。また、メラニン色素の形成を抑え、皮膚の色素沈着（シミなど）の改善にも用いられます。",
    },
    {
      image: require("@assets/images/medicine_skincare_3.png"),
      name: "ハイチオール",
      description:
        "ハイチオールはL‐システインを有効成分とする、シミやそばかすの減少、改善などの効果を期待できる薬です。メラニンを「減らす」「排出する」を同時に行うため、効果的にシミやそばかすの改善が可能です。",
    },
    {
      image: require("@assets/images/medicine_skincare_4.png"),
      name: "ユベラ（200）",
      description: "強い抗酸化作用で細胞の酸化を防ぎ、肌の老化を遅らせる。\n皮膚の新陳代謝を高める。\n血行促進作用。 \n成分はビタミンE。",
    },
    {
      image: require("@assets/images/medicine_skincare_5.png"),
      name: "トコフェロール（200）",
      description: "強い抗酸化作用で細胞の酸化を防ぎ、肌の老化を遅らせる。 \n皮膚の新陳代謝を高める。\n血行促進作用。\n成分はビタミンE。",
    },
    // {
    //   image: require("@assets/images/medicine_skincare_6.png"),
    //   name: "エパデール（900）",
    //   description:
    //     "血液サラサラ（抗血栓）作用、ＬＤＬ降下・ＨＤＬ増加作用、抗がん作用、生活習慣病の予防改善。\n血管年齢を下げる。動脈硬化予防。魚の油。市販薬などのEPAと同成分、医療用で配合量が多い。",
    // },
    {
      image: require("@assets/images/medicine_skincare_7.png"),
      name: "イコサペント酸エチル900（エパデールのジェネリック）",
      description:
        "血液サラサラ（抗血栓）作用、ＬＤＬ降下・ＨＤＬ増加作用、抗がん作用、生活習慣病の予防改善。\n血管年齢を下げる。動脈硬化予防。魚の油。市販薬などのEPAと同成分、医療用で配合量が多い。",
    },
    {
      image: require("@assets/images/medicine_skincare_8.png"),
      name: "ノイロビタン",
      description: "ビタミンB1、B2、B6、B12の配合剤で、不足しているこれらビタミンを補いバランスを整えます。",
    },
  ];

  const tableWhite = {
    tableHead: [global.t("medicine_fee_tax_included")],
    tableData1: ["", global.t("one_month"), global.t("three_month"), global.t("six_month")],
    tablePrice1: ["4,820" + global.t("yen"), "13,774" + global.t("yen"), "26,116" + global.t("yen")],
    tablePrice2: ["6,800" + global.t("yen"), "19,417" + global.t("yen"), "36,808" + global.t("yen")],
  };
  const contentWhite1 = (value) => (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino}}>
        {global.t("basic_set_whitening_recommended_who_are_new_skincare")}
      </Text>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino05}}>
        {global.t("set_content_tranexamic_acid_cinal_high_thiol_neurobitan")}
      </Text>
    </View>
  );
  const contentWhite2 = (value) => (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino}}>
        {global.t("the_amount_of_tranexamic_acid")}
      </Text>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino05}}>
        {global.t("set_content_tranexamic_acid_cinal_high_thiol_neurobitan")}
      </Text>
    </View>
  );
  const tableSkin = {
    tableHead: [global.t("medicine_fee_tax_included")],
    tableData1: ["", global.t("one_month"), global.t("three_month"), global.t("six_month")],
    tablePrice1: ["7,500" + global.t("yen"), "20,700" + global.t("yen"), "41,100" + global.t("yen")],
    tablePrice2: ["12,740" + global.t("yen"), "36,346" + global.t("yen"), "68,884" + global.t("yen")],
  };
  const contentSkin1 = (value) => (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino}}>
        {global.t("vitamin_e_is_added_to_the_strongest")}
      </Text>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino05}}>
        {global.t("set_content_tranexamic_tocopherol")}
      </Text>
    </View>
  );
  const contentSkin2 = (value) => (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino}}>
        {global.t("in_addition_to_the_skinwhitening_aging_set")}
      </Text>
      <Text style={{fontSize: 13, lineHeight: 18, letterSpacing: 1, color: colors.textHiragino05}}>
        {global.t("set_content_4_icosapentaenoate")}
      </Text>
    </View>
  );

  return (
    <View style={{backgroundColor: colors.white, borderRadius: 18, padding: 20, flexDirection: "column"}}>
      <Text style={{fontSize: width < 380 ? 20 : 24, fontWeight: "700", color: colors.buttonSkincare, marginBottom: 15, textAlign: "center"}}>
        {global.t("oral_medicine")}
      </Text>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <View style={{height: 2, width: 20, marginBottom: 4, backgroundColor: colors.buttonSkincare}}></View>
      </View>
      <TypeAndEffectOfInternalMedicine
        styleColor={colors.buttonSkincare}
        bgListColor={colors.colorSkincare02}
        planDescription={[
          "ホームケア内服薬。",
          "素肌のトラブル（しみ、そばかす、しわ、くすみなど）の治療。医療用医薬品による高い効果が期待できます。",
        ]}
        listMedicine={listMedicine}
      />
      <View>
        <View style={{backgroundColor: colors.buttonSkincare, borderRadius: 4, height: 36, marginTop: 20}}>
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
            {global.t("we_have_a_set_plan_to_suit_your_skin_problems")}
          </Text>
        </View>
        <View style={{flexDirection: "row", alignItems: "center", marginBottom: 8}}>
          <View style={{width: 14, height: 14, backgroundColor: colors.colorSkincare07, borderRadius: 500, marginRight: 5}}></View>
          <Text style={{color: colors.buttonSkincare, fontSize: 14, lineHeight: 21, fontFamily: fonts.Hiragino, fontWeight: "700"}}>
            {global.t("whitening_plan")}
          </Text>
        </View>
        {/* bang trang da (white plan) */}
        <View style={{}}>
          <Table borderStyle={{borderWidth: 1, borderColor: colors.buttonSkincare}}>
            <Row
              textStyle={{textAlign: "center", color: colors.textHiragino}}
              data={tableWhite.tableHead}
              style={{backgroundColor: colors.colorSkincare04, fontSize: 14, lineHeight: 18, height: 28}}
            />
            <Row
              textStyle={{textAlign: "center", color: colors.textHiragino}}
              data={tableWhite.tableData1}
              style={{backgroundColor: colors.colorSkincare02, fontSize: 14, lineHeight: 18, height: 28}}
            />
            <TableWrapper style={{flexDirection: "row"}}>
              <TableWrapper style={{flex: 1}}>
                <Col
                  data={[global.t("whitening_basic_set"), global.t("beautiful_skin_whitening_strongest_set")]}
                  style={{flex: 1, backgroundColor: colors.colorSkincare02}}
                  textStyle={{textAlign: "justify", color: colors.textHiragino, paddingLeft: 6}}
                />
              </TableWrapper>
              <TableWrapper style={{flex: 3, flexDirection: "column"}}>
                <Row
                  textStyle={{textAlign: "center", color: colors.textHiragino}}
                  data={tableWhite.tablePrice1}
                  style={{fontSize: 13, lineHeight: 18, height: 28}}
                />
                <Row textStyle={{textAlign: "center"}} data={[contentWhite1()]} style={{flex: 1, height: 130}} />
                <Row
                  textStyle={{textAlign: "center", color: colors.textHiragino}}
                  data={tableWhite.tablePrice2}
                  style={{fontSize: 13, lineHeight: 18, height: 28}}
                />
                <Row textStyle={{textAlign: "center"}} data={[contentWhite2()]} style={{flex: 1}} />
              </TableWrapper>
            </TableWrapper>
          </Table>
        </View>

        <View style={{flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 8}}>
          <View style={{width: 14, height: 14, backgroundColor: colors.colorSkincare07, borderRadius: 500, marginRight: 5}}></View>
          <Text style={{color: colors.buttonSkincare, fontSize: 14, lineHeight: 21, fontFamily: fonts.Hiragino, fontWeight: "700"}}>
            {global.t("Beautiful_skin_plan")}
          </Text>
        </View>
        {/* bang tri mun (skin aging plan) */}
        <View style={{}}>
          <Table borderStyle={{borderWidth: 1, borderColor: colors.buttonSkincare}}>
            <Row
              textStyle={{textAlign: "center", color: colors.textHiragino}}
              data={tableSkin.tableHead}
              style={{backgroundColor: colors.colorSkincare04, fontSize: 14, lineHeight: 18, height: 28}}
            />
            <Row
              textStyle={{textAlign: "center", color: colors.textHiragino}}
              data={tableSkin.tableData1}
              style={{backgroundColor: colors.colorSkincare02, fontSize: 14, lineHeight: 18, height: 28}}
            />
            <TableWrapper style={{flexDirection: "column"}}>
              <TableWrapper style={{flexDirection: "row"}}>
                <Col
                  data={[global.t("whitening_skin_aging_set")]}
                  he
                  style={{flex: 1, backgroundColor: colors.colorSkincare02}}
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
                  data={[global.t("the_strongest_whitening_skin_aging_set")]}
                  he
                  style={{flex: 1, backgroundColor: colors.colorSkincare02}}
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
            </TableWrapper>
          </Table>
        </View>
      </View>

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
