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

export default function TopAGA() {
  const user = useSelector((state) => state.users);
  const navigation = useNavigation();
  const fonts = useThemeFonts();

  const colors = useThemeColors();

  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={{backgroundColor: colors.colorAGA03}}>
        <View style={{width: "100%", backgroundColor: colors.white}}>
          <Image style={{width: "100%"}} source={require("@assets/images/banner_aga_screen.png")} />
        </View>
        <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20}}>
          <View style={{height: 10}}></View>
          <OnlineMedicalCare
            title="AGAとは？"
            textFormat={[
              "AGAとは、「男性ホルモン型脱毛症（男性型脱毛症）」のことです。",
              "成人男性によくみられる髪が薄くなる状態のことで、特徴として生え際や頭頂部の毛髪が薄くなっていくことがあります。",
              "日本人男性の3人に1人がAGAだと言われており、特に20代以降に多く見られます。 主な原因としては、男性ホルモンバランスの乱れ、遺伝、生活環境の変化などが挙げられます。",
            ]}
            styleColor={colors.colorAGA}
            lineColor={colors.colorAGA05}
          />
          <View style={{height: 10}}></View>
          <RecommendOnlineMedicalCare
            styleColor={colors.colorAGA}
            description={[
              "AGA治療薬の副作用を強く感じられる人は稀ですが、以下のようなものがあります。",
              "勃起不全、リビドー減退、精液量減少、肝機能障害",
            ]}
            circleColor={colors.colorAGA07}
            title="副作用"
          />
          <View style={{height: 10}}></View>
          <ExternalMedicine />
          <View style={{height: 10}}></View>
          <FAQComponent
            screen={6}
            styleColor={colors.colorAGA}
            Qcolor={colors.colorAGA07}
            questionData={[{question: "AGAは治療で治りますか？"}]}
          />
          <View style={{height: 10}}></View>
          <FlowMedicalCare
            styleColor={colors.colorAGA}
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
    </View>
  );
}