import * as types from './types';
import I18n from 'src/i18n';
export function getUserInfo() {
  return {
    type: types.GET_PROFILE_USER,
  };
}
export function updateUserProfile(data) {
  return {
    type: types.UPDATE_PROFILE,
    payload: data,
  };
}

export function updateLikeCount(data) {
  return {
    type: types.UPDATE_LIKE_COUNT,
    payload: data,
  };
}

export function updatePaymentStatus(data) {
  return {
    type: types.UPDATE_PAYMENT_STATUS,
    payload: data,
  };
}
