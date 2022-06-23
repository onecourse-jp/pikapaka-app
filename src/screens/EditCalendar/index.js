import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Alert, Image} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
// import { useToast } from "react-native-toast-notifications";
import {
  SCREEN_EDIT_CALENDAR_DATETIME,
  SCREEN_EDIT_CALENDAR_EXAMINATION_ITEM,
  SCREEN_EDIT_CALENDAR_EXAMINATION_CONTENT,
  SCREEN_EDIT_CALENDAR_ADDRESS,
  SCREEN_HISTORY,
} from "@screens/screens.constants";
import {deleteCalendar} from "@services/editCalendar";
import moment from "moment";
import {getReservationById} from "@services/auth";
import {changeStatusCalendar} from "@actions/calendarAction";

export default function EditCalendar({route}) {
  // const toast = useToast();
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [dataCalendar, setDataCalendar] = useState(null);
  const [notiStatus, setNotiStatus] = useState(false);
  useEffect(() => {
    actionGetCalendar(route?.params?.data.id);
  }, [route?.params?.data]);
  useEffect(() => {
    if (route?.params?.type == "SUCCESS") {
      setNotiStatus(true);
      setTimeout(() => {
        setNotiStatus(false);
      }, 2000);
    }
  }, [route?.params?.data]);

  const actionGetCalendar = async (idCalendar) => {
    global.showLoadingView();
    const {response, data} = await getReservationById(idCalendar);
    if (response?.status === 200) {
      setDataCalendar(data?.data);
      console.log("response getReservationById", data?.data);
    } else {
      console.log("response getReservationById", response?.status);
    }
    global.hideLoadingView();
  };
  const handleDateTime = () => {
    navigation.navigate(SCREEN_EDIT_CALENDAR_DATETIME, {data: dataCalendar});
  };
  const handleExaminationItem = () => {
    navigation.navigate(SCREEN_EDIT_CALENDAR_EXAMINATION_ITEM, {data: dataCalendar});
  };
  const handleExaminationContent = () => {
    navigation.navigate(SCREEN_EDIT_CALENDAR_EXAMINATION_CONTENT, {data: dataCalendar});
  };
  const handleDeliveryAddress = () => {
    navigation.navigate(SCREEN_EDIT_CALENDAR_ADDRESS, {data: dataCalendar});
  };

  const handleDelete = async () => {
    global.showLoadingView();
    const {data, response} = await deleteCalendar(dataCalendar.id);
    if (data.status === 200) {
      global.hideLoadingView();
      dispatch(changeStatusCalendar());
      toast.show("変更が完了しました", {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "zoom-in",
      });
    } else {
      Alert.alert("Alert Title", "キャンセルできませんでした。もう一度お試しください", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }
  };
  const CalendarComponent = ({title = null, content = null, onClick = () => {}}) => (
    <View style={{paddingVertical: 25}}>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <Text style={{fontFamily: fonts.NSbold, fontSize: 20, color: colors.textBlack, lineHeight: 29}}>{title}</Text>
        <TouchableOpacity onPress={onClick} style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={{fontFamily: fonts.NSregular, color: colors.headerComponent, fontSize: 12}}>変更</Text>
          <View style={{marginLeft: 7}}>
            <Image height={13} width={8} source={require("@assets/images/icons/ic_arrowRight_back_step.png")} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 15, lineHeight: 26, fontFamily: fonts.SFregular, color: colors.gray1}}>{content}</Text>
    </View>
  );
  const CalendarExample = ({title = null, content = null, onClick = () => {}}) => (
    <View style={{paddingVertical: 25}}>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <Text style={{fontFamily: fonts.NSbold, fontSize: 20, color: colors.textBlack, lineHeight: 29}}>{title}</Text>
        <TouchableOpacity onPress={onClick} style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={{fontFamily: fonts.NSregular, color: colors.headerComponent, fontSize: 12}}>変更</Text>
          <View style={{marginLeft: 7}}>
            <Image height={13} width={8} source={require("@assets/images/icons/ic_arrowRight_back_step.png")} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 16, lineHeight: 23, fontWeight: "700", fontFamily: fonts.SFbold, marginTop: 24, marginBottom: 7}}>
        ご相談内容
      </Text>
      <Text style={{fontSize: 15, lineHeight: 26, fontFamily: fonts.SFregular, color: colors.gray1}}>{content}</Text>
      <Text style={{fontSize: 16, lineHeight: 23, fontWeight: "700", fontFamily: fonts.SFbold, marginTop: 24, marginBottom: 7}}>
        診察について
      </Text>
      <Text
        style={{
          fontSize: 15,
          lineHeight: 23,
          fontWeight: "700",
          fontFamily: fonts.SFbold,
          marginTop: 10,
          marginBottom: 7,
          color: colors.gray3,
        }}
      >
        前回の続き
      </Text>
      <Text
        style={{
          fontSize: 15,
          lineHeight: 23,
          fontWeight: "400",
          fontFamily: fonts.SFbold,
          marginTop: 10,
          marginBottom: 7,
          color: colors.gray1,
        }}
      >
        はい
      </Text>
    </View>
  );
  const CalendarAddress = ({title = null, content = null, onClick = () => {}}) => (
    <View style={{paddingVertical: 25}}>
      <Text style={{fontFamily: fonts.NSbold, fontSize: 20, color: colors.textBlack, lineHeight: 29}}>{title}</Text>

      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <Text style={{fontSize: 16, lineHeight: 23, fontWeight: "400", fontFamily: fonts.SFbold, marginTop: 24, marginBottom: 10}}>
          {dataCalendar?.shipping_postal_code} {dataCalendar?.shipping_address}
        </Text>
        <TouchableOpacity onPress={onClick} style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={{fontFamily: fonts.NSregular, color: colors.headerComponent, fontSize: 12}}>今回のお届け先を追加</Text>
          <View style={{marginLeft: 7}}>
            <Image height={13} width={8} source={require("@assets/images/icons/ic_arrowRight_back_step.png")} />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={{fontSize: 15, lineHeight: 26, fontFamily: fonts.SFregular, color: colors.gray7}}>
        今回のみ配送先を登録住所以外で指定したい方は『登録住所以外を指定する』ボタンから住所を指定して下さい。引っ越しなどで住所が変わられた方はマイページから変更を行って下さい。{" "}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 30}}>
          {notiStatus && (
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: colors.colorGreenEditCalendar3,
                backgroundColor: colors.colorGreenEditCalendar1,
                paddingVertical: 9,
                paddingHorizontal: 16,
                marginHorizontal: 23,
              }}
            >
              <Text>変更が完了しました</Text>
            </View>
          )}
          <CalendarComponent
            title="予約日時"
            content={`${moment(dataCalendar?.date).format("YYYY年MM月DD日")} (${moment(dataCalendar?.date).format("dddd")}) ${
              dataCalendar?.time_start
            }~${dataCalendar?.time_end}`}
            onClick={handleDateTime}
          />
          <CalendarComponent
            title="診察科目"
            content={global.t(`categoryTitle.${dataCalendar?.detail_category_medical_of_customer}`)}
            onClick={handleExaminationItem}
          />
          <CalendarExample title="診察内容" content={dataCalendar?.content_to_doctor} onClick={handleExaminationContent} />
          <CalendarAddress title="配送先" onClick={handleDeliveryAddress} />
          <TouchableOpacity onPress={handleDelete}>
            <View style={{flexDirection: "row", justifyContent: "center"}}>
              <Text
                style={{
                  color: colors.colorRedEditCalendar,
                  paddingHorizontal: 16,
                  paddingVertical: 5,
                  borderWidth: 1,
                  borderColor: colors.colorRedEditCalendar,
                }}
              >
                X この予約をキャンセルする
              </Text>
            </View>
          </TouchableOpacity>
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
