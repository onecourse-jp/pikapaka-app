import * as types from './types';
// import I18n from "src/i18n";
import I18n from 'i18n-js';

export function getMasterDataRequest(response) {
  return {
    type: types.GET_MASTER_DATA_REQUEST,
    response,
  };
}
export function getMasterDataSuccess(response) {
  return {
    type: types.GET_MASTER_DATA_SUCCESS,
    response,
  };
}
export function masterDataFailed(response) {
  return {
    type: types.GET_MASTER_DATA_FAILED,
    response,
  };
}
export function masterDataProcess(data) {
  let mapData = {};
  data.forEach((el) => {
    const newEl = Object.assign({}, el);

    newEl.selectionKeys.forEach((ell) => {
      newEl[ell.id] = ell;
      if (ell.selectionKey) {
        const objVN = {};
        objVN[ell.selectionKey] = ell.selectionTextVn;
        const objJP = {};
        objJP[ell.selectionKey] = ell.selectionTextJp;
        I18n.translations['vi'] = { ...I18n.translations['vi'], ...objVN };
        I18n.translations['ja'] = { ...I18n.translations['ja'], ...objJP };
      }
    });
    if (newEl.attributeKey) {
      const objVN = {};
      objVN[newEl.attributeKey] = newEl.attributeNameVn;
      const objJP = {};
      objJP[newEl.attributeKey] = newEl.attributeNameJp;
      // console.log("objVN", objVN, objJP);
      I18n.translations['vi'] = { ...I18n.translations['vi'], ...objVN };
      I18n.translations['ja'] = { ...I18n.translations['ja'], ...objJP };
    }

    mapData[el.attributeKey] = newEl;
  });
  // console.log(
  //   "I18n",
  //   I18n.translations["vi"],
  //   I18n.translations["ja"],
  //   I18n.translations
  // );
  // console.log("I18nt", I18n.t("fukushima"));
  // console.log("mapDataACCCC", mapData);

  return {
    type: types.PROCESS_MASTER_DATA,
    mapData,
    process: true,
  };
}
