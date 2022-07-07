import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, useWindowDimensions} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import RenderHtml from "react-native-render-html";
import {getListContent} from "@services/search";
import {useNavigation} from "@react-navigation/native";
import {SCREEN_NEWS} from "@screens/screens.constants";
import FAQ_see_more from "@assets/images/SvgComponents/FAQ_see_more";
import moment from "moment";

export default function NewsComponent() {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const [listContents, setListContents] = useState([]);
  const QuestionData = [
    {time: "2021.12.24", type: "skincare", title: "オンライン診療とは何ですか？"},
    {time: "2021.12.24", type: "diet", title: "オンライン診療の予約を開始しました"},
    {time: "2021.12.24", type: "pill", title: "オンライン診療の予約を開始しました"},
  ];
  const DataCategory = [
    {label: "サービスについて", color: "#00B050"},
    {label: "スキンケア", color: "#D198CC"},
    {label: "ダイエット", color: "#69CDCD"},
    {label: "ピル", color: "#DBCF5F"},
    {label: "ED", color: "#7B8ED2"},
    {label: "AGA", color: "#8FC576"},
  ];
  const getContent = async () => {
    try {
      global.showLoadingView();
      const {data, response} = await getListContent({limit: 3});
      if (response.status === 200) {
        setListContents(data?.data?.data);
      } else {
        console.log("getListContent err", response);
      }
      global.hideLoadingView();
    } catch (error) {
      console.log("error", error);
      global.hideLoadingView();
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <View style={{backgroundColor: colors.white, borderRadius: 18, paddingVertical: 40, paddingHorizontal: 20, flexDirection: "column"}}>
      <Text style={{fontSize: 24, color: colors.colorHome10, marginBottom: 15, textAlign: "center", fontWeight: "700"}}>お知らせ</Text>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <View style={{height: 2, width: 20, marginBottom: 4, backgroundColor: colors.headerComponent}}></View>
      </View>
      {listContents.map((item, index) => {
        return (
          <View
            key={`item.text-${index}`}
            style={{
              borderBottomWidth: index + 1 < listContents.length ? 1 : 0,
              paddingVertical: 16,
              borderBottomColor: "#DDDEE1",
            }}
          >
            <View style={{flexDirection: "row", marginBottom: 5, flexWrap: "wrap", width: "100%"}}>
              <Text style={{color: colors.colorHome10, fontFamily: fonts.Futura, marginRight: 10, fontSize: 16, fontWeight: "500"}}>
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
                fontWeight: "100",
                marginBottom: 10,
              }}
            >
              {item.title}
            </Text>
            {/* <View style={{maxHeight: 200, overflow: "hidden"}}>
              <RenderHtml contentWidth={width - 40} source={{html: item?.content ? `${item.content}` : ""}} />
            </View> */}
          </View>
        );
      })}
      <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN_NEWS);
          }}
        >
          <FAQ_see_more color={colors.colorHome10} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
