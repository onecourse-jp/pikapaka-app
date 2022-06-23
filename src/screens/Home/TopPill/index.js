import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import styles from "../styles";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {ScrollView} from "react-native-gesture-handler";
import FlowMedicalCare from "../components/FlowMedicalCare";
import FAQComponent from "../components/FAQ";
import FooterComponent from "@components/Layout/Footer";
import LowDosePill from "./LowDosePill";
import AfterPill from "./AfterPill";
import ButtonBooking from "../components/ButtonBooking";

export default function Pill() {
  const user = useSelector((state) => state.users);
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const [tab, setTab] = useState(true);
  const colors = useThemeColors();

  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={{backgroundColor: colors.colorPill03}}>
        <View style={{width: "100%", backgroundColor: colors.white}}>
          <Image style={{width: "100%"}} source={require("@assets/images/banner_top_pill.png")} />
        </View>

        <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 40}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              padding: 0
            }}
          >
            <TouchableOpacity
              style={{paddingVertical: 0, flex: 1}}
              onPress={() => {
                setTab(true);
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 10,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  borderColor: colors.colorPill,
                  borderWidth: 2,
                  borderBottomWidth: 0,
                  backgroundColor: tab ? colors.colorPill : colors.white,
                  height: tab ? 60 : 50,
                }}
              >
                <Text style={{color: tab ? colors.white : colors.colorPill}}>{global.t("low_dose_pill")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingVertical: 0, flex: 1}}
              onPress={() => {
                setTab(false);
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  backgroundColor: tab == false ? colors.colorPill : colors.white,
                  borderWidth: 2,
                  borderColor: colors.colorPill,
                  borderBottomWidth: 0,
                  height: tab == false ? 60 : 50,
                }}
              >
                <Text
                  style={{
                    color: tab == false ? colors.white : colors.colorPill,
                    fontWeight: "700",
                    fontSize: 14,
                    lineHeight: 24,
                  }}
                >
                  {global.t("after_pill")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{height: 3, backgroundColor: colors.colorPill, marginBottom: 10}}></View>
          {tab == true ? <LowDosePill /> : <AfterPill />}

          <View style={{height: 10}}></View>
          <FAQComponent
            screen={4}
            styleColor={colors.colorPill}
            Qcolor={colors.colorPill07}
            questionData={[{question: "低用量ピルを使えない人はいますか？"}, {question: "低用量ピルの処方にあたり検査は必要ですか？"}]}
          />
          <View style={{height: 10}}></View>
          <FlowMedicalCare
            styleColor={colors.colorPill}
            imageUrls={[
              require("@assets/images/flow_diet_1.png"),
              require("@assets/images/flow_diet_2.png"),
              require("@assets/images/flow_diet_3.png"),
              require("@assets/images/flow_diet_4.png"),
            ]}
          />
        </View>
          <View style={{height: 20}}></View>
        <FooterComponent />
      </ScrollView>
      <ButtonBooking bgColor={"rgba(219, 207, 95, 0.7)"} />
    </View>
  );
}
