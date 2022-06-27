import React, {useEffect} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import styles from "../styles";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {ScrollView} from "react-native-gesture-handler";
import OnlineMedicalCare from "../components/OnlineMedicalCare";
import RecommendOnlineMedicalCare from "../components/RecommendOnlineMedicalCare";
import FlowMedicalCare from "../components/FlowMedicalCare";
import FAQComponent from "../components/FAQ";
import FooterComponent from "@components/Layout/Footer";
import OralMedicineDiet from "./OralMedicineDiet";
import ButtonBooking from "../components/ButtonBooking";

export default function Diet() {
  const user = useSelector((state) => state.users);
  const navigation = useNavigation();
  const fonts = useThemeFonts();

  const colors = useThemeColors();

  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={{backgroundColor: colors.bgDiet}}>
        <View style={{width: "100%", backgroundColor: colors.white}}>
          <Image style={{width: "100%"}} source={require("@assets/images/image_header_top_diet.png")} />
        </View>
        <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20}}>
          <View style={{height: 10}}></View>
          <OnlineMedicalCare
            title={global.t("what_is_medical_diet")}
            textFormat={[
              "メディカルダイエットは、食欲抑制、カロリーダウンを助けるお薬を服用することで無理な我慢や辛い思いはしないで、効果的な減量を目指します。",
              "Tケアクリニックのオンライン診療では、医師がしっかりとあなたのダイエットの悩みに向き合い、あなたに合った処方を提案します。",
            ]}
            styleColor={colors.bgDietText}
            lineColor={colors.textDiet05}
          />
          <View style={{height: 10}}></View>
          <RecommendOnlineMedicalCare
            textFormat={[
              "激しい運動でのダイエットだとなかなか続かない",
              "過激な食事制限も大変",
              "食欲をコントロールするのが難しい",
              "好きなものを食べたいけど、体型は維持したい",
              "会食や付き合いなどでどうしても食べてしまう",
            ]}
            styleColor={colors.bgDietText}
            circleColor={colors.textDiet07}
          />
          <View style={{height: 10}}></View>
          <OralMedicineDiet />
          <View style={{height: 10}}></View>
          <FAQComponent
            screen={3}
            styleColor={colors.bgDietText}
            Qcolor={colors.textDiet07}
            questionData={[{question: "どのくらいの期間で痩せられますか？"}, {question: "以前服用していた薬をお願いしたいです。"}]}
          />
          <View style={{height: 10}}></View>
          <FlowMedicalCare
            styleColor={colors.bgDietText}
            imageUrls={[
              require("@assets/images/flow_diet_1.png"),
              require("@assets/images/flow_diet_2.png"),
              require("@assets/images/flow_diet_3.png"),
              require("@assets/images/flow_diet_4.png"),
            ]}
          />
          {/*   */}
          {/* <View style={{height: 10}}></View>
            <AboutClinic /> */}
        </View>
        <FooterComponent />
      </ScrollView>
      <ButtonBooking
        bgColor={"rgba(43, 185, 185, 0.7)"}
        dataBooking={{label: "ダイエット", value: '{"label":"選択中の科目","value":"ダイエット","key":"diet","data":"5"}'}}
      />
    </View>
  );
}
