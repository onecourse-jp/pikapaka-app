import * as types from "./types";

export function OTPRegisterRequest(token, code, screen) {
  return {
    type: types.OTP_REGISTER_REQUEST,
    token: token,
    code: code,
    screen: screen
  };
}
export function OTPRegisterSuccess(response) {
  return {
    type: types.OTP_REGISTER_SUCCESS,
    response,
  };
}
export function OTPRegisterFailed(error) {
  return {
    type: types.OTP_REGISTER_FAILED,
    error,
  };
}
