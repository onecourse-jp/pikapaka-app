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
    {key: "name", label: "お名前（漢字）", placeholder: "お名前（漢字）を入力", value: dataConfirm?.name},
    {key: "postal_code", label: "郵便番号", placeholder: "郵便番号を入力", value: dataConfirm?.postal_code},
    {key: "address", label: "住所", placeholder: "住所を入力", value: dataConfirm?.address},
    {
      key: "gender",
      label: "性別",
      placeholder: "選択",
      value: dataConfirm?.gender == 1 ? "男" : "女性",
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{}}>
          <GuideComponent title={"以下の内容で間違いがなければ、問診内容を確定してください。"} />
          <StepsComponent currentStep={screenStep} isStepSchedule={true} />
          <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 16}}>
            <Text style={{fontFamily: fonts.Hiragino, fontSize: 13, color: colors.gray1, width: "40%", lineHeight: 23, marginBottom: 16}}>
              診療科目：
            </Text>
            <Text
              style={{
                fontFamily: fonts.Hiragino,
                fontSize: 13,
                color: colors.gray7,
                width: "60%",
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
                fontSize: 16,
                color: colors.colorTextBlack,
                fontWeight: "700",
                marginTop: 16,
                marginBottom: 12,
              }}
            >{`問診`}</Text>
            {resultQuestion.map((item, index) => {
              return (
                <View key={`med-${index}`} style={{backgroundColor: colors.white, flexDirection: "row", padding: 16}}>
                  <Text style={{fontFamily: fonts.Hiragino, color: colors.gray3, width: "65%", fontSize: 15, lineHeight: 18}}>
                    {item.label}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.NSregular,
                      color: colors.gray1,
                      width: "35%",
                      fontSize: 15,
                      lineHeight: 18,
                    }}
                  >
                    {typeof item?.value == "string" ? (
                      <Text>{item?.value}</Text>
                    ) : (
                      item?.value?.map((el, index) => {
                        return index + 1 < item.value.length ? `${el}, ` : el;
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
                fontSize: 16,
                color: colors.colorTextBlack,
                fontWeight: "700",
                marginTop: 16,
                marginBottom: 12,
              }}
            >{`処方箋送付先情報`}</Text>
            {DATALISTPERSON.map((item, index) => {
              return (
                <View key={`per-${index}`} style={{backgroundColor: colors.white, flexDirection: "row", padding: 16}}>
                  <Text style={{fontFamily: fonts.Hiragino, color: colors.gray3, width: "40%", fontSize: 15, lineHeight: 18}}>
                    {item.label}
                  </Text>
                  <Text style={{fontFamily: fonts.NSregular, color: colors.gray1, fontSize: 15, lineHeight: 18}}>{item.value}</Text>
                </View>
              );
            })}
          </View>
          <View style={{marginTop: 10, paddingHorizontal: 16}}>
            <Button label="入力を完了する" onPress={handleSubmit} />
          </View>
          <View style={{marginTop: 8, paddingHorizontal: 16, marginBottom: 30}}>
            <Button variant="secondary" label="内容を修正する" onPress={() => navigation.goBack()} />
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
