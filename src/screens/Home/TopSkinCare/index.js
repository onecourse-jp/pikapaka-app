import React, {useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import styles from "../styles";
import {useThemeColors} from "react-native-theme-component";
import OnlineMedicalCare from "../components/OnlineMedicalCare";
import RecommendOnlineMedicalCare from "../components/RecommendOnlineMedicalCare";
import FlowMedicalCare from "../components/FlowMedicalCare";
import FAQComponent from "../components/FAQ";
import FooterComponent from "@components/Layout/Footer";
import OralMedicineSkinCare from "./OralMedicineSkinCare";
import ButtonBooking from "../components/ButtonBooking";
import ExternalMedicine from "./ExternalMedicine";

const {height} = Dimensions.get("window");

export default function SkinCare() {
  const skinCareView = useRef(null);
  const colors = useThemeColors();
  const [refDrinkAndCare, setrefDrinkAndCare] = useState(null);
  const [refApplyAndCare, setrefApplyAndCare] = useState(null);
  const [heightDrinkAndCare, setHeightDrinkAndCare] = useState(null);
  const [heightApplyAndCare, setHeightApplyAndCare] = useState(null);

  const scrollToAddress = (offsetY) => {
    offsetY += height / 2 - 100;
    skinCareView?.current?.scrollTo({y: offsetY});
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView ref={skinCareView} contentContainerStyle={{backgroundColor: colors.bgSkincare}}>
        <View style={{width: "100%", backgroundColor: colors.white}}>
          <Image style={{width: "100%"}} source={require("@assets/images/image_header_top_skincare.png")} />
        </View>
        <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20}}>
          <View style={{flexDirection: "column", alignItems: "center"}}>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 24, lineHeight: 36, color: colors.textHiragino, fontWeight: "700"}}>あなたはどっち？</Text>
            </View>
            <TouchableOpacity
              onPress={() => scrollToAddress(heightDrinkAndCare)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: colors.buttonSkincare,
                height: 54,
                paddingHorizontal: 20,
                borderRadius: 4,
                width: "100%",
                marginBottom: 10,
              }}
            >
              <Text style={{fontSize: 16, fontWeight: "700", lineHeight: 24, color: colors.white}}>飲んでケア（内服薬）</Text>
              <Image style={{width: 8, height: 4}} source={require("@assets/images/arrow_skincare.png")} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => scrollToAddress(heightApplyAndCare)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: colors.buttonSkincare,
                height: 54,
                paddingHorizontal: 20,
                borderRadius: 4,
                width: "100%",
                marginBottom: 30,
              }}
            >
              <Text style={{fontSize: 16, fontWeight: "700", lineHeight: 24, color: colors.white}}>塗ってケア（外用薬）</Text>
              <Image style={{width: 8, height: 4}} source={require("@assets/images/arrow_skincare.png")} />
            </TouchableOpacity>
          </View>
          <View style={{height: 10}}></View>

          <OnlineMedicalCare
            title={global.t("what_is_skin_care")}
            textFormat={[
              "メディカルスキンケアとは、医療用医薬品による肌治療。皮膚科医学に基づいた低価格のスキンケアです。",
              "Tケアクリニックのオンライン診療では、医師がしっかりとあなたのお肌の悩みに向き合い、内服薬や外用薬などを組み合わせ、あなたに合わせた処方を提案します。",
            ]}
            styleColor={colors.buttonSkincare}
            lineColor={colors.colorSkincare05}
          />
          <View style={{height: 10}}></View>
          <RecommendOnlineMedicalCare
            textFormat={["そばかす、肝斑、色素沈着が気になる", "ニキビを予防できる", "肌の内側から白くなりたい", "シミ予防をしたい"]}
            styleColor={colors.buttonSkincare}
            circleColor={colors.colorSkincare07}
          />
          <View style={{height: 10}}></View>
          <View
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              setHeightDrinkAndCare(layout.y);
            }}
            ref={(view) => {
              setrefDrinkAndCare(view);
            }}
          >
            <OralMedicineSkinCare />
          </View>
          <View style={{height: 10}}></View>
          <View
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              setHeightApplyAndCare(layout.y);
            }}
            ref={(view) => {
              setrefApplyAndCare(view);
            }}
          >
            <ExternalMedicine />
          </View>
          <View style={{height: 10}}></View>
          <FAQComponent
            screen={2}
            styleColor={colors.buttonSkincare}
            Qcolor={colors.colorSkincare07}
            questionData={[{question: "他のサプリと併用できますか？"}, {question: "以前服用していた薬をお願いしたいです。　"}]}
          />
          <View style={{height: 10}}></View>
          <FlowMedicalCare styleColor={colors.buttonSkincare} />
        </View>

        <FooterComponent />
      </ScrollView>
      <ButtonBooking
        bgColor={"rgba(209, 152, 204, 0.7)"}
        dataBooking={{label: "スキンケア", value: '{"label":"選択中の科目","value":"スキンケア","key":"skinCare","data":"1"}'}}
      />
    </View>
  );
}
