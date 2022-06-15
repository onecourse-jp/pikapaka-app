import React, {useState, useEffect} from "react";
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
const dataPopup = [];

export default function ModalWebView({route}) {
  const [isPopup, setIsPopup] = useState(false);
  const dispatch = useDispatch();
  const [isNext, setIsNext] = useState(false);
  const [urlWebView, setUrlWebView] = useState(null);
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

  const _renderItem = ({item}) => {
    console.log("rendered item");
    return (
      <Image
        style={{width: (width - 70) / 2, height: 163, backgroundColor: "#C4C4C4", marginTop: 8}}
        source={{
          uri: item.image,
        }}
      />
    );
  };

  const onMessage = (message) => {
    console.log("messagemessage", message);
  };
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
              height: height - 60,
              backgroundColor: "white",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              paddingVertical: 25,
              paddingHorizontal: 28,
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{fontSize: 18, color: "#000000"}}>受信画像</Text>
              <TouchableOpacity onPress={() => setIsPopup(false)}>
                <Image source={require("@assets/images/icons/close_black.png")} style={{width: 20, height: 20}} resizeMode="cover" />
              </TouchableOpacity>
            </View>
            <FlatList
              numColumns={2}
              horizontal={false}
              columnWrapperStyle={{justifyContent: "space-between"}}
              data={dataPopup}
              renderItem={(item, index) => _renderItem(item, index)}
              keyExtractor={(item) => item.id}
            />
          </View>
        </ModalPortal>
        {urlWebView && (
          <WebView
            useWebKit
            originWhitelist={["*"]}
            mediaPlaybackRequiresUserAction={false}
            mediaCapturePermissionGrantType={"grantIfSameHostElsePrompt"}
            allowsInlineMediaPlayback
            javaScriptEnabled
            scalesPageToFit
            javaScriptEnabledAndroid
            useWebkit
            startInLoadingState={true}
            source={{
              uri: urlWebView,
              // html: '<div><video autoplay playsInline src="https://www.w3schools.com/html/mov_bbb.mp4" ></video></div>',
            }}
            onMessage={onMessage}
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
              <View style={{width: 50}}></View>
              <TouchableOpacity onPress={quitRoomCall}>
                <Image style={{width: 50, height: 50}} source={require("@assets/images/icons/ic_quit_room_call.png")} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsPopup(true)}>
                <Image style={{width: 50, height: 50}} source={require("@assets/images/icons/ic_photo_call.png")} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
