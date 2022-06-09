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
import ExternalMedicine from "./ExternalMedicine";

export default function ED() {
  const user = useSelector((state) => state.users);
  const navigation = useNavigation();
  const fonts = useThemeFonts();

  const colors = useThemeColors();

  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={{backgroundColor: colors.bgEd}}>
        <View style={{width: "100%", backgroundColor: colors.white}}>
          <Image style={{width: "100%"}} source={require("@assets/images/image_header_top_ed.png")} />
        </View>
        <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20}}>
          <View style={{height: 10}}></View>
          <OnlineMedicalCare
            title={global.t("what_is_medical_ed")}
            textFormat={[
              "EDとは、満足な性行為を行うのに十分な勃起が得られないか、 維持できない状態が持続または再発することです。",
              "勃起が起こるうえでは「cGMP」という物質が重要な役割を果たし、 勃起をしずめる際には「PDE5」というcGMPを分解する酵素が働きます。",
              "バイアグラなどの治療薬はPDE5に作用し、両者のバランスを整えることで 勃起を起きやすくしてくれます。",
            ]}
            styleColor={colors.colorED}
            lineColor={colors.colorED05}
          />
          <View style={{height: 10}}></View>
          <RecommendOnlineMedicalCare
            // textFormat={["そばかす、肝斑、色素新着が気になる", "ニキビが気になる", "とにかく白くなりたい", "シミ予防をしたい"]}
            description={[
              "ED治療薬の副作用で主にみられるものは、 顔、体のほてり、目の充血、頭痛、鼻づまり ですが、一般的に問題なく服用いただける方がほとんどです。",
            ]}
            title={global.t("side_effect")}
            styleColor={colors.colorED}
            circleColor={colors.colorED07}
          />
          <View style={{height: 10}}></View>
          <RecommendOnlineMedicalCare
            textFormat={[
              "食前や空腹時に飲んでください",
              "グレープフルーツなどの柑橘類で服用することは避けてください",
              "お酒は飲み過ぎに注意し、適量にしてください",
              "降圧剤を服用されている方は医師とご相談ください",
            ]}
            title={global.t("Precautions_for_taking")}
            styleColor={colors.colorED}
            circleColor={colors.colorED07}
          />
          <View style={{height: 10}}></View>
          <ExternalMedicine />
          <View style={{height: 10}}></View>
          <FAQComponent
            screen={5}
            styleColor={colors.buttonED}
            Qcolor={colors.colorED07}
            questionData={[{question: "ED薬は食事や飲酒の影響を受けますか？　"}, {question: "飲みすぎると効果が薄れるって本当ですか？"}]}
          />
          <View style={{height: 10}}></View>
          <FlowMedicalCare styleColor={colors.buttonED} />
        </View>
        <FooterComponent />
      </ScrollView>
    </View>
  );
}