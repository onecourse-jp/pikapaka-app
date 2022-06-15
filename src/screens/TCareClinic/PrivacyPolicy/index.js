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
        "株式会社ピカパカ（以下、「当社」という）は、福利厚生事業及びヘルスケア事業において、お客様からお預かりした個人情報はもとより、全ての役員、従業員、派遣社員、及び業務委託社員 （以下、「役職員 等」という。）の情報について、プライバシーを構成する重要な情報であることを深く認識しています。当社に対する期待と信頼に応えていくべく、個人情報の保護に関する法律(個人情報保護法)、その他の関連諸法令、業界法規、社会規範、公序良俗等を遵守し、当社に関係するすべての方々の個人情報を安全に管理するため、次の事項を包含したルール及び体制を構築して活動してまいります。",
    },
    {
      title: "1.個人情報の収集・取得・利用・提供について",
      content:
        "上記の事業内容及び事業規模を考慮して、適切に個人情報を収集・取得するとともに、予め定めた利用目的の範囲内でのみ個人情報を取り扱い、目的を超えた個人情報の利用はいたしません。また、事業を通じて、関連法令の定めがある場合を除き、お客様の事前の明示による同意がない限り、第三者へ開示、漏洩はいたしません。なお、お客様の事前の明示による同意を得た場合、当社は個人情報の利用目的外利用または第三者への提供または開示ができるものとします。そのために個人情報の取扱手順を用意し、社員への教育に努めます。",
    },
    {
      title: "（1）利用目的",
      content:
        "・お客様がお申込みいただいた旅行またはサービスの提供\n・当社または当社提携先の商品、サービスの案内 ・当社サービス、旅行の意見や感想、アンケートのお願い\n・当社商品またはサービスの利用促進を目的とした特典、キャンペーン案内\n・お客様の問い合わせの対応\n・お客様個人が特定されない方法による統計資料の作成\n・従業員雇用管理、福利厚生、給与計算、業務管理の為\n・お客様からの問合せ対応、商談、打合せ、連絡の為\n・当社施設の入退出管理の為\n・採用選考を実施する為 ",
    },
    { 
      title: "（2）収集",
      content: "・本サービスの利用者である個人\n・法人の皆様\n・提携先・協業先の従業員\n・役員の皆様\n・その他取引先の従業員\n・役員の皆様\n・当社の従業員\n・役員\n・当社採用における応募者の皆様"},
    {
      title: "（3）第三者提供",
      content:
        "・お客様の同意を得た場合または法令に基づく場合\n・当社の業務遂行上必要な範囲内で、航空会社等を含む業務委託先に提供する場合\n・政府機関、地方公共団体、公共機関から協力を要請された場合\n・人の生命、身体または財産の保護の必要がある場合であって、お客様の事前同意を得る事が困難である場合",
    },
    {
      title: "（4）個人情報の委託",
      content:
        "当社は、取得した個人情報の取扱いの全部又は一部を第三者に委託する場合には、守秘義務の取り交わし等必要な措置を講じるとともに、当該委託先の適切な管理・監督を行います。",
    },
    {
      title: "2.法令等の遵守について",
      content:
        "個人情報を取り扱う上で、個人情報保護法をはじめとする関連ガイドライン等の国が定める指針、条例、その他の規範を確認し、遵守します。",
    },
    {
      title: "3.個人情報保護のための安全対策の実施について",
      content:
        "個人情報を安全且つ適切に取り扱うことを確実にするため、「個人情報保護マネジメントシステム」としての管理体制を整備し、従業者一人ひとりへの教育を通じて、個人情報の滅失、破壊、改ざん、毀損、漏洩等の予防に努めます。また、日々の確認、内部監査等を通じて、不備があった際には早期に検出するとともに、原因を精査し、是正措置を講じて再発防止に努めます。",
    },
    {
      title: "4.個人情報の取り扱いに関する苦情及び相談",
      content:
        "個人情報の取り扱いに関する苦情、相談等に対して、受付窓口として「個人情報お問い合わせ担当窓口」を設置し、遅滞なく、速やかに対応を行います。",
    },
    {
      title: "5.個人情報保護マネジメントシステムの継続的改善",
      content:
        "当社の経営環境はもちろんのこと、社会情勢の変化や情報技術の進歩等に対応した個人情報保護を実現するため、定期的に「個人情報保護マネジメントシステム」を見直し、継続的な改善に努めます。",
    },
    {
      title: "6.情報管理",
      content:
        "1．情報の正確性の確保 皆様からご提供いただいた情報については、常に正確かつ最新の情報となるよう努めます。\n2．安全管理措置 当社は、情報の管理については、社内規程により、関連法令に従った適切な取扱い方法を規定し、それに基づいた実施を徹底しています。\n3．従業者の監督 当社は、当社の規程に基づき、情報の厳格な運用及び適切な従業員教育を行っております。\n4．委託先の監督 当社は、社内規程に基づき、利用目的の範囲内で要件を満たした委託先にのみ委託を行い、適切な管理を行っております。\n5．保存期間と廃棄 皆様からご提供いただいた情報については所定の方法に従って保管するものとし、不要となった場合にはすみやかに廃棄します。",
    },
    {
      title: "7.クッキーに関するポリシー",
      content:
        "",
    },
    {
      title: "クッキーとは？",
      content:
        "クッキーとは、ウェブページを利用したときに、ブラウザとサーバーとの間で送受信した利用履歴や入力内容などを、お客様のコンピュータにファイルとして保存しておく仕組みです。次回、同じページにアクセスすると、クッキーの情報を使って、ページの運営者はお客様ごとに表示を変えたりすることができます。お客様がブラウザの設定でクッキーの送受信を許可している場合、ウェブサイトは、ユーザーのブラウザからクッキーを取得できます。なお、お客様のブラウザは、プライバシー保護のため、そのウェブサイトのサーバーが送受信したクッキーのみを送信します。",
    },
    {
      title: "クッキーの設定について",
      content:
        "お客様は、クッキーの送受信に関する設定を「すべてのクッキーを許可する」、「すべてのクッキーを拒否する」、「クッキーを受信したらユーザーに通知する」などから選択できます。設定方法は、ブラウザにより異なります。クッキーに関する設定方法は、お使いのブラウザの「ヘルプ」メニューでご確認ください。\nすべてのクッキーを拒否する設定を選択されますと、認証が必要なサービスを受けられなくなる等、インターネット上の各種サービスの利用上、制約を受ける場合がありますのでご注意ください。",
    },
    {
      title: "当社がクッキーを使用して行っていること ",
      content:
        "以下の目的のため、当社はクッキーを利用しています。お客様が認証サービスにログインされるとき、保存されているお客様の登録情報を参照して、お客様ごとにカスタマイズされたサービスを提供できるようにするため\nGoogle、Yahoo!、JAPAN、Facebookなど第三者配信事業者によりインターネット上のさまざまなサイトに当社の広告が掲載されているところ、それらの事業者が、当社ウェブサイトへの過去のアクセス情報に基づいて広告を配信するため\nただし、これらの識別情報やアクセス情報などには、個人を特定できる情報は含んでおらず、広告配信以外の目的で利用することはありません。なお、当社ウェブサイトのご利用ユーザーは、それらの業者の広告のオプトアウトページにアクセスして、Cookieの使用を無効にすることができます。行動ターゲティング広告サービスを無効にする場合は、以下のオプトアウトページにアクセスし、手順に従ってください。",
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
      title: "",
      content:
        "当社のサイトの利用者数やトラフィックを調査するため 当社のサービスを改善するため セキュリティー保持のため、ご利用から一定の時間が経過したお客様に対してパスワードの再入力（再認証）を促すため なお、当社の広告の配信を委託するYahoo! JAPANへの委託に基づき、Yahoo! JAPANを経由して、当社のクッキーを保存し、参照する場合があります。",
    },
    {
      title: "",
      content:
        "株式会社ピカパカ代表取締役\n原　基記\n制定日2021年1月1日\n改定日 2021年9月15日\n改定日 2022年4月1日",
    },
    {
      title: "個人情報保護に関するお問い合わせ",
      content:
        "本方針、また当社が取り扱う個人情報についてのお問い合わせは下記にて承ります。",
    },
    {
      title: "",
      content: "個人情報の取り扱いに関する苦情、相談等にについては、以下のお問い合わせ先までご連絡ください。",
    },
    {
      title: "お問い合わせ先・苦情の申出先",
      content:
        " 株式会社ピカパカ　個人情報お問い合わせ担当窓口\nお電話：03-4555-9805 (10：00-17：00 ※土日祝日を除く） 【link:お問い合わせフォームはこちら >】",
    },
    {
      title: "/* ここは大きい見出しです。*/反社会的勢力に対する基本方針",
      content:
        "",
    },
    {
      title: "1．組織としての対応",
      content:
        "反社会的勢力に対しては、行動規範・社内規定等に明文の根拠を設け、経営トップ以下、組織全体として対応します。また、反社会的勢力に対応する従業員の安全を確保します。",
    },
    {
      title: "2．外部専門機関との連携",
      content:
        "平素から、警察、暴力追放運動推進センター、弁護士等の外部の専門機関と緊密な連携関係を構築することに努めます。",
    },
    {
      title: "3．取引を含めた一切の関係遮断",
      content:
        "反社会的勢力に対しては、取引関係を含めて、一切の関係を遮断します。",
    },
    {
      title: "4．有事における民事と刑事の法的対応",
      content:
        "反社会的勢力による不当要求を拒絶し、必要に応じて民事および刑事の両面から法的対応を行います。",
    },
    {
      title: "5．裏取引や資金提供の禁止",
      content:
        "反社会的勢力との裏取引は絶対に行いません。反社会的勢力への資金提供は絶対に行いません",
    },
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
