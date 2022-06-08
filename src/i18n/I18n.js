// @flow
import I18n from "i18n-js";
// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true;
I18n.defaultLocale = "en";
// I18n.locale = "ja";
// English language is the main language for fall back:
// console.log("call settings", I18n);

I18n.translations = {
  en: {...I18n.translations["ja"], ...require("./languages/ja.json")},
  vi: {...I18n.translations["vi"], ...require("./languages/vi.json")},
};

let languageCode = I18n.locale.substr(0, 2);
