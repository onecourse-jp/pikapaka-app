import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, SafeAreaView, Image} from "react-native";
import {useThemeColors, Button} from "react-native-theme-component";
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation} from "@react-navigation/native";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import {SCREEN_SERVICE_STEP2} from "@screens/screens.constants";
import {useDispatch, useSelector} from "react-redux";
import {updateCalendar} from "@actions/calendarAction";

export default function ServiceStep1() {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const calendar = useSelector((state) => state?.calendar);
  const defaultValueStep1 = calendar?.data?.step1 ? JSON.stringify(calendar?.data?.step1) : null;
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
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValueStep1);
  const [items, setItems] = useState(DATA);

  const handleSubmit = () => {
    const valueSubmit = JSON.parse(value);
    if (value) {
      dispatch(updateCalendar({data: {step1: valueSubmit}, currentStep: 2}));
      navigation.navigate(SCREEN_SERVICE_STEP2);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <GuideComponent title="オンライン診療をご希望ですか？" content="まずは診療科目とメニューをお選びください。" />
        <StepsComponent />
        <View style={{flexDirection: "column", flex: 1, justifyContent: "space-between"}}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              alignItems: "center",
              marginTop: 21,
              marginBottom: 11,
              backgroundColor: colors.white,
            }}
          >
            <Text style={{color: colors.gray1, fontSize: 14, fontWeight: "bold"}}>診察科目</Text>
            <View style={{flex: 1, position: "relative"}}>
              <DropDownPicker
                style={{
                  borderRadius: 0,
                  borderWidth: 0,
                }}
                placeholder="診察科目を選択する"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                multiple={false}
              />
            </View>
            {/* <Image style={{marginRight: 2}} source={require("@assets/images/icons/ic_next_gray.png")} /> */}
          </View>
          <View opacity={value ? 1 : 0.7} style={{marginBottom: 100, paddingHorizontal: 16}}>
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
