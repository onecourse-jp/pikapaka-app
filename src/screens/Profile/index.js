import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, SafeAreaView, Image} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {navigationRef} from "../../navigation/NavigationService";
import {
  SCREEN_EDIT_PROFILE,
  SCREEN_CHANGE_PASSWORD,
  SCREEN_EDIT_NAME,
  SCREEN_EDIT_FURIGANA,
  SCREEN_EDIT_GENDER,
  SCREEN_EDIT_ALLERGY,
  SCREEN_EDIT_MEDICINE,
} from "@screens/screens.constants";
import {getProfile} from "@services/search";
import moment from "moment";
import {SCREEN_CALL, SCREEN_PAYMENT} from "../screens.constants";
import Arrow_right from "../../assets/images/SvgComponents/arrow_right";

export default function Profile({navigation}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const [profile, setProfile] = useState({});
  const user = useSelector((state) => state?.users?.userDetails);
  const [refreshing, setRefreshing] = React.useState(false);
  const getProfileData = async () => {
    try {
      global.showLoadingView();
      const {data, response} = await getProfile();
      if (response.status === 200) {
        console.log("data getProfile", data);
        setProfile(data.data);
      } else {
        console.log("data.message err", message);
      }
      global.hideLoadingView();
    } catch (error) {
      console.log("error", error);
      global.hideLoadingView();
    }
    return [];
  };
  useEffect(() => {
    getProfileData();
  }, [user]);

  const listTextProfile = [
    {
      key: "name",
      label: "名前",
      content: profile?.name,
      action: () => {
        navigation.navigate(SCREEN_EDIT_NAME, {data: user});
      },
    },
    {
      key: "furigana",
      label: "フリガナ",
      content: profile?.furigana,
      action: () => {
        navigation.navigate(SCREEN_EDIT_FURIGANA, {data: user});
      },
    },
    {
      key: "gender",
      label: "性別",
      content: profile?.gender == 1 ? "男性" : "女性",
      action: () => {
        navigation.navigate(SCREEN_EDIT_GENDER, {data: user});
      },
    },
    {key: "birthday", label: "生年月日", content: profile?.birthday ? moment(new Date(profile?.birthday)).format("YYYY年MM月DD日") : ""},
    {key: "email", label: "メールアドレス", content: profile?.email},
    {
      key: "password",
      label: "パスワード",
      content: "パスワードを変更",
      action: () => {
        navigation.navigate(SCREEN_CHANGE_PASSWORD);
      },
    },
    // {key: "phone_number", label: "電話番号", content: profile?.phone_number},
  ];
  const listTextProfile2 = [
    {key: "postal_code", label: "郵便番号", content: profile?.postal_code},
    {key: "address", label: "住所", content: profile?.address},
  ];
  const listTextProfile3 = [
    {
      key: "allergies",
      label: "アレルギーの有無",
      content: profile?.allergies === 1 ? "有" : profile?.allergies === null ? "あり" : "無",
      action: () => {
        navigation.navigate(SCREEN_EDIT_ALLERGY, {data: user});
      },
    },
    {
      key: "content_allergies",
      label: "アレルギーの内容",
      content: profile?.allergies === 1 ? profile?.content_allergies ?? "" : "",
    },
    {
      key: "take_medicines",
      label: "服薬中の薬の有無",
      content: profile?.take_medicines === 1 ? "有" : profile?.take_medicines === null ? "あり" : "無",
      action: () => {
        navigation.navigate(SCREEN_EDIT_MEDICINE, {data: user});
      },
    },
    {key: "pregnancy", label: "妊娠有無", content: profile?.pregnancy === 1 ? "有" : profile?.pregnancy === null ? "あり" : "無"},
    {key: "smoking", label: "喫煙有無", content: profile?.smoking === 1 ? "有" : profile?.smoking === null ? "あり" : "無"},
    {
      key: "medical_history",
      label: "既往歴",
      content: global.renderMedicalHistory(profile?.medical_history),
    },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfileData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View>
            <View style={{paddingTop: 12, paddingBottom: 12, backgroundColor: colors.backgroundTheme}}>
              <View style={[styles.box]}>
                <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.colorTextBlack, lineHeight: 23}}>お名前・ご連絡先</Text>
              </View>
            </View>

            {listTextProfile.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    paddingTop: 12,
                    paddingBottom: 12,
                    borderTopWidth: 1,
                    borderColor: "#EEEEEE",
                  }}
                >
                  <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16}}>
                    <Text style={{fontFamily: fonts.NSbold, fontSize: 12, color: colors.textBlack, lineHeight: 14, width: 120}}>
                      {item.label}
                    </Text>
                    {item.key !== "password" && (
                      <Text
                        style={{fontFamily: fonts.NSregular, fontSize: 12, color: colors.gray1, lineHeight: 14, flex: 1, textAlign: "left"}}
                      >
                        {item.content}
                      </Text>
                    )}
                    {item.key === "password" ? (
                      <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={item.action}>
                        <Text style={{color: colors.headerComponent, marginRight: 5}}>変更する</Text>
                        <Arrow_right color={colors.headerComponent} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={item.action}>
                        <Arrow_right color={colors.grayC} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
          <View style={{paddingTop: 12, paddingBottom: 12, backgroundColor: colors.backgroundTheme}}>
            <View style={[styles.box]}>
              <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.colorTextBlack, lineHeight: 23}}>住所</Text>
            </View>
          </View>
          <View>
            {listTextProfile2.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    paddingTop: 12,
                    paddingBottom: 12,
                    borderTopWidth: 1,
                    borderColor: "#EEEEEE",
                  }}
                >
                  <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16}}>
                    <Text style={{fontFamily: fonts.NSbold, fontSize: 12, color: colors.colorTextBlack, lineHeight: 14, width: 120}}>
                      {item.label}
                    </Text>
                    <Text
                      style={{fontFamily: fonts.NSregular, fontSize: 12, color: colors.gray1, lineHeight: 14, flex: 1, textAlign: "left"}}
                    >
                      {item.content}
                    </Text>

                    <TouchableOpacity onPress={item.action}>
                      <Arrow_right color={colors.grayC} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={{paddingTop: 12, paddingBottom: 12, backgroundColor: colors.backgroundTheme}}>
            <View style={[styles.box]}>
              <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.colorTextBlack, lineHeight: 23}}>基本情報</Text>
            </View>
          </View>
          <View>
            {listTextProfile3.map((item, index) => {
              return (
                <View
                  key={`listTextProfile3-${index}`}
                  style={{
                    paddingTop: 12,
                    paddingBottom: 12,
                    borderTopWidth: 1,
                    borderColor: "#EEEEEE",
                  }}
                >
                  <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16}}>
                    <Text style={{fontFamily: fonts.NSbold, fontSize: 12, color: colors.colorTextBlack, lineHeight: 14, width: 120}}>
                      {item.label}
                    </Text>
                    <Text
                      style={{fontFamily: fonts.NSregular, fontSize: 12, color: colors.gray1, lineHeight: 14, flex: 1, textAlign: "left"}}
                    >
                      {item.content}
                    </Text>
                    <TouchableOpacity onPress={item.action}>
                      <Arrow_right color={colors.grayC} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={{marginTop: 15, marginBottom: 15, justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREEN_EDIT_PROFILE)}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 300,
                height: 32,
                borderWidth: 1,
                borderColor: colors.textBlue,
                margin: 0,
              }}
            >
              <Text style={{color: colors.textBlue, textAlign: "center", lineHeight: 22}}>情報を編集する</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate(SCREEN_CALL)}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 300,
                height: 32,
                borderWidth: 1,
                borderColor: colors.textBlue,
                margin: 0,
              }}
            >
              <Text style={{color: colors.textBlue, textAlign: "center", lineHeight: 22}}>SCREEN_CALL</Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    flexDirection: "column",
  },
  box: {
    paddingHorizontal: 16,
  },
});
