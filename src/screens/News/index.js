import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, ScrollView, RefreshControl} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation} from "@react-navigation/native";
import Headercomponent from "@components/Layout/Header";
import TabHeaderComponent from "@components/Layout/TabHeader";
import {getListContent} from "@services/search";
import FooterComponent from "@components/Layout/Footer";
import NewsInMonth from "./components/NewsInMonth";
import ButtonBooking from "../Home/components/ButtonBooking";
import moment from "moment";

export default function NewsScreen() {
  const user = useSelector((state) => state.users);
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataNews, setDataNews] = useState({});
  const dispatch = useDispatch();
  const DATA = [
    {label: "2022年", value: 2022},
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(DATA);

  const getContent = async () => {
    try {
      global.showLoadingView();
      const {data, response} = await getListContent();
      if (response.status === 200) {
        let dataYear = {};
        data?.data?.data?.map((item, index) => {
          const monthItem = moment(item.created_at).month() + 1;
          if (dataYear[monthItem]) {
            dataYear[monthItem] = [...dataYear[monthItem], item];
          } else {
            dataYear[monthItem] = [item];
          }
        });
        setDataNews(dataYear);
        // console.log("data getListContent", data.data.data);
        console.log("dataYear dataYear", dataYear);
        console.log("Object dataYear", Object.keys(dataYear));
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

   const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getContent();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  return (
    <SafeAreaView style={{flex: 1, position: "relative", backgroundColor: colors.backgroundTheme}}>
      <Headercomponent />
      <TabHeaderComponent />
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{paddingHorizontal: 0}}
      >
        <View style={{paddingHorizontal: 20}}>
          <View style={{marginVertical: 40}}>
            <Text
              style={{
                textAlign: "center",
                color: colors.textHiragino,
                fontFamily: fonts.Hiragino,
                fontSize: 32,
                lineHeight: 48,
                fontWeight: "700",
              }}
            >
              {global.t("news")}
            </Text>
          </View>
          {Object.keys(dataNews).length > 0 &&
            Object.keys(dataNews).map((item, index) => {
              return <NewsInMonth key={`NewsInMonth-${index}`} month={item} data={dataNews[item]} />;
            })}
          <View style={{minHeight: open ? (items.length + 1) * 40 : 40}}>
            <DropDownPicker
              style={{
                borderWidth: 2,
                borderRadius: 4,
                borderColor: colors.textHiragino,
                fontSize: 16,
              }}
              placeholder="2022年"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              multiple={false}
            />
          </View>
        </View>
        <View style={{height: 20}}></View>
        <FooterComponent />
      </ScrollView>
      <ButtonBooking bgColor={"rgba(0, 176, 80, 0.7)"} />
    </SafeAreaView>
  );
}
