import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, SafeAreaView, Image} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {getReservation} from "@services/auth";
import {navigationRef} from "../../navigation/NavigationService";
import {
  SCREEN_EDIT_PROFILE,
  SCREEN_CHANGE_PASSWORD,
  SCREEN_EDIT_NAME,
  SCREEN_EDIT_FURIGANA,
  SCREEN_EDIT_GENDER,
  SCREEN_EDIT_ALLERGY,
  SCREEN_EDIT_MEDICINE,
  SCREEN_EDIT_ADDRESS,
  SCREEN_EDIT_POSTAL_CODE,
  SCREEN_EDIT_YES_NO_FORM,
  SCREEN_EDIT_MEDICAL_HISTORY,
  SCREEN_EDIT_PHONE_NUMBER,
  SCREEN_PAYMENT,
  SCREEN_HISTORY,
  SCREEN_DETAIL_CALENDAR,
  SCREEN_DETAIL_CALENDAR_AFTER_PAYMENT,
} from "@screens/screens.constants";
import {getProfile} from "@services/search";
import moment from "moment";
import ButtonOrange from "@components/Button/ButtonOrange";
import Arrow_right from "../../assets/images/SvgComponents/arrow_right";
import {SCREEN_EDIT_BIRTHDAY, SCREEN_EDIT_EMAIL_ADDRESS} from "../screens.constants";

