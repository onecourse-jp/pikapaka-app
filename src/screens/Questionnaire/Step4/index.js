import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Image} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import moment from "moment";
import {SCREEN_QUESIONAIRE_STEP1} from "@screens/screens.constants";
import {updateMedicalHistory} from "@actions/medicalHistoryAction";
import {SCREEN_DETAIL_CALENDAR} from "../../screens.constants";

export default function QuestionaireStep4({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const screenStep = 3;
  const navigation = useNavigation();
  const calendarData = route?.params?.calendarData;
  const dispatch = useDispatch();

  const handleSubmit = () => {
    navigation.navigate(SCREEN_DETAIL_CALENDAR, {id: calendarData.id, fromScreen: "questionnaire_4"});
  };

  useEffect(() => {
    console.log("calendarData", calendarData);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{}}>
          <GuideComponent
            title={`問診票を承りました。`}
            content={`下記診察の時間になりましたらアプリからビデオチャットに入っていただき、医師の準備ができるまでお待ちください。\n順番に患者様を診察しております。お待ち頂く可能性もございますので、予めご了承ください。`}
          />
          <StepsComponent currentStep={screenStep} isStepSchedule={true} />
          <View style={{backgroundColor: colors.white, padding: 16}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View
                style={{
                  borderWidth: 1,
                  marginRight: 7,
                  borderColor: global.renderColorStatus({type: "text", status: 1}),
                  backgroundColor: global.renderColorStatus({type: "background", status: 1}),
                  paddingHorizontal: 8,
                  alignSelf: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.Hiragino,
                    fontSize: 12,
                    color: global.renderColorStatus({type: "text", status: 1}),
                    lineHeight: 20,
                    textAlign: "left",
                  }}
                >
                  {global.t(`status_calendar.${1}`)}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: fonts.Hiragino,
                  fontSize: 13,
                  color: colors.textBlack,
                  fontWeight: "600",
                  lineHeight: 16,
                  textAlign: "center",
                }}
              >
                {global.t(`categoryTitle.${calendarData?.detail_category_medical_of_customer}`)}
              </Text>
            </View>
            <View>
              <Text style={{fontFamily: fonts.Hiragino, fontSize: 14, color: colors.gray1, lineHeight: 17, marginTop: 7}}>
                {`${moment(calendarData?.date).format("YYYY年MM月DD日")}（${moment(calendarData?.date).format("dddd")}）${
                  calendarData?.time_start
                }~`}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 26, paddingHorizontal: 16}}>
            <Button label="次へ進む" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    flexDirection: "column",
  },
});
