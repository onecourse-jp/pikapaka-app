import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, TextInput, SafeAreaView} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import moment from "moment";
import {SCREEN_QUESIONAIRE_STEP4} from "@screens/screens.constants";
import {changeStatusCalendar} from "@actions/calendarAction";
import {createReservationAnswer} from "@services/auth";

export default function QuestionaireStep3({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const screenStep = 2;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const calendar = useSelector((state) => state?.calendar);
  const user = useSelector((state) => state?.users?.userDetails);
  const calendarData = route?.params?.calendarData;
  const dataConfirm = route?.params?.dataConfirm;
  const dataQuestion = route?.params?.dataQuestion;
  const [resultQuestion, setResultQuestion] = useState([]);
  console.log("dataConfirm", dataConfirm);

  const handleSubmit = async () => {
    dataConfirm.medical_type = 1;
    // calendar.
    console.log("dataConfirm", dataConfirm);
    const {response, data} = await createReservationAnswer(dataConfirm);
    if (response.status === 200) {
      dispatch(changeStatusCalendar());
      navigation.navigate(SCREEN_QUESIONAIRE_STEP4, {calendarData: calendarData});
    } else {
      console.log("errrrrrrr response", response);
    }
  };

  useEffect(() => {
    try {
      if (dataQuestion && dataConfirm) {
        let newResult = [];
        dataQuestion?.map((item, index) => {
          newResult.push({label: item.title, value: dataConfirm?.data[index]?.content_answer});
        });
        console.log("resultQuestion", newResult);
        setResultQuestion(newResult);
      }
    } catch (error) {
      console.log("errorerror", error);
    }
  }, [dataQuestion, dataConfirm]);

  const DATALISTPERSON = [
    {key: "name", label: "?????????????????????", placeholder: "??????????????????????????????", value: dataConfirm?.name},
    {key: "postal_code", label: "????????????", placeholder: "?????????????????????", value: dataConfirm?.postal_code},
    {key: "address", label: "??????", placeholder: "???????????????", value: dataConfirm?.address},
    {
      key: "gender",
      label: "??????",
      placeholder: "??????",
      value: dataConfirm?.gender == 1 ? "???" : "??????",
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{}}>
          <GuideComponent title={"???????????????????????????????????????????????????????????????????????????????????????"} />
          <StepsComponent currentStep={screenStep} isStepSchedule={true} />
          <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 16}}>
            <Text style={{fontFamily: fonts.Hiragino, fontSize: 13, color: colors.gray1, width: "30%", lineHeight: 23, marginBottom: 16}}>
              ???????????????
            </Text>
            <Text
              style={{
                fontFamily: fonts.Hiragino,
                fontSize: 13,
                color: colors.gray7,
                width: "70%",
                lineHeight: 23,
                marginBottom: 16,
              }}
            >
              {calendar?.data?.step1.value}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.Hiragino,
                paddingHorizontal: 16,
                fontSize: 14,
                color: colors.colorTextBlack,
                fontWeight: "700",
                marginTop: 16,
                marginBottom: 12,
              }}
            >{`??????`}</Text>
            {resultQuestion.map((item, index) => {
              return (
                <View key={`med-${index}`} style={{backgroundColor: colors.white, flexDirection: "row", padding: 16}}>
                  <Text
                    style={{fontFamily: fonts.Hiragino, color: colors.gray3, width: "65%", paddingRight: 10, fontSize: 12, lineHeight: 18}}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.NSregular,
                      color: colors.gray1,
                      width: "35%",
                      fontSize: 12,
                      lineHeight: 18,
                      paddingLeft: 12,
                      textAlign: "justify",
                    }}
                  >
                    {typeof item?.value == "string" ? (
                      <Text>{item?.value}</Text>
                    ) : (
                      item?.value?.map((el, index) => {
                        return index + 1 < item.value.length ? `${el}\n` : el;
                      })
                    )}
                  </Text>
                </View>
              );
            })}
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.Hiragino,
                paddingHorizontal: 16,
                fontSize: 14,
                color: colors.colorTextBlack,
                fontWeight: "700",
                marginTop: 16,
                marginBottom: 12,
              }}
            >{`????????????????????????`}</Text>
            {DATALISTPERSON.map((item, index) => {
              return (
                <View key={`per-${index}`} style={{backgroundColor: colors.white, flexDirection: "row", padding: 16}}>
                  <Text style={{fontFamily: fonts.Hiragino, color: colors.gray3, width: "40%", fontSize: 12, lineHeight: 18}}>
                    {item.label}
                  </Text>
                  <Text style={{fontFamily: fonts.NSregular, color: colors.gray1, fontSize: 12, lineHeight: 18}}>{item.value}</Text>
                </View>
              );
            })}
          </View>
          <View style={{marginTop: 10, paddingHorizontal: 16}}>
            <Button label="???????????????????????????" onPress={handleSubmit} />
          </View>
          <View style={{marginTop: 8, paddingHorizontal: 16, marginBottom: 30}}>
            <Button variant="secondary" label="?????????????????????" onPress={() => navigation.goBack()} />
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
