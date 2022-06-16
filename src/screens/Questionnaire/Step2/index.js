import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, KeyboardAvoidingView, Image} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {useForm, Controller} from "react-hook-form";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import moment from "moment";
import {
  SCREEN_QUESIONAIRE_STEP3,
  SCREEN_EDIT_NAME,
  SCREEN_EDIT_POSTAL_CODE,
  SCREEN_EDIT_ADDRESS,
  SCREEN_EDIT_GENDER,
} from "@screens/screens.constants";
import {updateMedicalHistory} from "@actions/medicalHistoryAction";
import {getQuestionFormCalendar} from "@services/profile";
import ItemForm from "../components/ItemForm";
import ItemQuestionForm from "../../../components/Form/ItemQuestionForm";

export default function QuestionaireStep2({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const screenStep = 1;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const calendarData = route?.params?.data;
  const medicalHistory = useSelector((state) => state?.medicalHistory);
  const userDetails = useSelector((state) => state?.users?.userDetails);
  const [user, setUser] = useState(userDetails);
  const [dataQuestion, setDataQuestion] = useState([]);
  const [dataPerson, setDataPerson] = useState([]);
  const [currentValueSubmit, setCurrentValueSubmit] = useState({});
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm({
    required: true,
  });
  useEffect(() => {
    setUser(userDetails);
    const valueClone = {...currentValueSubmit};
    // const valueToReset = valueClone.data;
    reset({data: valueClone.data, ...userDetails});
    setDataPerson([
      {
        key: "name",
        title: "お名前（漢字）",
        placeholder: "お名前（漢字）を入力",
        value: userDetails?.name ?? null,
        action: () => {
          navigation.navigate(SCREEN_EDIT_NAME, {data: userDetails});
        },
      },
      {
        key: "postal_code",
        title: "郵便番号",
        placeholder: "郵便番号を入力",
        value: userDetails?.postal_code ?? null,
        action: () => {
          navigation.navigate(SCREEN_EDIT_POSTAL_CODE, {data: userDetails, label: "郵便番号"});
        },
      },
      {
        key: "address",
        title: "住所",
        placeholder: "住所を入力",
        value: userDetails?.address ?? null,
        action: () => {
          navigation.navigate(SCREEN_EDIT_ADDRESS, {data: userDetails, label: "住所"});
        },
      },
      {
        key: "gender",
        title: "性別",
        placeholder: "選択",
        value: userDetails?.gender ?? null,
        label: 4,
        data: [
          {label: "男性", value: 1},
          {label: "女性", value: 2},
        ],
        action: () => {
          navigation.navigate(SCREEN_EDIT_GENDER, {data: userDetails});
        },
      },
    ]);

  }, [userDetails]);

  useEffect(() => {
    const subscription = watch((value, {name, type}) => setCurrentValueSubmit(value));
    // console.log()
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (dataSubmit) => {
    console.log("dataSubmit", dataSubmit);
    if (!dataSubmit?.data) {
      dataSubmit.data = [];
    }
    dataSubmit.reservation_form_id = calendarData?.id;
    navigation.navigate(SCREEN_QUESIONAIRE_STEP3, {dataConfirm: dataSubmit, dataQuestion: dataQuestion, calendarData: calendarData});
  };

  const getAnswerForm = async () => {
    global.showLoadingView();
    const {response, data} = await getQuestionFormCalendar(calendarData?.detail_category_medical_of_customer);
    if (response?.status === 200) {
      console.log("data getQuestionFormCalendar", data.data.data);
      setDataQuestion(data.data.data);
    } else {
      console.log("error", response);
    }
    global.hideLoadingView();
  };

  useEffect(() => {
    getAnswerForm();
  }, []);

  const validateEmail = (email) => {
    const resultValidate = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    return resultValidate ? true : false;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
          <ScrollView contentContainerStyle={{}} listMode="MODAL">
            <GuideComponent
              title={"下記の問診にお答えください。連絡先のご記入をお願いします。"}
              note="※回答していただかないと受診ができません"
            />
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
                {global.t(`categoryTitle.${calendarData?.detail_category_medical_of_customer}`)}
              </Text>
            </View>
            <View>
              <Text style={{fontFamily: fonts.NSbold, paddingHorizontal: 16, fontSize: 16, marginTop: 16}}>問診</Text>
              {dataQuestion.map((item, index) => {
                return (
                  <React.Fragment key={`DATALISTPERSON-${index}`}>
                    <Controller
                      control={control}
                      rules={{required: item.status === 1 ? true : false}}
                      defaultValue={
                        item.status === 1
                          ? null
                          : {
                              content_answer: null,
                              question_id: item.id,
                            }
                      }
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
            <View>
              <Text style={{fontFamily: fonts.NSbold, fontSize: 16, paddingHorizontal: 16, marginTop: 16}}>お客様情報</Text>
              {dataPerson.map((item, index) => {
                return (
                  <React.Fragment key={`DATALISTPERSON-${index}`}>
                    <Controller
                      control={control}
                      rules={
                        item.key === "email"
                          ? {
                              required: true,
                              validate: (value) => validateEmail(value),
                            }
                          : {
                              required: true,
                            }
                      }
                      defaultValue={item.value}
                      name={item.key}
                      render={({field: {onChange, onBlur, value}}) => {
                        return <ItemQuestionForm item={item} valueData={value} changeData={onChange} />;
                      }}
                    />
                    {errors[item.key] && item.key === "email" && <Text style={styles.textError}>{item.key} error</Text>}
                    {errors[item.key] && item.key !== "email" && (
                      <Text style={styles.textError}>
                        {global.t(item.key)}
                        {global.t("is_require")}
                      </Text>
                    )}
                  </React.Fragment>
                );
              })}
            </View>

            <View style={{marginTop: 20, marginBottom: 40, paddingHorizontal: 16}}>
              <Button label="内容確認へ進む" onPress={handleSubmit(onSubmit)} />
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
  textInputController: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    margin: 0,
    textAlignVertical: "top",
    lineHeight: 21,
    maxWidth: 160,
    minHeight: 20,
    height: "100%",
    fontSize: 15,
  },
});
