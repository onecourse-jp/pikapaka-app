import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import styles from "../styles";
import Headercomponent from "@components/Layout/Header";
import TabHeaderComponent from "@components/Layout/TabHeader";
import FooterComponent from "@components/Layout/Footer";

export default function () {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const content = [
    {name: "社名", content: "株式会社ピカパカ", reqireForm: false},
    {name: "所在地", content: "〒105-0011\n東京都港区芝公園3-1-8 芝公園アネックス4F", reqireForm: false},
    {name: "設立", content: "2018年12月1日", reqireForm: false},
    {name: "資本金", content: "398,900,000円（資本準備金を含む）", reqireForm: false},
    {name: "代表取締役", content: "原　基記", reqireForm: false},
    {name: "ご旅行に関するお問い合わせ TEL", content:"03-4555-9805", reqireForm: false},
    {name: "FAX", content: "03-3431-6811", reqireForm: false},
    {name: "インターネットでのお問い合わせ先", content: "", reqireForm: true, text: "お問い合わせフォーム >"},
    {
      name: "事業内容", 
      content: "ヘルスケア事業\n・医療機関向けDX支援サービス\n・PCR検査センター企画\n・運営サービス\n福利厚生事業\n・法人出張サポートサービス", 
      reqireForm: false},
    {
      name: "主要取引銀行",
      content: "みずほ銀行",
      reqireForm: false,
    },
    {
      name: "商品代金以外の必要料金代金",
      content: "商品代金以外の必要料金代金：取扱手数料・振込手数料・航空保険料・燃油特別付加運賃（一部航空券のみ）",
      reqireForm: false,
    },
    {
      name: "販売数量",
      content: "メール、FAX、TELにてのご案内",
      reqireForm: false,
    },
    {
      name: "商品の引渡し時期",
      content: "＜ヘルスケア事業＞\n商品（＝検査）は、引き渡し時期＝検査実施日。\n商品（＝検査キット一式）は、検査キット一式を購入依頼、決済完了後に発送。\n＜福利厚生事業＞\n搭乗の３時間前まで",
      reqireForm: false,
    },
    {
      name: "お支払方法",
      content: "法人売掛、クレジットカードなど",
      reqireForm: false,
    },
    {
      name: "返品特約",
      content: "＜ヘルスケア事業＞\n検査は受けなければキャンセル料不要。郵送キットに関しては衛生上の問題で、キャンセルは不可。返金なし。\n来店にてお預かりした検体が災害等の不可抗力や不測の事態が生じたことにより検査が実施できなかった場合は免責とさせていただき、全額返金いたします。\n＜福利厚生事業＞\nお客様の都合によるキャンセルにつきましては、出発日によりキャンセル料が発生いたします。 尚、万が一弊社の手配違いによるものに関しましては旅程保証にて対応させて頂きます。",
      reqireForm: false,
    },
    {
      name: "顧客情報",
      content: "お客様からお預かりした顧客情報はチケット手配の用途以外には一切使用いたしません。",
      reqireForm: false,
    },
     {
      name: "特記事項",
      content: "お客様と弊社との間で訴訟が生じた場合、東京地方裁判所を第一審の専属的な管轄裁判所とします。",
      reqireForm: false,
    },
  ];
  const title = "特定商取引法に\n基づく表記";

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <Headercomponent />
      <TabHeaderComponent />
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{backgroundColor: colors.backgroundTheme}}>
          <View style={{padding: 40, flexDirection: "column"}}>
            <View style={{alignItems: "center", marginBottom: 40}}>
              <Text style={{fontWeight: "700", textAlign: "center", fontSize: 32, lineHeight: 48, color: colors.textHiragino}}>
                {title}
              </Text>
            </View>
            {content.map((item, index) => {
              return (
                <View key={index} style={{marginBottom: 20}}>
                  <Text style={{fontWeight: "700", fontSize: 14, lineHeight: 21, textAlign: "justify", color: colors.textHiragino}}>
                    {item.name}
                  </Text>
                  <Text style={{fontWeight: "400", fontSize: 14, lineHeight: 21, textAlign: "justify", color: colors.textHiragino}}>
                    {item.content}
                  </Text>
                  {item.reqireForm ? (
                    <TouchableOpacity style={{marginTop: 20}}>
                      <Text style={{textDecorationLine: "underline", color: colors.headerComponent, fontWeight: "700"}}>{item.text}</Text>
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}
                  <View style={{height: 1, backgroundColor: colors.lineGray02, marginTop: 20}}></View>
                </View>
              );
            })}
          </View>
          <FooterComponent />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
