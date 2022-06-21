import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, TextInput, ImageBackground, SafeAreaView} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {messages} from "../CallLogic/lib/emitter";
import ButtonConnect from "./ButtonConnect";
import Notification from "./Notification";
import {setup, startPlayStream} from "../CallLogic/state";
import Volume from "./Volume";
import moment from "moment";
let {width, height} = Dimensions.get("window");

export default function ModaConnectView({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const navigation = useNavigation();
  const [statusDoctor, setStatusDoctor] = useState(false);
  const [localStream, setLocalStream] = useState();
  const dataCalendar = route?.params?.data;
  const titleWait = `${moment(dataCalendar?.date).format("YYYY年MM月DD日")}（${moment(dataCalendar?.date).format("dddd")}）${
    dataCalendar?.time_start
  }~${dataCalendar?.time_end}`;
  const content =
    "医師の準備ができましたら、接続ボタンの色が変わりますので、接続してください。\nなお、順番に患者様を診察しております。お待ち頂く可能性もございますので、予めご了承ください。";
  const titleDoctorConnect = "お待たせいたしました。医師の準備ができました。医師へ接続してください。";
  const notifiWaiting1 = "医師に接続中です。\n少々お待ちください。";
  const notifiWaiting2 = "お待たせいたしまして、\n大変申し訳ございません。\n前の診療が長引いているため、\nもう少々お待ちください。";

  useEffect(async () => {
    console.log("localStream", localStream);
  }, [localStream]);

  const handleAction = async () => {
    global.showWebView({
      url: `https://t-care-staging.web.app/user/call-to-doctor/?room=${dataCalendar.id}`,
      isCallVideo: dataCalendar.id,
    });
  };

  useEffect(async () => {
    if (dataCalendar?.id) {
      console.log("dataCalendar?.id", dataCalendar?.id);
      messages.on("setRemoteStream", (videoSrc) => {
        console.log("setRemoteStream", videoSrc);
        setStatusDoctor(true);
      });
      messages.on("offRemoteStream", () => {});
      setup(dataCalendar.id);
    }
  }, [dataCalendar]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            messages.emit("closeCall");
            navigation.goBack();
            navigation.goBack();
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'transparent', position: "relative"}}>
      <View style={{flex: 1, flexDirection: "column", zIndex: 10, alignItems: "center", justifyContent: "space-between", padding: 16}}>
        <View>
          <Text
            style={{
              color: colors.white,
              textAlign: "center",
              fontSize: 17,
              lineHeight: 26,
              fontWeight: "400",
              marginBottom: 10,
            }}
          >
            {`診察時間 \n`}
            {titleWait}
          </Text>
          <Notification content={statusDoctor ? titleDoctorConnect : content} />
        </View>
        <View>
          <ButtonConnect onPress={handleAction} style={{}} status={statusDoctor} />
        </View>
      </View>
    </SafeAreaView>
  );
}
