import React, {useState, useEffect, useRef} from "react";
import {View, Image, TouchableOpacity, SafeAreaView, Platform, Dimensions, Text, FlatList, Alert} from "react-native";
import {WebView} from "react-native-webview";
import {useNavigation} from "@react-navigation/core";
import {navigationRef} from "src/navigation/NavigationService";
import ModalPortal from "react-native-modal";
import {useDispatch, useSelector} from "react-redux";
import {changeStatusCalendar} from "@actions/calendarAction";
import {messages} from "../../screens/CallLogic/lib/emitter";
import {requestMultiple, PERMISSIONS} from "react-native-permissions";
import {SCREEN_CALL, SCREEN_DETAIL_CALENDAR} from "../../screens/screens.constants";
let {width, height} = Dimensions.get("window");

export default function ModalWebView({route}) {
  const dispatch = useDispatch();
  const [isNext, setIsNext] = useState(false);
  const [urlWebView, setUrlWebView] = useState(null);
  const webRef = useRef();
  useEffect(async () => {
    if (isNext) {
      dispatch(changeStatusCalendar());
      if (Platform.OS == "web") {
        window.close();
      } else {
        navigation.navigate("HistoryStack");
      }
    }
  }, [isNext]);

  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({title: route?.params?.url});
  }, [navigation]);

  const quitRoomCall = () => {
    Alert.alert(
      "",
      `退出しますか？`,
      [
        {
          text: "いいえ",
          onPress: () => {},
        },
        {
          text: "はい",
          onPress: () => {
            messages.emit("closeCall");
            navigation.navigate(SCREEN_DETAIL_CALENDAR, {id: route?.params?.isCallVideo});
          },
        },
      ],
      {cancelable: true},
    );
  };

  React.useLayoutEffect(() => {
    if (route?.params?.isCallVideo) {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity
            onPress={quitRoomCall}
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
    }
  }, [navigation]);

  useEffect(() => {
    if (route?.params?.isCallVideo) {
      requestMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.MICROPHONE,
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.MICROPHONE,
      ]).then((statuses) => {
        console.log("Camera", statuses[PERMISSIONS.IOS.CAMERA]);
        console.log("Microphone", statuses[PERMISSIONS.IOS.MICROPHONE]);
        // let path = RNFS.MainBundlePath + "/www";
        // let server = new StaticServer(8080, path, {keepAlive: true});
        // server.start().then((url) => {
        //   url = "http://localhost:8080";
        //   setUrlWebView(`${url}/?room=random`);
        //   console.log("Serving at URL", url);
        // });
        setUrlWebView(route?.params?.url);
      });
    } else {
      setUrlWebView(route?.params?.url);
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1, position: "relative"}}>
      <View style={{flex: 1, position: "relative"}}>
        {urlWebView && (
          <WebView
            ref={webRef}
            useWebKit
            style={{width: "100%", height: "100%"}}
            originWhitelist={["*"]}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            allowsFullscreenVideo={false}
            javaScriptEnabled
            javaScriptEnabledAndroid
            useWebkit
            startInLoadingState={true}
            scrollEnabled={false}
            mixedContentMode="always"
            source={{
              // uri: "https://d872-14-248-82-148.ngrok.io/user/call-to-doctor?room=156",
              uri: urlWebView,
            }}
            onShouldStartLoadWithRequest={(request) => {
              console.log("request.url", request?.url, route?.params?.data);
              try {
                if (route?.params?.data) {
                  if (request?.url === route?.params?.data) {
                    console.log("succeessssss");
                    setIsNext(true);
                    return false;
                  }
                }
              } catch (e) {
                console.log("eeee", e);
                return false;
              }

              return true;
            }}
          />
        )}

        {route?.params?.isCallVideo && (
          <View
            style={{
              position: "absolute",
              zIndex: 5,
              bottom: 20,
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor: "rgb(0,0,0,0.9)",
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                maxWidth: 360,
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 40,
              }}
            >
              <TouchableOpacity
                style={{flexDirection: "column", alignItems: "center"}}
                onPress={() => {
                  webRef.current.injectJavaScript("window.switchCameraOption()");
                }}
              >
                <Image style={{width: 50, height: 50}} source={require("@assets/images/icons/ic_switch_camera.png")} />
                <Text style={{fontSize: 11, lineHeight: 16, color: "white", marginTop: 8}}>カメラ切替</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: "column", alignItems: "center"}} onPress={quitRoomCall}>
                <Image style={{width: 50, height: 50}} source={require("@assets/images/icons/ic_quit_room_call.png")} />
                <Text style={{fontSize: 11, lineHeight: 16, color: "white", marginTop: 8}}>退室</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: "column", alignItems: "center"}}
                onPress={() => {
                  global.showModalListImage({id: route?.params?.isCallVideo});
                }}
              >
                <Image style={{width: 50, height: 50}} source={require("@assets/images/icons/ic_photo_call.png")} />
                <Text style={{fontSize: 11, lineHeight: 16, color: "white", marginTop: 8}}>受信画像</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
