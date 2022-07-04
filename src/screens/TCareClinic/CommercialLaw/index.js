import React from "react";
import {Text, View, TouchableOpacity, ScrollView, SafeAreaView, Linking} from "react-native";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import styles from "../styles";
import Headercomponent from "@components/Layout/Header";
import TabHeaderComponent from "@components/Layout/TabHeader";
import FooterComponent from "@components/Layout/Footer";
import ButtonBooking from "../../Home/components/ButtonBooking";

export default function () {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const contactToEmail = () => {
    Linking.openURL("mailto:support_healthcare@pikapaka.co.jp");
  };
  const DATA = [
    {name: "社名", content: "株式会社ピカパカ", reqireForm: false},
    {name: "所在地", content: "〒105-0011\n東京都港区芝公園3-1-8 芝公園アネックス4F", reqireForm: false},
    {name: "設立", content: "2018年12月1日", reqireForm: false},
    {name: "資本金", content: "398,900,000円（資本準備金を含む）", reqireForm: false},
    {name: "代表取締役", content: "原　基記", reqireForm: false},
    {name: "お問い合わせ TEL", content: "03-6820-0995", reqireForm: false},
    {name: "FAX", content: "03-3431-6811", reqireForm: false},
    {
      name: "インターネットでのお問い合わせ先",
      text: "お問い合わせはこちら",
      reqireForm: true,
      action: () => {
        // global.showWebView({
        //   url: "https://docs.google.com/forms/d/e/1FAIpQLSdLQiPQIbCkjvr2HwBHD3ktb0WQHwFmdatHcCGzCnnlGhA4CQ/viewform",
        // });
        contactToEmail();
      },
    },
    {
      name: "事業内容",
      content:
        "ヘルスケア事業\n・医療機関向けDX支援サービス\n・PCR検査センター企画\n・運営サービス\n福利厚生事業\n・法人出張サポートサービス",
      reqireForm: false,
    },
    {
      name: "主要取引銀行",
      content: "みずほ銀行",
      reqireForm: false,
    },
    {
      name: "商品代金以外の必要料金代金",
      content: "配送料",
      reqireForm: false,
    },
    {
      name: "販売数量",
      content: "メール、チャットにてのご案内",
      reqireForm: false,
    },
    {
      name: "商品の引渡し時期",
      content: "商品（＝医薬品）は、購入依頼、決済完了後に発送。引渡し時期は、1～4日以内。",
      reqireForm: false,
    },
    {
      name: "お支払方法",
      content: "クレジットカード",
      reqireForm: false,
    },
    {
      name: "返品特約",
      content:
        "購入後のキャンセルは不可。返金なし。災害等の不可抗力や不測の事態が生じたことにより商品の発送が完了できなかった場合は免責とさせていただき、全額返金いたします。",
      reqireForm: false,
    },
    {
      name: "顧客情報",
      content:
        "お客様からお預かりした顧客情報は、オンライン診療時、医薬品の発送時、弊社サービスの紹介案内の用途以外には一切使用いたしません。",
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
            {DATA.map((item, index) => {
              return (
                <View key={index} style={{marginBottom: 20}}>
                  <Text style={{fontWeight: "700", fontSize: 14, lineHeight: 21, textAlign: "justify", color: colors.textHiragino}}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 14,
                      lineHeight: 21,
                      marginTop: 2,
                      textAlign: "justify",
                      color: colors.textHiragino,
                    }}
                  >
                    {item.content}
                  </Text>
                  {item.reqireForm ? (
                    <TouchableOpacity onPress={item?.action}>
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
        <ButtonBooking bgColor={"rgba(0, 176, 80, 0.7)"} />
      </View>
    </SafeAreaView>
  );
}
