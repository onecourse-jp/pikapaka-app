import { StackActions } from '@react-navigation/routers';
import * as React from 'react';

// NavigationConatiner is refered here - Check NavigationStack
export const navigationRef = React.createRef();

export function navigate(name, params) {
  // console.log('navigate', name, params,navigationRef.current);
  navigationRef.current?.navigate(name, params);
}

export function getCurrentRoute() {
  // console.log('get current route',navigationRef.current);
  return navigationRef.current?.getCurrentRoute();
}

export function goBack() {
  // console.log('goback',navigationRef.current);
  navigationRef.current?.goBack();
}

export function dispatch(payload) {
  // console.log('dispatch', payload,navigationRef.current);
  navigationRef.current?.dispatch(payload);
}

export function push(name, params) {
  // console.log('push', name, params,navigationRef.current);
  navigationRef.current &&
    navigationRef.current.dispatch(StackActions.push(name, params));
  // note: this does not auto fallback to navigate and will crash if push is not possible
  // navigationRef.current?.push(name, params);
}
export function replace(name, params) {
  console.log('replace', name, params, navigationRef.current);
  navigationRef.current &&
    navigationRef.current.dispatch(StackActions.replace(name, params));
  // note: this does not auto fallback to navigate and will crash if push is not possible
  // navigationRef.current?.push(name, params);
}
export default {
  navigate,
  push,
  getCurrentRoute,
  dispatch,
  goBack,
  replace,
};
