import React, {useContext, useEffect, useState} from "react";
import {Text, View, StyleSheet, Platform, Dimensions, AppState, Image, Keyboard} from "react-native";
let TouchableOpacity;
if (Platform.OS === "ios") {
  ({TouchableOpacity} = require("react-native"));
} else {
  ({TouchableOpacity} = require("react-native-gesture-handler"));
}
import {Linking} from "react-native";
import Config from "react-native-config";
import {useNavigation} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Colors from "@config/styles";
import AsyncStorage from "@react-native-community/async-storage";
import {useSelector, useDispatch} from "react-redux";
import HomeStack from "./HomeStack";
import ServiceStack from "./ServiceStack";
import io from "socket.io-client";
import {getAuthority} from "@utils/authority";
import {defaultStackNavigation} from "@config/navigations";
import {getNotificationCount} from "@services/profile";
import {requestNotificationPermissions, setBadgeCount} from "react-native-notification-badge";
import ProfileStack from "./ProfileStack";
import messaging from "@react-native-firebase/messaging";
import MedicalHisotyStack from "./MedicalHistoryStack";
import bus from "@utils/eventBus";
import {updateNotificationToken} from "@services/users";
import {getProfile} from "@services/search";
import {SCREEN_DETAIL_CALENDAR, SCREEN_LOGIN} from "@screens/screens.constants";
import {requestTrackingPermission} from "react-native-tracking-transparency";
const Tab = createBottomTabNavigator();

let width = Dimensions.get("window").width;

