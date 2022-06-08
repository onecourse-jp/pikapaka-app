import React, {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Alert} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {SCREEN_QUESIONAIRE_STEP2, SCREEN_EDIT_CALENDAR_CONFIRM} from "@screens/screens.constants";
import {getReservationById} from "@services/auth";
import {getQuestionFormCalendar} from "@services/profile";
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
    if (route?.params?.type === "CHANGE_ITEM") {
      Alert.alert("", "新しい質問があります。", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
      return;
    }
  }, []);
  const onSubmit = async (dataSubmit) => {
    let newDataCalendar = {
      ...dataCalendar,
      content_to_doctor: dataSubmit.content_to_doctor,
      answer: answerData.map((item, index) => {
        let dataContentAnswer = dataSubmit[item.id];
        if (item?.question.label == 3) {
          dataContentAnswer = dataContentAnswer.map((ans, index) => {
            return dataContentAnswer.includes(0) ? item.question.content[ans] : item.question.content[ans - 1];
          });
        }
        if (item?.question.label == 4) {
          dataContentAnswer = [item?.question?.content[dataContentAnswer - 1]];
        }
        return {
          ...item,
          content_answer: dataContentAnswer,
        };
      }),
    };
    if (route?.params?.type == "CHANGE_ITEM") {
      navigation.navigate(SCREEN_EDIT_CALENDAR_CONFIRM, {data: newDataCalendar, dataSubmit: dataSubmit, type: "CHANGE_ITEM"});
    } else {
      navigation.navigate(SCREEN_EDIT_CALENDAR_CONFIRM, {data: newDataCalendar, dataSubmit: dataSubmit, type: updateStatus});
    }
  };
  const getAnswerForm = async () => {
    global.showLoadingView();
    const {response, data} = await getQuestionFormCalendar(route?.params?.data?.detail_category_medical_of_customer);
    if (response?.status === 200) {
      console.log("getAnswerForm", data.data.data);
      let answerUser;
      // route?.params?.data?.answer.length > 0 ? (answerUser = route?.params?.data?.answer) : (answerUser = data.data.data);
      if (route?.params?.data?.answer.length == 0) {
        setUpdateStatus("NEW");
        answerUser = data.data.data.map((item, index) => {
          return {
            content_answer: null,
            id: item.id,
            question: item,
            question_id: item.id,
          };
        });
      } else {
        setUpdateStatus("UPDATE");
        answerUser = route?.params?.data?.answer;
      }
      setAnswerData(answerUser);

      let newAnswerUser = answerUser.map((item, index) => {
        let arrAnswer = [];
        {
          item.question.content != null &&
            item.content_answer != null &&
            item.content_answer.map((content, index) => {
              let i = item.question.content.findIndex((qs) => {
                return qs === content;
              });
              item?.question?.label == 4 ? arrAnswer.push(i + 1) : arrAnswer.push(i);
            });
        }

        console.log("arrAnswer", arrAnswer);

        {
          item?.question?.content != null &&
            item?.question?.content.map((answer, index) => {
              return {
                label: answer,
                value: index + 1,
              };
            });
        }
        return {
          ...item.question,
          value: item.question?.label == 3 ? arrAnswer : item.question?.label == 4 ? arrAnswer[0] : item?.content_answer,
          data:
            item?.question?.content != null &&
            item?.question?.content.map((answer, index) => {
              if (item?.question?.label == 4) {
                return {
                  label: answer,
                  value: index + 1,
                };
              } else {
                return {
                  label: answer,
                  value: index + 1,
                };
              }
            }),
          key: `${item.id}`,
        };
      });
      setDataQuestion(newAnswerUser);
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
        <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
          <View>
            <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.textBlack, lineHeight: 23}}>ご相談内容</Text>
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
                        paddingHorizontal: 0,
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
            <Text style={{fontFamily: fonts.NSbold, fontSize: 16, marginTop: 16}}>問診</Text>
            {dataQuestion.length > 0 &&
              dataQuestion.map((item, index) => {
                return (
                  <React.Fragment key={`MEDICAL_HISTORY-${index}`}>
                    <Controller
                      control={control}
                      rules={{required: true}}
                      name={item?.key}
                      defaultValue={item?.value}
                      render={({field: {onChange, onBlur, value}}) => {
                        return <ItemQuestionForm item={item} valueData={value} changeData={onChange} />;
                      }}
                    />
                  </React.Fragment>
                );
              })}
          </View>
        </ScrollView>
        <View style={{marginTop: 60, paddingHorizontal: 16}}>
          <Button label="変更内容を確認へ進む" onPress={handleSubmit(onSubmit)} />
        </View>
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
