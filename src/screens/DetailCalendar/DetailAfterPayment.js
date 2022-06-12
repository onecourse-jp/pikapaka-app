import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, Dimensions} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import ModalPortal from "react-native-modal";
import moment from "moment";
import {SCREEN_QUESIONAIRE_STEP2, SCREEN_EDIT_CALENDAR, SCREEN_CONNECT_DOCTOR, SCREEN_PAYMENT} from "@screens/screens.constants";
import {getReservationById} from "@services/auth";
let {width, height} = Dimensions.get("window");

export default function DetailAfterPayment({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const idCalendar = route?.params?.id;
  const fromScreen = route?.params?.fromScreen;
  const [refreshing, setRefreshing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [screenStep, setCurrentStep] = useState(2);
  const navigation = useNavigation();
  const [dataCalendar, setDataCalendar] = useState(null);

  const handleSubmit = () => {
    console.log("dataCalendar?.statusdataCalendar?.status", dataCalendar?.status);
    if (dataCalendar?.status === 1) {
      navigation.navigate(SCREEN_CONNECT_DOCTOR, {data: dataCalendar});
    } else if (dataCalendar?.status === 2) {
      navigation.navigate(SCREEN_QUESIONAIRE_STEP2, {data: dataCalendar});
    } else if (dataCalendar?.status === 3) {
      navigation.navigate(SCREEN_PAYMENT, {id: dataCalendar.id});
    }
  };
  const handleEditCalendar = () => {
    navigation.navigate(SCREEN_EDIT_CALENDAR, {data: dataCalendar});
  };

  const actionGetCalendar = async () => {
    if (idCalendar) {
      global.showLoadingView();
      const {response, data} = await getReservationById(idCalendar);
      if (response?.status === 200) {
        setDataCalendar(data?.data);
      } else {
        console.log("response getReservationById", response?.status);
      }
      global.hideLoadingView();
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

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => setImagePreview(item.image)}>
        <Image
          key={`Image-renderItem-${index}`}
          style={{width: (width - 70) / 2, height: 163, backgroundColor: "#C4C4C4", marginTop: 8}}
          source={{
            uri: item.image,
          }}
        />
      </TouchableOpacity>
    );
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
              key={`Image-renderItem-${index}`}
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
            <Text>診断情報</Text>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: colors.borderGrayE,
                justifyContent: "space-between",
              }}
            >
              <Text style={{fontFamily: fonts.Hiragino, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>診断日時</Text>
              <Text style={{fontFamily: fonts.Hiragino, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>
                2022年5月5日 15:30〜14:00
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: colors.borderGrayE,
                justifyContent: "space-between",
              }}
            >
              <Text style={{fontFamily: fonts.Hiragino, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>診療科目</Text>
              <Text style={{fontFamily: fonts.Hiragino, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>
                スキンケア - 美白
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: colors.borderGrayE,
                justifyContent: "space-between",
              }}
            >
              <Text style={{fontFamily: fonts.Hiragino, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>担当医師</Text>
              <Text style={{fontFamily: fonts.Hiragino, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>山田太郎</Text>
            </View>
          </View>
          <View>
            <Text>相談内容</Text>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: colors.borderGrayE,
                justifyContent: "space-between",
              }}
            >
              <Text style={{fontFamily: fonts.Hiragino, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>
                ここに相談内容が入ります。ここに相談内容が入ります。ここに相談内容が入ります。ここに相談内容が入ります。ここに相談内容が入ります。ここに相談内容が入ります。ここに相談内容が入ります。ここに相談内容が入ります。ここに相談内容が入ります。
              </Text>
            </View>
          </View>
          <View>
            <Text>受診画像</Text>
            {[{}, {}, {}].map((item, index) => {
              return _renderItem(item, index);
            })}
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
