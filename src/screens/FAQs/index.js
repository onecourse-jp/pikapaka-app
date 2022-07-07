import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity, Linking} from "react-native";
import {useSelector} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import Headercomponent from "@components/Layout/Header";
import TabHeaderComponent from "@components/Layout/TabHeader";
import {getListFaq} from "@services/search";
import BlockFaqService from "./components/BlockFaqService";
import BlockFaq from "./components/BlockFaq";
import FooterComponent from "@components/Layout/Footer";
import ButtonBooking from "../Home/components/ButtonBooking";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function FAQScreen() {
  const user = useSelector((state) => state.users);
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const [dataFaqAboutService, setFaqAboutService] = useState([]);
  const [dataSkincare, setDataSkincare] = useState([]);
  const [dataDiet, setDataDiet] = useState([]);
  const [dataPill, setDataPill] = useState([]);
  const [dataED, setDataED] = useState([]);
  const [dataAGA, setDataAGA] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const listColor = [colors.buttonSkincare, colors.textDiet, colors.colorPill, colors.colorED07, colors.colorAGA07];

  const getFaq = async (index) => {
    try {
      global.showLoadingView();
      const {data, response} = await getListFaq({screen: index});
      if (response.status === 200) {
        global.hideLoadingView();
        return data.data.data;
      } else {
        global.hideLoadingView();
        console.log("data.message err", data?.message);
      }
    } catch (error) {
      console.log("error", error);
      global.hideLoadingView();
    }
    return [];
  };

  const getFaqAboutService = async () => {
    const dataGet = await getFaq(1);
    setFaqAboutService(dataGet);
  };
  const getSkincare = async () => {
    const dataGet = await getFaq(2);
    setDataSkincare(dataGet);
  };
  const getDiet = async () => {
    const dataGet = await getFaq(3);
    setDataDiet(dataGet);
  };
  const getPill = async () => {
    const dataGet = await getFaq(4);
    setDataPill(dataGet);
  };
  const getED = async () => {
    const dataGet = await getFaq(5);
    setDataED(dataGet);
  };
  const getAGA = async () => {
    const dataGet = await getFaq(6);
    setDataAGA(dataGet);
  };
  useEffect(() => {
    getFaqAboutService();
    getSkincare();
    getDiet();
    getPill();
    getED();
    getAGA();
  }, []);

  const contactToEmail = () => {
    Linking.openURL("mailto:support_healthcare@pikapaka.co.jp");
  };

  return (
    <SafeAreaView style={{flex: 1, position: "relative", backgroundColor: colors.backgroundTheme}}>
      <Headercomponent />
      <TabHeaderComponent />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
            {global.t("FAQ")}
          </Text>
        </View>
        <BlockFaqService
          data={dataFaqAboutService}
          borderColor={colors.borderFaqType1}
          bgFaqType={colors.backGroundFaqType1}
          title={"サービスについて"}
        />
        <BlockFaq data={dataSkincare} borderColor={colors.borderFaqType2} bgFaqType={colors.backGroundFaqType2} title={"スキンケア"} />
        <BlockFaq data={dataDiet} borderColor={colors.borderFaqType3} bgFaqType={colors.backGroundFaqType3} title={"ダイエット"} />
        <BlockFaq data={dataPill} borderColor={colors.borderFaqType4} bgFaqType={colors.backGroundFaqType4} title={"ピル"} />
        <BlockFaq data={dataED} borderColor={colors.borderFaqType5} bgFaqType={colors.backGroundFaqType5} title={"ED"} />
        <BlockFaq data={dataAGA} borderColor={colors.borderFaqType6} bgFaqType={colors.backGroundFaqType6} title={"AGA"} />
        <View style={{height: 40, marginTop: 30, flexDirection: "row", justifyContent: "center"}}>
          <TouchableOpacity onPress={contactToEmail}>
            <Text
              style={{textDecorationLine: "underline", color: colors.headerComponent, fontWeight: "700"}}
            >{`お問い合わせはこちら`}</Text>
          </TouchableOpacity>
        </View>

        <FooterComponent />
      </ScrollView>
      <ButtonBooking bgColor={"rgba(0, 176, 80, 0.7)"} />
    </SafeAreaView>
  );
}
