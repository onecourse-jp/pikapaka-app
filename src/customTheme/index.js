import React from "react";
import {ThemeProvider, createThemeData} from "react-native-theme-component";

export const yourThemeData = createThemeData({
  fonts: {
    SFregular: "NotoSansJP-Regular",
    SFbold: "NotoSansJP-Regular",
    SFmedium: "NotoSansJP-Regular",
    NSregular: "NotoSansJP-Regular",
    NSbold: "NotoSansJP-Bold",
    NSmedium: "NotoSansJP-Medium",
    PFregular: "PingFang-Regular",
    PFbold: "PingFang-Bold",
    PFmedium: "PingFang-Medium",
    Hiragino: "Hiragino Kaku Gothic Pro W3",
    Futura: "Futura",
    FuturaBold: "Futura-Bold",
    FuturaMedium: "Futura-Medium",
    RobotoMedium: "Roboto-Medium",
    RobotoBold: "Roboto-Bold",
    RobotoRegular: "Roboto-Regular",
  },
  colors: {
    primaryColor: "#333333",
    mainBackgroundColor: "#F7F9F8",
    secondaryButtonLabelColor: "#000000",
    primaryButtonColor: "#EA9649",
    textBlack: "#000000",
    textYellow: "#FBCD39",
    textRed: "#F15F5F",
    textGray: "#939598",
    textGreen: "#4AAB8D",
    textBlue: "#2D9CDB",
    textPlaceholder: "#BBBBBB",
    white: "#fff",
    bgComponent: "#1F2935",
    bgComponent2: "#283644",
    bgComponent3: "#707070",
    gray1: "#333333",
    gray3: "#828282",
    gray4: "#BDBDBD",
    gray5: "#E0E0E0",
    gray6: "#F2F2F2",
    gray7: "#9F9FA4",
    headerComponent: "#00B050",
    colorHome05: "rgba(0, 176, 80, 0.5)",
    TabHeaderComponent: "rgba(25, 111, 185, 0.5)",
    mainBgTop: "#D1E2F1",
    textHiragino: "#575967",
    textHiragino05: "rgba(87, 89, 103, 0.5)",
    textDecorationColor: "rgba(25, 111, 185, 0.2)",
    bgBenefitItemComponent: "#eeeef0",
    dotItem: "rgba(25, 111, 185, 0.7)",
    bgSkincare: "#F1E0F0",
    buttonSkincare: "#D198CC",
    buttonED: "#7B8ED2",
    colorSkincare07: "rgba(209, 152, 204, 0.7)",
    colorSkincare05: "rgba(209, 152, 204, 0.5)",
    colorSkincare04: "rgba(209, 152, 204, 0.4)",
    colorSkincare02: "rgba(209, 152, 204, 0.2)",
    bgEmptyImage: "#C4C4C4",
    bdPaymentStatusFalse: "#FFA39E",
    bgPaymentStatusFalse: "#FFF1F0",
    textPaymentStatusFalse: "#F5222D",
    bdPaymentStatusTrue: "#B7EB8F",
    bgPaymentStatusTrue: "#F6FFED",
    textPaymentStatusTrue: "#52C41A",
    paginationCurentPage: "#1890FF",
    bgDiet: "rgba(43, 185, 185, 0.3)",
    textDiet: "rgba(43, 185, 185, 1)",
    textDiet04: "rgba(43, 185, 185, 0.4)",
    textDiet05: "rgba(43, 185, 185, 0.5)",
    textDiet02: "rgba(43, 185, 185, 0.2)",
    textDiet07: "rgba(43, 185, 185, 0.7)",
    textDiet09: "rgba(43, 185, 185, 0.9)",
    bgDietText: "#2BB9B9",
    bgDietListMedicine: "rgba(43, 185, 185, 0.2)",
    bgDietListMedicine2: "rgba(87, 89, 103, 0.1)",
    colorPill: "#DBCF5F",
    bgEd: "#D7DDF2",
    colorEd01: "#CAD2ED",
    dotEd: "#A3B0DF",
    colorED: "#7B8ED2",
    colorED07: "rgba(123, 142, 210, 0.7)",
    colorED05: "rgba(123, 142, 210, 0.5)",
    colorPill03: "rgba(219, 207, 95, 0.3)",
    colorPill02: "rgba(219, 207, 95, 0.2)",
    colorPill04: "rgba(219, 207, 95, 0.4)",
    colorPill05: "rgba(219, 207, 95, 0.5)",
    colorPill07: "rgba(219, 207, 95, 0.7)",
    colorAGA: "#8FC576",
    colorAGA01: "#8FC576",
    colorAGA02: "rgba(143, 197, 118, 0.2);",
    colorAGA03: "rgba(143, 197, 118, 0.3);",
    colorAGA04: "rgba(143, 197, 118, 0.4);",
    colorAGA05: "rgba(143, 197, 118, 0.5);",
    colorAGA07: "rgba(143, 197, 118, 0.7);",
    buttonBocking: "#EA9649",
    textColorAnswer: "#C14646",
    borderFaqType1: "#00B050",
    textColorAnswer: "#C14646",
    borderFaqType2: "#D198CC",
    backGroundFaqType2: "rgba(209, 152, 204, 0.1)",
    borderFaqType3: "#69CDCD",
    backGroundFaqType3: "rgba(105, 205, 205, 0.1)",
    borderFaqType4: "#DBCF5F",
    backGroundFaqType4: "rgba(219, 207, 95, 0.1)",
    borderFaqType5: "#7B8ED2",
    backGroundFaqType5: "rgba(123, 142, 210, 0.1)",
    borderFaqType6: "#8FC576",
    backGroundFaqType6: "rgba(143, 197, 118, 0.1)",
    lineGray02: "rgba(87, 89, 103, 0.2)",
    borderBottomNews: "rgba(87, 89, 103, 0.2)",
    backGroundFaqType1: "rgba(0, 176, 80, 0.1)",

    textConnectDoctor: "rgba(0, 0, 0, 0.85)",
    bgConnectDoctor: "#FFFBE6",
    bdConnectDoctor: "#FFE58F",
    bgWaitBlack: "rgba(17, 17, 17, 0.8)",

    grayC: "#CCCCCC",
    textBlackProfile: "#092238",

    colorHome10: "rgba(0, 176, 80, 1)",
    colorHome07: "rgba(0, 176, 80, 0.7)",
    colorHome02: "rgba(0, 176, 80, 0.2)",
    colorHome04: "rgba(0, 176, 80, 0.4)",

    colorRedEditCalendar: "#F15F5F",

    colorGreenEditCalendar3: "#B7EB8F",
    colorGreenEditCalendar1: "#F6FFED",
    colorTextBlack: "#555555",
    backgroundFacebookLogin: "#1877F2",
    backgroundLineLogin: "#06C755",
    backgroundTheme: "#F7F9F8",
    serviceStep: "#FFFBE7",
    accentOrange: "#EA9649",
    bgAccentOrange: "#FDEFE0",
    borderGrayE: "#EEEEEE",
  },
  button: {
    primaryLabelStyle: {fontSize: 14, fontFamily: "NotoSansJP-Bold", fontWeight: "600"},
    primaryContainerStyle: {borderRadius: 4, height: 46},
    mainLabelStyle: {fontSize: 16, fontFamily: "NotoSansJP-Bold"},
    secondaryContainerStyle: {borderRadius: 8, height: 46, fontWeight: "600", borderColor: "#DDDDDD", borderWidth: 1},
    secondaryLabelStyle: {fontSize: 14, fontFamily: "NotoSansJP-Regular"},
  },
  alert: {},
  bottomSheet: {},
  inputField: {},
  inputPhoneNumber: {},
  errorModal: {},
  countryPicker: {},
  datePicker: {},
  imagePicker: {},
  checkBox: {},
});
