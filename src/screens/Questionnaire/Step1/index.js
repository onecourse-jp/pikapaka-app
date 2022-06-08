import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import moment from "moment";
import {SCREEN_QUESIONAIRE_STEP2, SCREEN_EDIT_CALENDAR, SCREEN_CONNECT_DOCTOR} from "@screens/screens.constants";
import {getReservationById} from "@services/auth";

export default function QuestionaireStep1({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const idCalendar = route?.params?.id;
  const screenStep = 2;
  const navigation = useNavigation();
  const [dataCalendar, setDataCalendar] = useState(null);

  const handleSubmit = () => {
    if (dataCalendar?.status === 1) {
      navigation.navigate(SCREEN_CONNECT_DOCTOR);
    } else if (dataCalendar?.status === 2) {
      navigation.navigate(SCREEN_QUESIONAIRE_STEP2, {data: dataCalendar});
    }
  };

  const handleEditCalendar = () => {
    navigation.navigate(SCREEN_EDIT_CALENDAR, {data: dataCalendar});
  };
  useEffect(async () => {
    if (idCalendar) {
      global.showLoadingView();
      const {response, data} = await getReservationById(idCalendar);
      if (response?.status === 200) {
        setDataCalendar(data?.data);
      } else {
        console.log("response getReservationById", response?.status);
      }
      global.hideLoadingView();
    }
  }, [idCalendar]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
          <StepsComponent currentStep={screenStep} isStepAll={true} />
          <GuideComponent
            title={"現在下記ご予約を承っております。診察前に『必ず』事前問診票にお答えください。（回答していただかないと受診ができません）"}
            note="※回答していただかないと受診ができません"
          />
          <View>
            <Text
              style={{fontFamily: fonts.NSbold, fontSize: 15, color: colors.textBlack, lineHeight: 23, marginTop: 23, textAlign: "center"}}
            >
              次のオンライン診療
            </Text>
          </View>
          {dataCalendar && (
            <View>
              <Text
                style={{
                  fontFamily: fonts.SFmedium,
                  fontSize: 13,
                  color: colors.textBlack,
                  lineHeight: 16,
                  marginTop: 8,
                  textAlign: "center",
                }}
              >
                {global.t(`categoryTitle.${dataCalendar?.detail_category_medical_of_customer}`)}
              </Text>
              <Text
                style={{fontFamily: fonts.SFmedium, fontSize: 14, color: colors.gray1, lineHeight: 17, marginTop: 7, textAlign: "center"}}
              >
                {`${moment(dataCalendar?.date).format("YYYY年MM月DD日")}（${moment(dataCalendar?.date).format("dddd")}）${
                  dataCalendar?.time_start
                }~${dataCalendar?.time_end}`}
              </Text>
            </View>
          )}

          <View style={{marginTop: 8}}>
            <Button label={dataCalendar?.status === 1 ? "入室して接続準備を行う" : "問診票を記入する"} onPress={handleSubmit} />
          </View>
          <TouchableOpacity onPress={handleEditCalendar}>
            <View>
              <Text
                style={{
                  fontFamily: fonts.SFmedium,
                  fontSize: 14,
                  color: colors.textBlue,
                  textAlign: "center",
                  marginTop: 11,
                  lineHeight: 17,
                }}
              >
                {dataCalendar?.status === 1 ? "予約の詳細確認・変更" : "予約の詳細・変更"}
              </Text>
            </View>
          </TouchableOpacity>
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
