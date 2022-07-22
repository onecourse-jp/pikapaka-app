import React, {useEffect, useState, useMemo} from "react";
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
  RefreshControl,
} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import {
  SCREEN_SERVICE_STEP4,
  SCREEN_EDIT_ALLERGY,
  SCREEN_EDIT_MEDICINE,
  SCREEN_EDIT_FURIGANA,
  SCREEN_SERVICE_STEP2,
  SCREEN_EDIT_PHONE_NUMBER,
  SCREEN_EDIT_YES_NO_FORM,
  SCREEN_EDIT_MEDICAL_HISTORY,
  SCREEN_EDIT_EMAIL_ADDRESS,
} from "@screens/screens.constants";
import {updateCalendar} from "@actions/calendarAction";
import {dataMedicalHistory} from "../../../data";
import {checkReservation} from "@services/auth";
import ItemQuestionForm from "../../../components/Form/ItemQuestionForm";
import OldRevervationForm from "../components/OldRevervationForm";

export default function ServiceStep3() {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const screenStep = 3;
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const calendar = useSelector((state) => state?.calendar);
  const userDetails = useSelector((state) => state?.users?.userDetails);
  const [user, setUser] = useState(userDetails);
  const [oldReservationId, setOldReservationId] = useState(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    required: true,
    // values: useMemo(() => {
    //   console.log("valuesvaluesvaluesvalues");
    // }, [userDetails]),
  });

  const renderContentAllergies = (content_allergies) => {
    let result = "";
    if (content_allergies) {
      if (typeof content_allergies === "string") {
        try {
          const newArray = JSON.parse(content_allergies);
          newArray.map((item, index) => {
            if (item != null) {
              result += `${index > 0 ? " / " : ""}${item}`;
            }
          });
        } catch (error) {
          console.log("err", error);
        }
      } else {
        try {
          content_allergies?.map((item, index) => {
            if (item != null) {
              result += `${index > 0 ? " / " : ""}${item}`;
            }
          });
        } catch (error) {
          return null;
        }
      }
    }
    if (result.length === 0) return "あり";
    return result;
  };

  useEffect(() => {
    setUser(userDetails);
    console.log("userDetails?.allergies", userDetails?.allergies);
    setDataPerson2([
      {
        key: "content_allergies",
        require: false,
        title: "アレルギーの内容",
        placeholder: "アレルギー内容を入力",
        value: userDetails?.allergies
          ? userDetails?.allergies === 1
            ? renderContentAllergies(userDetails?.content_allergies)
            : "なし"
          : null,
        action: () => {
          navigation.navigate(SCREEN_EDIT_ALLERGY, {data: user});
        },
      },
      {
        key: "content_medicines",
        title: "服用中の薬の内容",
        require: false,
        placeholder: "薬の内容を入力",
        value: userDetails?.take_medicines
          ? userDetails?.take_medicines == 1
            ? renderContentAllergies(userDetails?.content_medicines)
            : "なし"
          : null,
        action: () => {
          navigation.navigate(SCREEN_EDIT_MEDICINE, {data: user});
        },
      },
      {
        key: "pregnancy",
        title: "妊娠有無",
        placeholder: "選択",
        value: userDetails?.pregnancy ?? null,
        label: 4,
        action: () => {
          navigation.navigate(SCREEN_EDIT_YES_NO_FORM, {
            data: userDetails,
            key: "pregnancy",
            value: userDetails?.pregnancy,
            label: "妊娠有無",
          });
        },
      },
      {
        key: "smoking",
        title: "喫煙有無",
        placeholder: "選択",
        value: userDetails?.smoking ?? null,
        label: 4,
        action: () => {
          navigation.navigate(SCREEN_EDIT_YES_NO_FORM, {data: userDetails, key: "smoking", value: userDetails?.smoking, label: "喫煙有無"});
        },
      },
      {
        key: "illness_during_treatment",
        title: "治療中の病気の有無",
        placeholder: "選択",
        value: userDetails?.illness_during_treatment ?? null,
        label: 4,
        action: () => {
          navigation.navigate(SCREEN_EDIT_YES_NO_FORM, {
            data: userDetails,
            key: "illness_during_treatment",
            value: userDetails?.illness_during_treatment,
            label: "喫煙有無",
          });
        },
      },
      {
        key: "dialysis_treatment",
        title: "透析治療の有無",
        placeholder: "選択",
        value: userDetails?.dialysis_treatment ?? null,
        label: 4,
        action: () => {
          navigation.navigate(SCREEN_EDIT_YES_NO_FORM, {
            data: userDetails,
            key: "dialysis_treatment",
            value: userDetails?.dialysis_treatment,
            label: "喫煙有無",
          });
        },
      },
      {
        key: "blood_tests_and_health",
        title: "血液検査や健康診断等の異常の有無",
        placeholder: "選択",
        value: userDetails?.blood_tests_and_health ?? null,
        label: 4,
        action: () => {
          navigation.navigate(SCREEN_EDIT_YES_NO_FORM, {
            data: userDetails,
            key: "blood_tests_and_health",
            value: userDetails?.blood_tests_and_health,
            label: "喫煙有無",
          });
        },
      },
      {
        key: "medical_history",
        label: "既往歴",
        title: "既往歴",
        require: false,
        placeholder: "なし",
        label: 3,
        value: userDetails?.medical_history ?? null,
        data: dataMedicalHistory,
        action: () => {
          navigation.navigate(SCREEN_EDIT_MEDICAL_HISTORY, {
            data: user,
            key: "medical_history",
            value: userDetails?.medical_history,
            label: "喫煙有無",
          });
        },
      },
    ]);
    setDataPerson([
      {
        key: "furigana",
        title: "名前フリガナ",
        placeholder: "フリガナを入力",
        value: userDetails?.furigana ?? null,
        action: () => {
          navigation.navigate(SCREEN_EDIT_FURIGANA, {data: userDetails});
        },
      },
      {
        key: "email",
        title: "メールアドレス",
        placeholder: "メールアドレスを入力",
        value: userDetails?.email ?? null,
        action: () => {
          navigation.navigate(SCREEN_EDIT_EMAIL_ADDRESS, {data: user});
        },
      },
      {
        key: "phone_number",
        title: "電話番号",
        placeholder: "電話番号を入力",
        value: userDetails?.phone_number ?? null,
        action: () => {
          navigation.navigate(SCREEN_EDIT_PHONE_NUMBER, {data: userDetails});
        },
      },
    ]);
    reset(userDetails);
  }, [userDetails]);
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
      medical_history: typeof dataSubmit.medical_history == "string" ? JSON.parse(dataSubmit.medical_history) : dataSubmit.medical_history,
      content_to_doctor: dataSubmit.contentConsultation,
      illness_during_treatment: dataSubmit.illness_during_treatment,
      dialysis_treatment: dataSubmit.dialysis_treatment,
      blood_tests_and_health: dataSubmit.blood_tests_and_health,
    };
    if (oldReservationId && dataSubmit.radioStatus) dataReservation.old_reservation_id = oldReservationId;
    if (!oldReservationId && dataSubmit.radioStatus) dataReservation.old_reservation_id = null;
    if (userDetails?.postal_code) dataReservation.shipping_postal_code = userDetails?.postal_code;
    if (userDetails?.address) dataReservation.shipping_address = userDetails?.address;
    if (!dataSubmit.radioStatus) dataReservation.old_reservation_id = false;
    dispatch(
      updateCalendar({
        data: {step3: {...dataReservation}},
        currentStep: 4,
      }),
    );
    navigation.navigate(SCREEN_SERVICE_STEP4);
  };

  useEffect(async () => {
    try {
      const paramsCheckRevervation = {user_id: user?.id, detail_category_medical_of_customer: calendar?.data?.step1.data};
      if (user?.id) {
        const {response, data} = await checkReservation(paramsCheckRevervation);
        if (response?.status === 200) {
          setOldReservationId(data?.data?.id);
        }
      }
    } catch (error) {
      console.log("error");
    }
  }, []);

  // const DATALISTPERSON = ;
  // const DATALISTPERSON2 = ;
  const [dataPerson, setDataPerson] = useState([]);
  const [dataPerson2, setDataPerson2] = useState([]);
  const validateEmail = (email) => {
    const resultValidate = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    return resultValidate ? true : false;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    reset();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <GuideComponent title="診察に関する情報とお名前、ご連絡先をご記入ください。" />
            <StepsComponent currentStep={screenStep} />
            {Object.keys(calendar.data).map((item, index) => {
              const step = item.match(/\d+/)[0];
              if (Number(step) < screenStep) {
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
                    <View style={{flexDirection: "row", alignItems: "center"}}>
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
              <Text style={{fontFamily: fonts.NSbold, color: colors.colorTextBlack, padding: 16, fontSize: 16}}>基本情報</Text>
              {dataPerson2.map((item, index) => {
                return (
                  <React.Fragment key={`DATALISTPERSON2-${index}`}>
                    <Controller
                      control={control}
                      rules={{
                        required: item?.require === false ? false : true,
                        validate: (value) => {
                          if (item?.require === false && value === null) {
                            return false;
                          }
                          return true;
                        },
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
                defaultValue={""}
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
            <Controller
              control={control}
              defaultValue={true}
              name={"radioStatus"}
              render={({field: {onChange, onBlur, value}}) => {
                return <OldRevervationForm value={value} handleChange={onChange} />;
              }}
            />

            <View style={{marginTop: 37, paddingHorizontal: 16}}>
              <Button label="内容確認へ進む" onPress={handleSubmit(onSubmit)} />
            </View>
            <View style={{marginTop: 11, paddingHorizontal: 16, paddingBottom: 30}}>
              <Button variant="secondary" label="日付選択へ戻る" onPress={() => navigation.navigate(SCREEN_SERVICE_STEP2)} />
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
