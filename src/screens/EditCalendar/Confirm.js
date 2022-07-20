import React, {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {SCREEN_QUESIONAIRE_STEP2, SCREEN_EDIT_CALENDAR} from "@screens/screens.constants";
import {getReservationById} from "@services/auth";
import moment from "moment";
import ItemQuestionForm from "@components/Form/ItemQuestionForm";
import GuideComponent from "@components/GuideComponent";
import {updateCalendar} from "@services/editCalendar";

const {width} = Dimensions.get("window");

export default function ExaminationItem({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const navigation = useNavigation();
  const [dataCalendar, setDataCalendar] = useState(route?.params?.data);
  const dataExaminationItem = global.t(`categoryTitle.${route?.params?.data?.calendar?.category_medical}`);
  console.log("type edit", route?.params.data.answer);
  useEffect(() => {
    setDataCalendar(route?.params?.data);
  }, []);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });
  const handleUpdate = async () => {
    global.showLoadingView();
    let dataSubmit;
    if (route?.params?.type === "EDIT_DATETIME") {
      dataSubmit = {
        id: dataCalendar.id,
        detail_category_medical_of_customer: dataCalendar.detail_category_medical_of_customer,
        calendar: {
          date: moment(dataCalendar?.date).format("YYYY-MM-DD"),
          time_start: dataCalendar?.time_start,
          time_end: dataCalendar?.time_end,
        },
      };
    } else if (route?.params?.type == "NEW") {
      dataSubmit = {
        detail_category_medical_of_customer: dataCalendar.detail_category_medical_of_customer,
        data: dataCalendar?.newDataAnswer,
        content_to_doctor: dataCalendar?.content_to_doctor,
      };
    } else if (route?.params?.type == "CHANGE_ITEM") {
      dataSubmit = {
        detail_category_medical_of_customer: dataCalendar.detail_category_medical_of_customer,
        data: dataCalendar?.newDataAnswer,
        content_to_doctor: dataCalendar?.content_to_doctor,
        calendar: {
          date: moment(dataCalendar?.date).format("YYYY-MM-DD"),
          time_start: dataCalendar?.time_start,
          time_end: dataCalendar?.time_end,
        },
      };
    } else {
      dataSubmit = {
        id: dataCalendar.id,
        detail_category_medical_of_customer: dataCalendar.detail_category_medical_of_customer,
        data: dataCalendar?.answer.map((item) => {
          return {answer_id: item.id, content_answer: item.content_answer};
        }),
        content_to_doctor: dataCalendar?.content_to_doctor,
        shipping_address: dataCalendar?.shipping_address,
        shipping_postal_code: dataCalendar?.shipping_postal_code,
      };
    }
    console.log("data submit", dataSubmit);
    const {data, response} = await updateCalendar({params: dataSubmit, paramId: dataCalendar.id});
    if (response.status == 200) {
      global.hideLoadingView();
      console.log("data when update", data);
      let toastId = global.toast.show("toastId", {
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
        animationDuration: 100,
        offsetTop: 0,
        offset: 0, // offset for both top and bottom toasts
        swipeEnabled: true,
        renderToast: (toastOptions) => {
          return (
            <TouchableOpacity
              style={{
                alignSelf: "stretch",
                marginTop: 0,
                marginHorizontal: 6,
                borderRadius: 10,
                backgroundColor: "#B7EB8F",
              }}
              onPress={() => {
                global.toast.hide(toastId);
                navigation.navigate(SCREEN_EDIT_CALENDAR, {data: dataCalendar});
              }}
            >
              <View>
                <Text style={{padding: 16, fontWeight: "bold"}}>{`変更が完了しました`}</Text>
                {/* <Text style={{paddingBottom: 12, paddingHorizontal: 16}} numberOfLines={2}>
                  <Text style={{paddingBottom: 12, paddingHorizontal: 16}}>{remoteMessage.notification.body}</Text>
                </Text> */}
              </View>
            </TouchableOpacity>
          );
        },
      });
      navigation.navigate(SCREEN_EDIT_CALENDAR, {data: dataCalendar});
    } else {
      let toastId = global.toast.show("toastId", {
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
        animationDuration: 100,
        offsetTop: 0,
        offset: 0, // offset for both top and bottom toasts
        swipeEnabled: true,
        renderToast: (toastOptions) => {
          return (
            <TouchableOpacity
              style={{
                alignSelf: "stretch",
                marginTop: 0,
                marginHorizontal: 6,
                borderRadius: 10,
                backgroundColor: "#F15F5F",
                width: width - 60,
              }}
              onPress={() => {
                global.toast.hide(toastId);
                navigation.navigate(SCREEN_EDIT_CALENDAR, {data: dataCalendar});
              }}
            >
              <View>
                <Text style={{padding: 16, fontWeight: "bold", color: "white"}}>{`変更は失敗します`}</Text>
                {/* <Text style={{paddingBottom: 12, paddingHorizontal: 16}} numberOfLines={2}>
                  <Text style={{paddingBottom: 12, paddingHorizontal: 16}}>{remoteMessage.notification.body}</Text>
                </Text> */}
              </View>
            </TouchableOpacity>
          );
        },
      });
      global.hideLoadingView();
      console.log("response--------", response);
    }
    global.hideLoadingView();
  };
  const ComponentComfirm = ({title = null, content = null}) => (
    <View style={{marginTop: 24}}>
      <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.textBlack, lineHeight: 23, marginBottom: 8}}>{title}</Text>
      <Text style={{fontFamily: fonts.NSregular, fontSize: 16, color: colors.gray1, lineHeight: 22}}>{content}</Text>
    </View>
  );
  const contactInfo = [
    {title: "名前フリガナ", content: dataCalendar?.user?.furigana},
    {title: "メールアドレス", content: dataCalendar?.user?.email},
    {title: "電話番号", content: dataCalendar?.user?.phone_number},
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
          <View>
            <GuideComponent title={"以下の内容で間違いがなければ、変更内容を送信して下さい。"} />
          </View>
          <ComponentComfirm title="診察項目" content={global.t(`categoryTitle.${dataCalendar?.detail_category_medical_of_customer}`)} />
          <ComponentComfirm
            title="日時"
            content={`${moment(dataCalendar?.date).format("YYYY年MM月DD日")} (${moment(dataCalendar?.date).format("dddd")}) ${
              dataCalendar?.time_start
            }~`}
          />
          <ComponentComfirm title="ご相談内容" content={dataCalendar?.content_to_doctor} />
          <View>
            <Text style={{fontFamily: fonts.NSbold, fontSize: 16, marginTop: 16}}>問診</Text>
            {route?.params?.data?.newDataAnswer
              ? route?.params?.data?.newDataAnswer?.map((item, index) => {
                  if (item?.content_answer)
                    return (
                      <View key={`answer-${index}`} style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text
                          style={{
                            fontSize: 15,
                            lineHeight: 22,
                            color: colors.colorTextBlack,
                            fontWeight: "700",
                            marginBottom: 10,
                            width: "60%",
                          }}
                        >
                          {item?.title}
                        </Text>
                        <View style={{width: "40%", paddingLeft: 10}}>
                          <Text style={{fontSize: 15, lineHeight: 22, color: colors.colorTextBlack, marginBottom: 12}}>
                            {item?.labelAnswer}
                          </Text>
                        </View>
                      </View>
                    );
                })
              : route?.params?.data?.answer?.map((item, index) => {
                  if (item?.content_answer)
                    return (
                      <View key={`answer-${index}`} style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text
                          style={{
                            fontSize: 15,
                            lineHeight: 22,
                            color: colors.colorTextBlack,
                            fontWeight: "700",
                            marginBottom: 10,
                            width: "60%",
                          }}
                        >
                          {item?.question?.title}
                        </Text>
                        <View style={{width: "40%", paddingLeft: 10}}>
                          <Text style={{fontSize: 15, lineHeight: 22, color: colors.colorTextBlack, marginBottom: 12}}>
                            {item?.content_answer}
                          </Text>
                        </View>
                      </View>
                    );
                })}
          </View>
          <View style={{marginTop: 24}}>
            <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.textBlack, lineHeight: 23, marginBottom: 11}}>
              お名前・ご連絡先
            </Text>
            {contactInfo.map((item, index) => (
              <View key={`contactInfo-${index}`}>
                <Text
                  style={{fontSize: 15, lineHeight: 22, color: colors.gray3, fontFamily: fonts.SFbold, fontWeight: "700", marginBottom: 10}}
                >
                  {item.title}
                </Text>
                <Text style={{fontSize: 15, lineHeight: 22, color: colors.gray1, fontFamily: fonts.SFregular, marginBottom: 12}}>
                  {item.content}
                </Text>
              </View>
            ))}
          </View>
          {/* <View style={{marginTop: 24}}>
            <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.textBlack, lineHeight: 23, marginBottom: 18}}>
              診察について
            </Text>
            <View>
              <Text
                style={{fontSize: 15, lineHeight: 22, color: colors.gray3, fontFamily: fonts.SFbold, fontWeight: "700", marginBottom: 10}}
              >
                前回の続き
              </Text>
              <Text style={{fontSize: 15, lineHeight: 22, color: colors.gray1, fontFamily: fonts.SFregular, marginBottom: 12}}>はい</Text>
            </View>
          </View> */}
          <View style={{marginTop: 60, paddingHorizontal: 16}}>
            <Button label="変更内容を確認へ進む" onPress={handleUpdate} />
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
