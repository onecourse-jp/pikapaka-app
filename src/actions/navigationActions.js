/*
 * Reducer actions related with navigation
 */
import * as NavigationService from 'src/navigation/NavigationService';
import {SCREEN_MAIN} from '@screens/screens.constants';

export function navigateToHome(params) {
  NavigationService.navigate('Home', params);
}
export function navigateToOTPRegister(params) {
    NavigationService.navigate('OTPRegister', params);
}
export function navigateToWelcome(params) {
  if(params === 'Home'){
    NavigationService.navigate(SCREEN_MAIN, params);
  }else{
    NavigationService.navigate('Welcome', params);
  }
}
export function navigateToOTP(params){
  NavigationService.navigate('OTP', params);
}
export function navigationAlert(params){
  NavigationService.navigate('Modal', params);
}
