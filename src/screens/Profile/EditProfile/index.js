import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import ButtonProfile from "../Components/ButtonProfile";
import {updateProfileWithToken} from "@services/profile";
import {updateUserProfile} from "@actions/users";
import ItemForm from "../Components/ItemForm";
import {dataMedicalHistory} from "../../../data";
import ItemQuestionForm from "../../../components/Form/ItemQuestionForm";
import moment from "moment";
import {SCREEN_PROFILE} from "../../screens.constants";
console.log("dataMedicalHistory", dataMedicalHistory);

export default function EditProfile() {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.users?.userDetails);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });

  const onSubmit = async (dataSubmit) => {
    global.showLoadingView();
    global.showLoadingView();
    showLoadingView();
    let dataUserSubmit = {};
    if (dataSubmit.name && dataSubmit.name != user?.name) dataUserSubmit.name = dataSubmit.name;
    if (dataSubmit.furigana && dataSubmit.furigana != user?.furigana) dataUserSubmit.furigana = dataSubmit.furigana;
    if (dataSubmit.gender && dataSubmit.gender != user?.gender) dataUserSubmit.gender = dataSubmit.gender;
    if (dataSubmit.birthday && dataSubmit.birthday != user?.birthday) dataUserSubmit.birthday = dataSubmit.birthday;
    if (dataSubmit.phone_number && dataSubmit.phone_number != user?.phone_number) dataUserSubmit.phone_number = dataSubmit.phone_number;
    if (dataSubmit.postal_code && dataSubmit.postal_code != user?.postal_code) dataUserSubmit.postal_code = dataSubmit.postal_code;
    if (dataSubmit.address && dataSubmit.address != user?.address) dataUserSubmit.address = dataSubmit.address;
    if (dataSubmit.pregnancy && dataSubmit.pregnancy != user?.pregnancy) dataUserSubmit.pregnancy = dataSubmit.pregnancy;
    if (dataSubmit.take_medicines && dataSubmit.take_medicines != user?.take_medicines)
      dataUserSubmit.take_medicines = dataSubmit.take_medicines;
    if (dataSubmit.content_medicines && dataSubmit.content_medicines != user?.content_medicines)
      dataUserSubmit.content_medicines = dataSubmit.content_medicines;
    if (dataSubmit.content_allergies && dataSubmit.content_allergies != user?.content_allergies)
      dataUserSubmit.content_allergies = dataSubmit.content_allergies;
    if (dataSubmit.allergies && dataSubmit.allergies != user?.allergies) dataUserSubmit.allergies = dataSubmit.allergies;
    if (dataSubmit.medical_history && dataSubmit.medical_history != user?.medical_history)
      dataUserSubmit.medical_history = dataSubmit.medical_history;

    console.log("dataUserSubmit", dataUserSubmit);

    if (Object.keys(dataUserSubmit).length > 0) {
      try {
        const {data, response} = await updateProfileWithToken(dataUserSubmit);
        if (response.status == 200) {
          dispatch(updateUserProfile(data.data));
          global.hideLoadingView();
          Alert.alert("", "個人情報の編集が完了しました。", [
            {
              text: "はい",
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
          console.log("data when update", data);
        } else {
          global.hideLoadingView();
          Alert.alert("Update Profile", "Update fail. Please try again.", [
            {
              text: "OK",
              onPress: () => {},
            },
          ]);
        }
      } catch (error) {
        console.log("error", error);
        global.hideLoadingView();
        Alert.alert("Update Profile", "Update fail. Please try again.", [
          {
            text: "OK",
            onPress: () => {},
          },
        ]);
      }
    }
  };

  const validateEmail = (email) => {
    const resultValidate = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    return resultValidate ? true : false;
  };
  const validateBirthday = (day) => {
    const resultValidate = moment(day).format("YYYY-MM-DD");
    console.log("validateBirthday", resultValidate);
    return resultValidate && resultValidate != "Invalid date" ? true : false;
  };
  const INFORMATIONBASIC = [
    {key: "name", title: "お名前（漢字）", placeholder: "フリガナを入力", value: user?.name},
    {key: "furigana", title: "名前フリガナ", placeholder: "フリガナを入力", value: user?.furigana},
    {
      key: "gender",
      title: "性別",
      placeholder: "選択",
      label: 4,
      value: user?.gender,
      data: [
        {label: "男性", value: 1},
        {label: "女性", value: 2},
      ],
    },
    {key: "birthday", title: "生年月日", placeholder: "フリガナを入力", value: user?.birthday},
    {key: "email", title: "メールアドレス", placeholder: "フリガナを入力", value: user?.email, disabel: true},
    {key: "phone_number", title: "電話番号", placeholder: "電話番号を入力", value: user?.phone_number},
  ];
  const INFORMATIONPLACE = [
    {key: "postal_code", title: "郵便番号", placeholder: "選択", value: user?.postal_code},
    {key: "address", title: "住所", placeholder: "選択", value: user?.address},
  ];
  const DATALISTPERSON = [
    {key: "allergies", title: "アレルギーの有無", value: user?.allergies, placeholder: "選択", label: 4},
    {key: "content_allergies", title: "アレルギーの内容", value: user?.content_allergies, placeholder: "フリガナを入力"},
    {key: "take_medicines", title: "服薬中の薬の有無", value: user?.take_medicines, label: 4, placeholder: "選択"},
    {key: "content_medicines", title: "服用中薬の内容", value: user?.content_medicines, placeholder: "フリガナを入力"},
    {key: "pregnancy", title: "妊娠有無", value: user?.pregnancy, placeholder: "選択", label: 4},
    {key: "smoking", title: "喫煙有無", value: user?.smoking, placeholder: "選択", label: 4},
    {
      placeholder: "選択",
      key: "medical_history",
      data: dataMedicalHistory,
      label: 3,
      title: "既往歴",
      value: user?.medical_history,
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
          <ScrollView contentContainerStyle={{}} listMode="MODAL">
            <View>
              <Text
                style={{
                  fontFamily: fonts.NSbold,
                  color: colors.colorTextBlack,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  marginBottom: 8,
                }}
              >
                お名前・ご連絡先
              </Text>
              {INFORMATIONBASIC.map((item, index) => {
                return (
                  <React.Fragment key={`INFORMATIONBASIC-${index}`}>
                    <Controller
                      control={control}
                      rules={
                        item.key === "email"
                          ? {
                              validate: (value) => validateEmail(value),
                            }
                          : item.key === "birthday"
                          ? {
                              validate: (value) => validateBirthday(value),
                            }
                          : {}
                      }
                      defaultValue={item?.value}
                      name={item.key}
                      render={({field: {onChange, onBlur, value}}) => {
                        return <ItemQuestionForm item={item} valueData={value} changeData={onChange} />;
                      }}
                    />
                    {errors[item.key] && item.key === "email" && <Text style={styles.textError}>{global.t(item.key)} error</Text>}
                    {errors[item.key] && item.key === "birthday" && (
                      <Text style={styles.textError}> 年／月／日のフォーマットで入力してください。</Text>
                    )}
                    {errors[item.key] && item.key !== "email" && item.key !== "birthday" && (
                      <Text style={styles.textError}>
                        {global.t(item.key)}
                        {global.t("is_require")}
                      </Text>
                    )}
                  </React.Fragment>
                );
              })}
            </View>
            <View style={{marginTop: 27}}>
              <Text style={{fontFamily: fonts.NSbold, color: colors.colorTextBlack, paddingHorizontal: 16, fontSize: 16, marginBottom: 8}}>
                お住まい
              </Text>
              {INFORMATIONPLACE.map((item, index) => {
                return (
                  <React.Fragment key={`INFORMATIONPLACE-${index}`}>
                    <Controller
                      control={control}
                      defaultValue={item?.value}
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
            <View style={{marginTop: 27}}>
              <Text style={{fontFamily: fonts.NSbold, color: colors.colorTextBlack, paddingHorizontal: 16, fontSize: 16, marginBottom: 8}}>
                基本情報
              </Text>
              {DATALISTPERSON.map((item, index) => {
                return (
                  <React.Fragment key={`DATALISTPERSON-${index}`}>
                    <Controller
                      control={control}
                      defaultValue={item?.value}
                      name={item?.key}
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
            <View style={{marginTop: 30}}>
              <ButtonProfile title="情報を編集する" onPress={handleSubmit(onSubmit)} color={colors.textBlue} />
              <ButtonProfile title="キャンセル" onPress={() => navigation.goBack()} hasBorder={true} color={colors.headerComponent} />
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
