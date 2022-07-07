/* global require */
import React, {createRef, useContext, useEffect, useRef, useState} from "react";
import {View, Text, Pressable, StyleSheet, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import LocalizationContext from "@context/LocalizationContext";
import {useThemeColors, Button} from "react-native-theme-component";
import Colors from "@config/styles";

const DATA = [
  {label: "スキンケア", value: '{"label":"選択中の科目","value":"スキンケア","key":"skinCare","data":"1"}'},
  // {label: "スキンケア (美肌)", value: '{"label":"選択中の科目","value":"スキンケア (美肌)","key":"skinCare","data":"2"}'},
  // {
  //   label: "スキンケア (アンチエイジング)",
  //   value: '{"label":"選択中の科目","value":"スキンケア (アンチエイジング)","key":"skinCare","data":"3"}',
  // },
  // {label: "スキンケア (保湿)", value: '{"label":"選択中の科目","value":"スキンケア (保湿)","key":"skinCare","data":"4"}'},
  // {label: "ダイエット", value: '{"label":"選択中の科目","value":"ダイエット","key":"diet","data":"5"}', disable: true},
  {label: "ピル", value: '{"label":"選択中の科目","value":"ピル","key":"pill","data":"6"}'},
  // {label: "ピル（アフターピル）", value: '{"label":"選択中の科目","value":"ピル（アフターピル）","key":"pill","data":"7"}'},
  {label: "ED", value: '{"label":"選択中の科目","value":"ED","key":"ed","data":"8"}'},
  // {label: "AGA", value: '{"label":"選択中の科目","value":"AGA","key":"aga","data":"9"}', disable: true},
];

export default function ModalBottomAction({navigation, route}) {
  const {callback} = route.params;
  let defaultvalue = route.params?.value;
  const [valueChoose, setValueChoose] = useState(defaultvalue || null);
  const colors = useThemeColors();
  console.log("callback", callback);
  const {t} = useContext(LocalizationContext);
  let {width, height} = Dimensions.get("window");
  const _renderItem = (item, index) => {
    const valueItem = JSON.parse(item.value);
    return (
      <TouchableOpacity disabled={item?.disable} key={`_renderItem-${index}`} onPress={() => setValueChoose(valueItem)}>
        <Text
          style={{
            color: route?.disable ? colors.gray7 : valueChoose?.data == valueItem?.data ? colors.colorTextBlack : colors.colorTextBlack,
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

  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <Pressable
        style={[StyleSheet.absoluteFill, {backgroundColor: "rgba(0, 0, 0, 0.5)"}]}
        onPress={() => {
          navigation.goBack();
        }}
      />
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
          <TouchableOpacity
            style={{width: "100%", paddingRight: 28}}
            onPress={() => {
              if (callback) {
                callback(valueChoose);
              }
              navigation.goBack();
            }}
          >
            <Text style={{fontSize: 18, textAlign: "right", color: colors.textBlue}}>完了</Text>
          </TouchableOpacity>
        </View>
        {/* <FlatList
            horizontal={false}
            data={DATA}
            renderItem={(item, index) => _renderItem(item, index)}
            keyExtractor={(item) => item.label}
          /> */}
        <ScrollView>
          {DATA.map((item, index) => {
            return _renderItem(item, index);
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    backgroundColor: "transparent",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    paddingTop: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  imageWarn: {
    margin: 32,
    alignSelf: "center",
  },
  topTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.color.COLOR_BLACK,
    marginTop: 30,
  },
});
