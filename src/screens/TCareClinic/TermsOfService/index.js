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
import ButtonBooking from "../../Home/components/ButtonBooking";

export default function () {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const container = [
    {
      title: "はじめに",
      content:
        "この度は、株式会社ピカパカの運営する「ピカパカヘルスケア」をご利用いただき、誠にありがとうございます。 以下の規約(以下、「本規約」といいます。)の内容をよくお読みいただいた上で、ピカパカヘルスケアをご利用いただきますよう宜しくお願い申し上げます。",
    },
    {
      title: "",
      content:
        "※注意事項\nピカパカヘルスケアは、株式会社ピカパカが運営するオンライン診療支援サービスです。我々は医療機関ではなく、本サービスを利用したオンライン診療は、当社と提携している掲載医療機関に所属する医師が行います。我々は、オンライン診療を行う医師と患者をつなぐコミュニケーションのシステムを提供するベンダーです。オンライン診療は、あくまでも対面診療を補完するものであり、正しい判断が困難な場合がございます。その場合は対面診療のご受診をお願いしております。",
    },
    {
      title: "第1条 適用",
      content:
        "1.本規約は、本サービス提供条件および本サービスの利用に関する株式会社ピカパカ（以下、「当社」といいます。）とサービス利用者様（ユーザー）との間の権利義務関係を定めることを目的とし、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されます。\n2.ユーザーは本サービスの利用に際し、本規約の定めに従うことを承諾した上で利用するものとします。",
    },
    {
      title: "第2条 定義",
      content:
        "1.「本サービス」とは、当社が企画・運営するオンライン診療支援サービス「ピカパカヘルスケア」をいいます。\n2.「ユーザー」とは、本サービスを利用して掲載医療機関によるオンライン診療等を受ける個人をいいます。\n3.「本サイト」とは、当社が、本サービスをユーザーに提供するためのウェブサイトおよびアプリケーションをいいます。\n4.「本契約」とは、当社がユーザーに対し、本サービスを提供し、ユーザーが当社、掲載医療機関に対し、本規約に基づき発生する本サービス利用料を支払うことを約することをいいます。\n5.「掲載医療機関」とは、当社と提携し本サイトに登録することにより、ユーザーに対して本サイトを利用したオンライン診療、医薬品の処方等を行う医療機関をいいます。\n7.「担当医療従事者」とは、担当医師のほか、掲載医療機関に所属し、担当医師の補助を行う医療従事者の総称です。",
    },
    {
      title: "第3条 ピカパカヘルスケアが提供するサービスについて",
      content:
        "当社が企画・運営するオンライン診療支援サービス「ピカパカヘルスケア」の内容は、以下のとおりです。\n①担当医師によるオンラインでのユーザーの診療のためのコミュニケーションツールの提供\n②担当医療従事者によるオンラインでのユーザーの健康、美容皮膚科に関する悩み等の相談対応のためのコミュニケーションツールの提供\n③掲載医療機関による医薬品の配送の代行",
    },
    {
      title: "第4条 ユーザー",
      content:
        "1.ユーザーは自らの意思によって本サービスを利用するものとします。ユーザーが未成年である場合には、親権者等の法定代理人の同意を得て本サービスを利用するものとします。\n2.ユーザーは本サービスの利用にあたり、本サイトの定めるところに従いユーザー登録を行い、ユーザー登録の完了をもって本サービスの利用契約が成立するものとします。\n3.ユーザーは、前項により登録したアカウントにより、本サービスを利用することができます。また、ユーザー1人につき、1つのアカウントのみ作成することができます。\n4.当社は、ユーザーが以下に定める事由のいずれかに該当した場合、サービス提供を拒否することができるものとします。なお、当社は、当該拒否について一切の責任を負わず、また拒否理由を説明する義務を負わないものとします。\n①本サービスにおいて、担当医師が、法令若しくはガイドラインに準じ、または、医療上の必要により「対面」での診療をユーザーに指示したにもかかわらず、「対面」での診療に同意しない、あるいは受診しない場合\n②ユーザーに、本規約に違反する行為を行うおそれがある場合または過去に違反した事実が判明した場合\n③ユーザーが、登録時に当社に虚偽の情報を提供し、または重要事項を提供しなかった場合\n④その他、当社において本サービスをご利用になることが不適切と判断した場合\n5.ユーザーは本サービスにおいて自らが登録した情報の内容について一切の責任を負います。ユーザーが登録した情報に起因してユーザーに生じた損害については、当社は一切責任を負いません。\n6.ユーザーは本サービスにおいて登録した情報を、本サービスを利用するために必要な範囲内で、ユーザー自らが変更、追加、削除できるものとし、常にユーザーが責任をもって正確な状態に保つものとします。\n7.ユーザーは自らの意思により本サービスへの登録を削除することができます。\n8.ユーザーは自らの責任と費用において、本サービスの利用に必要な環境（ハードウェア、ソフトウェア、インターネット接続回線、セキュリティーの確保等）を整備するものとします。",
    },
    {
      title: "第5条 オンライン診療",
      content:
        "1.本サービスにおける「オンライン診療」とは、担当医師が、本サイト上のビデオ通話機能等を通じ、ユーザーに対し、診察、ユーザーの健康状態に応じた医薬品の処方、助言をすることをいいます。\n2.ユーザーは、本サービスを利用してオンライン診療を受けるにあたり、本サイトの定め、またはオンライン診療を担当する掲載医療機関の担当医療従事者の指示により、ユーザーの健康状態、症状、体質その他のオンライン診療に必要な情報を提供する義務を負います。ユーザーが十分な情報提供を行わなかったことにより、担当医師または掲載医療機関が適切な診療ができなかった場合であっても、当社はそのことについて一切責任を負いません。\n3.ユーザーは、本サービスへの登録を完了後、本サイトを通じて、担当医師によりオンライン診療を受けることができます。\n4.担当医師は、場合により、オンライン診療を中止する場合があります。この場合、ユーザーは、改めてオンライン診療を予約し、受診することができます。なお、担当医師によるオンライン診療の中止について、当社は一切責任を負いません。\n5.ユーザーがあらかじめ対面診療の指示をされたにも関わらず対面診療を受けていない場合、本サイトを通じたオンライン診療を受けられない場合があります。\n6.ユーザーがオンライン診療後、担当医療従事者が求めた場合、または、副作用その他異常を感じた場合は速やかに医療機関を受診することを推奨いたします。\n7.ユーザーに対するオンライン診療、医薬品の処方はすべて担当した担当医師またはその所属する掲載医療機関が行うものであり、当社は、これらの行為についていかなる責任も負わないものとします。\n8.ユーザーと登録医師または掲載医療機関との間のオンライン診療に関連して生じた問い合わせ、苦情、請求、紛争等については、ユーザー、掲載医療機関及び登録医師との間で解決するものとします。当社は、これらの紛争等については、一切の法的義務を負わないものとします。",
    },
    {
      title: "第6条 利用料金",
      content:
        "1.本サービスに係る利用料金は、担当医師がオンライン診療の際にユーザーに提示した料金（以下、「本サービス利用料」といいます。）であり、ユーザーは、本サービス利用料を、当社に当社が指定する方法で支払うものとします。\n2.本サービス利用料は、本サービスを通じて掲載医療機関より提供されるオンライン診療に係る診療報酬（医薬品購入代金を含みます。）、医薬品等の配送料の合計額となります。本サービス利用料のうち、診療報酬（医薬品購入代金を含みます。）については、当社が掲載医療機関より弁済の代理受領に係る委託を受けて請求するものであり、当社が診療等や医薬品の販売を行っているものではありません。\n3.ユーザーは、本サービスを通じたオンライン診療について、掲載医療機関が診療報酬（医薬品購入代金を含みます。）に係る弁済の受領権限を当社に授与することにあらかじめ同意するものとします。\n4.当社は、ユーザーの医療機関に対する紹介料や仲介費用はいただいておりません。\n5.本サービス利用料のうち、事前に確定できるものについては本サイト上に原則明示します。ただし、ユーザーの健康状況等によってオンライン診療の内容や処方内容・医薬品の処方日数や購入費用等が異なってくるため、診療前に金額を完全に確定することはできません。\n6.医薬品の処方は、担当医師が医薬品の処方を行うものであり、ユーザーによる医薬品の決定はできません。また、本サイト上に表示がされていない医薬品については、担当医師の判断にかかわらず、本サービスで取り扱うことはできません。\n7.担当医師によるオンライン診療終了後の、処方された医薬品の返品・交換・キャンセルは出来ません。\n8.本サービス利用料の支払いは、サイト上で提示される決済方法よりユーザーが選択する方法により行われます。ユーザーが選択した決済手段による支払いが適切に完了しなかった場合、当社は、ユーザーによる本サービスの利用を停止させることができるものとします。\n9. 確定したご予約をユーザーの都合で診察予定日時から24時間以内でキャンセルする場合、キャンセル料を請求する場合があります。",
    },
    {
      title: "第7条 禁止事項・損害賠償",
      content:
        "1.ユーザーは、以下の各行為を行ってはならないものとします。\n①当社、掲載医療機関及び担当医師に対し、虚偽の情報を提供する行為\n②他人の名義を使用し、または、他人に薬剤を譲渡する目的で、本サービスを利用する行為\n③本サービスの利用に関し、自らまたは第三者のために不正な利益を得ようとする行為\n④他人の知的財産権、プライバシーに関する権利、その他の権利または利益を侵害する行為\n⑤コンピューター・ウイルスその他の有害なコンピューター・プログラムを含む情報を送信する行為\n⑥個人や団体を誹謗中傷する行為\n⑦本サービスで得た情報を本サービスの利用目的の範囲を超えて第三者に譲渡する行為、または営利目的で譲渡する行為\n⑧公序良俗に反する行為\n⑨法令に反する一切の行為\n⑩本サービスの運営を妨げる行為\n⑪その他本サービスの提供を継続することが困難となると当社が判断する一切の行為\n⑫許可のない診療の録音録画、診療内容の公示する行為\n2.ユーザーが本規約の各条項に違反し、当社に対して損害を与えた場合は、ユーザーは当社に対し損害賠償義務を負うものとします。",
    },
    {
      title: "第8条 情報の変更・削除、本契約の解除等",
      content:
        "当社は、ユーザーが本規約に違反する行為をし、もしくはその行為をする恐れがある場合、ユーザーによる本サービスの利用が不適切であると当社が判断する場合、ユーザーによる本サービスの利用により本サービスの運営に支障が生じると当社が判断する場合、当該ユーザーに何ら事前の通知をすることなく以下の措置を講じることができるものとします。なお、当社はユーザーに対し、下記の措置を講じる理由について説明する義務を負いません。\n①ユーザーが本サービスにおいて登録した情報の全部または一部についての変更または削除\n②本契約の解除およびそれに伴う本サービス利用の停止、または本サービスのユーザーとしての登録の抹消\n③その他当社が必要と認める措置",
    },
    {
      title: "第9条 サービス停止・終了等 ",
      content:
        "当社は、以下のいずれかに該当する事由によりユーザーへの事前の通知および承諾を要することなく、本サービスを停止または終了することができます。\n①本サービス運営のためのシステムの保守、更新等を定期的または臨時に行う場合\n②ウィルス被害、火災、停電、天災地変などの不可抗力により、本サービスの提供が困難となった場合\n③本システムの不具合について対策を講じる必要がある場合\n④法令等の改正、成立により本サービスの運営が困難となった場合\n⑤その他、当社が本サービスの提供の停止・終了が必要と判断した場合",
    },
    {
      title: "第10条 免責",
      content:
        "1.当社は、ユーザー等が本サービスに登録し掲載する情報等に関し、内容の正確性、有用性、完全性等について何らの保証をしないものとします。\n2.当社は、本サービスの利用に関し、以下のことを保証しないものとします。\n①サービスが中断しないこと\n②本サービスにエラーが生じないこと\n③本サービスの利用に関し通信回線等の障害がないこと\n④本サイト上のコンテンツに関する盗用、毀損または改ざんがないこと\n⑤本サイトに対する不正アクセス・ハッキング等のサイバー攻撃がないこと\n⑥商品発送後の責任（配達事故や遅延）\n3.当社は、当社によるユーザー情報の変更、削除または消失、本サービスの内容の変更、本サービスの提供の停止または終了、本サービスの利用不能、本サービスの利用によるデータの消失または機器の故障若しくは損傷、その他本サービスに関連してユーザーが被った損害につき、一切責任を負わないものとします。\n4.第8条の規定により、ユーザーの情報が変更または削除された場合、本契約が解除された場合、本サービス内容が変更された場合、または本サービスが停止・終了した場合においても、ユーザーと担当医師またはその所属する掲載医療機関との間で成立する診療契約の内容に影響を及ぼすものではありません。\n5.当社は、ユーザーによる本サービスの利用により、ユーザーの疾病または疾患が治癒することを保証するものではなく、また、担当医師またはその所属する掲載医療機関がユーザーの診療を開始・継続することを保証するものではありません。\n6.当社は、当社に故意または重過失がある場合を除き、ユーザーの本サービスへの登録および本サービスの利用から生じる一切の損害に関して、責任を負わないものとします。\n7. 当社が本サービスに関してユーザーに対して損害賠償責任を負うべき場合でも、当社の責任はユーザーに現実に生じた直接損害に限られ、また、当社がユーザーに対して賠償する損害の累計額は、当社が本サービスに関連して当該ユーザーから受領した本サービス利用料の合計額を上限とします。",
    },
    {
      title: "第11条 暴力団等排除条項",
      content:
        "1.ユーザーは現在、暴力団、暴力団員、暴力団員でなくなった時から5年を経過しない　者、暴力団準構成員、暴力団関係企業、総会屋等、社会運動等標ぼうゴロまたは特殊知能暴力団等、その他これらに準ずる者(以下、これらを「暴力団員等」といいます。)に該当しないことを表明し、かつ将来にわたっても該当しないことを確約するものとします。\n2.ユーザーは自らまたは第三者を利用して次の各号の一にでも該当する行為を行わないことを確約するものとします。\n①暴力的な要求行為\n②法的な責任を超えた不当な要求行為\n③取引に関して、脅迫的な言動をし、または暴力を用いる行為\n④風説を流布し、偽計を用いまたは威力を用いて、当社、他の利用者、その他第三者の信用を毀損し、または当社、他の利用者、その他第三者の業務を妨害する行為\n⑤その他前各号に準ずる行為",
    },
    {
      title: "第12条 提供情報の利用 ",
      content:
        "1.本サービスにおける個人情報の取り扱いについては、当社の定める「プライバシーポリシー」に従うものとします。ユーザーは、本サービスを利用する場合には、最新の本規約及びプライバシーポリシーの各規定に従うことを承諾して利用するものとします。\n2.当社は、本サービスを提供する上でユーザーにとって必要な情報を、ユーザーに対し、Eメール、郵便、電話、対面、本サイト内のチャット等での伝達等によって連絡をすることができるものとします。\n3.当社は、個人情報を抽出・集計等することにより、特定のユーザーとの対応関係が排斥された統計情報を作成することがあり、当社は、かかる統計情報を、当社の定める「プライバシーポリシー」で定義される個人情報を含まない限りにおいて、自由に利用することができるものとします。これらの情報に関わる知的財産権は当社が保有するものとします。",
    },
    {
      title: "第13条 規約の変更 ",
      content:
        "1.当社は、ユーザーの承諾を得ることなく、本規約を随時変更することができ、変更は末尾記載の改定日より効力を生じるものとします。\n2.当社は、本規約を変更したときは、速やかに、本サイト上に変更後の本規約を掲載します。",
    },
    {
      title: "第14条 地位譲渡",
      content:
        "1.ユーザーは、当社の書面による事前の承諾なく、本規約に基づく権利または義務につき、第三者に対し、譲渡、移転、担保設定、その他の処分をすることはできません。\n2.当社が本サービスにかかる事業を第三者に譲渡する場合には、ユーザーの承諾を得ることなく、当該事業譲渡に伴い、本規約に基づく権利および義務並びにユーザーの登録情報その他の顧客情報等を含む本契約上の地位を当該事業譲渡の譲受人に譲渡することができるものとします。なお、このことは、事業譲渡のみならず、会社分割その他事業が移転するあらゆる場合においても同様とします。",
    },
    {
      title: "第15条 準拠法及び管轄裁判所",
      content:
        "本サービスおよび本規約を含む本契約の準拠法は日本法とします。本サービスおよび本規約を含む本契約に関して生じる一切の紛争については、東京地方裁判所または東京簡易裁判所を第1審の専属的合意管轄裁判所とします。",
    },
    {
      title: "",
      content: "2022年6月制定",
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <Headercomponent />
      <TabHeaderComponent />
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{backgroundColor: colors.backgroundTheme}}>
          <View style={{padding: 40, flexDirection: "column"}}>
            <View style={{alignItems: "center", marginBottom: 40}}>
              <Text style={{fontWeight: "700", fontSize: 32, lineHeight: 48, color: colors.textHiragino}}>利用規約</Text>
            </View>
            {container.map((item, index) => {
              return (
                <View key={index} style={{marginBottom: 30}}>
                  <Text style={{color: colors.textBlack, lineHeight: 21, fontWeight: "600"}}>{container[index].title}</Text>
                  <Text style={{lineHeight: 21, color: colors.textHiragino}}>{container[index].content}</Text>
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
