import React, {useEffect} from "react";
import {View, Text, Image, StyleSheet, Dimensions} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
// import Flow_1 from "@assets/images/flow_1.svg"
import Flow_1 from "@assets/images/SvgComponents/Flow_1";
import Flow_2 from "@assets/images/SvgComponents/Flow_2";
import Flow_3 from "@assets/images/SvgComponents/Flow_3";
import Flow_4 from "@assets/images/SvgComponents/Flow_4";
const {width} = Dimensions.get("window");
export default function FlowMedicalCare({styleColor = "", imageUrls = []}) {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const DATA = [
    {content: "カレンダーからお好きな日時を選んで予約", title: "予約", imageUrl: imageUrls[0], step: "STEP1"},
    {
      content: "スマホのアプリからドクターとのオンライン診療",
      title: "オンライン診療",
      imageUrl: imageUrls[1],
      step: "STEP2",
    },
    {
      content: "診療後にお支払い \n各種クレジットカードがお選びいただけます",
      title: "お支払い",
      imageUrl: imageUrls[2],
      step: "STEP3",
    },
    {content: "お薬は最短翌日にお届け", title: "お薬の受け取り", imageUrl: imageUrls[3], step: "STEP4"},
  ];

  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: 18,
        paddingVertical: 40,
        paddingHorizontal: 20,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text style={{fontSize: width < 380 ? 20 : 24, fontWeight: "700", color: styleColor, marginBottom: 15, textAlign: "center"}}>
        {global.t("Flow_from_reservation_to_medicine")}
      </Text>
      <View style={{height: 2, width: 20, backgroundColor: styleColor, marginBottom: 20}}></View>
      <View style={{width: "100%"}}>
        {DATA.map((item, index) => {
          return (
            <View key={`flow-${index}`} style={{}}>
              <View
                style={{
                  height: 29,
                  width: 90,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  backgroundColor: "#797A85",
                }}
              >
                <Text style={{color: colors.white, fontFamily: fonts.Futura, fontSize: 16}}>{item.step}</Text>
              </View>
              <View style={[styles.mainItem, {backgroundColor: colors.white}]}>
                <View style={{width: 90, flexDirection: "row", justifyContent: "center"}}>
                  {index == 0 && <Flow_1 color={styleColor} />}
                  {index == 1 && <Flow_2 color={styleColor} />}
                  {index == 2 && <Flow_3 color={styleColor} />}
                  {index == 3 && <Flow_4 color={styleColor} />}
                </View>
                <View style={{flex: 1, paddingRight: 16, marginTop: 16, marginBottom: 16}}>
                  <Text style={{fontFamily: fonts.Hiragino, fontWeight: "bold", fontSize: 16, lineHeight: 24, color: styleColor}}>
                    {item.title}
                  </Text>
                  <Text style={{fontFamily: fonts.Hiragino, fontWeight: "400", fontSize: 14, lineHeight: 21, color: colors.textHiragino}}>
                    {item.content}
                  </Text>
                </View>
              </View>
              {index + 1 < DATA.length && (
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: 6}}>
                  <Image source={require("@assets/images/icons/flow_dropdown.png")} />
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    paddingBottom: 1,
    borderColor: "#eeeeee",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
