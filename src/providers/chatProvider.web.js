import React, { useContext, useState, useEffect, createRef } from 'react';
export const IS_TRANSLATION_ALERT_ENABLED = 'IS_TRANSLATION_ALERT_ENABLED';
export const DEFAULT_TRANSLATION_ACTION = 'DEFAULT_TRANSLATION_ACTION';
export const SEND = 'SEND';
export const TRANSLATE = 'TRANSLATE';
export const CALLING_ALLOWED = 'CALLING_ALLOWED';
import { useDispatch, useSelector } from 'react-redux';
import {
  DELETE_CHAT_MESSAGE,
  UPDATE_CHAT_MESSAGE,
  UPDATE_CHAT_SETTINGS,
} from '../actions/types';
import { getConversationId } from '@utils/chat';

const ChatContext = React.createContext(null);
let providerIdGlobal = 0;
const giftedChatMessageAdapter = (dbMessage) => ({
  text:
    dbMessage.type === 'TEXT' || dbMessage.type === 'SYSTEM'
      ? dbMessage.content
      : null,
  textTranslation:
    dbMessage.type === 'TEXT' || dbMessage.type === 'SYSTEM'
      ? dbMessage.contentTranslation
      : null,
  image: dbMessage.type === 'IMAGE' ? dbMessage.content : null,
  _id: dbMessage._id,
  createdAt: new Date(dbMessage.time),
  system: dbMessage.type === 'SYSTEM',
  isRead: dbMessage.isRead,
  user: {
    _id: dbMessage.userId,
  },
  imageRef: dbMessage.imageRef,
});

// global.messageDb = {};
// global.updateHooks = [];

const upstreamChatMessageToLocalAdapter = (
  conversationId,
  upstreamMessage,
) => ({
  _id: upstreamMessage.id.toString(),
  conversationId: conversationId.toString(),
  userId: upstreamMessage.userId.toString(),
  content: upstreamMessage.content,
  contentTranslation: upstreamMessage.contentTranslation,
  isRead: upstreamMessage.isRead,
  type: upstreamMessage.messageType,
  time: new Date(upstreamMessage.time),
  updatedTime: new Date(upstreamMessage.updatedAt),
});

