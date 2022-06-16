import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput, ImageBackground, SafeAreaView} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {messages} from "../CallLogic/lib/emitter";
import ButtonConnect from "./ButtonConnect";
import Notification from "./Notification";
import Volume from "./Volume";
import moment from "moment";
import {setup, startPlayStream} from "../CallLogic/state";

export default function ({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const navigation = useNavigation();
  const [statusDoctor, setStatusDoctor] = useState(false);
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
    if (dataCalendar?.id) {
      console.log("dataCalendar?.id", dataCalendar?.id);
      // messages.on("setLocalStream", (videoSrc) => {
      //   console.log("setLocalStream", videoSrc);
      // });
      messages.on("setRemoteStream", (videoSrc) => {
        console.log("setRemoteStream", videoSrc);
        setStatusDoctor(true);
      });
      messages.on("offRemoteStream", () => {
        console.log("offRemoteStream");
      });
      setup(dataCalendar.id);
    }
  }, [dataCalendar]);

  const handleAction = async () => {
    global.showWebView({
      url: `https://t-care-staging.web.app/user/call-to-doctor/?room=${dataCalendar.id}`,
      isCallVideo: dataCalendar.id,
    });
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            messages.emit("closeCall");
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
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme, position: "relative"}}>
      <ImageBackground source={require("@assets/images/connect_doctor_bg.png")} resizeMode="cover" style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: 16}}>
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
            {/* <Volume /> */}
            <ButtonConnect onPress={handleAction} style={{}} status={statusDoctor} />
          </View>
        </View>
      </ImageBackground>
      {/* <View
        style={{
          zIndex: 99,
          backgroundColor: colors.bgWaitBlack,
          opacity: 0.8,
          position: "absolute",
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      ></View> */}
      {/* <View
        style={{zIndex: 999, position: "absolute", flex: 1, justifyContent: "center", alignItems: "center", height: "100%", width: "100%"}}
      >
        <Text
          style={{color: "white", textAlign: "center", fontSize: 17, lineHeight: 22, fontWeight: "400", fontFamily: fonts.RobotoRegular}}
        >
          {notifiWaiting2}
        </Text>
      </View> */}
    </SafeAreaView>
  );
}
