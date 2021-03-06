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
import ListTime from "./Components/ListTime";
import {
  SCREEN_WELCOME,
  SCREEN_SERVICE_STEP3,
  SCREEN_EDIT_CALENDAR_CONFIRM,
  SCREEN_EDIT_CALENDAR_EXAMINATION_CONTENT,
} from "@screens/screens.constants";
import {updateCalendar} from "@actions/calendarAction";
import {getDayCalendar, getHourCalendar} from "@services/users";
import {updateDateTime} from "@services/editCalendar";

export default function EditCalendar({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const screenStep = 2;
  const CurrentTime = moment(new Date());
  var month = CurrentTime.format("M");
  var year = CurrentTime.format("YYYY");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [dataCalendar, setDataCalendar] = useState(route?.params?.data);
  const calendar = useSelector((state) => state?.calendar);
  const [datePicked, setDatePicked] = useState(null);
  const [monthPicked, setMonthPicked] = useState(month);
  const [yearPicked, setYearPicked] = useState(year);
  const [value, setValue] = useState(null);
  const [dateFromAdmin, setDateFromAdmin] = useState(null);
  const [listHourFromAdmin, setListHourFromAdmin] = useState([]);
  const [hourPicked, setHourPicked] = useState(null);
  useEffect(() => {
    setDataCalendar(route?.params?.data);
  }, []);

  console.log("data type", route?.params?.type);

  useEffect(async () => {
    global.showLoadingView();
    const {response, data} = await getDayCalendar(dataCalendar?.detail_category_medical_of_customer);
    if (response?.status === 200) {
      setDateFromAdmin(data.data);
    }
    global.hideLoadingView();
    const dataDateSet = {
      dateString: moment(dataCalendar?.date).format("YYYY-MM-DD"),
    };
    
    const dataHourSet = {
      constant_time: {
        created_at: dataCalendar?.calendar?.created_at,
        deleted_at: null,
        id: dataCalendar?.calendar?.constant_time_id,
        time_end: dataCalendar?.calendar?.time_end,
        time_start: dataCalendar?.calendar?.time_start,
        updated_at: dataCalendar?.calendar?.updated_at,
      },
      constant_time_id: dataCalendar?.calendar?.constant_time_id,
      slot: 1,
    };
    setTimeout(() => {
      setDate(dataDateSet);
      setHourPicked(dataHourSet);
    }, 100);
    console.log("dataDateSet", dataDateSet);
    console.log("dataHourSet", dataHourSet);
    // setDate()
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
      alert("You must pick a date");
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
    global.showLoadingView();
    const _isLogin = await isLogin();

    hourPicked.datePicked = datePicked;

    const dataSubmit = {
      id: dataCalendar.id,
      calendar: {
        date: datePicked,
        time_start: hourPicked?.constant_time?.time_start,
        time_end: hourPicked?.constant_time?.time_end,
      },
      detail_category_medical_of_customer: dataCalendar?.detail_category_medical_of_customer,
    };
    let newDataCalendar = {
      ...dataCalendar,
      date: dataSubmit?.calendar?.date,
      time_start: dataSubmit?.calendar?.time_start,
      time_end: dataSubmit?.calendar?.time_end,
    };
    global.hideLoadingView();
    if (route?.params?.type === "CHANGE_ITEM") {
      navigation.navigate(SCREEN_EDIT_CALENDAR_EXAMINATION_CONTENT, {data: newDataCalendar, type: route?.params?.type});
    } else {
      navigation.navigate(SCREEN_EDIT_CALENDAR_CONFIRM, {data: newDataCalendar, type: "EDIT_DATETIME"});
    }

    // const {data, response} = await updateDateTime(dataSubmit);
    // dataCalendar.date = moment(data.data.date).format("YYYY-MM-DD");
    // console.log("data---", data);
    // dispatch(updateCalendar({data: {step2: valueSubmit}, currentStep: 3}));

    if (_isLogin) {
      // navigation.navigate(SCREEN_SERVICE_STEP3);
    } else {
      navigation.navigate(SCREEN_WELCOME, {isFromStep2: true});
    }
  };
  const getListHourCalendar = async (date) => {
    const params = {detail_category_medical_of_customer: dataCalendar?.detail_category_medical_of_customer, date_time: date};
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
    } else if (nameDay === "Saturday" || nameDay === "Sunday") {
      return colors.gray4;
    } else {
      return colors.textBlack;
    }
  };

  const getStatusDay = (value) => {
    const nameDay = moment(value).format("dddd");
    if (nameDay === "Saturday" || nameDay === "Sunday") {
      return false;
    } else {
      return true;
    }
  };

  const checkDateInData = (item) => {
    const array = dateFromAdmin?.filter((element) => {
      return moment(element.detail_date).format("YYYY-MM-DD") == item;
    });
    if (array?.length > 0) return array[0].slot;
    return false;
  };

  const SymbolRender = ({item, active, statusDay}) => {
    const isDateInCalendar = checkDateInData(item);
    if (isDateInCalendar !== false && statusDay) {
      if (isDateInCalendar === 0) {
        return <Text style={{fontSize: 14, lineHeight: 24, color: colors.gray3}}>???</Text>;
      } else {
        return <Text style={{fontSize: 24, lineHeight: 24, color: active ? colors.white : colors.textBlack}}>???</Text>;
      }
    }
    return <></>;
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{}}>
          {/* <GuideComponent text={"????????????????????????2020???3???31????????????13:00???14:00"} /> */}
          <View style={{paddingHorizontal: 16, marginBottom: 16}}>
            <Text>?????????????????????</Text>
            <Text>{`${moment(dataCalendar?.date).format("YYYY???MM???DD???")}???${moment(dataCalendar?.date).format("dddd")}???${
              dataCalendar?.time_start
            }~`}</Text>
          </View>
          <Calendar
            style={[]}
            // current={moment(dataCalendar?.date).format("YYYY-MM-DD")}
            // current={'2022-06-01'}
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
            <View style={{marginTop: 20}}>
              <Text style={{color: colors.primaryColor, fontSize: 14, fontWeight: "bold", marginBottom: 7}}>
                {moment(datePicked).format("YYYY???MM???DD???")}???{moment(dataCalendar?.date).format("dddd")}???????????????
              </Text>
              {listHourFromAdmin.map((item, index) => {
                return (
                  <TouchableOpacity
                    disabled={item?.slot > 0 ? false : true}
                    key={`time-${index}`}
                    onPress={() => {
                      console.log("hour picker --", item);
                      setHourPicked(item);
                    }}
                  >
                    <ListTime data={item} hourPicked={hourPicked} />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          <View style={{marginVertical: 60, paddingHorizontal: 16}}>
            <Button label="??????????????????????????????" onPress={handleSubmit} />
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
