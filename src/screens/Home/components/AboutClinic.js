import React, {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, FlatList} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";

export default function AboutClinic() {
  const navigation = useNavigation();
  const fonts = useThemeFonts();
  const colors = useThemeColors();

  return (
    <View style={{backgroundColor: colors.white, borderRadius: 18, paddingVertical: 40, paddingHorizontal: 20, flexDirection: "column"}}>
      <Text style={{fontSize: 24, color: colors.colorHome10, marginBottom: 15, textAlign: "center", fontWeight: "700"}}>医療機関</Text>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <View style={{height: 2, width: 20, marginBottom: 4, backgroundColor: colors.colorHome10}}></View>
      </View>
      <View style={{marginTop: 20}}>
        <Image style={{width: "100%"}} source={require("@assets/images/home_image.png")} />
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          paddingVertical: 16,
          borderBottomColor: "#DDDEE1",
        }}
      >
        <Text style={{fontFamily: fonts.Hiragino, lineHeight: 27, fontWeight: "bold", fontSize: 18, color: colors.textHiragino}}>Tケアクリニック浜松町</Text>
        <Text
          style={{
            fontFamily: fonts.Hiragino,
            fontSize: 14,
            flex: 1,
            color: colors.textHiragino,
            lineHeight: 21,
            textAlign: "left",
          }}
        >
          {`〒105-0013 \n東京都港区浜松町2-13-9 G1ビル 2F\nJR浜松町駅 南口改札 金杉橋方面出口から徒歩3分`}
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 0,
          paddingVertical: 16,
          borderBottomColor: "#DDDEE1",
        }}
      >
        <Text style={{fontFamily: fonts.Hiragino, lineHeight: 27, fontWeight: "bold", fontSize: 14, color: colors.textHiragino }}>オンライン診療時間</Text>
        <Text
          style={{
            fontFamily: fonts.Hiragino,
            fontSize: 14,
            lineHeight: 21,
            flex: 1,
            color: colors.textHiragino,
            textAlign: "left",
          }}
        >
          {`9:00～18:00（土日・祝日を除く）`}
        </Text>
        <Text
          style={{
            fontFamily: fonts.Hiragino,
            fontSize: 13,
            flex: 1,
            lineHeight: 21,
            color: colors.textHiragino,
            textAlign: "left",
          }}
        >
          {`※直接来院の診療は行っておりません。\n※予告なく診療時間を変更する場合がございます。`}
        </Text>
      </View>
    
      {/* <View style={{flexDirection: "row", justifyContent: "center", marginTop: 40, marginBottom: 20}}>
        <TouchableOpacity>
          <Image source={require("@assets/images/button_inquiry.png")} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
