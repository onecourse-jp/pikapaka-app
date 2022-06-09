import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import moment from "moment";
import {SCREEN_QUESIONAIRE_STEP1} from "@screens/screens.constants";
import {navigationRef} from "src/navigation/NavigationService";
import {updateCalendar} from "@actions/calendarAction";

export default function ServiceStep5({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const screenStep = 5;
  const idCalendar = route?.params?.id;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const calendar = useSelector((state) => state?.calendar);
  const user = useSelector((state) => state?.users?.userDetails);
  const dataConfirm = calendar?.data?.step3;

  const handleSubmit = () => {
    navigation.navigate(SCREEN_QUESIONAIRE_STEP1, {id: idCalendar});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{}}>
          <GuideComponent
            title={"ご予約を承りました。事前に必ず問診票のご記入をお願いいたします。"}
            note="※回答していただかないと受診ができません"
          />
          <StepsComponent currentStep={screenStep} />
          <View style={{backgroundColor: colors.white, padding: 16}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View
                style={{
                  borderWidth: 1,
                  marginRight: 7,
                  borderColor:
                    dataConfirm?.status > 3 && dataConfirm?.status != 7 ? colors.bdPaymentStatusTrue : colors.bdPaymentStatusFalse,
                  backgroundColor:
                    dataConfirm?.status > 3 && dataConfirm?.status != 7 ? colors.bgPaymentStatusTrue : colors.bgPaymentStatusFalse,
                  paddingHorizontal: 8,
                  alignSelf: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.Hiragino,
                    fontSize: 12,
                    color:
                      dataConfirm?.status > 3 && dataConfirm?.status != 7 ? colors.textPaymentStatusTrue : colors.textPaymentStatusFalse,
                    lineHeight: 20,
                    textAlign: "left",
                  }}
                >
                  予約受付
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
                {global.t(`categoryTitle.${dataConfirm?.detail_category_medical_of_customer}`)}
              </Text>
            </View>
            <View>
              <Text style={{fontFamily: fonts.Hiragino, fontSize: 14, color: colors.gray1, lineHeight: 17, marginTop: 7}}>
                {`${moment(dataConfirm?.date).format("YYYY年MM月DD日")}（${moment(dataConfirm?.date).format("dddd")}）${
                  dataConfirm?.time_start
                }~${dataConfirm?.time_end}`}
              </Text>
            </View>
          </View>
          <View style={{paddingHorizontal: 16, marginTop: 20}}>
            <Button label="問診票の入力へ進む" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