const ChatProvider = ({ children, partner }) => {
  const userDetails = useSelector((state) => state?.users?.userDetails);
  const dispatch = useDispatch();
  const conversationId = partner
    ? getConversationId(partner?.id, userDetails.id)
    : '';
  // this is original message (equivalent of realm's data in mobile version)
  const stateMessages = useSelector((state) =>
    conversationId
      ? state.chats.messages?.[conversationId] ?? []
      : state.chats.messages,
  );
  // this is converted to gifted chat format for display
  const [messages, messageCount] = useSelector((state) => [
    conversationId
      ? state.chats.messages?.[conversationId]?.map((e) =>
          giftedChatMessageAdapter(e),
        ) ?? []
      : state.chats.messages,
    conversationId ? state.chats.messages?.[conversationId]?.length ?? 0 : 0,
  ]);

  const [providerId] = useState(() => {
    providerIdGlobal += 1;
    return providerIdGlobal;
  });
  const totalMessageInAllConversation = useSelector((state) => {
    let total = 0;
    Object.values(state.chats.settings).forEach((settingArray) => {
      const settingEntry = settingArray.find((e) => e.name == 'TOTAL_MESSAGE');
      if (settingEntry) {
        total += parseInt(settingEntry.value);
      }
    });
    return total;
  });
  const chatSettings = useSelector((state) => {
    let result = [];
    if (state.chats.settings['global']) {
      result.push(...state.chats.settings['global']);
    }
    if (conversationId) {
      result.push(...(state.chats.settings?.[conversationId] ?? []));
    }
    // console.log('current settings', result);
    return result;
  });
  const [isReady, setReady] = useState(false);

  useEffect(async () => {
    // wait for reducer to rehydrate, since we need to fetch data from it
    while (!global.store.getState()?._persist?.rehydrated) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    // without conversationId, a limited amount of functions would be available
    if (!conversationId) {
      setReady(true);
      return;
    }

    setReady(true);
  }, []);

  const getUnreadMessages = (conversationId, partnerId) => {
    if (stateMessages) {
      // console.log('stateMessages', JSON.stringify(stateMessages, null, 2));
      if (stateMessages[conversationId]) {
        return (
          stateMessages[conversationId].filter(
            (e) => !e.isRead && partnerId && e.userId == partnerId.toString(),
          ) ?? []
        );
      } else {
        return (
          stateMessages.filter?.(
            (e) => !e.isRead && partnerId && e.userId == partnerId.toString(),
          ) ?? []
        );
      }
    }
  };

  const markAllAsRead = (conversationId) => {
    // console.log('123456789', JSON.stringify(stateMessages, null, 2));
    const unreadMessages = getUnreadMessages(conversationId, conversationId);
    unreadMessages.forEach((e) => {
      let eCopy = { ...e, isRead: true };
      // console.log('123456789', eCopy);
      dispatch({ type: UPDATE_CHAT_MESSAGE, payload: eCopy });
    });
  };

  const addMessage = (upstreamMessage, convId) => {
    console.log('executing Id', providerId);
    console.log('addMessage', isReady, conversationId, convId);
    try {
      const convertedData = upstreamChatMessageToLocalAdapter(
        convId ?? conversationId,
        upstreamMessage,
      );
      dispatch({ type: UPDATE_CHAT_MESSAGE, payload: convertedData });
      // console.log('message array state', JSON.stringify(messages, null, 2));
    } catch (e) {
      console.log('realm eeee', e);
    }
  };

  const removeMessage = (upstreamMessage, convId) => {
    console.log('executing Id', providerId);
    console.log('addMessage', isReady, conversationId, convId);
    try {
      const convertedData = upstreamChatMessageToLocalAdapter(
        convId ?? conversationId,
        upstreamMessage,
      );
      dispatch({ type: DELETE_CHAT_MESSAGE, payload: convertedData });
      // console.log('message array state', JSON.stringify(messages, null, 2));
    } catch (e) {
      console.log('realm eeee', e);
    }
  };

  const addCacheImage = () => {};
  const getCacheImage = () => {};
  const removeCacheImage = () => {};
  const addTempMessage = (userId, message, time, type = 'TEXT') => {
    console.log('excecuting Id', providerId);
    const imageRef = createRef();
    return imageRef;
  };

  const getLastMessage = (convId) => {
    if (!stateMessages) return [];
    const desiredIndex = 0;
    if (conversationId) {
      return stateMessages[desiredIndex] ? [stateMessages[desiredIndex]] : [];
    } else if (convId) {
      return stateMessages[convId]?.[desiredIndex]
        ? [stateMessages[convId][desiredIndex]]
        : [];
    } else return [];
  };

  const getMyMessages = (convId) => {
    if (!stateMessages) return [];
    if (conversationId) {
      return stateMessages
        ? stateMessages.filter((e) => e.userId == userDetails.id)
        : [];
    } else if (convId) {
      return stateMessages[convId]
        ? stateMessages[convId].filter((e) => e.userId == userDetails.id)
        : [];
    }
  };

  const getLastUpdatedMessage = (convId) => {
    // TODO: need to sort by updatedTime
    if (!stateMessages) return [];
    const desiredIndex = 0;
    if (conversationId) {
      return stateMessages[desiredIndex] ? [stateMessages[desiredIndex]] : [];
    } else if (convId) {
      return stateMessages[convId]?.[desiredIndex]
        ? [stateMessages[convId][desiredIndex]]
        : [];
    } else return [];
  };

  const getFirstMessage = (convId) => {
    if (!stateMessages) return [];
    const desiredIndex = stateMessages.length - 1;
    if (conversationId) {
      console.log(
        'getFirstMessage',
        1,
        desiredIndex,
        conversationId,
        stateMessages,
      );
      return stateMessages[desiredIndex] ? [stateMessages[desiredIndex]] : [];
    } else if (convId) {
      console.log(
        'getFirstMessage',
        2,
        desiredIndex,
        conversationId,
        stateMessages,
      );
      return stateMessages[convId]?.[desiredIndex]
        ? [stateMessages[convId][desiredIndex]]
        : [];
    } else return [];
  };

  const loadMessages = (pageSize) => {};

  const addSetting = async (name, value, isGlobal = false, convId) => {
    dispatch({
      type: UPDATE_CHAT_SETTINGS,
      payload: {
        // _id: new BSON.ObjectId(),
        conversationId: isGlobal
          ? 'global'
          : convId ?? conversationId?.toString?.(),
        name,
        value,
      },
    });
  };

  const getSetting = (name) => {
    return chatSettings.find((e) => e.name === name)?.value;
  };

  const getTotalMessageInAllConversation = () => {
    return totalMessageInAllConversation;
  };

  return (
    <ChatContext.Provider
      value={{
        getTotalMessageInAllConversation,
        isReady,
        messageCount,
        addMessage,
        removeMessage,
        getUnreadMessages,
        addTempMessage,
        markAllAsRead,
        getLastMessage,
        getMyMessages,
        getLastUpdatedMessage,
        loadMessages,
        addSetting,
        getFirstMessage,
        getSetting,
        messages,
        chatSettings,
        addCacheImage,
        removeCacheImage,
        getCacheImage,
        conversationId,
        partner,
        // setChatSettings,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useChat = () => {
  const chat = useContext(ChatContext);
  if (chat == null) {
    throw new Error('useChat() called outside of a ChatProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return chat;
};

export { ChatProvider, useChat };