export default function Profile({navigation}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const [profile, setProfile] = useState({});
  const user = useSelector((state) => state?.users?.userDetails);
  const calendar = useSelector((state) => state?.calendar);
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataCalendar, setDataCalendar] = useState([]);
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
      placeholder: "名前を入力",
      content: profile?.name ?? null,
      hideIcon: false,
      hideItem: false,
      action: () => {
        navigation.navigate(SCREEN_EDIT_NAME, {data: user});
      },
    },
    {
      key: "furigana",
      label: "フリガナ",
      placeholder: "フリガナを入力",
      content: profile?.furigana ?? null,
      hideIcon: false,
      hideItem: false,
      action: () => {
        navigation.navigate(SCREEN_EDIT_FURIGANA, {data: user});
      },
    },
    {
      key: "gender",
      placeholder: "選択",
      label: "性別",
      content: profile?.gender ? (profile?.gender == 1 ? "男性" : "女性") : null,
      hideIcon: false,
      hideItem: false,
      action: () => {
        navigation.navigate(SCREEN_EDIT_GENDER, {data: user});
      },
    },
    {
      key: "birthday",
      placeholder: "生年月日を入力",
      label: "生年月日",
      content: profile?.birthday ? moment(new Date(profile?.birthday)).format("YYYY年MM月DD日") : null,
      hideIcon: false,
      hideItem: false,
      action: () => {
        navigation.navigate(SCREEN_EDIT_BIRTHDAY, {data: user});
      },
    },
    {
      key: "email",
      label: "メールアドレス",
      content: profile?.email,
      hideIcon: true,
      hideItem: false,
      action: () => {
        navigation.navigate(SCREEN_EDIT_EMAIL_ADDRESS, {data: user});
      },
    },
    {
      key: "phone_number",
      label: "電話番号",
      placeholder: "電話番号を入力",
      content: profile?.phone_number ?? null,
      hideIcon: false,
      hideItem: false,
      action: () => {
        navigation.navigate(SCREEN_EDIT_PHONE_NUMBER, {data: user});
      },
    },
    {
      key: "password",
      label: "パスワード",
      placeholder: "パスワードを入力",
      content: "パスワードを変更",
      hideIcon: true,
      hideItem: profile?.provider ? true : false,
      action: () => {
        navigation.navigate(SCREEN_CHANGE_PASSWORD);
      },
    },
    // {key: "phone_number", label: "電話番号", content: profile?.phone_number},
  ];
  const listTextProfile2 = [
    {
      key: "postal_code",
      label: "郵便番号",
      placeholder: "郵便番号を入力",
      content: profile?.postal_code ?? null,
      hideIcon: false,
      hideItem: false,
      action: () => {
        navigation.navigate(SCREEN_EDIT_POSTAL_CODE, {data: user, label: "郵便番号"});
      },
    },
    {
      key: "address",
      label: "住所",
      placeholder: "住所を入力",
      content: profile?.address ?? null,
      hideIcon: false,
      hideItem: false,
      action: () => {
        navigation.navigate(SCREEN_EDIT_ADDRESS, {data: user, label: "住所"});
      },
    },
  ];
  const listTextProfile3 = [
    {
      key: "content_allergies",
      label: "アレルギーの有無",
      placeholder: "アレルギーを入力",
      content: profile?.allergies ? (profile?.allergies === 1 ? renderContentAllergies(profile?.content_allergies) : "なし") : null,
      hideIcon: false,
      hideItem: false,
      action: () => {
        navigation.navigate(SCREEN_EDIT_ALLERGY, {data: profile});
      },
    },
    {
      key: "take_medicines",
      label: "服用中の薬の有無",
      placeholder: "服用中の薬を入力",
      content: profile?.take_medicines
        ? profile?.take_medicines == 1
          ? renderContentAllergies(profile?.content_medicines)
          : "なし"
        : null,
      hideIcon: false,
      hideItem: false,
      action: () => {
        navigation.navigate(SCREEN_EDIT_MEDICINE, {data: profile});
      },
    },
    {
      key: "pregnancy",
      label: "妊娠有無",
      placeholder: "選択",
      content: profile?.pregnancy ? (profile?.pregnancy == 1 ? "あり" : "なし") : null,
      hideIcon: false,
      hideItem: false,
      action: () => {
        navigation.navigate(SCREEN_EDIT_YES_NO_FORM, {data: user, key: "pregnancy", value: profile?.pregnancy, label: "妊娠有無"});
      },
    },
    {
      key: "smoking",
      label: "喫煙有無",
      placeholder: "選択",
      content: profile?.smoking ? (profile?.smoking == 1 ? "あり" : "なし") : null,
      hideIcon: false,
      hideItem: false,
      action: () => {
        navigation.navigate(SCREEN_EDIT_YES_NO_FORM, {data: user, key: "smoking", value: profile?.smoking, label: "喫煙有無"});
      },
    },
    {
      key: "medical_history",
      label: "既往歴",
      placeholder: "なし",
      content: global.renderMedicalHistory(profile?.medical_history),
      hideIcon: false,
      hideItem: false,
      action: () => {
        navigation.navigate(SCREEN_EDIT_MEDICAL_HISTORY, {
          data: user,
          key: "medical_history",
          value: profile?.medical_history,
          label: "喫煙有無",
        });
      },
    },
  ];

  const getData = async () => {
    global.showLoadingView();
    let paramsRevervation = {};
    paramsRevervation.limit = 3;
    paramsRevervation.page = 0;
    const {response, data} = await getReservation(paramsRevervation);
    if (response?.status === 200) {
      const listCalendar = data?.data?.data;
      if (listCalendar?.length > 0) {
        setDataCalendar(listCalendar);
        global.hideLoadingView();
      } else {
        global.hideLoadingView();
      }
    } else {
      global.hideLoadingView();
    }
  };
  useEffect(() => {
    getData();
  }, [calendar]);

  const goDetailScreenWithStatus = (item) => {
    navigation.navigate("SERVICE");
    if (item.status == 3 || item.status == 5) {
      setTimeout(() => {
        navigation.navigate(SCREEN_PAYMENT, {id: item?.id});
      }, 200);
    } else if (item.status === 4 || item.status === 6) {
      setTimeout(() => {
        navigation.navigate(SCREEN_DETAIL_CALENDAR_AFTER_PAYMENT, {id: item?.id});
      }, 200);
    } else {
      setTimeout(() => {
        navigation.navigate(SCREEN_DETAIL_CALENDAR, {id: item?.id});
      }, 200);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProfileData();
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={{paddingTop: 12, paddingBottom: 12, backgroundColor: colors.backgroundTheme}}>
            <View style={[styles.box]}>
              <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.colorTextBlack, lineHeight: 23}}>診療履歴</Text>
            </View>
          </View>
          <View style={{flex: 1, backgroundColor: colors.white, padding: 16}}>
            {dataCalendar.map((item, index) => {
              return (
                <TouchableOpacity
                  key={`dataCalendar-${index}`}
                  style={{flexDirection: "row", marginBottom: 16}}
                  disabled={item?.status == 7 ? true : false}
                  onPress={() => {
                    goDetailScreenWithStatus(item);
                  }}
                >
                  <View
                    style={{flex: 1, paddingHorizontal: 8, paddingVertical: 12, borderRadius: 4, borderWidth: 1, borderColor: "#D9D9D9"}}
                  >
                    <View style={{flexDirection: "row", marginBottom: 10, alignItems: "center"}}>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: global.renderColorStatus({type: "text", status: item?.status}),
                          backgroundColor: global.renderColorStatus({type: "background", status: item?.status}),
                          paddingHorizontal: 8,
                          alignSelf: "flex-start",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: fonts.SFmedium,
                            fontSize: 12,
                            color: global.renderColorStatus({type: "text", status: item?.status}),
                            lineHeight: 20,
                            textAlign: "left",
                          }}
                        >
                          {global.t(`status_calendar.${item?.status}`)}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: fonts.SFmedium,
                          fontSize: 15,
                          color: colors.textBlack,
                          lineHeight: 18,
                          marginLeft: 8,
                          textAlign: "left",
                        }}
                      >
                        {global.t(`categoryTitle.${item?.detail_category_medical_of_customer}`)}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: fonts.SFmedium,
                        width: "90%",
                        fontSize: 16,
                        color: colors.gray1,
                        lineHeight: 20,
                        marginTop: 7,
                        textAlign: "left",
                      }}
                    >
                      {`${moment(item?.date).format("YYYY年MM月DD日")}（${moment(item?.date).format("dddd")}）${item?.time_start}`}
                    </Text>
                  </View>
                  {item.image && item.image.length > 0 && (
                    <View style={{paddingLeft: 16}}>
                      <Image
                        style={{width: 80, height: 80, backgroundColor: "#C4C4C4", marginTop: 8}}
                        source={{
                          uri: item.image[0].image,
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
            {dataCalendar?.length === 0 && <Text>データーがありません</Text>}
          </View>
          {dataCalendar.length > 0 && (
            <View style={{paddingHorizontal: 16, paddingVertical: 24}}>
              <ButtonOrange title="すべての診療履歴を見る" onPress={() => navigation.navigate(SCREEN_HISTORY)} />
            </View>
          )}
          <View style={{paddingTop: 12, paddingBottom: 12, backgroundColor: colors.backgroundTheme}}>
            <View style={[styles.box]}>
              <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.colorTextBlack, lineHeight: 23}}>基本情報</Text>
            </View>
          </View>
          <View>
            {listTextProfile3.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={item.action}
                  key={`listTextProfile3-${index}`}
                  style={{
                    paddingTop: 12,
                    paddingBottom: 12,
                    borderTopWidth: 1,
                    borderColor: "#EEEEEE",
                    backgroundColor: colors.white,
                  }}
                >
                  <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16}}>
                    <Text style={{fontFamily: fonts.NSbold, fontSize: 12, color: colors.colorTextBlack, lineHeight: 14, width: 120}}>
                      {item.label}
                    </Text>
                    <Text
                      style={{fontFamily: fonts.NSregular, fontSize: 12, color: colors.gray1, lineHeight: 14, flex: 1, textAlign: "left"}}
                    >
                      {item.content || item.placeholder}
                    </Text>
                    {!item?.hideIcon && <Arrow_right color={colors.grayC} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View>
            <View style={{paddingTop: 12, paddingBottom: 12, backgroundColor: colors.backgroundTheme}}>
              <View style={[styles.box]}>
                <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.colorTextBlack, lineHeight: 23}}>お名前・ご連絡先</Text>
              </View>
            </View>

            {listTextProfile.map((item, index) => {
              if (!item?.hideItem) {
                return (
                  <TouchableOpacity
                    onPress={item.action}
                    key={index}
                    style={{
                      paddingTop: 12,
                      paddingBottom: 12,
                      borderTopWidth: 1,
                      borderColor: "#EEEEEE",
                      backgroundColor: colors.white,
                    }}
                  >
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16}}>
                      <Text style={{fontFamily: fonts.NSbold, fontSize: 12, color: colors.textBlack, lineHeight: 14, width: 120}}>
                        {item.label}
                      </Text>
                      {item.key !== "password" && (
                        <Text
                          style={{
                            fontFamily: fonts.NSregular,
                            fontSize: 12,
                            color: colors.gray1,
                            lineHeight: 14,
                            flex: 1,
                            textAlign: "left",
                          }}
                        >
                          {item.content || item.placeholder}
                        </Text>
                      )}
                      {item.key === "password" ? (
                        <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={item.action}>
                          <Text style={{color: colors.headerComponent, marginRight: 5}}>変更する</Text>
                          <Arrow_right color={colors.headerComponent} />
                        </TouchableOpacity>
                      ) : (
                        <>{!item?.hideIcon && <Arrow_right color={colors.grayC} />}</>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }
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
                <TouchableOpacity
                  onPress={item.action}
                  key={index}
                  style={{
                    paddingTop: 12,
                    paddingBottom: 12,
                    borderTopWidth: 1,
                    borderColor: "#EEEEEE",
                    backgroundColor: colors.white,
                  }}
                >
                  <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16}}>
                    <Text style={{fontFamily: fonts.NSbold, fontSize: 12, color: colors.colorTextBlack, lineHeight: 14, width: 120}}>
                      {item.label}
                    </Text>
                    <Text
                      style={{fontFamily: fonts.NSregular, fontSize: 12, color: colors.gray1, lineHeight: 14, flex: 1, textAlign: "left"}}
                    >
                      {item.content || item.placeholder}
                    </Text>
                    {!item?.hideIcon && <Arrow_right color={colors.grayC} />}
                  </View>
                </TouchableOpacity>
              );
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
    paddingVertical: 16,
    flexDirection: "column",
  },
  box: {
    paddingHorizontal: 16,
  },
});
