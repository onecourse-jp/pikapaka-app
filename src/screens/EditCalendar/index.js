import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Alert, Image} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {navigationRef} from "src/navigation/NavigationService";
import {CommonActions} from "@react-navigation/native";
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
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [dataCalendar, setDataCalendar] = useState(null);
  const user = useSelector((state) => state.users);
  const [notiStatus, setNotiStatus] = useState(false);
  useEffect(() => {
    actionGetCalendar(route?.params?.data.id);
  }, [route?.params?.data, user]);
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
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{name: "HomeStack"}],
      });
      navigation.dispatch(resetAction);
      navigation.navigate("HistoryStack");
      toast.show("???????????????????????????????????????", {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "zoom-in",
      });
    } else {
      Alert.alert("Alert Title", "???????????????????????????????????????????????????????????????????????????", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }
  };
  const confirmDelete = () => {
    Alert.alert("", "?????????????????????????????????????????????", [
      {
        text: "?????????",
        onPress: () => {},
      },
      {
        text: "??????",
        onPress: () => {
          handleDelete();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        {dataCalendar && (
          <ScrollView contentContainerStyle={{paddingBottom: 30}}>
            <View>
              <Text
                style={{
                  fontFamily: fonts.NSbold,
                  fontSize: 12,
                  color: colors.textBlack,
                  lineHeight: 17,
                  padding: 16,
                }}
              >
                ????????????
              </Text>
              <View
                style={{
                  backgroundColor: colors.white,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                  borderBottomColor: colors.borderGrayE,
                }}
              >
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Text
                    style={{
                      width: 120,
                      marginRight: 4,
                      fontFamily: fonts.Hiragino,
                      fontWeight: "600",
                      color: colors.colorTextBlack,
                      fontSize: 12,
                      lineHeight: 14,
                    }}
                  >
                    ????????????
                  </Text>
                  <Text
                    style={{
                      width: 120,
                      fontFamily: fonts.Hiragino,
                      fontWeight: "300",
                      marginRight: 4,
                      color: colors.colorTextBlack,
                      fontSize: 12,
                      lineHeight: 16,
                    }}
                  >{`${moment(dataCalendar?.date).format("YYYY???MM???DD???")} (${moment(dataCalendar?.date).format("dddd")}) ${
                    dataCalendar?.time_start
                  }~`}</Text>
                </View>
                <TouchableOpacity onPress={handleDateTime} style={{flexDirection: "row", alignItems: "center"}}>
                  <Text style={{fontFamily: fonts.NSregular, color: colors.headerComponent, fontSize: 12}}>??????</Text>
                  <View style={{marginLeft: 7}}>
                    <Image height={13} width={8} source={require("@assets/images/icons/ic_arrowRight_back_step.png")} />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: colors.white,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                }}
              >
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Text
                    style={{
                      width: 120,
                      marginRight: 4,
                      fontFamily: fonts.Hiragino,
                      fontWeight: "600",
                      color: colors.gray7,
                      fontSize: 12,
                      lineHeight: 14,
                    }}
                  >
                    ????????????
                  </Text>
                  <Text
                    style={{
                      width: 120,
                      fontFamily: fonts.Hiragino,
                      fontWeight: "300",
                      marginRight: 4,
                      color: colors.gray7,
                      fontSize: 12,
                      lineHeight: 16,
                    }}
                  >
                    {global.t(`categoryTitle.${dataCalendar?.detail_category_medical_of_customer}`)}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Text
                  style={{
                    fontFamily: fonts.NSbold,
                    fontSize: 12,
                    color: colors.textBlack,
                    lineHeight: 17,
                    padding: 16,
                  }}
                >
                  ????????????
                </Text>
                <TouchableOpacity onPress={handleExaminationContent} style={{flexDirection: "row", alignItems: "center", paddingRight: 16}}>
                  <Text style={{fontFamily: fonts.NSregular, color: colors.headerComponent, fontSize: 12}}>??????</Text>
                  <View style={{marginLeft: 7}}>
                    <Image height={13} width={8} source={require("@assets/images/icons/ic_arrowRight_back_step.png")} />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: colors.white,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                  borderBottomColor: colors.borderGrayE,
                }}
              >
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Text
                    style={{
                      marginRight: 4,
                      fontFamily: fonts.Hiragino,
                      fontWeight: "600",
                      color: colors.colorTextBlack,
                      fontSize: 12,
                      lineHeight: 14,
                    }}
                  >
                    {dataCalendar?.content_to_doctor && dataCalendar?.content_to_doctor != "0"
                      ? dataCalendar?.content_to_doctor
                      : "???????????????????????????"}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: fonts.NSbold,
                  fontSize: 12,
                  color: colors.textBlack,
                  lineHeight: 17,
                  padding: 16,
                }}
              >
                ?????????????????????????????????????????????
              </Text>
              <View
                style={{
                  backgroundColor: colors.white,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                  borderBottomColor: colors.borderGrayE,
                }}
              >
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Text
                    style={{
                      marginRight: 4,
                      fontFamily: fonts.Hiragino,
                      fontWeight: "600",
                      color: colors.colorTextBlack,
                      fontSize: 12,
                      lineHeight: 14,
                    }}
                  >
                    {dataCalendar?.old_reservation_id === "false" ? "??????" : "?????????"}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: fonts.NSbold,
                  fontSize: 12,
                  color: colors.textBlack,
                  lineHeight: 17,
                  padding: 16,
                }}
              >
                ?????????
              </Text>
              <View
                style={{
                  backgroundColor: colors.white,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                  borderBottomColor: colors.borderGrayE,
                }}
              >
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Text
                    style={{
                      width: 120,
                      marginRight: 4,
                      fontFamily: fonts.Hiragino,
                      fontWeight: "600",
                      color: colors.colorTextBlack,
                      fontSize: 12,
                      lineHeight: 14,
                    }}
                  >
                    {/* s???a l???i l???y th??ng tin address v?? postal code t??? m???t reservation */}
                    {dataCalendar?.shipping_postal_code ?? dataCalendar?.user?.postal_code}
                    {"\n"}
                    {dataCalendar?.shipping_address ??dataCalendar?.user?.address}
                  </Text>
                </View>
                <TouchableOpacity onPress={handleDeliveryAddress} style={{flexDirection: "row", alignItems: "center"}}>
                  <Text style={{fontFamily: fonts.NSregular, color: colors.headerComponent, fontSize: 12}}>??????????????????????????????</Text>
                  <View style={{marginLeft: 7}}>
                    <Image height={13} width={8} source={require("@assets/images/icons/ic_arrowRight_back_step.png")} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{padding: 16}}>
              <Text style={{fontSize: 12, lineHeight: 20, fontFamily: fonts.SFregular, color: colors.gray7}}>
                ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????{" "}
              </Text>
            </View>
            <TouchableOpacity onPress={confirmDelete}>
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
                  X ????????????????????????????????????
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
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
