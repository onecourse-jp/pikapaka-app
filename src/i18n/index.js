import {I18nManager} from "react-native";
import I18n from "i18n-js";
import memoize from "lodash.memoize";

const missingTranslationRegex = /^\[missing ".*" translation\]$/;

// This function is a wrapper to avoid exception wich leads in a crash
const translateOrFallback = (initialMsg, options) => {
  // We tried to translate something else than a string
  // The native I18n function will simply crash instead of rejecting the attempt with an error message
  if (typeof initialMsg !== "string") {
    __DEV__ && console.log(`I18n: you must give a string to translate instead of "${typeof initialMsg}"`);

    return ""; // We don't return any message as we don't know what to send
  }

  let localMsg = I18n.t(initialMsg, options);

  // The translation does not exist, the default message is not very sexy
  // Instead we return the message we tried to translate
  if (missingTranslationRegex.test(localMsg)) {
    __DEV__ && console.log(`translation "${initialMsg}" does not exists in translations files`);

    return initialMsg;
  }

  return localMsg;
};
const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  ja: () => require("./languages/ja.json"),
  vi: () => require("./languages/vi.json"),
};
export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);
const setI18nConfig = (codeLang = null) => {
  console.log("call set I18n config");
  // fallback if no available language fits
  const fallback = {languageTag: "ja", isRTL: false};
  const lang = codeLang ? {languageTag: codeLang, isRTL: false} : null;

  const {languageTag, isRTL} = lang ? lang : fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  I18n.fallbacks = true;
  // set i18n-js config
  I18n.translations = {[languageTag]: translationGetters[languageTag]()};
  I18n.locale = languageTag;
  console.log("languageTag", languageTag);

  return languageTag;
};

export default {
  ...I18n,
  t: translateOrFallback,
  settingLocale: setI18nConfig,
};
