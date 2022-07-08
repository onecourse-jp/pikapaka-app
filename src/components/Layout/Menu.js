import React, {useState} from "react";
import * as RootNavigator from "src/navigation/NavigationService";
import {View, Text, Dimensions, Image, Platform} from "react-native";
let ScrollView, TouchableOpacity;
if (Platform.OS === "ios") {
  ({ScrollView, TouchableOpacity} = require("react-native"));
} else {
  ({ScrollView, TouchableOpacity} = require("react-native-gesture-handler"));
}
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {handleLogOut} from "@utils/authority";
import {SCREEN_TOP, SCREEN_NEWS, SCREEN_FAQ} from "@screens/screens.constants";
import {
  SCREEN_TERMS_OF_SERVICE,
  SCREEN_PRIVACY_POLICY,
  SCREEN_COMMERCIAL_LAW,
  SCREEN_COMPANY_INFO,
  SCREEN_INQUIRY,
  SCREEN_HOME,
} from "@screens/screens.constants";

const {width, height} = Dimensions.get("window");

export default function MenuComponent(props) {
  const {
    isShow = false,
    setShowMenu = () => {},
    scrollToAddress,
    onlineMedicalCare,
    flowMedicalCare,
    benefitOnlineMedicalCare,
    recommendOnlineMedicalCare,
  } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const colors = useThemeColors();
  const fonts = useThemeFonts();

  const handleLogout = () => {
    setShowMenu(false);
    handleLogOut(navigation, dispatch);
  };

  const ListItemMenu = [
    {
      label: "スキンケア",
      action: () => {
        setShowMenu(false);
        navigation.navigate(SCREEN_TOP, {currentIndex: 1});
      },
    },
    {
      label: "ダイエット",
      disable: true,
      action: () => {
        setShowMenu(false);
        navigation.navigate(SCREEN_TOP, {currentIndex: 2});
      },
    },
    {
      label: "ピル",
      action: () => {
        setShowMenu(false);
        navigation.navigate(SCREEN_TOP, {currentIndex: 3});
      },
    },
    {
      label: "ED",
      action: () => {
        setShowMenu(false);
        navigation.navigate(SCREEN_TOP, {currentIndex: 4});
      },
    },
    {
      label: "AGA",
      disable: true,
      action: () => {
        setShowMenu(false);
        navigation.navigate(SCREEN_TOP, {currentIndex: 5});
      },
    },
    {
      label: "お知らせ",
      action: () => {
        setShowMenu(false);
        navigation.navigate(SCREEN_NEWS);
      },
    },
    {
      label: "よくある質問",
      action: () => {
        setShowMenu(false);
        navigation.navigate("HistoryStack");
        navigation.navigate(SCREEN_FAQ);
      },
    },
    {
      label: "お問い合わせ",
      action: () => {
        setShowMenu(false);
        navigation.navigate(SCREEN_INQUIRY);
      },
    },
    {
      label: "オンライン診療予約",
      action: () => {
        setShowMenu(false);
        navigation.navigate("SERVICE");
      },
    },
    // {label: "ログアウト", action: () => handleLogout()},
  ];
  const ListItemTop = [
    {
      label: "オンライン診療とは",
      action: () => {
        console.log("scrollToAddress", scrollToAddress, onlineMedicalCare);
        if (RootNavigator.getCurrentRoute().name === SCREEN_HOME) {
          scrollToAddress(onlineMedicalCare);
        } else {
          navigation.navigate(SCREEN_HOME, {keyScroll: "onlineMedicalCare"});
        }
        setShowMenu(false);
      },
    },
    {
      label: "オンライン診療のメリット",
      action: () => {
        if (RootNavigator.getCurrentRoute().name === SCREEN_HOME) {
          scrollToAddress(benefitOnlineMedicalCare);
        } else {
          navigation.navigate(SCREEN_HOME, {keyScroll: "benefitOnlineMedicalCare"});
        }
        setShowMenu(false);
      },
    },
    {
      label: "こんな方におすすめ",
      action: () => {
        if (RootNavigator?.getCurrentRoute()?.name === SCREEN_HOME) {
          scrollToAddress(recommendOnlineMedicalCare);
        } else {
          navigation.navigate(SCREEN_HOME, {keyScroll: "recommendOnlineMedicalCare"});
        }
        setShowMenu(false);
      },
    },
    {
      label: "オンライン診療の流れ",
      action: () => {
        if (RootNavigator?.getCurrentRoute()?.name === SCREEN_HOME) {
          scrollToAddress(flowMedicalCare);
        } else {
          navigation.navigate(SCREEN_HOME, {keyScroll: "flowMedicalCare"});
        }
        setShowMenu(false);
      },
    },
  ];

  return (
    <>
      {isShow && (
        <View
          style={{
            width: width - 40,
            minWidth: 335,
            backgroundColor: colors.colorHome10,
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 1555,
            // elevation: 99,
          }}
        >
          <View style={{width: "100%", height: height - 100}}>
            <View style={{flexDirection: "row", justifyContent: "flex-end", paddingRight: 20, paddingTop: 10}}>
              <TouchableOpacity onPress={() => setShowMenu(false)} style={{paddingVertical: 15, paddingHorizontal: 5}}>
                <Image source={require("@assets/images/icons/ic_close_menu.png")} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{paddingHorizontal: 45, paddingTop: 5, paddingBottom: 40}}>
              {/* <View style={{flexDirection: "row", justifyContent: "flex-end", marginBottom: 10}}>
                <TouchableOpacity onPress={() => setShowMenu(false)} style={{paddingVertical: 15, paddingHorizontal: 5}}>
                  <Image source={require("@assets/images/icons/ic_close_menu.png")} />
                </TouchableOpacity>
              </View> */}
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      paddingBottom: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.white,
                    }}
                  >
                    <Image style={{marginRight: 8}} source={require("@assets/images/icons/ic_arrow_right_white.png")} />
                    <View style={{position: "relative", top: -5}}>
                      <Text style={{fontSize: 18, fontWeight: "700", color: colors.white, marginBottom: 10}}>TOP</Text>
                      {ListItemTop.map((item, index) => {
                        return (
                          <TouchableOpacity key={`ListItemTop-${index}`} onPress={item.action}>
                            <Text
                              style={{fontFamily: fonts.Hiragino, fontSize: 14, fontWeight: "700", color: colors.white, lineHeight: 28}}
                            >
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}

                      {/* <Text
                        style={{fontFamily: fonts.Hiragino, fontSize: 14, fontWeight: "700", color: colors.white, lineHeight: 28}}
                      >{`オンライン診療とは\nオンライン診療のメリット\nこんな方におすすめ\nオンライン診療の流れ`}</Text> */}
                    </View>
                  </View>
                </View>
                {ListItemMenu.map((item, index) => {
                  return (
                    <TouchableOpacity
                      disabled={item?.disable}
                      key={`menu-${index}`}
                      onPress={item.action}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: colors.white,
                        paddingVertical: 10,
                      }}
                    >
                      <Text style={{fontSize: 18, fontWeight: "700", lineHeight: 30, color: item?.disable ? colors.gray3 : colors.white}}>
                        {item.label}
                        {item?.disable ? "（準備中）" : ""}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingBottom: 20,
                    marginBottom: 10,
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setShowMenu(false);
                      navigation.navigate(SCREEN_PRIVACY_POLICY, {currentIndex: 1});
                    }}
                  >
                    <Text style={{fontSize: 12, fontFamily: fonts.textHiragino, lineHeight: 30, color: colors.white}}>
                      ｜プライバシーポリシー｜
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowMenu(false);
                      navigation.navigate(SCREEN_COMMERCIAL_LAW, {currentIndex: 1});
                    }}
                  >
                    <Text style={{fontSize: 12, fontFamily: fonts.textHiragino, lineHeight: 30, color: colors.white}}>
                      ｜特定商取引法に基づく表示｜
                    </Text>
                  </TouchableOpacity>
                  <View style={{flexDirection: "row"}}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowMenu(false);
                        navigation.navigate(SCREEN_TERMS_OF_SERVICE, {currentIndex: 1});
                      }}
                    >
                      <Text style={{fontSize: 12, fontFamily: fonts.textHiragino, lineHeight: 30, color: colors.white}}>｜ 利用規約｜</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setShowMenu(false);
                        navigation.navigate(SCREEN_COMPANY_INFO, {currentIndex: 1});
                      }}
                    >
                      <Text style={{fontSize: 12, fontFamily: fonts.textHiragino, lineHeight: 30, color: colors.white}}> 運営会社｜</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setShowMenu(false);
                      handleLogout();
                    }}
                  >
                    <Text style={{fontSize: 12, fontFamily: fonts.textHiragino, lineHeight: 30, color: colors.white}}>｜ログアウト｜</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
}
