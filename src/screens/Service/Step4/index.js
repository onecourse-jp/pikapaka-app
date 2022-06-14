import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TextInput} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {dataMedicalHistory} from "../../../data";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import moment from "moment";
import {SCREEN_SERVICE_STEP5} from "@screens/screens.constants";
import {updateCalendar} from "@actions/calendarAction";
import {creatReservation} from "@services/auth";

export default function ServiceStep4() {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const screenStep = 4;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const calendar = useSelector((state) => state?.calendar);
  const dataConfirm = calendar?.data?.step3;

  const handleSubmit = async () => {
    try {
      {
        console.log("dataConfirmdataConfirm", dataConfirm);
        global.showLoadingView();
        const {response, data} = await creatReservation(dataConfirm);
        console.log("responseresponseresponse", response);
        if (response?.status == 200) {
          global.hideLoadingView();
          dispatch(updateCalendar({currentStep: 5, finish: true}));
          navigation.navigate(SCREEN_SERVICE_STEP5, {id: data?.data?.id});
        } else {
          global.hideLoadingView();
          alert("新しい日時の設定ができません。");
        }
      }
    } catch (error) {
      console.log(error);
      global.hideLoadingView();
    }
  };

  useEffect(() => {
    console.log("dataConfirm", dataConfirm);
  }, []);

  const DATALISTMEDICAL = [
    {key: "m1", label: "薬の処方希望", value: "はい"},
    {key: "m2", label: "薬の処方希望", value: "はい"},
  ];
  const DATALISTPERSON = [
    {key: "p1", label: "名前フリガナ", value: dataConfirm?.furigana},
    {key: "p2", label: "メールアドレス", value: dataConfirm?.email || "abc@google.com"},
    {key: "p3", label: "電話番号", value: dataConfirm?.phone_number || "000-000-0000"},
  ];
  const DATALISTPERSON2 = [
    {key: "allergies", label: "アレルギーの有無", value: dataConfirm.allergies || "選択", option: true},
    {
      key: "content_allergies",
      label: "アレルギーの内容",
      value: renderContentAllergies(dataConfirm.content_allergies) || "アレルギー内容を入力",
    },
    {key: "take_medicines", label: "服薬中の薬の有無", value: dataConfirm.take_medicines || "選択", option: true},
    {key: "content_medicines", label: "服用中薬の内容", value: renderContentAllergies(dataConfirm.content_medicines) || "薬の内容をを入力"},
    {key: "pregnancy", label: "妊娠有無", value: dataConfirm.pregnancy || "選択", option: true},
    {key: "smoking", label: "喫煙有無", value: dataConfirm.smoking || "選択", option: true},
    {key: "medical_history", label: "既往歴", value: dataConfirm.medical_history || "選択", data: dataMedicalHistory, option: true},
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{}}>
          <GuideComponent title={"以下の内容で間違いがなければ、予約内容を確定してください。"} />
          <StepsComponent currentStep={screenStep} />
          <View
            style={{
              paddingVertical: 16,
              backgroundColor: colors.white,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.borderGrayE,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <Text style={{fontFamily: fonts.NSregular, fontSize: 14, lineHeight: 15, color: colors.gray1}}>
              {global.t(`categoryTitle.${dataConfirm?.detail_category_medical_of_customer}`)}
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 16,
              backgroundColor: colors.white,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.borderGrayE,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <Text style={{fontFamily: fonts.NSregular, fontSize: 14, lineHeight: 15, color: colors.gray1}}>{`${moment(
              dataConfirm?.date,
            ).format("YYYY年MM月DD日")}（${moment(dataConfirm?.date).format("dddd")}）${dataConfirm?.time_start}~${
              dataConfirm?.time_end
            }`}</Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.NSbold,
                paddingVertical: 16,
                color: colors.colorTextBlack,
                paddingHorizontal: 16,
                fontSize: 14,
                lineHeight: 15,
              }}
            >
              お名前・ご連絡先
            </Text>
            {DATALISTPERSON.map((item, index) => {
              return (
                <View
                  key={`per-${index}`}
                  style={{
                    paddingVertical: 11,
                    backgroundColor: colors.white,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: colors.borderGrayE,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 16,
                  }}
                >
                  <Text style={{color: colors.colorTextBlack, width: "40%", fontWeight: "bold", fontSize: 15}}>{item.label}</Text>
                  <Text style={{color: colors.textBlack, width: "60%", paddingHorizontal: 16, textAlign: "left", fontSize: 15}}>
                    {item.value}
                  </Text>
                </View>
              );
            })}
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.NSbold,
                paddingVertical: 16,
                color: colors.colorTextBlack,
                paddingHorizontal: 16,
                fontSize: 14,
                lineHeight: 15,
              }}
            >
              基本情報
            </Text>
            {DATALISTPERSON2.map((item, index) => {
              console.log("item.option", item.option, item.value);
              return (
                <View
                  key={`med-${index}`}
                  style={{
                    paddingVertical: 11,
                    backgroundColor: colors.white,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: colors.borderGrayE,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 16,
                  }}
                >
                  <Text style={{color: colors.colorTextBlack, fontWeight: "bold", fontSize: 14}}>{item.label}</Text>
                  {item.option && item.data && Array.isArray(item.value) && (
                    <View style={{width: "60%", paddingHorizontal: 16}}>
                      {item.value.map((el, ind) => {
                        return (
                          <Text key={`med-item-${ind}`} style={{color: colors.textBlack, fontSize: 14, textAlign: "left", lineHeight: 18}}>
                            {dataMedicalHistory[el]?.label}
                          </Text>
                        );
                      })}
                    </View>
                  )}
                  {item.option && !item.data && (
                    <Text
                      style={{
                        color: colors.textBlack,
                        fontSize: 14,
                        textAlign: "left",
                        width: "60%",
                        paddingHorizontal: 16,
                        lineHeight: 18,
                      }}
                    >
                      {item.value === 1 ? "有" : "無"}
                    </Text>
                  )}
                  {!item.option && (
                    <Text
                      style={{
                        color: colors.textBlack,
                        fontSize: 14,
                        textAlign: "left",
                        width: "60%",
                        paddingHorizontal: 16,
                        lineHeight: 18,
                      }}
                    >
                      {item.value}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.NSbold,
                paddingVertical: 16,
                color: colors.colorTextBlack,
                paddingHorizontal: 16,
                fontSize: 14,
              }}
            >
              相談内容
            </Text>
            <TextInput
              style={{
                color: colors.textBlack,
                backgroundColor: colors.white,
                paddingHorizontal: 16,
                marginTop: 0,
                textAlignVertical: "top",
                fontSize: 14,
                lineHeight: 18,
              }}
              multiline={true}
              editable={false}
              placeholderTextColor={colors.textPlaceholder}
              value={dataConfirm?.content_to_doctor || ""}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.NSbold,
                paddingVertical: 16,
                color: colors.colorTextBlack,
                paddingHorizontal: 16,
                fontSize: 14,
              }}
            >
              この科目の受診は初めてですか？
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 16,
              backgroundColor: colors.white,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.borderGrayE,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <Text style={{fontFamily: fonts.NSregular, fontSize: 14, lineHeight: 15, color: colors.gray1}}>
              {dataConfirm?.old_reservation_id ? "いいえ" : "はい"}
            </Text>
          </View>

          <View style={{marginTop: 37, paddingHorizontal: 16}}>
            <Button label="予約内容を確定する" onPress={handleSubmit} />
          </View>
          <View style={{marginTop: 11, paddingHorizontal: 16}}>
            <Button variant="secondary" label="情報の入力に戻る" onPress={() => navigation.goBack()} />
          </View>
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
