import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '@config/styles';
import AppText from '@config/constants';
import { useNavigation } from '@react-navigation/native';
import SortDataSearch from '@screens/Search/components/SortDataSearch';
// import messaging from '@react-native-firebase/messaging';
import { INIT_FORM_SEARCH } from '@actions/types';
import SearchOutlineIcon from '@components/svg/icons/SearchOutlineIcon';
import SearchOutlineActiveIcon from '@components/svg/icons/SearchOutlineActiveIcon';
import HistoryOutlineIcon from '../components/svg/icons/HistoryOutlineIcon';
import HistoryOutlineActiveIcon from '../components/svg/icons/HistoryOutlineActiveIcon';
import LikeOutlineActiveIcon from '../components/svg/icons/LikeOutlineActiveIcon';
import LikeOutlineIcon from '../components/svg/icons/LikeOutlineIcon';
import ChatOutlineActiveIcon from '../components/svg/icons/ChatOutlineActiveIcon';
import ChatOutlineIcon from '../components/svg/icons/ChatOutlineIcon';
import OtherOutlineActiveIcon from '../components/svg/icons/OtherOutlineActiveIcon';
import OtherOutlineIcon from '../components/svg/icons/OtherOutlineIcon';
import SearchStack from './SearchStack';
import ProfileStack from './ProfileStack';
import {
  SCREEN_CHAT,
  SCREEN_LIKE,
  SCREEN_PROFILE,
} from '../screens/screens.constants';
import { navigationRef } from 'src/navigation/NavigationService';
import { LikeScreen } from '../screens/Like';
import AsyncStorage from '@react-native-community/async-storage';
import ChatScreen from '../screens/Chat';
import { HistoryScreen } from '../screens/History';
import I18n from '../i18n';
import Config from 'react-native-config';
import { getAuthority } from '@utils/authority';
import { CHAT_DATA, USER_OFFLINE } from '@screens/Chat/chat.constant';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_CHAT_DATA } from '../actions/types';
// let messaging;
// if (Platform.OS !== 'web') {
//   messaging = require('@react-native-firebase/messaging');
// }
// import messaging from '@react-native-firebase/messaging';
import { getMe } from '../services/profile';
import { UPDATE_PROFILE } from '@actions/types';
import { defaultStackNavigation } from '@config/navigations';
import { io } from 'socket.io-client';
import { updateLikeCount } from '../actions/users';
import {
  CHAT_DATA_FRIEND,
  FRIEND_MESSAGES,
  JOIN_FRIEND,
} from '../screens/Chat/chat.constant';
import { CALLING_ALLOWED, useChat } from '../providers/chatProvider';
import LocalizationContext from '@context/LocalizationContext';
import { getConversationId } from '@utils/chat';
const Tab = createBottomTabNavigator();

const getActiveRouteState = function (route) {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  }

  const childActiveRoute = route.routes[route.index];
  return getActiveRouteState(childActiveRoute);
};

