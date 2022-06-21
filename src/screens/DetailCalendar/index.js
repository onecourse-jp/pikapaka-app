import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import moment from "moment";
import {SCREEN_QUESIONAIRE_STEP2, SCREEN_EDIT_CALENDAR, SCREEN_CONNECT_DOCTOR, SCREEN_PAYMENT} from "@screens/screens.constants";
import {getReservationById} from "@services/auth";

export default function DetailCalender({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const idCalendar = route?.params?.id;
  const fromScreen = route?.params?.fromScreen;
  const [refreshing, setRefreshing] = React.useState(false);
  const [screenStep, setCurrentStep] = useState(2);
  const navigation = useNavigation();
  const [dataCalendar, setDataCalendar] = useState(null);

  const handleSubmit = () => {
    console.log("dataCalendar?.statusdataCalendar?.status", dataCalendar?.status);
    if (dataCalendar?.status === 1) {
      navigation.navigate(SCREEN_CONNECT_DOCTOR, {data: dataCalendar});
    } else if (dataCalendar?.status === 2) {
      navigation.navigate(SCREEN_QUESIONAIRE_STEP2, {data: dataCalendar});
    } else if (dataCalendar?.status === 3) {
      navigation.navigate(SCREEN_PAYMENT, {id: dataCalendar.id});
    }
  };
  const handleEditCalendar = () => {
    navigation.navigate(SCREEN_EDIT_CALENDAR, {data: dataCalendar});
  };

  const actionGetCalendar = async () => {
    if (idCalendar) {
      global.showLoadingView();
      const {response, data} = await getReservationById(idCalendar);
      if (response?.status === 200) {
        setDataCalendar(data?.data);
        console.log("response getReservationById", data?.data.id);
        if (data?.data?.status === 1) {
          setCurrentStep(3);
        } else if (data?.data?.status === 2) {
          setCurrentStep(2);
        } else if (data?.data?.status >= 3) {
          setCurrentStep(4);
        }
      } else {
        console.log("response getReservationById", response?.status);
      }
      global.hideLoadingView();
    }
  };
  useEffect(async () => {
    actionGetCalendar();
  }, [idCalendar, fromScreen]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    actionGetCalendar();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>

      <View style={[styles.container]}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{}}>
          <GuideComponent
            title={
              dataCalendar?.status == 1
                ? "診療時間までお待ちください。"
                : "現在下記ご予約を承っております。診察前に必ず事前問診にお答えください。"
            }
            content={
              dataCalendar?.status == 1
                ? "時間になりましたら、入室し、医師の準備ができましたら、接続してください。\nなお、順番に患者様を診察しております。お待ち頂く可能性もございますので、予めご了承ください。"
                : ""
            }
            note={dataCalendar?.status == 2 ? "※回答していただかないと受診ができません" : ""}
          />
          <StepsComponent currentStep={screenStep} isStepAll={true} />
          {dataCalendar && (
            <View style={{backgroundColor: colors.white, padding: 16}}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <View
                  style={{
                    borderWidth: 1,
                    marginRight: 7,
                    borderColor: global.renderColorStatus({type: "text", status: dataCalendar?.status}),
                    backgroundColor: global.renderColorStatus({type: "background", status: dataCalendar?.status}),
                    paddingHorizontal: 8,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.Hiragino,
                      fontSize: 12,
                      color: global.renderColorStatus({type: "text", status: dataCalendar?.status}),
                      lineHeight: 20,
                      textAlign: "left",
                    }}
                  >
                    {global.t(`status_calendar.${dataCalendar?.status}`)}
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
                  {global.t(`categoryTitle.${dataCalendar?.detail_category_medical_of_customer}`)}
                </Text>
              </View>
              <View>
                <Text style={{fontFamily: fonts.Hiragino, fontSize: 14, color: colors.gray1, lineHeight: 17, marginTop: 7}}>
                  {`${moment(dataCalendar?.date).format("YYYY年MM月DD日")}（${moment(dataCalendar?.date).format("dddd")}）${
                    dataCalendar?.time_start
                  }~${dataCalendar?.time_end}`}
                </Text>
              </View>
            </View>
          )}
          <View style={{marginTop: 8, paddingHorizontal: 16}}>
            <Button
              label={
                dataCalendar?.status === 1 ? "入室して接続準備を行う" : dataCalendar?.status === 2 ? "問診票を記入する" : "支払いへ進む"
              }
              onPress={handleSubmit}
            />
            <TouchableOpacity
              onPress={handleEditCalendar}
              disabled={dataCalendar?.status > 2 ? true : false}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderColor: colors.colorTextBlack,
                backgroundColor: dataCalendar?.status > 2 ? colors.gray7 : colors.white,
                borderWidth: 1,
                borderRadius: 4,
                marginTop: 11,
                height: 44,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.Hiragino,
                  fontSize: 14,
                  color: colors.colorTextBlack,
                  fontWeight: "600",
                  textAlign: "center",
                  lineHeight: 14,
                }}
              >
                {dataCalendar?.status === 1 ? "予約の詳細確認・変更" : "予約の詳細・変更"}
              </Text>
            </TouchableOpacity>
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
