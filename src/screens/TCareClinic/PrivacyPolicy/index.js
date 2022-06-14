import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import {Linking} from "react-native";
import styles from "../styles";
import Headercomponent from "@components/Layout/Header";
import TabHeaderComponent from "@components/Layout/TabHeader";
import FooterComponent from "@components/Layout/Footer";

export default function () {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const title = "プライバシー\nポリシー";
  const content1 = [
    {
      title: "",
      content:
        "ピカパカヘルスケア（以下、「当クリニック」といいます）は、患者様から提供される個人情報（生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含みます。以下、単に「個人情報」といいます。）を、特に重要な情報と認識し、適切に収集・利用・開示し、保護するために、当クリニックの個人情報保護方針を以下の通り示します。また、当クリニックは、個人情報を正確かつ安全に取り扱い保護することを重要な責務と考え、ドクター、スタッフ共々、この個人情報保護方針を遵守致します。",
    },
    {
      title: "個人情報の取得",
      content:
        "当クリニックは、個人情報等を取得する際には、その利用目的を明確にし、その利用目的の達成に必要な範囲で個人情報を取得します。取得にあたっては、適正かつ公正な手段により行い、法令により例外として扱うことが認められている場合を除き、利用目的を予め公表もしくは患者様に通知します。また、要配慮個人情報については、あらかじめ患者様からの同意を得て取得するものとします。",
    },
    {
      title: "個人情報のお取扱いについて",
      content:
        "当クリニックは、個人情報の利用目的を特定し、その定められた利用目的の範囲内でのみ個人情報を利用します。また、関連法令の定めがある場合を除き、患者様の事前の明示による同意がない限り、第三者へ開示はいたしません。",
    },
    {title: "個人情報の正確性の確保", content: "当クリニックは、取得した個人情報を、正確かつ最新の状態に保つよう努めます。"},
    {
      title: "個人情報に対する安全対策の実施",
      content:
        "当クリニックは、取得した個人情報を、紛失、破壊、外部への不正な流出、改ざん、不正アクセスから保護するために、クリニック内の個人情報保護に関する教育を徹底し、必要かつ適切な安全対策を講じます。",
    },
    {
      title: "個人情報に関する患者様からのお問い合わせ等について",
      content:
        "当クリニックは、患者様から、当クリニックが管理する患者様ご自身の個人情報について、要請を受けた場合には、患者様の意思を尊重し、法令の定めるところに従って、必要な対応を致します。",
    },
    {
      title: "個人情報の利用目的",
      content:
        "当クリニックでは、患者様の個人情報を下記の目的で利用させていただきます。ただし、個人情報を第三者提供する場合には、患者様の事前の明示による同意を得た場合その他法令で認められた場合に限り行うものといたします。これら以外の目的で利用させていただく場合には、改めて患者様から同意をいただきます。また、患者様の個人情報の開示・訂正・利用停止等については、別に定める規則に従って適切に対処いたします。ご不明な点につきましては、窓口でお尋ねください。\n当クリニックにおける患者様の個人情報の利用目的は次の通りです。\n・診察、治療方法の検討など患者様に対する医療サービスの提供のため\n・医療保険事務処理のため\n・会計・経理処理のため\n・医療事故等の報告のため\n・当該患者様への医療の質の向上のため\n・その他、院内での管理運営業務に関する利用のため\n・他の病院、薬局等の医療機関との連携のため\n・他の医療機関等からの照会への回答のため\n・患者様の診療等のため、外部の医師等の意見・助言を求めるため\n・検体検査業務等の業務委託のため\n・患者様のご家族等への病状等の説明を実施するため\n・保険事務の委託を行うため\n・審査支払機関へのレセプトの提出をおこなうため\n・各種支払機関等からの照会への回答\n・委託を受けた健康診断にかかる事業者等への結果通知のため\n・医師賠償責任保険等にかかわる保険会社等への相談または届出のため\n・その他、患者様への医療保険事務に関する利用のため\n・医療サービスや業務の改善のための資料に供するため\n・外部監査機関への情報提供のため\n・関係行政機関等の要請による情報提供のため\n・予約受付、お問い合わせ、ご質問対応のため",
    },
    {
      title: "Cookie（クッキー）について",
      content:
        "Cookieとは、患者様が当クリニックサイトを利用した際に、ブラウザとサーバーとの間で送受信した利用履歴や入力内容を、患者様のコンピュータにファイルとして保存しておく仕組みです。\n当クリニックは患者様が当クリニックサービスをより利用しやすくするために、Cookieを使用します。これにご同意いただけない場合は、患者様ご自身においてCookie無効の設定をお願いします。但し、すべてのCookieを無効にされますと、当クリニックサービスの利用が制約される場合がありますのでご注意ください。\nなお、当クリニックは、以下の目的のためCookieを使用します。\n（1）患者様の履歴情報を収集、蓄積し、閲覧状況の分析、広告効果を測定するため\n（2）患者様が興味を持っている内容や、弊社サイトのサイト上での利用状況から、最も適切な広告を表示するため\n（3）患者様が広告から訪れた第三者企業の広告配信のため。なお、この場合のcookie情報は第三者企業のプライバシーポリシーに基づき管理されます。",
    },
  ];
  const thirdCompany = [
    {name: "グーグル株式会社", link: "http://www.google.co.jp/policies/technologies/ads/"},
    {name: "ヤフー株式会社", link: "http://btoptout.yahoo.co.jp/optout/preferences.html"},
    {name: "株式会社マイクロアド", link: "http://send.microad.jp/w3c/"},
    {name: "CRITEO株式会社", link: "http://www.criteo.com/jp/privacy/"},
    {name: "株式会社Platform ID", link: "https://www.opt.ne.jp/privacy/"},
    {name: "京セラコミュニケーションシステム株式会社　", link: "http://www.kccs.co.jp/policy/optout.html"},
    {name: "Facebook Japan株式会社", link: "https://www.facebook.com/help/cookies/update"},
    {name: "株式会社サイバーエージェント", link: "https://www.dynalyst.jp/legal/policy/optout.html"},
    {name: "株式会社サイバー・コミュニケーションズ", link: "http://www.cci.co.jp/privacypolicy/"},
    {name: "株式会社AMoAd", link: "http://www.amoad.com/guideline/#optout"},
    {name: "トランス・コスモス株式会社", link: "http://www.trans-cosmos.co.jp/privacy/"},
    {name: "Twitter Japan株式会社", link: "https://twitter.com/privacy?lang=ja"},
    {name: "Supership株式会社", link: "https://supership.jp/optout/"},
    {name: "チャットプラス株式会社", link: "https://chatplus.jp/privacy/"},
    {name: "株式会社Gunosy", link: "https://gunosy.co.jp/privacy/"},
  ];
  const content2 = [
    {
      title: "法令の遵守及びスタッフ等の教育・継続的改善",
      content:
        "当クリニックは、個人情報保護に関する法令、厚生労働省のガイドラインなどを遵守し、個人情報保護体制を維持するため、ドクター、スタッフの教育を徹底し、個人情報保護方針を継続的に見直し、改善に努めます。",
    },
    {
      title: "個人情報の開示等の請求",
      content:
        "当クリニックは、患者様ご本人またはその代理人様より、当クリニックで保有する個人情報に関して、内容の確認、利用目的の通知、開示、内容の訂正、追加、削除、利用の停止、第三者への提供の停止の請求（以下、「開示等の請求」といいます）等を依頼された場合、以下に定める要領にて対応させていただきます。また、ご希望に副えない場合は、その理由を説明します。なお、当該開示等の請求の対応期間中及び当該対応完了後は、患者様は当クリニックサービスの全部または一部を利用できなくなる場合があります。\nａ）個人情報取扱事業者の名称\nピカパカヘルスケア\nb）全ての保有個人データの利用目的\n上記個人情報の利用目的のとおり\nc）認定個人情報保護団体\n現在、当クリニックが加盟する認定個人情報保護団体はありません。\nd ）保有個人データの開示等の求めに応じる手続き\n1）開示等の求めの申し出先\n開示等のお求めは、下記のお問い合わせ先にお申し出ください。\n2）開示等の求めに関するお手続き\n①お申し出受付け後、当クリニックからご利用いただく所定の請求書様式「保有個人データ開示等請求書」を郵送いたします。\n②ご記入いただいた請求書、代理人によるお求めの場合は代理人であることを確認する書類、手数料分の郵便為替（利用目的の通知並びに開示の請求の場合のみ）を上記個人情報問合せ係までご郵送ください。\n③上記請求書を受領後、ご本人確認のため、当クリニックに登録していただいている個人情報のうちご本人確認可能な2項目程度（例：電話番号と生年月日等）の情報をお問合せさせていただきます。\n④回答は原則としてご本人に対して書面（封書郵送）にておこないます。\n3）代理人によるお求めの場合、代理人であることを確認する資料\n開示等をお求めになる方が代理人様である場合は、代理人である事を証明する資料及び代理人様ご自身を証明する資料を同封してください。各資料に含まれる本籍地情報は都道府県までとし、それ以降の情報は黒塗り等の処理をしてください。また各資料は個人番号を含まないものをお送りいただくか、全桁を墨塗り等の処理をしてください。\n①代理人である事を証明する資料\n＜開示等の求めをすることにつき本人が委任した代理人様の場合＞\n本人の委任状（原本）\n＜代理人様が未成年者の法定代理人の場合＞いずれかの写し\n戸籍謄本\n住民票（続柄の記載されたもの）\nその他法定代理権の確認ができる公的書類\n＜代理人様が成年被後見人の法定代理人の場合＞いずれかの写し\n後見登記等に関する登記事項証明書\nその他法定代理権の確認ができる公的書類\n②代理人様ご自身を証明する資料\n運転免許証\nパスポート\n健康保険の被保険者証\n住民票\n4）利用目的の通知または開示のお求めについての手数料\n1回のお求めにつき1000円 （お送りいただく請求書等に郵便為替を同封していただきます。）",
    },
    {
      title: "改定",
      content:
        "当クリニックは、当クリニックの裁量に基づいて、本ポリシーを変更します。但し、個人情報保護法その他の法令により、改定に必要な手続が定められている場合には、当該手続に従って改定を行うものとします。\nなお、当クリニックは、本ポリシーを変更する場合には、患者様に対して、変更後の本ポリシーの施行時期および内容を以下の方法で周知します。\n・当クリニックのウェブサイトへの掲示\n・個別の通知その他適切な方法",
    },
    {
      title: "個人情報の取り扱いに関する苦情及び相談",
      content: "個人情報の取り扱いに関する苦情、相談等にについては、以下のお問い合わせ先までご連絡ください。",
    },
    {
      title: "お問い合わせ先・苦情の申出先",
      content:
        "個人情報取扱担当者：\nピカパカヘルスケアグループ\n所在地：\n〒105-0011 東京都港区芝公園3-1-8 芝公園アネックス4F\nTEL：\n03-5422-1011\n（MAIL：info@tcclinic.jp）",
    },
    {title: "", content: "制定：2020年8月\n改定：2021年7月"},
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <Headercomponent />
      <TabHeaderComponent />
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{backgroundColor: colors.backgroundTheme}}>
          <View style={{padding: 40, flexDirection: "column"}}>
            <View style={{alignItems: "center", marginBottom: 20}}>
              <Text style={{fontWeight: "700", fontSize: 32, lineHeight: 48, color: colors.textHiragino, textAlign: "center"}}>
                {title}
              </Text>
            </View>
            {content1.map((item, index) => {
              return (
                <View key={index} style={{marginBottom: 40}}>
                  <Text style={{fontWeight: "700", fontSize: 14, lineHeight: 21, textAlign: "justify", color: colors.textHiragino}}>
                    {item.title}
                  </Text>
                  <Text style={{fontWeight: "400", fontSize: 14, lineHeight: 21, textAlign: "justify", color: colors.textHiragino}}>
                    {item.content}
                  </Text>
                </View>
              );
            })}
            <View>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 14,
                  lineHeight: 21,
                  textAlign: "justify",
                  color: colors.textHiragino,
                  marginBottom: 20,
                }}
              >
                ＊主な第三者企業
              </Text>
              {thirdCompany.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      Linking.openURL(item.link);
                    }}
                  >
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                      <Text
                        style={{
                          fontWeight: "700",
                          letterSpacing: 1,
                          color: colors.headerComponent,
                          marginRight: 2,
                          textDecorationLine: "underline",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Image source={require("@assets/images/link_url_privacy.png")}></Image>
                    </View>
                    <Text style={{fontWeight: "700", letterSpacing: 1.4, color: colors.headerComponent, textDecorationLine: "underline"}}>
                      {item.link}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{height: 30}}></View>
            {content2.map((item, index) => {
              return (
                <View key={index} style={{marginBottom: 40}}>
                  <Text style={{fontWeight: "700", fontSize: 14, lineHeight: 21, textAlign: "justify", color: colors.textHiragino}}>
                    {item.title}
                  </Text>
                  <Text style={{fontWeight: "400", fontSize: 14, lineHeight: 21, textAlign: "justify", color: colors.textHiragino}}>
                    {item.content}
                  </Text>
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
