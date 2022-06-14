import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, Image} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import {getReservationById} from "@services/auth";
import {createStripeCheckoutSession, paymentStripe} from "@services/payments";
import {SCREEN_EDIT_PROFILE, SCREEN_EDIT_DELIVERY_ADDRESS} from "@screens/screens.constants";
import {getBillPayment} from "@services/payments";
import {SCREEN_EDIT_ADDRESS} from "../screens.constants";
export default function Payment({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const idCalendar = route?.params?.id;
  const [refreshing, setRefreshing] = useState(false);
  const [showDetailMedicine, setShowDetailMedicine] = useState(false);
  const [errorApi, setErrorApi] = useState("");
  const [billData, setBillData] = useState(null);
  console.log("idCalendar", idCalendar);
  const screenStep = 4;
  const navigation = useNavigation();

  const handleAction = async () => {
    global.showLoadingView();
    paymentMobile();
  };
  const paymentMobile = async () => {
    const paramsData = {
      reservation_form_id: idCalendar,
      amount: billData.bill?.total,
      cart_number: "4242424242424242",
      exp_month: 6,
      exp_year: 2023,
      cvc: "123",
    };
    try {
      const {response, data} = await paymentStripe(paramsData);
      if (response && response.status == 200) {
        console.log("data paymentStripe", data);
        global.hideLoadingView();
      } else {
        console.log("err createStripeCheckoutSession", data);
        setErrorApi("Error!");
        global.hideLoadingView();
      }
    } catch (error) {
      setErrorApi("Error!");
    }
  };
  const paymentStripeWeb = async () => {
    const paramsData = {
      reservation_form_id: idCalendar,
    };
    const {response, data} = await createStripeCheckoutSession(paramsData);
    if (response && response.status == 200) {
      console.log("data createStripeCheckoutSession", data);
      global.hideLoadingView();
      global.showWebView({
        url: data?.data?.url,
        data: data.data.success_url,
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

  const formatMoney = (money) => {};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{}}>
          <GuideComponent
            title={"お疲れさまでした。診察は終了しました。"}
            content="本日の金額は下記の通りです。お支払いの手続きをお願いいたします。"
          />
          <StepsComponent currentStep={screenStep} isStepAll={true} />
          <View>
            <Text
              style={{
                fontFamily: fonts.NSbold,
                paddingHorizontal: 16,
                marginBottom: 12,
                fontSize: 15,
                color: colors.colorTextBlack,
                lineHeight: 23,
                marginTop: 23,
              }}
            >
              支払明細
            </Text>
            {billData && (
              <View style={{paddingHorizontal: 16, borderRadius: 4}}>
                <View style={{marginBottom: 20, paddingHorizontal: 16, backgroundColor: colors.white}}>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottomWidth: 1,
                        borderBottomColor: colors.borderGrayE,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{fontFamily: fonts.Hiragino, fontWeight: "bold", fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}
                      >
                        診察料金
                      </Text>
                      <Text style={{fontFamily: fonts.Hiragino, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>
                        ¥{billData?.bill?.medical_examination_fee}
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
                            fontFamily: fonts.Hiragino,
                            fontSize: 15,
                            color: colors.colorTextBlack,
                            fontWeight: "bold",
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
                      <Text style={{fontFamily: fonts.Hiragino, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>
                        ¥{billData?.bill?.medicine_fee}
                      </Text>
                    </View>
                    {showDetailMedicine && (
                      <View>
                        {billData?.medicines.map((item, index) => {
                          return (
                            <View key={`medicines-${index}`} style={{flexDirection: "row", justifyContent: "space-between"}}>
                              <Text
                                style={{
                                  fontFamily: fonts.Hiragino,
                                  fontSize: 14,
                                  fontWeight: "bold",
                                  color: colors.colorTextBlack,
                                  lineHeight: 24,
                                }}
                              >
                                {item.name}
                              </Text>
                              <Text style={{fontFamily: fonts.Hiragino, fontSize: 13, color: colors.colorTextBlack, lineHeight: 24}}>
                                ¥{item.price}
                              </Text>
                            </View>
                          );
                        })}
                        {billData?.plans.map((item, index) => {
                          return (
                            <React.Fragment key={`plans-${index}`}>
                              <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <Text
                                  style={{
                                    fontFamily: fonts.Hiragino,
                                    fontSize: 14,
                                    color: colors.colorTextBlack,
                                    fontWeight: "bold",
                                    lineHeight: 22,
                                    maxWidth: 250,
                                  }}
                                >
                                  {item.name}
                                </Text>
                                <Text style={{fontFamily: fonts.Hiragino, fontSize: 13, color: colors.colorTextBlack, lineHeight: 22}}>
                                  ¥{item.price}
                                </Text>
                              </View>
                              <View>
                                {item?.item?.map((el, ind) => {
                                  return (
                                    <Text
                                      key={`item?.item-${ind}`}
                                      style={{fontFamily: fonts.Hiragino, fontSize: 13, color: colors.colorTextBlack, lineHeight: 22}}
                                    >
                                      {el}
                                    </Text>
                                  );
                                })}
                              </View>
                            </React.Fragment>
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
                      <Text style={{fontFamily: fonts.Hiragino, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>送料</Text>
                      <Text style={{fontFamily: fonts.Hiragino, fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>
                        ¥{billData?.bill?.postage}
                      </Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                      <Text
                        style={{
                          fontFamily: fonts.RobotoBold,
                          fontSize: 19,
                          color: colors.colorTextBlack,
                          fontWeight: "bold",
                          lineHeight: 44,
                        }}
                      >
                        合計
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.RobotoBold,
                          fontSize: 19,
                          color: colors.colorTextBlack,
                          fontWeight: "bold",
                          lineHeight: 44,
                        }}
                      >
                        ¥{billData?.bill?.total}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.NSbold,
                paddingHorizontal: 16,
                marginBottom: 12,
                fontSize: 15,
                color: colors.colorTextBlack,
                lineHeight: 23,
                marginTop: 23,
              }}
            >
              配送先
            </Text>

            <View style={{paddingHorizontal: 16, borderRadius: 4}}>
              <View style={{paddingHorizontal: 16, backgroundColor: colors.white}}>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderBottomColor: colors.borderGrayE,
                    paddingVertical: 15,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.Hiragino,
                      fontWeight: "bold",
                      width: "30%",
                      fontSize: 12,
                      color: colors.colorTextBlack,
                      lineHeight: 16,
                    }}
                  >
                    郵便番号
                  </Text>
                  <Text style={{fontFamily: fonts.Hiragino, width: "70%", fontSize: 12, color: colors.colorTextBlack, lineHeight: 16}}>
                    {billData?.bill?.reservation?.shipping_postal_code}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 15,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.Hiragino,
                      fontWeight: "bold",
                      width: "30%",
                      fontSize: 12,
                      color: colors.colorTextBlack,
                      lineHeight: 16,
                    }}
                  >
                    住所
                  </Text>
                  <Text style={{fontFamily: fonts.Hiragino, width: "70%", fontSize: 12, color: colors.colorTextBlack, lineHeight: 16}}>
                    {billData?.bill?.reservation?.shipping_address}
                  </Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 16}}>
                  <TouchableOpacity onPress={() => navigation.navigate(SCREEN_EDIT_ADDRESS)} style={{width: "40%"}}>
                    <Text
                      style={{fontSize: 12, textAlign: "right", fontFamily: fonts.Hiragino, color: colors.accentOrange, lineHeight: 21}}
                    >
                      登録住所変更
                    </Text>
                  </TouchableOpacity>
                  <View style={{height: "100%", width: 1, marginHorizontal: 16, backgroundColor: colors.borderGrayE}}></View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(SCREEN_EDIT_DELIVERY_ADDRESS, {data: billData.bill.reservation, action: onRefresh})}
                    style={{width: "40%"}}
                  >
                    <Text style={{fontSize: 12, fontFamily: fonts.Hiragino, color: colors.accentOrange, lineHeight: 21}}>
                      登録住所以外に配送
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 30, paddingHorizontal: 16, width: "100%"}}>
            <Button variant="primary" label={global.t("action_payment")} onPress={handleAction} />
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