export default function BottomTabbarNavigator({ route }) {
  // console.log('route navigatin _______:', route);
  const { setLocale } = useContext(LocalizationContext);
  var socket;
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.users?.userDetails);
  const [initialRoute, setInitialRoute] = useState('Search');
  // const [paymentStatus, setPaymentStatus] = useState(false);
  const [messageUnRead, setMessageUnRead] = useState(0);
  const [likeReceived, setLikeReceived] = useState(0);
  const navigation = useNavigation();
  const chatProvider = useChat();

  // const requestUserPermission = async () => {
  //   if (Platform.OS !== 'web') {
  //     const authorizationStatus = await messaging().requestPermission();

  //     if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
  //       console.log('User has notification permissions enabled.');
  //       const saveTokenToAPI = async (userId, token) => {
  //         await updateNotificationToken({
  //           notificationToken: token,
  //         });
  //       };
  //       messaging()
  //         .getToken()
  //         .then((token) => {
  //           console.log('firebase token', token);
  //           if (userDetails?.id) return saveTokenToAPI(userDetails.id, token);
  //         });
  //     } else if (
  //       authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
  //     ) {
  //       console.log('User has provisional notification permissions.');
  //     } else {
  //       console.log('User has notification permissions disabled');
  //     }
  //   }
  // };
  const getMeInfo = async () => {
    const { response, data } = await getMe();
    if (response.status === 200 || response.status === 201) {
      // console.log('success getME', response.status);
      let checkLanguage =
        data.userSetting?.displayLanguage == 'JAPANESE' ? true : false;
      let appLanguage =
        data.userSetting?.displayLanguage === 'JAPANESE' ? 'ja' : 'vi';
      let gender = data.profile?.gender === 182 ? true : false;
      // console.log('appLanguagegender', gender);
      setLocale(appLanguage);
      let formdataSearch = SortDataSearch(masterDATA, checkLanguage, gender);
      dispatch({
        type: INIT_FORM_SEARCH,
        payload: { ...formdataSearch },
      });
      dispatch({ type: UPDATE_PROFILE, payload: data });
      await AsyncStorage.setItem('@language', appLanguage);
    }
    return data;
  };
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     const { destination, options } = notificationToDestination(remoteMessage);
  //     console.log(
  //       'A new FCM message arrived! Message handled in the background!',
  //       remoteMessage,
  //     );
  //     if (navigationRef.current.getCurrentRoute().name != destination) {
  //       if (remoteMessage.notification) {
  //         let toastId = global.toast.show('aaaaaa', {
  //           placement: 'top',
  //           duration: 4000,
  //           animationType: 'slide-in',
  //           animationDuration: 100,
  //           offsetTop: 0,
  //           offset: 0, // offset for both top and bottom toasts
  //           swipeEnabled: true,
  //           renderToast: (toastOptions) => {
  //             return (
  //               <TouchableOpacity
  //                 style={{
  //                   alignSelf: 'stretch',
  //                   marginTop: 0,
  //                   marginHorizontal: 6,
  //                   borderRadius: 10,
  //                   backgroundColor: '#FFF2F1',
  //                 }}
  //                 onPress={() => {
  //                   global.toast.hide(toastId);
  //                   const { destination, options } = notificationToDestination(
  //                     remoteMessage,
  //                   );
  //                   navigation.navigate(destination, options);
  //                 }}>
  //                 <View>
  //                   <Text style={{ padding: 16, fontWeight: 'bold' }}>
  //                     {remoteMessage.notification.title}
  //                   </Text>
  //                   <Text
  //                     style={{ paddingBottom: 12, paddingHorizontal: 16 }}
  //                     numberOfLines={2}>
  //                     <Text
  //                       style={{ paddingBottom: 12, paddingHorizontal: 16 }}>
  //                       {remoteMessage.notification.body}
  //                     </Text>
  //                   </Text>
  //                 </View>
  //               </TouchableOpacity>
  //             );
  //           },
  //         });
  //       }
  //     }
  //     if (remoteMessage.data.type === 'INCOMMING_CALL') {
  //       handleCalling(remoteMessage, false);
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(async () => {
    let dataUserSocket = getMeInfo();

    if (!chatProvider.isReady || !dataUserSocket) {
      console.log('SOCKET INITIALIZATION REJECTED');
      return;
    }
    const socketServer = Config.CHAT_URL;
    const authority = await getAuthority();
    const { access_token, refreshToken, user } = authority;
    const loadMessagesBottomTabbar = () => {
      let zolo = [];
      const unreadUserIdWDuplicates = chatProvider
        .getUnreadMessages()
        .map((e) => {
          if (
            zolo.includes(e.userId) ||
            e.userId == userDetails?.id?.toString()
          ) {
            return e.userId;
          } else {
            zolo.push(e.userId);
            return e.userId;
          }
        });
      // console.log('unreadUserids', unreadUserIdWDuplicates, zolo);
      setMessageUnRead(zolo.length);
    };
    loadMessagesBottomTabbar();
    const options = {
      query: { token: `${access_token}` },
      transports: ['websocket'],
    };

    socket = io(socketServer, options);
    // console.log('socket', socketServer);
    // console.log('CHAT_DATA', CHAT_DATA);

    socket.on('connect', () => {
      console.log('connected to socket.io server');
      socket.emit(CHAT_DATA);
      socket.emit('USER_LIKE_COUNT', (data) => {
        // console.log('USER_LIKE_COUNT', data);
        setLikeReceived(data?.likeCount || 0);
      });
    });
    socket.on('USER_LIKE_COUNT', (data) => {
      console.log('USER_LIKE_COUNT', data);
      setLikeReceived(data?.likeCount || 0);
    });
    socket.on('UPDATE_IMAGE_APPROVAL_STATUS', () => {
      getMeInfo();
    });
    socket.on('UPDATE_IDENTITY_APPROVAL_STATUS', () => {
      getMeInfo();
    });
    socket.on('UPDATE_PROFILE_APPROVAL_STATUS', () => {
      getMeInfo();
    });
    socket.on('LIKED', () => {});
    socket.on('MATCHED', () => {
      // console.log('socket, matched, emitting');
      socket.emit(CHAT_DATA);
    });
    socket.on('REPORTED', () => {});
    socket.on('LIKE_UPDATED', ({ currentAmount }) => {
      dispatch(updateLikeCount(currentAmount));
    });

    socket.on(CHAT_DATA, (result) => {
      // console.log('socket chatData', result);
      const { data } = result;
      // setMatchingUsers(data.matching);
      dispatch({ type: UPDATE_CHAT_DATA, payload: { ...data, error: false } });

      // join all friends room to receive messages
      data?.matching?.forEach((e) => {
        socket.emit(JOIN_FRIEND, {
          partnerId: e.id,
          // lastId: lastMessageId ? parseInt(lastMessageId) : -1,
          limit: 10,
        });
        socket.emit('chatHistory', {
          partnerId: e.id,
          limit: 10,
        });
      });

      data?.talking?.forEach((e) => {
        // console.log('joined ', e.id);
        const partnerId = e.id;
        const userId = user.id;
        socket.emit(JOIN_FRIEND, {
          partnerId: e.id,
          // lastId: -1,
          limit: 0,
        });

        const conversationId = getConversationId(partnerId, userId);
        const lastMessage = chatProvider.getLastUpdatedMessage(conversationId);
        if (lastMessage.length > 0) {
          // if there are some message already -> load from last message to current
          // console.log(
          //   'load from X to current',
          //   partnerId,
          //   lastMessage[0].updatedTime,
          // );
          socket.emit('chatHistory', {
            partnerId,
            latestUpdateTime: lastMessage[0].updatedTime,
          });
        } else {
          // if user never spoken with us or spoken on another device/ previous application installation (no message local),
          // load last 10 messages
          // console.log('load last 10');
          socket.emit('chatHistory', {
            partnerId,
            limit: 10,
          });
        }
      });
      // console.log('JOIN FRIEND', parseInt(lastMessageId), lastMessageId);
    });
    const saveChatMessages = (result, convId) => {
      if (result.code === 0) {
        // console.log('call setMessages' + Math.random());

        // console.log('number of entries', result?.data?.length);
        result?.data?.forEach((e) => {
          try {
            if (e.content == '***') chatProvider.removeMessage(e, convId);
            else chatProvider.addMessage(e, convId);
          } catch (ex) {
            console.log(ex);
          }
        });
        // console.log('fetched data', result?.data, +Math.random());
      }
    };
    socket.on(CHAT_DATA_FRIEND, (result) => {
      // const exec = async () => {
      // console.log('CHAT_DATA_FRIEND', result);
      const userId = result.userId;
      const partnerId = result.partnerId;
      if (userId & partnerId) {
        const conversationId = getConversationId(partnerId, userId);
        // console.log('convIdvav', conversationId, result);
        const total = result.total;
        if (total)
          chatProvider.addSetting(
            'TOTAL_MESSAGE',
            total,
            false,
            conversationId,
          );
        saveChatMessages(result, conversationId);
      }
      // };
      // exec();
    });
    socket.on('MESSAGE_UPDATED', (result) => {
      // console.log('MESSAGE_UPDATED');
      const updatedMessage = result.data;
      // console.log('MESSAGE_UPDATED', updatedMessage);
      const conversationId = getConversationId(
        updatedMessage.partnerId,
        updatedMessage.userId,
      );
      console.log('QWE: ', updatedMessage);
      if (updatedMessage.content == '***')
        chatProvider.removeMessage(updatedMessage, conversationId);
      else chatProvider.addMessage(updatedMessage, conversationId);
    });
    socket.on(FRIEND_MESSAGES, async (result) => {
      // console.log('FRIEND_MESSAGES', result);
      if (result.code === 0) {
        const { data, total } = result;
        const { userId, partnerId, content } = data;
        // console.log('userDetail', dataUserSocket);
        const conversationId = getConversationId(partnerId, userId);
        if (total) {
          chatProvider.addSetting(
            'TOTAL_MESSAGE',
            total,
            false,
            conversationId,
          );
          if (total === 1) {
            socket.emit(CHAT_DATA);
          }
        }
        console.log('QQE: ', data);
        if (content == '***') chatProvider.removeMessage(data, conversationId);
        else chatProvider.addMessage(data, conversationId);

        if (data.messageType === 'SYSTEM') {
          if (data.content === 'can_calling') {
            chatProvider.addSetting(
              CALLING_ALLOWED,
              true,
              false,
              conversationId,
            );
          }
        }
      }
    });
    socket.on(USER_OFFLINE, (data) => {
      // console.log('user offline', data);
    });
    socket.on(`${user.id}`, (data) => {
      // console.log('userRoom', data);
    });
    socket.on('disconnect', (reason) => {
      // console.log('disconnect to socket.io server');

      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      // else the socket will automatically try to reconnect
    });
    socket.on('connect_error', () => {
      // console.log('connect error');
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });
    socket.on('USER_PAYMENT', (status) => {
      console.log('USER_PAYMENTUSER_PAYMENTUSER_PAYMENTUSER_PAYMENT');
      getMeInfo();
      const pathUrl = window.location.pathname;
      if (pathUrl.includes('PaymentScreen')) {
        navigation.goBack();
      }
    });
    global.socket = socket;
  }, [chatProvider.isReady]);
  return (
    <Tab.Navigator
      screenOptions={{
        style: { borderTopColor: 'transparent', elevation: 0 },
        labelStyle: { fontSize: 12, fontWeight: 'bold' },
        keyboardHidesTabBar: true,
      }}
      initialRouteName={initialRoute}>
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={({ route }) => ({
          title: global.t('search'),
          headerShown: false,
          tabBarLabel: AppText.bottomTab.search,
          tabBarActiveTintColor: Colors.color.COLOR_NEW_YORK_PINK,
          tabBarLabelStyle: {
            display: 'none',
          },

          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText, styles.widgetTextActive]}>
                  <SearchOutlineActiveIcon width={20} height={22} />
                  <View style={{ width: 60, height: 16 }}>
                    <Text style={[styles.tabbarText]}>
                      {global.t('search')}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText]}>
                  <SearchOutlineIcon width={20} height={22} />
                  <View style={{ width: 60, height: 16 }}>
                    <Text style={[styles.tabbarText, styles.tabbarTextDefault]}>
                      {/* {AppText.bottomTab.search} */}
                      {global.t('search')}
                    </Text>
                  </View>
                </View>
              </View>
            ),
        })}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={({ route }) => ({
          title: global.t('history'),
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarLabel: AppText.bottomTab.history,
          tabBarActiveTintColor: Colors.color.COLOR_NEW_YORK_PINK,
          headerTitleAlign: 'center',
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText, styles.widgetTextActive]}>
                  <HistoryOutlineActiveIcon width={20} height={22} />
                  <View style={{ width: 60, height: 16 }}>
                    <Text style={[styles.tabbarText]}>
                      {/* {AppText.bottomTab.history} */}
                      {global.t('history')}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText]}>
                  <HistoryOutlineIcon width={20} height={22} />
                  <View style={{ width: 60, height: 16 }}>
                    <Text style={[styles.tabbarText, styles.tabbarTextDefault]}>
                      {/* {AppText.bottomTab.search} */}
                      {global.t('history')}
                    </Text>
                  </View>
                </View>
              </View>
            ),
        })}
      />
      <Tab.Screen
        name={SCREEN_LIKE}
        component={LikeScreen}
        options={({ route }) => ({
          title: global.t('like'),
          tabBarLabel: AppText.bottomTab.like,
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: Colors.color.COLOR_NEW_YORK_PINK,
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText, styles.widgetTextActive]}>
                  <LikeOutlineActiveIcon width={20} height={22} />
                  <View style={{ width: 60, height: 16 }}>
                    <Text style={[styles.tabbarText]}>
                      {/* {AppText.bottomTab.like} */}
                      {global.t('like')}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText]}>
                  <LikeOutlineIcon width={20} height={22} />
                  {likeReceived > 0 && (
                    <View
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 20,
                        backgroundColor: 'red',
                        position: 'absolute',
                        top: 3,
                        right: -2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 7,
                          fontWeight: 'bold',
                        }}>
                        {likeReceived}
                      </Text>
                    </View>
                  )}
                  <View style={{ width: 60, height: 16 }}>
                    <Text style={[styles.tabbarText, styles.tabbarTextDefault]}>
                      {/* {AppText.bottomTab.search} */}
                      {global.t('like')}
                    </Text>
                  </View>
                </View>
              </View>
            ),
        })}
      />
      <Tab.Screen
        name={SCREEN_CHAT}
        component={ChatScreen}
        options={({ route }) => ({
          title: global.t('CHAT_HEADER'),
          headerTitleAlign: 'center',
          headerLeft: null,
          // headerShown: false,
          tabBarLabel: AppText.bottomTab.chat,
          tabBarActiveTintColor: Colors.color.COLOR_NEW_YORK_PINK,
          tabBarLabelStyle: {
            display: 'none',
          },
          ...defaultStackNavigation.screenOptions,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText, styles.widgetTextActive]}>
                  <ChatOutlineActiveIcon width={20} height={22} />
                  <View style={{ width: 60, height: 16 }}>
                    <Text style={[styles.tabbarText]}>
                      {/* {AppText.bottomTab.chat} */}
                      {global.t('message')}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText]}>
                  <View style={{ position: 'relative' }}>
                    <ChatOutlineIcon width={20} height={22} />
                    {messageUnRead > 0 && (
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: 20,
                          backgroundColor: 'red',
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 7,
                            fontWeight: 'bold',
                          }}>
                          {/* {messageUnRead} */}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={{ width: 60, height: 16 }}>
                    <Text style={[styles.tabbarText, styles.tabbarTextDefault]}>
                      {/* {AppText.bottomTab.search} */}
                      {global.t('message')}
                    </Text>
                  </View>
                </View>
              </View>
            ),
        })}
      />
      <Tab.Screen
        name={SCREEN_PROFILE}
        component={ProfileStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarLabel: AppText.bottomTab.other,
          tabBarActiveTintColor: Colors.color.COLOR_NEW_YORK_PINK,
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText, styles.widgetTextActive]}>
                  <OtherOutlineActiveIcon width={20} height={22} />
                  <View style={{ width: 60, height: 16 }}>
                    <Text style={[styles.tabbarText]}>
                      {/* {AppText.bottomTab.other} */}
                      {global.t('others')}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={[styles.tabbarItem]}>
                <View style={[styles.widgetText]}>
                  <OtherOutlineIcon width={20} height={22} />
                  <View style={{ width: 60, height: 16 }}>
                    <Text style={[styles.tabbarText, styles.tabbarTextDefault]}>
                      {/* {AppText.bottomTab.search} */}
                      {global.t('others')}
                    </Text>
                  </View>
                </View>
              </View>
            ),
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabbarItem: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  widgetText: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 2,
  },
  widgetTextActive: {
    borderTopColor: Colors.color.COLOR_NEW_YORK_PINK,
    borderTopWidth: 2,
  },
  tabbarText: {
    // marginTop: 5,
    color: Colors.color.COLOR_NEW_YORK_PINK,
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 12,
    textAlign: 'center',

    paddingBottom: 2,
  },
  tabbarTextDefault: {
    color: Colors.color.COLOR_GREY_TRANSP,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 12,
  },
});