export default function BottomTabbarNavigator({route}) {
  const user = useSelector((state) => state?.users?.userDetails);
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  var socket;
  const dispatch = useDispatch();
  useEffect(async () => {
    if (Platform.OS === "ios") {
      const trackingStatus = await requestTrackingPermission();
      if (trackingStatus === "authorized" || trackingStatus === "unavailable") {
        // enable tracking features
      }
    }
  }, []);
  useEffect(async () => {
    const initialUrl = await Linking.getInitialURL();
    console.log("getInitialURL", initialUrl);
    console.log("getInitialURL LINKING_PREFIXES", Config.LINKING_PREFIXES.split("|"));
    if (initialUrl) {
      var thenum = initialUrl.replace(/^\D+/g, "");
      console.log("thenum", thenum);
      if (user) {
        navigation.navigate("SERVICE");
        navigation.navigate(SCREEN_DETAIL_CALENDAR, {id: Number(thenum)});
      }
      {
        navigation.navigate(SCREEN_LOGIN, {isAnswerQuestion: Number(thenum)});
      }
    }
  }, []);

  const requestUserPermission = async () => {
    if (Platform.OS !== "web") {
      const authorizationStatus = await messaging().requestPermission();

      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log("User has notification permissions enabled.");
        const saveTokenToAPI = async (token) => {
          await updateNotificationToken({
            notificationToken: token,
          });
        };
        messaging()
          .getToken()
          .then((token) => {
            console.log("firebase token", token);
            return saveTokenToAPI(token);
          });
      } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        console.log("User has provisional notification permissions.");
      } else {
        console.log("User has notification permissions disabled");
      }
    }
  };
  const getMeInfo = async () => {
    const {response, data} = await getProfile();
    if (response?.status === 200 || response?.status === 201) {
      // console.log('+++++++++++++success getME', data);
      // let checkLanguage = data.userSetting?.displayLanguage == "JAPANESE" ? true : false;
      // let appLanguage = data.userSetting?.displayLanguage === "JAPANESE" ? "ja" : "vi";
      // let gender = data.profile?.gender === 182 ? true : false;
      // // console.log('appLanguagegender', gender);
      // setLocale(appLanguage);
      // dispatch({type: UPDATE_PROFILE, payload: data});
      // await AsyncStorage.setItem("@language", appLanguage);
    }
    return data;
  };
  const _handleAppStateChange = async () => {
    if (Platform.OS == "ios") {
      // const response = await getNotificationCount();
      // console.log("notificationCount", response);
      // await setBadgeCount(parseInt(response?.data));
    }
  };
  // Remove badge count
  useEffect(() => {
    const subscription = AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);
  //   useFocusEffect(
  //     React.useCallback(() => {
  //       notifee.setBadgeCount(0).then(() => console.log('Badge count removed!'));
  //     }, []),
  //   );

  // useEffect(() => {
  //   //notifee.setBadgeCount(0).then(() => console.log('Badge count removed!'));

  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     const {destination, options} = notificationToDestination(remoteMessage);
  //     console.log(remoteMessage);
  //     if (Platform.OS == "ios") {
  //       await setBadgeCount(parseInt(remoteMessage?.data?.notificationCount ?? 0));
  //     }
  //     console.log(
  //       "A new FCM message arrived! Message handled in the background!",
  //       // remoteMessage,
  //       destination,
  //     );
  //     if (!(navigationRef.current.getCurrentRoute().name == destination && navigationRef.current.getCurrentRoute().name == "Chatting")) {
  //       console.log("A new FCM message arrived! Message handled in the background! here");
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  // useEffect(async () => {
  //   let dataUserSocket = getMeInfo();
  //   if (Platform.OS !== "web") {
  //     await requestUserPermission();
  //   }
  //   const socketServer = "ws://localhost:3000";
  //   const authority = await getAuthority();
  //   const {accessToken, refreshToken, user} = authority;
  //   // console.log("user test-hankyu.lisod.vn:4444", user);
  //   if (Platform.OS === "ios") {
  //     const granted = await requestNotificationPermissions(["badge"]);
  //   }
  //   if (Platform.OS !== "web") {
  //     messaging().onNotificationOpenedApp(async (remoteMessage) => {
  //       console.log("Notification caused app to open from background state:", remoteMessage.notification);
  //       if (remoteMessage.data?.type === "UPDATE_IDENTITY_APPROVAL_STATUS") {
  //         await getMeInfo();
  //       }

  //       try {
  //         const lastInitialNotificationId = await AsyncStorage.getItem("LAST_INITIAL_NOTIFICATION_ID");

  //         if (lastInitialNotificationId !== null) {
  //           if (lastInitialNotificationId === remoteMessage.data.notificationId) {
  //             return;
  //           }
  //         }
  //         await AsyncStorage.setItem("LAST_INITIAL_NOTIFICATION_ID", String(remoteMessage.data.notificationId));
  //         if (remoteMessage.data?.type === "UPDATE_IDENTITY_APPROVAL_STATUS") {
  //           getMeInfo();
  //         }
  //         const {destination, options} = notificationToDestination(remoteMessage);
  //         console.log("options=>>", options);
  //         navigation.navigate(destination, options);
  //       } catch (e) {
  //         // don't mind, this is a problem only if the current RN instance has been reloaded by a CP mandatory update
  //       }
  //     });

  //     // Check whether an initial notification is available
  //     messaging()
  //       .getInitialNotification()
  //       .then(async (remoteMessage) => {
  //         if (remoteMessage) {
  //           try {
  //             const lastInitialNotificationId = await AsyncStorage.getItem("LAST_INITIAL_NOTIFICATION_ID");

  //             if (lastInitialNotificationId !== null) {
  //               if (lastInitialNotificationId === remoteMessage.data.notificationId) {
  //                 return;
  //               }
  //             }
  //             await AsyncStorage.setItem("LAST_INITIAL_NOTIFICATION_ID", String(remoteMessage.data.notificationId));
  //             if (remoteMessage.data?.type === "UPDATE_IDENTITY_APPROVAL_STATUS") {
  //               getMeInfo();
  //             }
  //             const {destination, options} = notificationToDestination(remoteMessage);
  //             navigation.navigate(destination, options);
  //           } catch (e) {}
  //         }
  //       });
  //   }

  //   const options = {
  //     // query: {token: `${accessToken}`},
  //     transports: ["websocket"],
  //   };
  //   socket = io(socketServer, options);

  //   socket.on("connect", (s) => {
  //     console.log("connected to socket.io server");
  //     bus.emit("socket.on");
  //     socket.emit("io", (data) => {
  //       console.log(' socket.emit("io" data', data);
  //     });
  //   });
  //   socket.on("CLOSE_CALL", () => {
  //     console.log("CLOSE_CALL BOTTOMBAR");
  //     global.toast.hideAll();
  //   });
  //   socket.on("USER_OFFLINE", (data) => {
  //     console.log("user offline", data);
  //   });
  //   socket.on("disconnect", (reason) => {
  //     console.log("disconnect to socket.io server");
  //     bus.emit("socket.off");
  //     // alert('disconnect');
  //     if (reason === "io server disconnect") {
  //       // the disconnection was initiated by the server, you need to reconnect manually
  //       socket.connect();
  //     }
  //     // else the socket will automatically try to reconnect
  //   });
  //   socket.on("connect_error", (reason) => {
  //     // alert('connect_error');

  //     console.log("connect error", reason);
  //     bus.emit("socket.off");

  //     setTimeout(() => {
  //       socket.connect();
  //     }, 1000);
  //   });
  //   socket.on("joined", ({room, peers, vapidPublicKey}) => {
  //     // alert('connect_error');
  //     console.log("connect joined", room);
  //   });
  //   socket.on("io", ({online}) => {
  //     console.log("online io", online);
  //   });
  //   global.socket = socket;
  // }, []);

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", setKeyboardVisible(false));
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", setKeyboardVisible(true));
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const tabBarStyle = {};
  const [initialRoute, setInitialRoute] = useState("HomeStack");
  return (
    <Tab.Navigator
      screenOptions={{
        style: {borderTopColor: "#ffffff", elevation: 0, borderTopWidth: 0},
        labelStyle: {fontSize: 12, fontWeight: "bold"},
        keyboardHidesTabBar: true,
      }}
      tabBarOptions={{
        style: keyboardVisible ? {} : tabBarStyle,
        keyboardHidesTabBar: true,
      }}
      initialRouteName={initialRoute}
    >
      <Tab.Screen
        name={"HomeStack"}
        component={HomeStack}
        options={({route}) => ({
          title: "",
          headerShown: false,
          tabBarLabelStyle: {
            display: "none",
          },

          tabBarIcon: ({color, focused}) =>
            focused ? (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText, styles.widgetTextActive]}>
                  <Image source={require("@assets/images/icons/ic_home_tabbar_active_v2.png")} />
                  <Text style={[styles.tabbarText]}>ホーム</Text>
                </View>
              </View>
            ) : (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText]}>
                  <Image source={require("@assets/images/icons/ic_home_tabbar_v2.png")} />
                  <Text style={[styles.tabbarText, styles.tabbarTextDefault]}>ホーム</Text>
                </View>
              </View>
            ),
        })}
      />

      <Tab.Screen
        name={"SERVICE"}
        component={ServiceStack}
        options={({route}) => ({
          title: "",
          headerShown: false,
          headerTitleAlign: "center",
          headerLeft: null,
          keyboardHidesTabBar: true,
          // headerShown: false,
          tabBarLabelStyle: {
            display: "none",
          },
          ...defaultStackNavigation.screenOptions,
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText, styles.widgetTextActive]}>
                  <Image source={require("@assets/images/icons/ic_service_tabbar_active_v2.png")} />

                  <Text style={[styles.tabbarText]}>
                    {/* {AppText.bottomTab.chat} */}
                    予約
                  </Text>
                </View>
              </View>
            ) : (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText]}>
                  <View style={{position: "relative"}}>
                    <Image source={require("@assets/images/icons/ic_service_tabbar_v2.png")} />
                  </View>
                  <Text style={[styles.tabbarText, styles.tabbarTextDefault]}>
                    {/* {AppText.bottomTab.chat} */}
                    予約
                  </Text>
                </View>
              </View>
            ),
        })}
      />
      <Tab.Screen
        name={"HistoryStack"}
        component={MedicalHisotyStack}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            if (user) {
              navigation.navigate("HistoryStack");
            } else {
              global.alertNeedLogin();
            }
          },
        }}
        options={({route}) => ({
          title: "診察履歴",
          headerShown: false,
          headerTitleAlign: "center",
          tabBarLabelStyle: {
            display: "none",
          },
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText, styles.widgetTextActive]}>
                  <Image source={require("@assets/images/icons/ic_more_tabbar_active_v2.png")} />
                  <Text style={[styles.tabbarText]}>
                    {/* {AppText.bottomTab.history} */}
                    診察履歴
                  </Text>
                </View>
              </View>
            ) : (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText]}>
                  <Image source={require("@assets/images/icons/ic_more_tabbar_v2.png")} />
                  <Text style={[styles.tabbarText, styles.tabbarTextDefault]}>
                    {/* {AppText.bottomTab.history} */}
                    診察履歴
                  </Text>
                </View>
              </View>
            ),
        })}
      />
      <Tab.Screen
        name={"ProfileStack"}
        component={ProfileStack}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            if (user) {
              navigation.navigate("ProfileStack");
            } else {
              global.alertNeedLogin();
            }
          },
        }}
        options={({route}) => ({
          title: "マイページ",
          headerShown: false,
          headerTitleAlign: "center",
          headerLeft: null,
          tabBarLabelStyle: {
            display: "none",
          },
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText, styles.widgetTextActive]}>
                  <Image source={require("@assets/images/icons/ic_profile_tabbar_active_v2.png")} />
                  <Text style={[styles.tabbarText]}>
                    {/* {AppText.bottomTab.other} */}
                    マイページ
                  </Text>
                </View>
              </View>
            ) : (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText]}>
                  <Image source={require("@assets/images/icons/ic_profile_tabbar_v2.png")} />
                  <Text style={[styles.tabbarText, styles.tabbarTextDefault]}>
                    {/* {AppText.bottomTab.other} */}
                    マイページ
                  </Text>
                </View>
              </View>
            ),
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabbarItem: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 0,
  },
  widgetText: {
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 2,
    borderTopWidth: 0,
  },
  widgetTextActive: {
    // borderTopColor: Colors.color.COLOR_PRIMARY,
    // borderTopWidth: 2,
  },
  tabbarText: {
    marginTop: 5,
    color: "#00B050",
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: 12,
  },
  tabbarTextDefault: {
    marginTop: 5,
    color: Colors.color.COLOR_GREY_TRANSP,
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 12,
  },
});
