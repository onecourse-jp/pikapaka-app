import * as RootNavigator from 'src/navigation/NavigationService';
import { CommonActions } from '@react-navigation/native';
import {
  SCREEN_MAIN,
  SCREEN_CAMERA,
  SCREEN_WEB_VIEW,
  SCREEN_WELCOME,
  SCREEN_CALL,
  IMAGE_PICKER,
} from '../screens/screens.constants';
import { setAuthority } from './authority';
import { Platform, Linking } from 'react-native';
import showImagePicker from 'src/screens/ImagePicker';
// import notifee, { AndroidImportance } from '@notifee/react-native';
export const goToMain = () => {
  if (Platform.OS === 'web') {
    RootNavigator.navigate(SCREEN_MAIN);
    return;
  }
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: SCREEN_MAIN }],
  });
  RootNavigator.dispatch(resetAction);
};
export const goToWelcome = () => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: SCREEN_WELCOME }],
  });
  RootNavigator.dispatch(resetAction);
};
export const showAlertModel = (payload) => {
  RootNavigator.navigate('Modal', payload);
};
export const showConfirmModal = (payload) => {
  if (Platform.OS === 'web') RootNavigator.push('CustomModal', payload);
  else RootNavigator.navigate('CustomModal', payload);
};
export const showConfirmModal2 = (payload) => {
  if (Platform.OS === 'web') RootNavigator.push('CustomModal2', payload);
  else RootNavigator.navigate('CustomModal2', payload);
};
export const executeWithLoader = (startAction, options) => {
  RootNavigator.navigate('LoaderModal', {
    startAction,
    ...options,
  });
};
export const showLoadingView = (options) => {
  if (Platform.OS === 'web') RootNavigator.push('LoadingView', options ?? {});
  else RootNavigator.navigate('LoadingView', options ?? {});
};
export const hideLoadingView = () => {
  console.log('navi', RootNavigator?.getCurrentRoute()?.name);
  if (RootNavigator?.getCurrentRoute()?.name === 'LoadingView') {
    RootNavigator.goBack();
  }
  // RootNavigator.goBack();
};
export const showCamera = (options, callback) => {
  RootNavigator.navigate(SCREEN_CAMERA, {
    callback,
    ...options,
  });
};
export const showImagePickerView = (options, callback) => {
  RootNavigator.navigate(SCREEN_CAMERA, {
    callback,
    ...options,
    showPicker: true,
  });
};
export const showPickerView = (options, callback) => {
  if (Platform.OS !== 'web')
    RootNavigator.navigate(IMAGE_PICKER, {
      callback,
      ...options,
    });
  else showImagePicker({ navigation: RootNavigator, options, callback });
};
export const showWebView = (options) => {
  if (Platform.OS !== 'web') {
    if (options?.defaultWebApp) {
      Linking.openURL(options.url, '_blank');
    } else {
      RootNavigator.navigate(SCREEN_WEB_VIEW, options);
    }
  } else {
    console.log(options.url);
    const urlToOpen = new URL(options.url).toString();
    // window.open(urlToOpen);
    Linking.openURL(options.url, '_blank');
    // window.location.href = options.url;
  }
};
export const processSignIn = async (data) => {
  await setAuthority(data);
  if (data.profile || (data.user && data.user.profile)) {
    goToMain();
  } else {
    goToWelcome();
  }
};
export const showCallScreen = async (remoteMessage) => {
  RootNavigator.navigate(SCREEN_CALL, { remoteMessage });
};

export const showFirstMessagePicker = async (onOkCallback) => {
  RootNavigator.navigate('FirstMessagePicker', { onOkCallback });
};

export const showNotification = async (title, body) => {
  // const channelId = await notifee.createChannel({
  //   id: 'default',
  //   name: 'Default Channel',
  // });
  // // Display a notification
  // await notifee.displayNotification({
  //   title: 'Notification Title',
  //   body: 'Main body content of the notification',
  //   android: {
  //     channelId,
  //     importance: AndroidImportance.HIGH,
  //     asForegroundService: true,
  //     localOnly: true,
  //   },
  //   ios: {
  //     foregroundPresentationOptions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },
  //     notificationCenter: false,
  //   },
  // });
};
global.goToMain = goToMain;
global.showAlertModel = showAlertModel;
global.showConfirmModal = showConfirmModal;
global.showCamera = showCamera;
global.showWebView = showWebView;
global.showConfirmModal2 = showConfirmModal2;
global.processSignIn = processSignIn;
global.showPickerView = showPickerView;
global.showImagePickerView = showImagePickerView;
global.executeWithLoader = executeWithLoader;
global.showLoadingView = showLoadingView;
global.hideLoadingView = hideLoadingView;
global.showCallScreen = showCallScreen;
global.showNotification = showNotification;
global.showFirstMessagePicker = showFirstMessagePicker;