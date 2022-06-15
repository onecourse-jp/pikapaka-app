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
export default function BillPayment({route, billData = null}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const [showDetailMedicine, setShowDetailMedicine] = useState(false);
  const idCalendar = route?.params?.id;
  const [refreshing, setRefreshing] = useState(false);
  console.log("idCalendar", idCalendar);
  return (
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
                <Text style={{fontFamily: fonts.Hiragino, fontWeight: "bold", fontSize: 15, color: colors.colorTextBlack, lineHeight: 44}}>
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
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
