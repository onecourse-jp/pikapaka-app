import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
// import RNCallKeep from 'react-native-callkeep';
import { PermissionsAndroid, Platform } from 'react-native';
import CallInComing from '@components/CallUI/CallInComing';
// import InCallManager from 'react-native-incall-manager';
import { dataVibrate } from '@data/index';

export default function handleCalling(remoteMessage, isBackground = true) {
  console.log('handleCalling', remoteMessage);

  console.log('show icomming call');
  const options = {
    ios: {
      appName: 'Tcare',
    },
    android: {
      alertTitle: 'Permissions required',
      alertDescription: 'This application needs to access your phone accounts',
      cancelButton: 'Cancel',
      okButton: 'ok',
      imageName: 'phone_account_icon',
      // additionalPermissions: [PermissionsAndroid.PERMISSIONS.example],
      // Required to get audio in background when using Android 11
      foregroundService: {
        channelId: 'com.company.my',
        channelName: 'Foreground service for my app',
        notificationTitle: 'My app is running on background',
        notificationIcon: 'Path to the resource icon of the notification',
      },
      // selfManaged: true,
    },
  };
  // RNCallKeep.setup(options)
  //   .then((accepted) => {
  //     console.log('call keep set up   =>', accepted);
  //     RNCallKeep.setAvailable(true);
  //     // RNCallKeep.displayIncomingCall(
  //     //   remoteMessage.data.callId,
  //     //   remoteMessage.data.email,
  //     //   remoteMessage.data.name || 'Some User',
  //     //   'email',
  //     //   true,
  //     // );
  //     // const ONE_SECOND_IN_MS = 1000;
  //     // const PATTERN = [
  //     //   1 * ONE_SECOND_IN_MS,
  //     //   2 * ONE_SECOND_IN_MS,
  //     //   3 * ONE_SECOND_IN_MS
  //     // ];
  //     // InCallManager.startRingtone('_DEFAULT_', dataVibrate);
  //     let showCallUi = global.toast.show('aaaaaa', {
  //       placement: 'top',
  //       duration: 600000,
  //       animationType: 'slide-in',
  //       offsetTop: 0,
  //       offset: 0, // offset for both top and bottom toasts
  //       swipeEnabled: false,
  //       renderToast: (toastOptions) => {
  //         return (
  //           <CallInComing
  //             remoteMessage={remoteMessage}
  //             cancelToast={() => {
  //               // InCallManager.stopRingtone();
  //               global.toast.hide(showCallUi);
  //             }}
  //           />
  //         );
  //       },
  //     });
  //     // if (!global.callObject) global.callObject = {};
  //     // global.callObject[remoteMessage.data.callId] = remoteMessage;
  //     RNCallKeep.addEventListener('answerCall', ({ callUUID }) => {
  //       // Do your normal `Answering` actions here.
  //       // console.log('answer call ', callUUID, remoteMessage);

  //       global.showCallScreen(remoteMessage);
  //       if (Platform.OS === 'android') {
  //         RNCallKeep.endCall(callUUID);
  //         // RNCallKeep.showIncomingCallUi(callUUID);
  //       }
  //       // RNCallKeep.backToForeground();
  //     });
  //     // RNCallKeep.addEventListener('showIncomingCallUi', ({ callUUID }) => {
  //     //   // Do your normal `Answering` actions here.
  //     //   // console.log('answer call ', callUUID, remoteMessage);
  //     //   // global.showCallScreen(remoteMessage);
  //     //   console.log('show incoming call ui');
  //     // });
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  // else {
  //   global.showCallScreen(remoteMessage);
  // }
}
