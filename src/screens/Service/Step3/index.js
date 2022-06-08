import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import {SCREEN_SERVICE_STEP4} from "@screens/screens.constants";
import {updateCalendar} from "@actions/calendarAction";
import {dataMedicalHistory} from "../../../data";
import {SCREEN_SERVICE_STEP2} from "../../screens.constants";
import {checkReservation} from "@services/auth";
import ItemQuestionForm from "../../../components/Form/ItemQuestionForm";
import OldRevervationForm from "../components/OldRevervationForm";

export default function ServiceStep3() {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const screenStep = 3;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const calendar = useSelector((state) => state?.calendar);
  const user = useSelector((state) => state?.users?.userDetails);
  const [oldReservationId, setOldReservationId] = useState(null);
  console.log("user?.medical_history", typeof user?.medical_history);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });
  // const [changeFunction, setChangeFunction] = useState(() => {});
  // const [valueModal, setValueModal] = useState(null);
  // const [titleModal, setTitleModal] = useState(null);
  const onSubmit = async (dataSubmit) => {
    const calendarDataTime = JSON.parse(calendar.data.step2.data);
    let dataReservation = {
      detail_category_medical_of_customer: calendar?.data?.step1.data,
      date: calendarDataTime.time.datePicked,
      time_start: calendarDataTime.time.constant_time.time_start,
      time_end: calendarDataTime.time.constant_time.time_end,
      furigana: dataSubmit.furigana,
      email: dataSubmit.email,
      phone_number: dataSubmit.phone_number,
      allergies: dataSubmit.allergies,
      content_allergies: dataSubmit.content_allergies,
      take_medicines: dataSubmit.take_medicines,
      content_medicines: dataSubmit.content_medicines,
      pregnancy: dataSubmit.pregnancy,
      smoking: dataSubmit.smoking,
      medical_history: dataSubmit.medical_history,
      content_to_doctor: dataSubmit.contentConsultation,
    };
    if (oldReservationId && dataSubmit.radioStatus) dataReservation.old_reservation_id = oldReservationId;
    dispatch(
      updateCalendar({
        data: {step3: {...dataReservation}},
        currentStep: 4,
      }),
    );
    console.log("dataReservationdataReservationdataReservation", dataReservation);
    navigation.navigate(SCREEN_SERVICE_STEP4);
  };

  useEffect(async () => {
    const paramsCheckRevervation = {user_id: user.id, detail_category_medical_of_customer: calendar?.data?.step1.data};
    const {response, data} = await checkReservation(paramsCheckRevervation);
    if (response?.status === 200) {
      setOldReservationId(data?.data?.id);
    }
  }, []);

  const DATALISTPERSON = [
    {key: "furigana", title: "名前フリガナ", placeholder: "フリガナを入力", value: user?.furigana ?? null},
    {key: "email", title: "メールアドレス", placeholder: "メールアドレスを入力", value: user?.email ?? null},
    {key: "phone_number", title: "電話番号", placeholder: "電話番号を入力", value: user?.phone_number ?? null},
  ];
  const DATALISTPERSON2 = [
    {key: "allergies", title: "アレルギーの有無", placeholder: "選択", value: user?.allergies ?? null, label: 4},
    {key: "content_allergies", title: "アレルギーの内容", placeholder: "アレルギー内容を入力", value: user?.content_allergies ?? null},
    {key: "take_medicines", title: "服薬中の薬の有無", placeholder: "選択", value: user?.take_medicines ?? null, label: 4},
    {key: "content_medicines", title: "服用中薬の内容", placeholder: "薬の内容をを入力", value: user?.content_medicines ?? null},
    {key: "pregnancy", title: "妊娠有無", placeholder: "選択", value: user?.pregnancy ?? null, label: 4},
    {key: "smoking", title: "喫煙有無", placeholder: "選択", value: user?.smoking ?? null, label: 4},
    {
      key: "medical_history",
      label: "既往歴",
      title: "既往歴",
      placeholder: "選択",
      label: 3,
      value: user?.medical_history ?? null,
      data: dataMedicalHistory,
    },
  ];

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
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <GuideComponent title="診察に関する情報とお名前、ご連絡先をご記入ください。" />
            <StepsComponent currentStep={screenStep} />
            {Object.keys(calendar.data).map((item, index) => {
              const step = item.match(/\d+/)[0];
              if (Number(step) < screenStep) {
                console.log("Number(step)", screenStep, Number(step));
                return (
                  <View
                    key={`data-${index}`}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 16,
                      paddingHorizontal: 16,
                    }}
                  >
                    <View style={{flexDirection: "row"}}>
                      <Text style={{fontFamily: fonts.NSregular, fontWeight: "bold", color: colors.colorTextBlack, fontSize: 12}}>
                        {calendar.data[item].label}：
                      </Text>
                      <Text style={{fontFamily: fonts.NSregular, fontWeight: "400", color: colors.colorTextBlack, fontSize: 12}}>
                        {calendar.data[item].value}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        for (let i = 0; i < screenStep - Number(step); i++) {
                          navigation.goBack();
                        }
                      }}
                      style={{flexDirection: "row", alignItems: "center"}}
                    >
                      <Text style={{fontFamily: fonts.NSregular, color: colors.headerComponent, fontSize: 12}}>変更</Text>
                      <View style={{marginLeft: 7}}>
                        <Image height={13} width={8} source={require("@assets/images/icons/ic_arrowRight_back_step.png")} />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }
            })}
            <View style={{flexDirection: "column"}}>
              {/* <Text style={{color: colors.gray1, fontSize: 14, fontWeight: "bold", marginTop: 21, marginBottom: 11}}>診察科目</Text> */}
            </View>
            <View>
              <Text style={{fontFamily: fonts.NSbold, color: colors.colorTextBlack, padding: 16, fontSize: 16}}>お名前・ご連絡先</Text>
              {DATALISTPERSON.map((item, index) => {
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
                    {errors[item.key] && item.key === "email" && (
                      <Text style={styles.textError}>
                        {global.t(item.key)} {global.t("is_require")}
                      </Text>
                    )}
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
            <View>
              <Text style={{fontFamily: fonts.NSbold, color: colors.colorTextBlack, padding: 16, fontSize: 16}}>タイトルが入ります</Text>
              {DATALISTPERSON2.map((item, index) => {
                return (
                  <React.Fragment key={`DATALISTPERSON2-${index}`}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      defaultValue={item.value}
                      name={item.key}
                      render={({field: {onChange, onBlur, value}}) => {
                        return <ItemQuestionForm item={item} valueData={value} changeData={onChange} />;
                      }}
                    />
                    {errors[item.key] && (
                      <Text style={styles.textError}>
                        {global.t(item.key)}
                        {global.t("is_require")}
                      </Text>
                    )}
                  </React.Fragment>
                );
              })}
            </View>
            <View>
              <Text style={{fontFamily: fonts.NSbold, color: colors.colorTextBlack, padding: 16, fontSize: 16}}>相談内容</Text>

              <Controller
                control={control}
                defaultValue={false}
                name={"contentConsultation"}
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <TextInput
                      style={{
                        color: colors.textBlack,
                        backgroundColor: colors.white,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        minHeight: 150,
                        textAlignVertical: "top",
                      }}
                      multiline={true}
                      placeholder={"ここにご相談内容を記入して下さい。"}
                      placeholderTextColor={colors.textPlaceholder}
                      onChangeText={onChange}
                      value={value}
                    />
                  );
                }}
              />
            </View>
            {oldReservationId && (
              <Controller
                control={control}
                defaultValue={false}
                name={"radioStatus"}
                render={({field: {onChange, onBlur, value}}) => {
                  return <OldRevervationForm value={value} handleChange={onChange} />;
                }}
              />
            )}

            <View style={{marginTop: 37, paddingHorizontal: 16}}>
              <Button label="内容確認へ進む" onPress={handleSubmit(onSubmit)} />
            </View>
            <View style={{marginTop: 11, paddingHorizontal: 16, paddingBottom: 30}}>
              <Button variant="secondary" label="日付選択選択へ戻る" onPress={() => navigation.navigate(SCREEN_SERVICE_STEP2)} />
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
