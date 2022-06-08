import { Platform } from 'react-native';
import {
  SCREEN_CHATTING,
  SCREEN_CHAT,
  SCREEN_PROFILE_EDIT,
  SCREEN_VERIFY,
  SCREEN_LIKE,
  SCREEN_NOTIFICATION,
} from './screens/screens.constants';
import {
  getBadgeCount,
  setBadgeCount,
  getNotificationBadgeSetting,
} from 'react-native-notification-badge';

export const handleNotification = async (message) => {
  if (Platform.OS === 'ios') {
    console.log(message);
    // const currentCount = await getBadgeCount();
    await setBadgeCount(message?.data?.notificationCount ?? 0);
  }
  const type = message.data?.type;
  // switch(type){
  //     case 'CHAT_MESSAGE':
  //     case 'UPDATE_IMAGE_APPROVAL_STATUS':

  //     case 'UPDATE_IDENTITY_APPROVAL_STATUS':

  //     case 'UPDATE_PROFILE_APPROVAL_STATUS':
  //         global.store.dispatch('')
  // }
};

export const notificationToDestination = (message) => {
  console.log('message.data?.type', message.data?.type);
  const type = message.data?.type;
  switch (type) {
    case 'CHAT_MESSAGE':
      return {
        destination: SCREEN_CHATTING,
        options: {
          user: { id: message.data?.userId },
        },
      }; // TODO: đến đúng màn chat với ng đó
    case 'UPDATE_IMAGE_APPROVAL_STATUS':
      return { destination: SCREEN_PROFILE_EDIT };
    case 'UPDATE_PROFILE_APPROVAL_STATUS':
      return { destination: SCREEN_PROFILE_EDIT };
    case 'REMIND_VERIFICATION':
      return { destination: SCREEN_VERIFY };
    case 'UPDATE_IDENTITY_APPROVAL_STATUS':
      return { destination: SCREEN_VERIFY };
    case 'REMIND_PAYMENT':
      return { destination: SCREEN_VERIFY };
    case 'LIKED':
      return {
        destination: SCREEN_LIKE,
        options: {
          initialTab: 0,
        },
      };
    case 'MATCHED':
      return {
        destination: SCREEN_CHAT,
        options: {
          initialTab: 0,
        },
      };
    case 'ADMIN_NOTICE':
      return {
        destination: SCREEN_NOTIFICATION,
      };
    case 'LIKE_UPDATED':
      return { destination: SCREEN_VERIFY };
    default:
      return { destination: 'Search' };
  }
};
