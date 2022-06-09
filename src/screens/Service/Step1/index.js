import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity, FlatList} from "react-native";
import {useThemeColors, Button} from "react-native-theme-component";
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation} from "@react-navigation/native";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import {SCREEN_SERVICE_STEP2} from "@screens/screens.constants";
import {useDispatch, useSelector} from "react-redux";
import ModalPortal from "react-native-modal";
import {updateCalendar} from "@actions/calendarAction";

let {width, height} = Dimensions.get("window");

const DATA = [
  {label: "スキンケア (美白)", value: '{"label":"選択中の科目","value":"スキンケア (美白)","key":"skinCare","data":"1"}'},
  {label: "スキンケア (美肌)", value: '{"label":"選択中の科目","value":"スキンケア (美肌)","key":"skinCare","data":"2"}'},
  {
    label: "スキンケア (アンチエイジング)",
    value: '{"label":"選択中の科目","value":"スキンケア (アンチエイジング)","key":"skinCare","data":"3"}',
  },
  {label: "スキンケア (保湿)", value: '{"label":"選択中の科目","value":"スキンケア (保湿)","key":"skinCare","data":"4"}'},
  {label: "ダイエット", value: '{"label":"選択中の科目","value":"ダイエット","key":"diet","data":"5"}'},
  {label: "ピル（ピル）", value: '{"label":"選択中の科目","value":"ピル (ピル）","key":"pill","data":"6"}'},
  {label: "ピル （アフターピル）", value: '{"label":"選択中の科目","value":"ピル（アフターピル）","key":"pill","data":"7"}'},
  {label: "ED", value: '{"label":"選択中の科目","value":"ED","key":"ed","data":"8"}'},
  {label: "AGA", value: '{"label":"選択中の科目","value":"AGA","key":"aga","data":"9"}'},
];

export default function ServiceStep1() {
  const colors = useThemeColors();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const calendar = useSelector((state) => state?.calendar);
  const defaultValueStep1 = calendar?.data?.step1 ? JSON.stringify(calendar?.data?.step1) : null;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [valueChoose, setValueChoose] = useState(null);
  const [items, setItems] = useState(DATA);
  const [isPopup, setIsPopup] = useState(false);

  const handleSubmit = () => {
    if (value) {
      dispatch(updateCalendar({data: {step1: value}, currentStep: 2}));
      navigation.navigate(SCREEN_SERVICE_STEP2);
    }
  };
  const _renderItem = ({item}) => {
    console.log("itemmmmmmmmmmm", item);
    const valueItem = JSON.parse(item.value);
    return (
      <TouchableOpacity onPress={() => setValueChoose(valueItem)}>
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
      <ModalPortal
        isVisible={isPopup}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        swipeDirection="down"
        scrollHorizontal={true}
        style={{justifyContent: "flex-end", flex: 1, margin: 0}}
      >
        <View
          style={{
            height: height / 3,
            backgroundColor: "white",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingVertical: 25,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity style={{width: "100%", paddingRight: 28}} onPress={confirmValue}>
              <Text style={{fontSize: 18, textAlign: "right", color: colors.textBlue}}>完了</Text>
              {/* <Image source={require("@assets/images/icons/close_black.png")} style={{width: 20, height: 20}} resizeMode="cover" /> */}
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={false}
            data={DATA}
            contentContainerStyle={{
              paddingHorizontal: 28,
            }}
            renderItem={(item, index) => _renderItem(item, index)}
            keyExtractor={(item) => item.label}
          />
        </View>
      </ModalPortal>
      <View style={[styles.container]}>
        <GuideComponent title="オンライン診療をご希望ですか？" content="まずは診療科目とメニューをお選びください。" />
        <StepsComponent />
        <View style={{flexDirection: "column", flex: 1}}>
          <TouchableOpacity
            onPress={() => setIsPopup(true)}
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
