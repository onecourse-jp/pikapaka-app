import React, {useState, useRef, useEffect} from "react";
import {View, Text, Image, Dimensions, TouchableOpacity} from "react-native";
import styles from "./styles";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView} from "react-native-gesture-handler";
import Headercomponent from "@components/Layout/Header";
import TabHeaderComponent from "@components/Layout/TabHeader";
import DiagnosisAndTreatment from "./components/DiagnosisAndTreatment";
import OnlineMedicalCare from "./components/OnlineMedicalCare";
import BenefitOnlineMedicalCare from "./components/BenefitOnlineMedicalCare";
import RecommendOnlineMedicalCare from "./components/RecommendOnlineMedicalCare";
import FlowMedicalCare from "./components/FlowMedicalCare";
import FAQComponent from "./components/FAQ";
import NewsComponent from "./components/News";
import AboutClinic from "./components/AboutClinic";
import FooterComponent from "@components/Layout/Footer";
import ButtonBooking from "./components/ButtonBooking";

const {height} = Dimensions.get("window");

export default function Home({route}) {
  const user = useSelector((state) => state.users?.userDetails);
  const HomeRef = useRef(null);
  const navigation = useNavigation();
  const colors = useThemeColors();
  const keyScroll = route?.params?.keyScroll;
  const [onlineMedicalCare, setOnlineMedicalCare] = useState(null);
  const [flowMedicalCare, setFlowMedicalCare] = useState(null);
  const [benefitOnlineMedicalCare, setBenefitOnlineMedicalCare] = useState(null);
  const [recommendOnlineMedicalCare, setRecommendOnlineMedicalCare] = useState(null);

  useEffect(() => {
    if (keyScroll === "onlineMedicalCare") {
      scrollToAddress(onlineMedicalCare);
    } else if (keyScroll === "flowMedicalCare") {
      scrollToAddress(flowMedicalCare);
    } else if (keyScroll === "benefitOnlineMedicalCare") {
      scrollToAddress(benefitOnlineMedicalCare);
    } else if (keyScroll === "recommendOnlineMedicalCare") {
      scrollToAddress(recommendOnlineMedicalCare);
    }
  }, [route]);

  const scrollToAddress = (offsetY) => {
    offsetY += height / 2 - 100;
    HomeRef?.current?.scrollTo({y: offsetY});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme, position: "relative"}}>
      <Headercomponent
        onlineMedicalCare={onlineMedicalCare}
        flowMedicalCare={flowMedicalCare}
        benefitOnlineMedicalCare={benefitOnlineMedicalCare}
        recommendOnlineMedicalCare={recommendOnlineMedicalCare}
        scrollToAddress={scrollToAddress}
      />
      <TabHeaderComponent />
      <View style={[styles.container]}>
        <ScrollView ref={HomeRef} contentContainerStyle={{backgroundColor: colors.colorHome02}}>
          <View style={{width: "100%", backgroundColor: colors.white}}>
            <Image style={{width: "100%"}} source={require("@assets/images/image_header_top.png")} />
          </View>
          <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20}}>
            <DiagnosisAndTreatment />
            <View style={{height: 10}}></View>
            <View
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                setOnlineMedicalCare(layout.y);
              }}
              ref={(view) => {}}
            >
              <OnlineMedicalCare
                title="ピカパカヘルスケアとは"
                textFormat={[
                  "ピカパカヘルスケアは、オンライン診療支援サービスです。オンライン診療を行う医師と患者様をつなぐシステムを提供しています。",
                  "ピカパカヘルスケアにより、ご自宅にいながら手軽にスキンケアやダイエットのご相談、またお薬の処方などをオンライン診療で行うことができます。",
                  "※ピカパカヘルスケアは医療機関ではございません。 ",
                  "※実際の診療・処方は提携医師が行います。",
                ]}
                styleColor={colors.colorHome10}
                lineColor={colors.colorHome02}
              />
            </View>
            <View style={{height: 10}}></View>
            <View
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                setFlowMedicalCare(layout.y);
              }}
              ref={(view) => {}}
            >
              <FlowMedicalCare
                styleColor={colors.colorHome10}
                imageUrls={[
                  require("@assets/images/flow_care_1.png"),
                  require("@assets/images/flow_care_2.png"),
                  require("@assets/images/flow_care_3.png"),
                  require("@assets/images/flow_care_4.png"),
                ]}
              />
            </View>
            <View style={{height: 10}}></View>
            <AboutClinic />
            <View style={{height: 10}}></View>
            <View
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                setBenefitOnlineMedicalCare(layout.y);
              }}
              ref={(view) => {}}
            >
              <BenefitOnlineMedicalCare />
            </View>
            <View style={{height: 10}}></View>
            <View
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                setRecommendOnlineMedicalCare(layout.y);
              }}
              ref={(view) => {}}
            >
              <RecommendOnlineMedicalCare
                textFormat={[
                  "仕事などが忙しく、クリニックに行く時間がない",
                  "家の近くに悩みを相談できるクリニックがない",
                  "クリニック・薬局などの待ち時間が嫌",
                  "薬をすぐに処方してもらいたい",
                  "いう方などに 費用を抑えたいが、信頼のあるクリニックがよい",
                ]}
                styleColor={colors.colorHome10}
                circleColor={colors.colorHome07}
              />
            </View>
            <View style={{height: 10}}></View>
            <FAQComponent
              screen={0}
              styleColor={colors.colorHome10}
              Qcolor={colors.colorHome07}
              questionData={[
                {question: "オンライン診療とは何ですか？"},
                {question: "オンライン診療の予約時間になりましたが、ビデオ通話が始まりません。"},
                {question: "前回と同じ先生の診療を受けたいのですが指名は可能でしょうか？"},
              ]}
            />

            <View style={{height: 10}}></View>
            <NewsComponent />
          </View>
          <FooterComponent />
        </ScrollView>
        <ButtonBooking bgColor={"rgba(0, 176, 80, 0.7)"} />
      </View>
    </SafeAreaView>
  );
}
