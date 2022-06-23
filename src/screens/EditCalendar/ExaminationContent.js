import React, {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TextInput, Alert} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {SCREEN_QUESIONAIRE_STEP2, SCREEN_EDIT_CALENDAR_CONFIRM} from "@screens/screens.constants";
import {getReservationById} from "@services/auth";
import {getQuestionFormCalendar, getDetailOwnQuestion} from "@services/profile";
import moment from "moment";
import ItemQuestionForm from "@components/Form/ItemQuestionForm";

export default function ExaminationContent({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const idCalendar = route?.params?.id;
  const navigation = useNavigation();
  const [dataCalendar, setDataCalendar] = useState(route?.params?.data);
  const [dataQuestion, setDataQuestion] = useState([]);
  const [updateStatus, setUpdateStatus] = useState("UPDATE");
  const [answerData, setAnswerData] = useState([]);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });
  useEffect(() => {
    setDataCalendar(route?.params?.data);
    console.log("dataCalendar", dataCalendar);
  }, []);
  const onSubmit = async (dataSubmit) => {
    console.log("dataSubmit", dataSubmit);
    let newDataAnswer = [];
    dataSubmit.data.map((item, index) => {
      let labelAnswer = "";
      if (dataQuestion[index].label === 3 || dataQuestion[index].label === 4) {
        if (item.content_answer) {
          item.content_answer?.map((el, ind) => {
            labelAnswer += `${el}\n`;
          });
        }
      } else {
        if (item.content_answer) {
          labelAnswer = item.content_answer;
        }
      }
      newDataAnswer.push({
        answer_id: item.answer_id,
        content_answer: item.content_answer,
        title: dataQuestion[index].title,
        answer_id: item.answer_id,
        labelAnswer: labelAnswer,
      });
    });
    let newDataCalendar = {
      ...dataCalendar,
      content_to_doctor: dataSubmit.content_to_doctor,
      newDataAnswer: newDataAnswer,
    };
    if (route?.params?.type == "CHANGE_ITEM") {
      navigation.navigate(SCREEN_EDIT_CALENDAR_CONFIRM, {data: newDataCalendar, dataSubmit: dataSubmit, type: "CHANGE_ITEM"});
    } else {
      navigation.navigate(SCREEN_EDIT_CALENDAR_CONFIRM, {data: newDataCalendar, dataSubmit: dataSubmit, type: updateStatus});
    }
  };
  const getAnswerForm = async () => {
    global.showLoadingView();
    // let oldQuestionId = []
    // if(route?.params?.data?.answer){}
    const {response, data} = await getQuestionFormCalendar(route?.params?.data?.detail_category_medical_of_customer);
    if (response?.status === 200) {
      setDataQuestion(data.data.data);
    } else {
      console.log("error", response);
    }
    global.hideLoadingView();
  };

  useEffect(() => {
    getAnswerForm();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.select({
            ios: 60,
            android: 60,
          })}
          style={{flex: 1}}
        >
          <ScrollView contentContainerStyle={{}}>
            <View>
              <Text
                style={{
                  fontFamily: fonts.NSbold,
                  paddingHorizontal: 16,
                  marginBottom: 16,
                  fontSize: 16,
                  color: colors.textBlack,
                  lineHeight: 23,
                }}
              >
                ご相談内容
              </Text>
              <View>
                <Controller
                  control={control}
                  rules={{required: false}}
                  name={`content_to_doctor`}
                  defaultValue={route?.params?.data?.content_to_doctor}
                  render={({field: {onChange, onBlur, value}}) => {
                    return (
                      <TextInput
                        style={{
                          color: colors.textBlack,
                          backgroundColor: colors.white,
                          paddingHorizontal: 16,
                          textAlignVertical: "top",
                        }}
                        placeholder={"ここにご相談内容を記入して下さい。"}
                        placeholderTextColor={colors.textPlaceholder}
                        onChangeText={onChange}
                        value={value}
                      />
                    );
                  }}
                />
              </View>
            </View>
            <View>
              <Text style={{fontFamily: fonts.NSbold, fontSize: 16, paddingHorizontal: 16, marginBottom: 16, marginTop: 16}}>問診</Text>
              {dataQuestion.map((item, index) => {
                item.status = 0;
                return (
                  <React.Fragment key={`dataQuestion-${index}`}>
                    <Controller
                      control={control}
                      rules={{required: item.status === 1 ? true : false}}
                      defaultValue={{
                        content_answer: null,
                        answer_id: item.id,
                      }}
                      name={`data.${index}`}
                      render={({field: {onChange, onBlur, value}}) => {
                        return <ItemQuestionForm item={item} valueData={value} changeData={onChange} type={"questionAdmin"} />;
                      }}
                    />
                    {errors?.data && errors?.data[index] && <Text style={styles.textError}>{global.t("is_require")}</Text>}
                  </React.Fragment>
                );
              })}
            </View>
            <View style={{marginTop: 60, paddingHorizontal: 16}}>
              <Button label="変更内容を確認へ進む" onPress={handleSubmit(onSubmit)} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  textError: {color: "red", marginTop: 5, textAlign: "right"},
});
