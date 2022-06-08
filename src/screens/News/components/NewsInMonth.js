import React, {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, useWindowDimensions} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import RenderHtml from "react-native-render-html";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import Headercomponent from "@components/Layout/Header";
import TabHeaderComponent from "@components/Layout/TabHeader";
import {getListContent} from "@services/search";
import moment from "moment";

export default function NewsInMonth({data = [], month = 1}) {
  const {width} = useWindowDimensions();
  const user = useSelector((state) => state.users);
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const DataCategory = [
    {label: "サービスについて", color: "#00B050"},
    {label: "スキンケア", color: "#D198CC"},
    {label: "ダイエット", color: "#69CDCD"},
    {label: "ピル", color: "#DBCF5F"},
    {label: "ED", color: "#7B8ED2"},
    {label: "AGA", color: "#8FC576"},
  ];
  return (
    <View style={{marginVertical: 0}}>
      <View style={{borderBottomColor: colors.textHiragino, borderBottomWidth: 1, paddingBottom: 5, marginBottom: 30}}>
        <Text style={{fontFamily: fonts.Futura, fontSize: 24, lineHeight: 36, fontWeight: "500", color: colors.textHiragino}}>
          {month}月
        </Text>
      </View>
      {data.map((item, index) => {
        const indexLabel = item?.label ? item?.label[0] : 1;
        return (
          <View
            key={`question-${month}-${index}`}
            style={{paddingBottom: 30, marginBottom: 30, borderBottomColor: colors.borderBottomNews, borderBottomWidth: 1}}
          >
            <View style={{flexDirection: "row", marginBottom: 5, flexWrap: "wrap", width: "100%"}}>
              <Text style={{color: colors.colorHome10, fontFamily: fonts.Futura, fontSize: 16, marginRight: 10, fontWeight: "500"}}>
                {moment(item?.createdAt).format("YYYY.MM.DD")}
              </Text>
              {item?.label?.map((el, ind) => {
                const indexLabel = el;
                return (
                  <View
                    key={`indexLabel-${ind}`}
                    style={{
                      flexDirection: "row",
                      backgroundColor: DataCategory[indexLabel - 1]["color"],
                      paddingHorizontal: 6,
                      borderRadius: 2,
                      marginRight: 10,
                      marginBottom: 4,
                      paddingTop: 2,
                    }}
                  >
                    <Text style={{fontSize: 12, lineHeight: 18, fontFamily: fonts.Hiragino, color: colors.white}}>
                      {DataCategory[indexLabel - 1]["label"]}
                    </Text>
                  </View>
                );
              })}
            </View>
            <Text
              style={{
                color: colors.textHiragino,
                fontFamily: fonts.Hiragino,
                lineHeight: 21,
                fontSize: 16,
                fontWeight: "700",
                marginBottom: 10,
              }}
            >
              {item.title}
            </Text>
            <RenderHtml contentWidth={width - 40} source={{html: item?.content ? item.content : ""}} />
            {/* <Text style={{color: colors.textHiragino, lineHeight: 21, fontFamily: fonts.Hiragino, fontSize: 14, marginBottom: 20}}>
              {item.content}
            </Text> */}
            <TouchableOpacity onPress={() => navigation.navigate("SERVICE")}>
              <Text
                style={{
                  color: colors.colorHome10,
                  fontWeight: "700",
                  fontFamily: fonts.Hiragino,
                  fontSize: 14,
                  textDecorationLine: "underline",
                }}
              >{`ご予約はこちら >`}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
