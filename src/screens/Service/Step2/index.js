import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, Alert} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {Calendar, LocaleConfig, Agenda, Arrow} from "react-native-calendars";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import {isLogin} from "@utils/authority";
import moment from "moment";
import ListTime from "../components/ListTime";
import {SCREEN_WELCOME, SCREEN_SERVICE_STEP3} from "@screens/screens.constants";
import {updateCalendar} from "@actions/calendarAction";
import {getDayCalendar, getHourCalendar} from "@services/users";

export default function ServiceStep2() {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const screenStep = 2;
  const CurrentTime = moment(new Date());
  var month = CurrentTime.format("M");
  var year = CurrentTime.format("YYYY");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const calendar = useSelector((state) => state?.calendar);
  const [datePicked, setDatePicked] = useState(null);
  const [monthPicked, setMonthPicked] = useState(month);
  const [yearPicked, setYearPicked] = useState(year);
  const [value, setValue] = useState(null);
  const [dateFromAdmin, setDateFromAdmin] = useState(null);
  const [listHourFromAdmin, setListHourFromAdmin] = useState([]);
  const [hourPicked, setHourPicked] = useState(null);

  const DATA = [
    {time: "08:00〜10:00", status: "空きなし ✕"},
    {time: "10:00〜12:00", status: "空きあり ○"},
    {time: "11:00〜13:00", status: "空きなし ✕"},
    {time: "13:00〜15:00", status: "空きあり ○"},
    {time: "15:00〜17:00", status: "空きあり ○"},
  ];
  useEffect(async () => {
    global.showLoadingView();
    const {response, data} = await getDayCalendar(calendar?.data?.step1.data);
    if (response?.status === 200) {
      console.log("getDayCalendar ", data);
      setDateFromAdmin(data.data);
    }
    global.hideLoadingView();
  }, [calendar]);
  console.log("data calendar in step 2", calendar?.data?.step1.data);
  LocaleConfig.locales["ja"] = {
    monthNames: ["年1月", "年2月", "年3月", "年4月", "年5月", "年6月", "年7月", "年8月", "年9月", "年10月", "年11月", "年12月"],
    monthNamesShort: ["年1月", "年2月", "年3月", "年4月", "年5月", "年6月", "年7月", "年8月", "年9月", "年10月", "年11月", "年12月"],
    dayNames: ["日", "月", "火", "水", "木", "金", "土"],
    dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
  };
  LocaleConfig.defaultLocale = "ja";

  const handleSubmit = async () => {
    if (datePicked === null) {
      alert("日付を選択する必要があります");
      return;
    }
    if (hourPicked === null) {
      Alert.alert("", "時間を選んでください。", [
        {
          text: "はい",
        },
      ]);
      return;
    }
    const _isLogin = await isLogin();
    console.log("_isLogin", _isLogin);
    const formatDatePicker = moment(datePicked).format("YYYY年MM月DD日");
    hourPicked.datePicked = datePicked;
    const jsonStringValue = JSON.stringify(hourPicked);
    const valueSubmit = {
      key: "step2",
      label: `選択中の日付`,
      data: `{"date": "${formatDatePicker}", "time": ${jsonStringValue}}`,
      value: `${formatDatePicker}（${moment(datePicked).format("dddd")}）${hourPicked?.constant_time?.time_start}~${
        hourPicked?.constant_time?.time_end
      }`,
    };
    dispatch(updateCalendar({data: {step2: valueSubmit}, currentStep: 3}));
    if (_isLogin) {
      navigation.navigate(SCREEN_SERVICE_STEP3);
    } else {
      navigation.navigate(SCREEN_WELCOME, {isFromStep2: "true"});
    }
  };

  const getListHourCalendar = async (date) => {
    const params = {detail_category_medical_of_customer: calendar?.data?.step1.data, date_time: date};
    global.showLoadingView();
    const {response, data} = await getHourCalendar(params);
    if (response?.status === 200) {
      console.log("data getListHourCalendar", data?.data);
      setListHourFromAdmin(data?.data || []);
    } else {
      setListHourFromAdmin([]);
    }
    global.hideLoadingView();
  };

  const setDate = (date, state) => {
    setDatePicked(date.dateString);
    setHourPicked(null);
    getListHourCalendar(date.dateString);
  };

  const getColorOfDay = (value) => {
    const nameDay = moment(value).format("dddd");
    if (value === datePicked) {
      return colors.white;
    }
    // else if (nameDay === "Saturday" || nameDay === "Sunday" || nameDay === "日" || nameDay === "土") {
    //   return colors.gray4;
    // }
    else {
      return colors.textBlack;
    }
  };

  const getStatusDay = (value) => {
    const nameDay = moment(value).format("dddd");
    // if (nameDay === "Saturday" || nameDay === "Sunday" || nameDay === "日" || nameDay === "土") {
    //   return false;
    // } else {
    //   return true;
    // }
    return true;
  };

  const checkDateInData = (item) => {
    try {
      const array = dateFromAdmin?.filter((element) => {
        return moment(element.detail_date).format("YYYY-MM-DD") == item;
      });
      if (array?.length > 0) return array[0].slot;
      return false;
    } catch (error) {
      return false;
    }
  };

  const SymbolRender = ({item, active, statusDay}) => {
    const isDateInCalendar = checkDateInData(item);
    if (isDateInCalendar !== false && statusDay) {
      if (isDateInCalendar === 0) {
        return <Text style={{fontSize: 18, lineHeight: 24, color: colors.gray3}}>✕</Text>;
      } else {
        return <Text style={{fontSize: 20, lineHeight: 24, color: active ? colors.white : colors.textBlack}}>○</Text>;
      }
    }
    return <></>;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView>
          <GuideComponent title="オンライン診療のご希望日時をお選びください。" />
          <StepsComponent currentStep={2} />
          {Object.keys(calendar.data).map((item, index) => {
            console.log("item", item, calendar.data[item].label, calendar.data[item].value);
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
                      navigation.goBack();
                    }}
                    style={{flexDirection: "row", alignItems: "center"}}
                  >
                    <Text style={{fontFamily: fonts.NSregular, color: colors.headerComponent, fontSize: 11}}>変更</Text>
                    <View style={{marginLeft: 7}}>
                      <Image source={require("@assets/images/icons/ic_arrowRight_back_step.png")} />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
          })}
          {/* <View style={{flexDirection: "column"}}>
            <Text style={{color: colors.gray1, fontSize: 14, fontWeight: "bold", marginTop: 21, marginBottom: 11}}>診察科目</Text>
          </View> */}
          <Calendar
            style={[]}
            dayComponent={({date, state}) => {
              if (date.month == monthPicked && date.year == yearPicked) {
                return (
                  <TouchableOpacity disabled={!getStatusDay(date.dateString)} onPress={() => setDate(date, state)}>
                    <View
                      style={{
                        width: 51,
                        height: 51,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: datePicked === date.dateString ? colors.headerComponent : colors.white,
                      }}
                    >
                      <Text
                        style={{
                          color: getColorOfDay(date.dateString),
                          marginBottom: 2,
                        }}
                      >
                        {date.day}
                      </Text>
                      <SymbolRender
                        item={date.dateString}
                        statusDay={getStatusDay(date.dateString)}
                        active={datePicked === date.dateString ? true : false}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }
              return <></>;
            }}
            renderArrow={(direction) => {
              if (direction == "left")
                return (
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image source={require("@assets/images/icons/ic_back.png")} />
                    <Text style={{fontSize: 15, color: colors.textBlack, marginLeft: 8}}>前の月</Text>
                  </View>
                );
              return (
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Text style={{fontSize: 15, color: colors.textBlack, marginRight: 8}}>次の月</Text>
                  <Image source={require("@assets/images/icons/ic_next.png")} />
                </View>
              );
            }}
            firstDay={0}
            pastScrollRange={50}
            futureScrollRange={50}
            horizontal={true}
            showScrollIndicator={true}
            monthFormat={"yyyy年MM月"}
            onMonthChange={(data) => {
              setMonthPicked(data.month);
              setYearPicked(data.year);
            }}
          />
          {listHourFromAdmin.length > 0 && (
            <View style={{marginTop: 20, paddingHorizontal: 16}}>
              <Text style={{color: colors.primaryColor, fontSize: 14, fontWeight: "bold", marginBottom: 7}}>
                {moment(datePicked).format("YYYY年MM月DD日")}（{moment(datePicked).format("dddd")}）の予約枠
              </Text>
              {listHourFromAdmin.map((item, index) => {
                return (
                  <TouchableOpacity
                    disabled={item?.slot > 0 ? false : true}
                    key={`time-${index}`}
                    onPress={() => {
                      console.log("hour picker step 2", item);
                      setHourPicked(item);
                    }}
                  >
                    <ListTime data={item} hourPicked={hourPicked} />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          <View style={{marginTop: 11, paddingHorizontal: 16}}>
            <Button label="次へ進む" onPress={handleSubmit} />
          </View>
          <View style={{marginTop: 11, paddingHorizontal: 16, paddingBottom: 30}}>
            <Button variant="secondary" label="診療科目の選択へ戻る" onPress={() => navigation.goBack()} />
          </View>
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
