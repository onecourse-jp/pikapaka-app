import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image, SafeAreaView, Alert} from "react-native";
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
const {height} = Dimensions.get("window");

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
  const [refHourComponent, setRefHourComponent] = useState(null);
  const [heightHourComponent, setHeightHourComponent] = useState(null);
  const [hourPicked, setHourPicked] = useState(null);
  const dateCalendarRef = useRef(null);

  useEffect(async () => {
    global.showLoadingView();
    const {response, data} = await getDayCalendar(calendar?.data?.step1.data);
    if (response?.status === 200) {
      console.log("getDayCalendar data", data.data);
      setDateFromAdmin(data.data);
    } else {
      console.log("getDayCalendar err", data);
    }
    global.hideLoadingView();
  }, [calendar]);
  LocaleConfig.locales["ja"] = {
    monthNames: ["???1???", "???2???", "???3???", "???4???", "???5???", "???6???", "???7???", "???8???", "???9???", "???10???", "???11???", "???12???"],
    monthNamesShort: ["???1???", "???2???", "???3???", "???4???", "???5???", "???6???", "???7???", "???8???", "???9???", "???10???", "???11???", "???12???"],
    dayNames: ["???", "???", "???", "???", "???", "???", "???"],
    dayNamesShort: ["???", "???", "???", "???", "???", "???", "???"],
  };
  LocaleConfig.defaultLocale = "ja";

  const handleSubmit = async () => {
    if (datePicked === null) {
      alert("??????????????????????????????????????????");
      return;
    }
    if (hourPicked === null) {
      Alert.alert("", "?????????????????????????????????", [
        {
          text: "??????",
        },
      ]);
      return;
    }
    const _isLogin = await isLogin();
    console.log("_isLogin", _isLogin);
    const formatDatePicker = moment(datePicked).format("YYYY???MM???DD???");
    hourPicked.datePicked = datePicked;
    const jsonStringValue = JSON.stringify(hourPicked);
    const valueSubmit = {
      key: "step2",
      label: `??????????????????`,
      data: `{"date": "${formatDatePicker}", "time": ${jsonStringValue}}`,
      value: `${formatDatePicker}???${moment(datePicked).format("dddd")}???${hourPicked?.constant_time?.time_start}~`,
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

  useEffect(() => {
    if (listHourFromAdmin.length > 0 && heightHourComponent) {
      let heightToScroll = heightHourComponent;
      dateCalendarRef?.current?.scrollTo({y: heightToScroll});
    }
  }, [heightHourComponent]);

  const getColorOfDay = (value) => {
    const nameDay = moment(value).format("dddd");
    if (value === datePicked) {
      return colors.white;
    }
    // else if (nameDay === "Saturday" || nameDay === "Sunday" || nameDay === "???" || nameDay === "???") {
    //   return colors.gray4;
    // }
    else {
      return colors.textBlack;
    }
  };

  const getStatusDay = (value) => {
    const nameDay = moment(value).format("dddd");
    // if (nameDay === "Saturday" || nameDay === "Sunday" || nameDay === "???" || nameDay === "???") {
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
        return <Text style={{fontSize: 14, lineHeight: 20, fontFamily: fonts.NSregular, color: colors.gray3}}>???</Text>;
      } else {
        return (
          <Text style={{fontSize: 14, lineHeight: 20, fontFamily: fonts.NSregular, color: active ? colors.white : colors.textBlack}}>
            ???
          </Text>
        );
      }
    }
    return <></>;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView ref={dateCalendarRef}>
          <GuideComponent title="??????????????????????????????????????????????????????????????????" />
          <StepsComponent currentStep={2} />
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
                      {calendar.data[item].label}???
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
                    <Text style={{fontFamily: fonts.NSregular, color: colors.headerComponent, fontSize: 11}}>??????</Text>
                    <View style={{marginLeft: 7}}>
                      <Image source={require("@assets/images/icons/ic_arrowRight_back_step.png")} />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
          })}
          {/* <View style={{flexDirection: "column"}}>
            <Text style={{color: colors.gray1, fontSize: 14, fontWeight: "bold", marginTop: 21, marginBottom: 11}}>????????????</Text>
          </View> */}
          <Calendar
            style={[]}
            dayComponent={({date, state}) => {
              if (date.month == monthPicked && date.year == yearPicked) {
                const isDateInCalendar = checkDateInData(date.dateString);
                return (
                  <TouchableOpacity disabled={isDateInCalendar === 0 || isDateInCalendar === false} onPress={() => setDate(date, state)}>
                    <View
                      style={{
                        width: 51,
                        height: 51,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          datePicked === date.dateString
                            ? colors.headerComponent
                            : isDateInCalendar === 0 || isDateInCalendar === false
                            ? colors.borderGrayE
                            : colors.white,
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
                    <Text style={{fontSize: 15, color: colors.textBlack, marginLeft: 8}}>?????????</Text>
                  </View>
                );
              return (
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Text style={{fontSize: 15, color: colors.textBlack, marginRight: 8}}>?????????</Text>
                  <Image source={require("@assets/images/icons/ic_next.png")} />
                </View>
              );
            }}
            firstDay={0}
            pastScrollRange={50}
            futureScrollRange={50}
            horizontal={true}
            showScrollIndicator={true}
            monthFormat={"yyyy???MM???"}
            onMonthChange={(data) => {
              setMonthPicked(data.month);
              setYearPicked(data.year);
            }}
          />
          {listHourFromAdmin.length > 0 && (
            <View
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                setHeightHourComponent(layout.y);
              }}
              ref={(view) => {
                setRefHourComponent(view);
              }}
              style={{marginTop: 20, paddingHorizontal: 16}}
            >
              <Text style={{color: colors.primaryColor, fontSize: 14, fontWeight: "bold", marginBottom: 7}}>
                {moment(datePicked).format("YYYY???MM???DD???")}???{moment(datePicked).format("dddd")}???????????????
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
            <Button label="????????????" onPress={handleSubmit} />
          </View>
          <View style={{marginTop: 11, paddingHorizontal: 16, paddingBottom: 30}}>
            <Button variant="secondary" label="??????????????????????????????" onPress={() => navigation.goBack()} />
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
