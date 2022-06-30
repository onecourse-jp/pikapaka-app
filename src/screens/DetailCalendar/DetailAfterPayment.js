import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, Dimensions, Image} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import ModalPortal from "react-native-modal";
import moment from "moment";
import {SCREEN_HISTORY} from "@screens/screens.constants";
import {getReservationById} from "@services/auth";
let {width, height} = Dimensions.get("window");

export default function DetailAfterPayment({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const idCalendar = route?.params?.id;
  console.log("idCalendar", idCalendar);
  const fromScreen = route?.params?.fromScreen;
  const [refreshing, setRefreshing] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [screenStep, setCurrentStep] = useState(2);
  const navigation = useNavigation();
  const [dataCalendar, setDataCalendar] = useState(null);

  const actionGetCalendar = async () => {
    if (idCalendar) {
      global.showLoadingView();
      const {response, data} = await getReservationById(idCalendar);
      if (response?.status === 200) {
        console.log("data getReservationById", data?.data);
        setDataCalendar(data?.data);
        global.hideLoadingView();
      } else {
        console.log("response getReservationById", response?.status);
        global.hideLoadingView();
      }
    }
  };
  useEffect(async () => {
    actionGetCalendar();
  }, [idCalendar, fromScreen]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    actionGetCalendar();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const _renderItem = (item, index) => {
    return (
      <TouchableOpacity
        key={`Image-renderItem-${index}`}
        onPress={() => {
          setImagePreview(item?.image);
          setIsPopup(true);
        }}
      >
        <Image
          style={{width: (width - 70) / 2, height: 163, backgroundColor: "#C4C4C4", marginTop: 8}}
          source={{
            uri: item?.image,
          }}
        />
      </TouchableOpacity>
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("HistoryStack");
            navigation.replace(SCREEN_HISTORY);
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 15,
            paddingRight: 20,
          }}
        >
          <Image source={require("@assets/images/icons/ic_back.png")} resizeMode="cover" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
            height: height,
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
            <Image
              style={{width: width - 20, backgroundColor: "#C4C4C4", marginTop: 8}}
              source={{
                uri: imagePreview,
              }}
            />
          </View>
        </View>
      </ModalPortal>
      <View style={[styles.container]}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{}}>
          <View>
            <Text style={{padding: 16, fontWeight: "700", fontSize: 12, lineHeight: 16}}>診断情報</Text>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: colors.borderGrayE,
                backgroundColor: colors.white,
                justifyContent: "space-between",
                paddingHorizontal: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.Hiragino,
                  fontWeight: "600",
                  width: "35%",
                  fontSize: 12,
                  color: colors.colorTextBlack,
                  lineHeight: 14,
                  paddingVertical: 16,
                }}
              >
                診断日時
              </Text>
              <Text
                style={{
                  fontFamily: fonts.Hiragino,
                  fontSize: 12,
                  width: "65%",
                  color: colors.colorTextBlack,
                  lineHeight: 14,
                  paddingVertical: 16,
                }}
              >
                {`${moment(dataCalendar?.date).format("YYYY年MM月DD日")} ${dataCalendar?.time_start}~${dataCalendar?.time_end}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: colors.borderGrayE,
                backgroundColor: colors.white,
                justifyContent: "space-between",
                paddingHorizontal: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.Hiragino,
                  fontWeight: "600",
                  width: "35%",
                  fontSize: 12,
                  color: colors.colorTextBlack,
                  lineHeight: 14,
                  paddingVertical: 16,
                }}
              >
                診療科目
              </Text>
              <Text
                style={{
                  fontFamily: fonts.Hiragino,
                  fontSize: 12,
                  width: "65%",
                  color: colors.colorTextBlack,
                  lineHeight: 14,
                  paddingVertical: 16,
                }}
              >
                {global.t(`categoryTitle.${dataCalendar?.detail_category_medical_of_customer}`)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: colors.borderGrayE,
                backgroundColor: colors.white,
                justifyContent: "space-between",
                paddingHorizontal: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.Hiragino,
                  fontSize: 12,
                  fontWeight: "600",
                  width: "35%",
                  color: colors.colorTextBlack,
                  lineHeight: 14,
                  paddingVertical: 16,
                }}
              >
                担当医師
              </Text>
              <Text
                style={{
                  fontFamily: fonts.Hiragino,
                  fontSize: 12,
                  width: "65%",
                  color: colors.colorTextBlack,
                  lineHeight: 14,
                  paddingVertical: 16,
                }}
              >
                {dataCalendar?.doctor?.furigana}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{padding: 16, fontWeight: "700", fontSize: 12, lineHeight: 16}}>相談内容</Text>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: colors.borderGrayE,
                backgroundColor: colors.white,
                justifyContent: "space-between",
                paddingHorizontal: 16,
              }}
            >
              <Text style={{fontFamily: fonts.Hiragino, fontSize: 12, color: colors.colorTextBlack, lineHeight: 14, paddingVertical: 16}}>
                {dataCalendar?.content_to_doctor}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{padding: 16, fontWeight: "700", fontSize: 12, lineHeight: 16}}>受診画像</Text>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                justifyContent: "space-between",
                backgroundColor: colors.white,
                flexWrap: "wrap",
              }}
            >
              {dataCalendar?.image?.map((item, index) => {
                return _renderItem(item, index);
              })}
              {!dataCalendar?.image ||
                (dataCalendar?.image?.length === 0 && (
                  <Text style={{fontWeight: "500", fontSize: 12, paddingVertical: 16, lineHeight: 16}}>データーがありません</Text>
                ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
