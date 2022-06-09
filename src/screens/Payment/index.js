import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, Image} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import {getReservationById} from "@services/auth";
import {createStripeCheckoutSession} from "@services/payments";
import {SCREEN_EDIT_PROFILE, SCREEN_EDIT_DELIVERY_ADDRESS} from "@screens/screens.constants";
import {getBillPayment} from "@services/payments";
export default function Payment({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const idCalendar = route?.params?.id;
  const [refreshing, setRefreshing] = useState(false);
  const [showDetailMedicine, setShowDetailMedicine] = useState(false);
  const [billData, setBillData] = useState(null);
  console.log("idCalendar", idCalendar);
  const screenStep = 4;
  const navigation = useNavigation();

  const handleAction = async () => {
    global.showLoadingView();
    const paramsData = {
      reservation_form_id: idCalendar,
    };
    const {response, data} = await createStripeCheckoutSession(paramsData);
    if (response && response.status == 200) {
      console.log("data createStripeCheckoutSession", data);
      global.hideLoadingView();
      global.showWebView({
        url: data?.data?.url,
      });
    } else {
      console.log("err createStripeCheckoutSession", data);
      global.hideLoadingView();
    }
  };

  const actionGetBill = async () => {
    if (idCalendar) {
      global.showLoadingView();
      const {response, data} = await getBillPayment({reservation_form_id: idCalendar});
      if (response?.status === 200) {
        setBillData(data.data);
        console.log("getBillPayment data", data.data);
      } else {
        console.log("response getReservationById", response?.status);
      }
      global.hideLoadingView();
    }
  };
  useEffect(async () => {
    actionGetBill();
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    actionGetBill();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{}}>
          <GuideComponent
            title={"お疲れさまでした。診察は終了しました。"}
            content="本日の金額は下記の通りです。お支払いの手続きをお願いいたします。"
          />
          <StepsComponent currentStep={screenStep} isStepAll={true} />
          {billData && (
            <View style={{paddingHorizontal: 16, borderRadius: 4}}>
              <View style={{marginBottom: 20, paddingHorizontal: 16, backgroundColor: colors.white}}>
                <Text style={{fontFamily: fonts.NSbold, fontSize: 15, color: colors.textBlack, lineHeight: 23, marginTop: 23}}>
                  支払明細
                </Text>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      borderBottomColor: colors.borderGrayE,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{fontFamily: fonts.RobotoRegular, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>
                      診察料金
                    </Text>
                    <Text style={{fontFamily: fonts.RobotoRegular, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>
                      {billData?.bill?.medical_examination_fee}円
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
                    <TouchableOpacity
                      onPress={() => setShowDetailMedicine(!showDetailMedicine)}
                      style={{flexDirection: "row", justifyContent: "center", marginTop: 6, alignItems: "center"}}
                    >
                      <Text
                        style={{
                          fontFamily: fonts.RobotoRegular,
                          fontSize: 15,
                          color: colors.colorTextBlack,
                          lineHeight: 44,
                          marginRight: 4,
                        }}
                      >
                        処方箋料金
                      </Text>
                      <Image
                        style={
                          showDetailMedicine
                            ? {
                                transform: [{rotate: "180deg"}],
                              }
                            : {}
                        }
                        source={require("@assets/images/icons/flow_dropdown.png")}
                      />
                    </TouchableOpacity>
                    <Text style={{fontFamily: fonts.RobotoRegular, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>
                      {billData?.bill?.medicine_fee}円
                    </Text>
                  </View>
                  {showDetailMedicine && (
                    <View>
                      {billData?.medicines.map((item, index) => {
                        return (
                          <View key={`medicines-${index}`} style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text
                              style={{
                                fontFamily: fonts.RobotoRegular,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: colors.colorTextBlack,
                                lineHeight: 24,
                              }}
                            >
                              {item.name}
                            </Text>
                            <Text style={{fontFamily: fonts.RobotoRegular, fontSize: 13, color: colors.colorTextBlack, lineHeight: 24}}>
                              {item.price}円
                            </Text>
                          </View>
                        );
                      })}
                      {billData?.plans.map((item, index) => {
                        return (
                          <>
                            <View key={`plans-${index}`} style={{flexDirection: "row", justifyContent: "space-between"}}>
                              <Text
                                style={{
                                  fontFamily: fonts.RobotoRegular,
                                  fontSize: 14,
                                  color: colors.colorTextBlack,
                                  fontWeight: "bold",
                                  lineHeight: 22,
                                  maxWidth: 250,
                                }}
                              >
                                {item.name}
                              </Text>
                              <Text style={{fontFamily: fonts.RobotoRegular, fontSize: 13, color: colors.colorTextBlack, lineHeight: 22}}>
                                {item.price}円
                              </Text>
                            </View>
                            <View>
                              {item?.item?.map((el, ind) => {
                                return (
                                  <Text
                                    key={`item?.item-${ind}`}
                                    style={{fontFamily: fonts.RobotoRegular, fontSize: 13, color: colors.colorTextBlack, lineHeight: 22}}
                                  >
                                    {el}
                                  </Text>
                                );
                              })}
                            </View>
                          </>
                        );
                      })}
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      borderBottomColor: colors.borderGrayE,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{fontFamily: fonts.RobotoRegular, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>送料</Text>
                    <Text style={{fontFamily: fonts.RobotoRegular, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>
                      {billData?.bill?.postage}円
                    </Text>
                  </View>
                  <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{fontFamily: fonts.RobotoBold, fontSize: 19, color: colors.textBlack, fontWeight: "bold", lineHeight: 44}}>
                      合計
                    </Text>
                    <Text style={{fontFamily: fonts.RobotoBold, fontSize: 19, color: colors.textBlack, fontWeight: "bold", lineHeight: 44}}>
                      {billData?.bill?.total}円
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          <View style={{marginTop: 10, paddingHorizontal: 16, width: "100%"}}>
            <Button variant="primary" label={global.t("action_payment")} onPress={handleAction} />
          </View>
          <View style={{marginTop: 10, paddingHorizontal: 16, width: "100%"}}>
            <Text style={{textAlign: "center", fontSize: 16, color: colors.textBlack, fontWeight: "bold", lineHeight: 23}}>
              {global.t("question_confirm_adrress_delivery")}
            </Text>
            <Text style={{textAlign: "center", fontSize: 15, color: colors.primaryColor, lineHeight: 26}}>
              {billData?.bill?.reservation?.shipping_postal_code} {billData?.bill?.reservation?.shipping_address}
            </Text>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
              <TouchableOpacity onPress={() => navigation.navigate(SCREEN_EDIT_PROFILE)} style={{marginRight: 16}}>
                <Text style={{fontSize: 14, fontFamily: fonts.Hiragino, color: colors.textBlue, lineHeight: 21}}>登録住所変更</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate(SCREEN_EDIT_DELIVERY_ADDRESS, {data: billData.bill.reservation, action: onRefresh})}
              >
                <Text style={{fontSize: 14, fontFamily: fonts.Hiragino, color: colors.textBlue, lineHeight: 21}}>登録住所以外に配送</Text>
              </TouchableOpacity>
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
