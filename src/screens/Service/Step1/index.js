import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity, FlatList, Alert, ScrollView} from "react-native";
import {useThemeColors, Button} from "react-native-theme-component";
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation} from "@react-navigation/native";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import {SCREEN_SERVICE_STEP2} from "@screens/screens.constants";
import {useDispatch, useSelector} from "react-redux";
import ModalPortal from "react-native-modal";
import {updateCalendar} from "@actions/calendarAction";
import {getReservation} from "@services/auth";
import {SCREEN_DETAIL_CALENDAR} from "../../screens.constants";

let {width, height} = Dimensions.get("window");

export default function ServiceStep1({route}) {
  const user = useSelector((state) => state.users?.userDetails);
  const colors = useThemeColors();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const calendar = useSelector((state) => state?.calendar);
  const defaultValueStep1 = calendar?.data?.step1 ? JSON.stringify(calendar?.data?.step1) : null;
  const [idNeedFinish, setIdNeedFinish] = useState(false);
  const [value, setValue] = useState(null);
  const [valueChoose, setValueChoose] = useState(null);
  const [needFinish, setNeedFinish] = useState(false);
  const [isPopup, setIsPopup] = useState(false);

  useEffect(() => {
    let defaultvalue = route.params?.data;
    console.log("defaultvalue", defaultvalue);
    if (defaultvalue) {
      defaultvalue = JSON.parse(defaultvalue.value);
    }
    setValue(defaultvalue ? defaultvalue : null);
  }, [route]);

  const getData = async () => {
    if (user) {
      global.showLoadingView();
      const {response, data} = await getReservation({});
      if (response?.status === 200) {
        const listCalendar = data?.data?.data;
        let statusFinish = false;
        listCalendar.map((item) => {
          if (item.status === 2) {
            console.log("item.st", item.id);
            statusFinish = true;
            setIdNeedFinish(item.id);
          }
        });
        setNeedFinish(statusFinish);
        global.hideLoadingView();
      } else {
        global.hideLoadingView();
        console.log("response getReservation", response);
      }
    }
  };
  const alertFinish = (id) => {
    Alert.alert(
      "",
      `まだ問診票に記入していない予定があります。 新しい予約を作成する前に、問診票を完了してください。`,
      [
        {
          text: "いいえ",
          onPress: () => {},
        },
        {
          text: "はい",
          onPress: () => {
            navigation.navigate(SCREEN_DETAIL_CALENDAR, {id: id});
          },
        },
      ],
      {cancelable: true},
    );
  };

  useEffect(() => {
    getData();
  }, [calendar]);

  const handleSubmit = () => {
    console.log("needFinish", needFinish);
    if (needFinish) return alertFinish(idNeedFinish);
    if (value) {
      dispatch(updateCalendar({data: {step1: value}, currentStep: 2}));
      navigation.navigate(SCREEN_SERVICE_STEP2);
    }
  };
  const _renderItem = (item, index) => {
    const valueItem = JSON.parse(item.value);
    return (
      <TouchableOpacity key={`_renderItem-${index}`} onPress={() => setValueChoose(valueItem)}>
        <Text
          style={{
            color: valueChoose?.data == valueItem?.data ? colors.colorTextBlack : "#C1C1C1",
            textAlign: "center",
            fontSize: 16,
            lineHeight: 34,
            backgroundColor: valueChoose?.data == valueItem?.data ? "#EFEFF4" : "#FFFFFF",
          }}
        >
          {valueItem.value}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setValueChoose(value);
  }, [value]);

  const confirmValue = () => {
    setIsPopup(false);
    setValue(valueChoose);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <GuideComponent title="オンライン診療をご希望ですか？" content="まずは診療科目とメニューをお選びください。" />
        <StepsComponent />
        <View style={{flexDirection: "column", flex: 1}}>
          <TouchableOpacity
            onPress={() =>
              global.showModalBottom({value: value, defaultValue: route.params?.data}, (valueCallBack) => {
                setValue(valueCallBack);
              })
            }
            style={{
              flexDirection: "row",
              padding: 16,
              alignItems: "center",
              marginTop: 21,
              marginBottom: 11,
              backgroundColor: colors.white,
            }}
          >
            <Text style={{color: colors.gray1, fontSize: 14, fontWeight: "bold"}}>診察科目</Text>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <Text>{value ? value?.value : "診察科目を選択する"}</Text>
            </View>
            <Image style={{marginRight: 2}} source={require("@assets/images/icons/ic_next_gray.png")} />
          </TouchableOpacity>
          <View opacity={value ? 1 : 0.7} style={{marginTop: 20, paddingHorizontal: 16}}>
            <Button label="次へ進む" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  viewTextInput: {
    paddingHorizontal: 10,
    marginTop: 20,
    borderColor: "black",
    borderRadius: 10,
  },
  textError: {color: "red", paddingBottom: 12, paddingTop: 6},
});
