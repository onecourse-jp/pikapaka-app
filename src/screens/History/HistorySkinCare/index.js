import React, {useEffect, useState, useRef} from "react";
import {View, Text, TouchableOpacity, FlatList, RefreshControl} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import moment from "moment";
import {ScrollView} from "react-native-gesture-handler";
import {getReservation} from "@services/auth";
import {navigationRef} from "src/navigation/NavigationService";
import Pagination from "../../../components/Layout/Pagination";
import {SCREEN_QUESIONAIRE_STEP1, SCREEN_SERVICE_STEP1} from "@screens/screens.constants";
import {SCREEN_DETAIL_CALENDAR, SCREEN_DETAIL_CALENDAR_AFTER_PAYMENT, SCREEN_PAYMENT} from "../../screens.constants";

export default function HistorySkinCare({category_medical = 0}) {
  const user = useSelector((state) => state.users);
  const calendar = useSelector((state) => state?.calendar);
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const [refreshing, setRefreshing] = useState(false);
  const [dataCalendar, setDataCalendar] = useState([]);
  const colors = useThemeColors();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getData = async () => {
    global.showLoadingView();
    let paramsRevervation = category_medical === 0 ? {} : {category_medical: category_medical};
    paramsRevervation.limit = 5;
    paramsRevervation.page = page;
    const {response, data} = await getReservation(paramsRevervation);
    if (response?.status === 200) {
      const listCalendar = data?.data?.data;
      if (listCalendar?.length > 0) {
        setTotalPage(data?.data?.last_page || 1);
        setDataCalendar(listCalendar);
        global.hideLoadingView();
      } else {
        global.hideLoadingView();
      }
    } else {
      global.hideLoadingView();
    }
  };
  useEffect(() => {
    getData();
  }, [calendar, page]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const goDetailScreenWithStatus = (item) => {
    navigation.navigate("SERVICE");
    if (item.status == 3 || item.status == 5) {
      setTimeout(() => {
        navigation.navigate(SCREEN_PAYMENT, {id: item?.id});
      }, 200);
    } else if (item.status === 4 || item.status === 6) {
      setTimeout(() => {
        navigation.navigate(SCREEN_DETAIL_CALENDAR_AFTER_PAYMENT, {id: item?.id});
      }, 200);
    } else {
      setTimeout(() => {
        navigation.navigate(SCREEN_DETAIL_CALENDAR, {id: item?.id});
      }, 200);
    }
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 18, paddingBottom: 60}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {dataCalendar.map((item, index) => {
          return (
            <TouchableOpacity
              key={`dataCalendar-${index}`}
              style={{flexDirection: "row", marginBottom: 30}}
              disabled={item?.status == 7 ? true : false}
              onPress={() => {
                goDetailScreenWithStatus(item);
              }}
            >
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    borderColor: global.renderColorStatus({type: "text", status: item?.status}),
                    backgroundColor: global.renderColorStatus({type: "background", status: item?.status}),
                    paddingHorizontal: 8,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.SFmedium,
                      fontSize: 12,
                      color: global.renderColorStatus({type: "text", status: item?.status}),
                      lineHeight: 20,
                      textAlign: "left",
                    }}
                  >
                    {global.t(`status_calendar.${item?.status}`)}
                  </Text>
                </View>

                <Text
                  style={{fontFamily: fonts.SFmedium, fontSize: 16, color: colors.gray1, lineHeight: 20, marginTop: 7, textAlign: "left"}}
                >
                  {`${moment(item?.date).format("YYYY年MM月DD日")}（${moment(item?.date).format("dddd")}）${item?.time_start}~${
                    item?.time_end
                  }`}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.SFmedium,
                    fontSize: 15,
                    color: colors.textBlack,
                    lineHeight: 18,
                    marginTop: 8,
                    textAlign: "left",
                  }}
                >
                  {global.t(`categoryTitle.${item?.detail_category_medical_of_customer}`)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Pagination setPage={setPage} page={page} totalPage={totalPage} />
    </>
  );
}
