import React, {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {SCREEN_QUESIONAIRE_STEP2, SCREEN_EDIT_CALENDAR_CONFIRM, SCREEN_EDIT_CALENDAR_DATETIME} from "@screens/screens.constants";
import {getReservationById} from "@services/auth";
import moment from "moment";
import ItemQuestionForm from "@components/Form/ItemQuestionForm";

export default function ExaminationItem({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const idCalendar = route?.params?.id;
  const navigation = useNavigation();
  const dataCalendar = route?.params?.data;
  const [typeUpdate, setTypeUpdate] = useState("TO_DATE_TIME");
  let TYPESUBMIT = "";
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });
  const handleConfirm = (dataSubmit) => {
    if (dataCalendar.detail_category_medical_of_customer == dataSubmit.detail_category_medical_of_customer) {
      console.log("trung - return");
      return;
    }

    if (dataCalendar.detail_category_medical_of_customer <= 4 && dataSubmit.detail_category_medical_of_customer <= 4) {
      setTypeUpdate("TO_CONFIRM");
      TYPESUBMIT = "TO_CONFIRM";
    }
    if (
      (dataCalendar.detail_category_medical_of_customer == 7 || dataCalendar.detail_category_medical_of_customer == 6) &&
      (dataSubmit.detail_category_medical_of_customer == 6 || dataSubmit.detail_category_medical_of_customer == 7)
    ) {
      setTypeUpdate("TO_CONFIRM");
      TYPESUBMIT = "TO_CONFIRM";
    }

    if (TYPESUBMIT == "TO_CONFIRM") {
      let newDataCalendar = {
        ...dataCalendar,
        detail_category_medical_of_customer: dataSubmit.detail_category_medical_of_customer,
      };
      navigation.navigate(SCREEN_EDIT_CALENDAR_CONFIRM, {data: newDataCalendar, type: ""});
    } else {
      let newDataCalendar = {
        ...dataCalendar,
        detail_category_medical_of_customer: dataSubmit.detail_category_medical_of_customer,
        answer: [],
      };
      navigation.navigate(SCREEN_EDIT_CALENDAR_DATETIME, {data: newDataCalendar, type: "CHANGE_ITEM"});
    }
  };
  const MEDICAL_HISTORY = [
    {
      placeholder: "選択",
      key: "detail_category_medical_of_customer",
      label: 4,
      title: "診察科目",
      value: dataCalendar.detail_category_medical_of_customer,
      data: [
        {label: global.t("categoryTitle.1"), value: 1},
        {label: global.t("categoryTitle.2"), value: 2},
        {label: global.t("categoryTitle.3"), value: 3},
        {label: global.t("categoryTitle.4"), value: 4},
        {label: global.t("categoryTitle.5"), value: 5},
        {label: global.t("categoryTitle.6"), value: 6},
        {label: global.t("categoryTitle.7"), value: 7},
        {label: global.t("categoryTitle.8"), value: 8},
        {label: global.t("categoryTitle.9"), value: 9},
      ],
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{}}>
          <View style={{paddingHorizontal: 16, marginBottom: 16}}>
            <Text style={{fontFamily: fonts.SFregular, fontSize: 13, color: colors.gray1, lineHeight: 26}}>
              診察科目の変更を行う場合、現在の予約日時でご予約頂けない場合があります。
            </Text>
          </View>
          <View>
            <View>
              {MEDICAL_HISTORY.map((item, index) => {
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
          </View>
        </ScrollView>
        <View style={{marginTop: 60, paddingHorizontal: 16}}>
          <Button label="変更内容の確認へ進む" onPress={handleSubmit(handleConfirm)} />
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
