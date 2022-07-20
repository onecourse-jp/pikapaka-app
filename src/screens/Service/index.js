import React, {useEffect, useState} from "react";
import {StyleSheet, RefreshControl, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Alert} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import moment from "moment";
import {SCREEN_QUESIONAIRE_STEP1, SCREEN_SERVICE_STEP1} from "@screens/screens.constants";
import {getReservation} from "@services/auth";

export default function Service() {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const screenStep = 1;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.users?.userDetails);
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataCalendar, setDataCalendar] = useState([]);
  const [haveCalendarNotDone, setHaveCalendarNotDone] = useState(false);

  const getData = async () => {
    global.showLoadingView();
    const {response, data} = await getReservation();
    if (response?.status === 200) {
      const listCalendar = data?.data?.data;
      if (listCalendar?.length > 0) {
        setDataCalendar(listCalendar);
        let statusCheck = false;
        listCalendar.map((item) => {
          if (item.status === 2) {
            statusCheck = item.id;
          }
        });
        setHaveCalendarNotDone(statusCheck);
        global.hideLoadingView();
      } else {
        global.hideLoadingView();
        navigation.replace(SCREEN_SERVICE_STEP1);
      }
    } else {
      global.hideLoadingView();
      console.log("response getReservation", response);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAction = () => {
    if (haveCalendarNotDone) {
      Alert.alert("Warning", "You need to complete the old appointment information before booking a new one", [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => navigation.navigate(SCREEN_QUESIONAIRE_STEP1, {id: haveCalendarNotDone}),
        },
      ]);
    } else {
      navigation.navigate(SCREEN_SERVICE_STEP1);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: 16}}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Text style={{fontSize: 20, color: colors.textBlack, fontWeight: "500", marginBottom: 40}}>リストカレンダー</Text>
          {dataCalendar.map((item, index) => {
            return (
              <TouchableOpacity
                key={`dataCalendar-${index}`}
                style={{flexDirection: "row", marginBottom: 30}}
                onPress={() => {
                  navigation.navigate(SCREEN_QUESIONAIRE_STEP1, {id: item?.id});
                }}
              >
                <View>
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
                    {global.t(`status_calendar.${item?.status}`)}
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
                  <Text
                    style={{fontFamily: fonts.SFmedium, fontSize: 16, color: colors.gray1, lineHeight: 20, marginTop: 7, textAlign: "left"}}
                  >
                    {`${moment(item?.date).format("YYYY年MM月DD日")}（${moment(item?.date).format("dddd")}）${item?.time_start}~`}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <View style={{marginTop: 15, marginBottom: 15, justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity
              onPress={handleAction}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 300,
                height: 32,
                borderWidth: 1,
                borderColor: colors.textBlue,
                margin: 0,
              }}
            >
              <Text style={{color: colors.textBlue, textAlign: "center", lineHeight: 22}}>新しい予定を作成する</Text>
            </TouchableOpacity>
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
