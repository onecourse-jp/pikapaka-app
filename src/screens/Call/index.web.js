import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, StyleSheet } from 'react-native';
// import RNCallKeep from 'react-native-callkeep';
// import LinearGradient from 'react-native-linear-gradient';
import Image from '@components/Image';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Space from '@components/Space';
import RoundButton from '@components/RoundButton';
import RingAnimated from '@components/RingAnimated';
const CONNECTION_STATE = {
  INIT: 'INIT',
  WAITING: 'WAITING',
  CONNECT: 'CONNECT',
  MISSING: 'MISSING',
  ERROR: 'ERROR',
};
export default function ScreenCall({ navigation, route }) {
  const { user } = route.params;
  const [isInit, setIsInit] = useState(false);
  const [statusConnection, setStatusConnect] = useState(CONNECTION_STATE.INIT);
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: '', headerTransparent: true });
  }, [navigation]);

  useEffect(() => {
    if (!isInit) {
      console.log('=====> socket calling');
      global.socket?.emit('CALLING', { partnerId: user.id }, (r) => {
        if (r.code === 0) {
          setStatusConnect(CONNECTION_STATE.WAITING);
        }
        console.log('CALLING callback', r);
      });
    }
    // try {
    //   InCallManager.start({ media: 'audio' });
    //   InCallManager.setForceSpeakerphoneOn(true);
    //   InCallManager.setSpeakerphoneOn(true);
    // } catch (err) {
    //   console.log('InApp Caller ---------------------->', err);
    // }
    // console.log('setuo screencall');
    // const options = {
    //   ios: {
    //     appName: 'Aishite',
    //   },
    //   android: {
    //     alertTitle: 'Permissions required',
    //     alertDescription:
    //       'This application needs to access your phone accounts',
    //     cancelButton: 'Cancel',
    //     okButton: 'ok',
    //     imageName: 'phone_account_icon',
    //     additionalPermissions: [PermissionsAndroid.PERMISSIONS.example],
    //     // Required to get audio in background when using Android 11
    //     foregroundService: {
    //       channelId: 'com.company.my',
    //       channelName: 'Foreground service for my app',
    //       notificationTitle: 'My app is running on background',
    //       notificationIcon: 'Path to the resource icon of the notification',
    //     },
    //   },
    // };
    // RNCallKeep.setup(options).then((accepted) => {
    //   console.log('call keep set up   =>', accepted);
    //   RNCallKeep.setAvailable(true);
    //   RNCallKeep.displayIncomingCall(
    //     'c5612146-3e43-4922-bdf2-13b0c2cb2243',
    //     '5558909659',
    //     'Some User',
    //     undefined,
    //     true,
    //   );
    // });
  }, []);
  return (
    // <LinearGradient
    //   colors={['#FF7840', '#F15D69', '#E3496A']}
    //   style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{}}>
            <View
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                top: '50%',
              }}>
              <RingAnimated />
            </View>
            <Image
              source={{
                uri: user?.profile?.avatarImage?.imageUrl,
              }}
              style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
              placeholder={require('@assets/images/avatar_default.png')}
            />
          </View>

          <Text style={styles.name}>{user.profile.nickName}</Text>
        </View>
        <View style={styles.bottomView}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 40,
              marginTop: 40,
            }}>
            <RoundButton
              active
              source={require('@assets/images/ic_volume_up.png')}
            />
            <RoundButton
              source={require('@assets/images/btn_record_voice.png')}
            />
            <RoundButton
              activeBackgroundColor="red"
              active={true}
              source={require('@assets/images/ic_callend_notifbar.png')}
            />
          </View>
        </View>
      </View>
    // </LinearGradient>
  );
}
const styles = StyleSheet.create({
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatar: { width: 48, height: 48, borderRadius: 48 / 2, alignSelf: 'center' },
  name: { fontSize: 22, marginTop: 10, color: 'white' },
  lastMessages: { fontWeight: 'normal', lineHeight: 24 },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  bottomView: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 200,
    justifyContent: 'flex-start',
  },
});
