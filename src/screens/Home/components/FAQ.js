import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import FAQ_see_more from "@assets/images/SvgComponents/FAQ_see_more";
import {SCREEN_FAQ} from "@screens/screens.constants";
import {getListFaq} from "@services/search";
const {width} = Dimensions.get("window");

export default function FAQComponent({styleColor = "", question = [], Qcolor = "", screen = 1}) {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const [questionData, setQuestionData] = useState([]);
  const [listValue, setListValue] = useState([]);
  const colors = useThemeColors();

  const getFaq = async (params) => {
    try {
      global.showLoadingView();
      const {data, response} = await getListFaq(params);
      if (response.status === 200) {
        global.hideLoadingView();
        setQuestionData(data.data.data);
      } else {
        global.hideLoadingView();
        console.log("data.message err", data?.message);
      }
    } catch (error) {
      console.log("error", error);
      global.hideLoadingView();
    }
    return [];
  };

  const checkAndTickValue = (val) => {
    let newList = [...listValue];
    if (listValue?.includes(val)) {
      newList.splice(newList.indexOf(val), 1);
    } else {
      newList.push(val);
    }
    setListValue(newList);
  };

  useEffect(() => {
    const params = {status_public: 1, limit: 3};
    if (screen != 0) {
      params.screen = screen;
    }
    getFaq(params);
  }, [screen]);

  return (
    <View style={{backgroundColor: colors.white, borderRadius: 18, paddingVertical: 40, paddingHorizontal: 20, flexDirection: "column"}}>
      <Text style={{fontSize: width < 380 ? 20 : 24, color: styleColor, marginBottom: 15, textAlign: "center", fontWeight: "700"}}>
        よくある質問
      </Text>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <View style={{height: 2, width: 20, marginBottom: 4, backgroundColor: styleColor}}></View>
      </View>
      {questionData.map((item, index) => {
        return (
          <TouchableOpacity
            key={`item.text-${index}`}
            onPress={() => checkAndTickValue(item.id)}
            style={{
              borderBottomWidth: index + 1 < questionData.length ? 1 : 0,
              paddingVertical: 16,
              borderBottomColor: "#DDDEE1",
            }}
          >
            {/* <Image source={require("@assets/images/icons/ic_question.png")} /> */}
            <View style={{flexDirection: "row", marginBottom: 16}}>
              <View
                style={{
                  backgroundColor: Qcolor,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 4,
                  justifyContent: "center",
                  width: 34,
                  height: 34,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.Futura,
                    color: colors.white,
                    fontSize: 18,
                    fontWeight: "500",
                    lineHeight: 24,
                  }}
                >
                  Q
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: fonts.Hiragino,
                  fontSize: 14,
                  flex: 1,
                  color: colors.textHiragino,
                  lineHeight: 21,
                  textAlign: "left",
                  marginLeft: 11,
                }}
              >
                {item.question}
              </Text>
            </View>
            {listValue?.includes(item?.id) && (
              <View style={{flexDirection: "row"}}>
                <View
                  style={{
                    backgroundColor: Qcolor,
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 4,
                    justifyContent: "center",
                    width: 34,
                    height: 34,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.Futura,
                      color: colors.white,
                      fontSize: 18,
                      fontWeight: "500",
                      lineHeight: 24,
                    }}
                  >
                    A
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: fonts.Hiragino,
                    fontSize: 14,
                    flex: 1,
                    color: colors.textHiragino,
                    lineHeight: 21,
                    textAlign: "left",
                    marginLeft: 11,
                  }}
                >
                  {item.answer}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
      <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("HistoryStack");navigation.navigate(SCREEN_FAQ);
          }}
        >
          <FAQ_see_more color={styleColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
