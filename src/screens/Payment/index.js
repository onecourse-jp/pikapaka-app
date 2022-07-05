import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import StepsComponent from "@components/StepsComponent";
import GuideComponent from "@components/GuideComponent";
import {getReservationById} from "@services/auth";
import {createStripeCheckoutSession, paymentStripe} from "@services/payments";
import {
  SCREEN_DETAIL_CALENDAR_AFTER_PAYMENT,
  SCREEN_EDIT_DELIVERY_ADDRESS,
  SCREEN_HISTORY,
  SCREEN_SERVICE_STEP1,
} from "@screens/screens.constants";
import {useForm, Controller} from "react-hook-form";
import ItemQuestionForm from "../../components/Form/ItemQuestionForm";
import {getBillPayment} from "@services/payments";
import {SCREEN_EDIT_ADDRESS} from "../screens.constants";
import {changeStatusCalendar} from "@actions/calendarAction";
import BillPayment from "./BillPayment";
import CardExpInput from "@components/items/CardExpInput";
import CustomModal from "../../components/LoadingView";

export default function Payment({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const dispatch = useDispatch();
  const idCalendar = route?.params?.id;
  const [refreshing, setRefreshing] = useState(false);
  const [errorApi, setErrorApi] = useState("");
  const [billData, setBillData] = useState(null);
  const [dataExp, setDataExp] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  console.log("idCalendar", idCalendar);

  const screenStep = 4;
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    required: true,
  });

  useEffect(() => {
    const subscription = watch((value, {name, type}) => setErrorApi(""));
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (dataSubmit) => {
    // global.showLoadingView();
    setPaymentLoading(true)
    paymentMobile(dataSubmit)
  };
  const paymentMobile = async (dataSubmit) => {
    const paramsData = {
      cart_number: dataSubmit.cart_number,
      exp_month: dataExp.exp_month,
      exp_year: dataExp.exp_year,
      cvc: dataSubmit.cvc,
      reservation_form_id: idCalendar,
      amount: billData.bill?.total,
      cart_name: dataSubmit.cart_name,
    };
    try {
      const {response, data} = await paymentStripe(paramsData);
      console.log(" paramsData", paramsData);
      if (response && response.status == 200) {
        dispatch(changeStatusCalendar());
        global.hideLoadingView();
        let toastId = global.toast.show("aaaaaa", {
          placement: "top",
          duration: 3500,
          animationType: "slide-in",
          animationDuration: 100,
          offsetTop: 0,
          offset: 0, // offset for both top and bottom toasts
          swipeEnabled: true,
          renderToast: (toastOptions) => {
            return (
              <TouchableOpacity
                style={{
                  alignSelf: "stretch",
                  marginTop: 0,
                  marginHorizontal: 6,
                  borderRadius: 10,
                  backgroundColor: "#B7EB8F",
                }}
                onPress={() => {
                  global.toast.hide(toastId);
                  navigation.replace(SCREEN_HISTORY);
                }}
              >
                <View>
                  <Text style={{padding: 16, fontWeight: "bold"}}>{`お支払いが完了しました。`}</Text>
                </View>
              </TouchableOpacity>
            );
          },
        });
        setTimeout(() => {
          navigation.navigate(SCREEN_HISTORY, {id: idCalendar});
        }, 3000);
      } else {
        global.hideLoadingView();
        if (data?.message && typeof data?.message == "string") {
          let errorMessage = data?.message.split(" ").join("");
          errorMessage = errorMessage.split(".").join("");
          errorMessage = errorMessage.split("'").join("");
          if (errorMessage.includes("test")) {
            setErrorApi("お支払いが正常に完了しませんでした。カード情報をご確認ください。");
          } else {
            setErrorApi(global.t(errorMessage));
          }
        } else {
          setErrorApi("Error!");
        }
      }
    } catch (error) {
      global.hideLoadingView();
      console.log("err paymentStripe", error);
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

  const PaymentForm = [
    {
      key: "cart_number",
      label: "カード番号",
      title: "カード番号",
      placeholder: "1234 5678 9012 3456",
      typePad: "number",
      content: null,
      maxlength: 16,
    },
    {
      key: "cart_name",
      label: "カード名義",
      title: "カード名義",
      placeholder: "YAMADA TAROU",
      content: null,
    },
    {
      key: "exp",
      title: "カード番号",
      placeholder: "MM/YY",
      label: "有効期限",
      content: null,
    },
    {
      key: "cvc",
      placeholder: "3桁または4桁の数字",
      title: "セキュリティコード（CVC）",
      label: "セキュリティコード（CVC）",
      typePad: "number",
      hideIcon: true,
      content: null,
      maxlength: 4,
    },
  ];

  const formatMoney = (money) => {};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.select({
            ios: 60,
            android: 60,
          })}
          style={{flex: 1}}
        >
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{}}>
            <GuideComponent
              title={"お疲れさまでした。診察は終了しました。"}
              content="本日の金額は下記の通りです。お支払いの手続きをお願いいたします。"
            />
            <StepsComponent currentStep={screenStep} isStepAll={true} />
            <BillPayment billData={billData} />
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
                      {billData?.user?.postal_code}
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
                      {billData?.user?.address}
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
                      onPress={() =>
                        navigation.navigate(SCREEN_EDIT_DELIVERY_ADDRESS, {data: billData.bill.reservation, action: onRefresh})
                      }
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
            <View>
              <View>
                <Text style={{fontFamily: fonts.NSbold, color: colors.colorTextBlack, padding: 16, fontSize: 16}}>お客様情報</Text>
                {PaymentForm.map((item, index) => {
                  if (item.key !== "exp") {
                    return (
                      <React.Fragment key={`PaymentForm-${index}`}>
                        <Controller
                          control={control}
                          rules={item?.maxlength ? {required: true, maxLength: item?.maxlength} : {required: true}}
                          defaultValue={item?.value}
                          name={item.key}
                          render={({field: {onChange, onBlur, value}}) => {
                            return <ItemQuestionForm item={item} valueData={value} changeData={onChange} />;
                          }}
                        />
                        {errors[item.key] && item?.maxlength && (
                          <Text style={styles.textError}>入力ボックスは{item?.maxlength}文字の長さである必要があります</Text>
                        )}
                        {errors[item.key] && (
                          <Text style={styles.textError}>
                            {global.t(item.label)}
                            {global.t("is_require")}
                          </Text>
                        )}
                      </React.Fragment>
                    );
                  } else {
                    return (
                      <React.Fragment key={`PaymentForm-${index}`}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: colors.white,
                            paddingHorizontal: 16,
                          }}
                        >
                          <Text
                            syle={{
                              color: colors.textBlack,
                              fontSize: 15,
                              lineHeight: 21,
                            }}
                          >
                            {item.label}
                          </Text>
                          <View style={{width: "60%"}}>
                            <CardExpInput
                              getDataBirthday={(data) => {
                                console.log("hahahah", data);
                                setDataExp(data);
                              }}
                              getErrorInput={(data) => {
                                console.log("getErrorInput", data);
                              }}
                              onChangeInput={() => {
                                console.log("onChangeInput");
                              }}
                            />
                          </View>
                        </View>
                      </React.Fragment>
                    );
                  }
                })}
              </View>
            </View>
            {errorApi?.length > 0 && <Text style={styles.textError}>{errorApi}</Text>}
            <View style={{marginVertical: 30, paddingHorizontal: 16, width: "100%"}}>
              <Button variant="primary" label={global.t("action_payment")} onPress={handleSubmit(onSubmit)} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {paymentLoading &&  <View style={{position: "absolute",width: "100%", height: "100%"}}>
        <View
          style={{
            backgroundColor: "transparent",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable style={[StyleSheet.absoluteFill, {backgroundColor: "rgba(0, 0, 0, 0.5)"}]} onPress={() => {}} />
          <View style={styles2.container}>
            <View
              style={{
                ...styles2.activityIndicatorWrapper,
              }}
            >
              <ActivityIndicator animating={true} color={"black"} size={50} />
            </View>
          </View>
        </View>
      </View>}
     
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  textError: {color: "red", marginTop: 5, textAlign: "left", paddingHorizontal: 16},
});

const styles2 = StyleSheet.create({
  activityIndicatorWrapper: {
    backgroundColor: "transparent",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    paddingTop: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  imageWarn: {
    margin: 32,
    alignSelf: "center",
  },
  topTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginTop: 30,
  },
});
