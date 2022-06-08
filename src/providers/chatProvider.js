import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
  useMemo,
} from 'react';
import Realm, { BSON } from 'realm';
export const IS_TRANSLATION_ALERT_ENABLED = 'IS_TRANSLATION_ALERT_ENABLED';
export const DEFAULT_TRANSLATION_ACTION = 'DEFAULT_TRANSLATION_ACTION';
export const SEND = 'SEND';
export const TRANSLATE = 'TRANSLATE';
export const CALLING_ALLOWED = 'CALLING_ALLOWED';
import Message from './schema/Message';
import ChatSetting from './schema/ChatSetting';
import CacheImage from './schema/CacheImage';
import { getConversationId } from '@utils/chat';
import { useSelector } from 'react-redux';
const ChatContext = React.createContext(null);
let providerIdGlobal = 0;
const giftedChatMessageAdapter = (dbMessage) => ({
  // text: dbMessage.text,
  // image: dbMessage.image,
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
  createdAt: dbMessage.time,
  system: dbMessage.type === 'SYSTEM',
  isRead: dbMessage.isRead,
  user: {
    _id: dbMessage.userId,
  },
  imageRef: dbMessage.imageRef,
});

const upstreamChatMessageToLocalAdapter = (conversationId, upstreamMessage) =>
  // new Message(
  ({
    _id: upstreamMessage.id.toString(),
    conversationId: conversationId.toString(),
    userId: upstreamMessage.userId.toString(),
    content: upstreamMessage.content,
    contentTranslation: upstreamMessage.contentTranslation,
    // text: upstreamMessage.content,
    // image: upstreamMessage.image,
    isRead: upstreamMessage.isRead,
    type: upstreamMessage.messageType,
    time: upstreamMessage.time,
    updatedTime: upstreamMessage.updatedAt,
  });
// );

const realmConfig = {
  schema: [Message, ChatSetting, CacheImage],
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: true, // default is false
};
const ChatProvider = ({
  children,
  // _conversationId = undefined,
  // _partner = undefined,
  // conversationId,
  isScreenSpecific = false,
  partner,
}) => {
  const userDetails = useSelector((state) => state?.users?.userDetails);
  // console.log('partner', partner);
  // const [conversationId, setConversationId] = useState(_conversationId);
  // const [partner, setPartner] = useState(_partner);
  const conversationId = useMemo(() => {
    return partner ? getConversationId(partner?.id, userDetails.id) : '';
  }, [userDetails]);
  const [messages, setMessages] = useState(() => {
    console.log('message initialized');
    return [];
  });
  // credit: https://stackoverflow.com/questions/56511176/state-being-reset#
  const messagesRef = useRef();
  messagesRef.current = messages;

  const [providerId, setProviderId] = useState(() => {
    providerIdGlobal += 1;
    return providerIdGlobal;
  });
  // const [loadedMessages, setLoadedMessages] = useState(() => {
  //   console.log('loaded message initated');
  //   return 10;
  // });
  // const loadedMessages = useRef({
  //   count: 0,
  // });
  const [messageCount, setMessageCount] = useState(0);
  const [chatSettings, setChatSettings] = useState([]);
  const [isReady, setReady] = useState(false);
  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);
  useEffect(async () => {
    console.log('REALM PATH', Realm.defaultPath);
  }, []);

  console.log('provider created');
  const chatSettingsChangedListener = (collection) => {
    setChatSettings([...collection]);
    console.log('chat settings updated', collection);
  };

  const chatMessagesChangedListener = (collection) => {
    console.log('executing Id', providerId);
    console.log('currentlength', collection.length);
    if (messagesRef.current.length == 0) {
      console.log('init messages with 10 entries');
      loadMessages(10);
    } else {
      if (isScreenSpecific) {
        if (collection.length != messageCount) {
          // a message was added by socket
          let amount =
            collection.length - messageCount < 0
              ? 0
              : collection.length - messageCount;
          loadMessages(amount);
        }
      } else loadMessages(0);
    }
    setMessageCount(collection.length);

    // console.log('message list updated', collection);
  };

  useEffect(() => {
    if (isScreenSpecific && !userDetails?.id) return;
    let _chatSettings;
    let _chatMessages;
    const init = async () => {
      console.log('init realmmmmmmmmmm');

      let chatRealm;
      // setLoadedMessages(10);
      if (!global.chatRealm) {
        chatRealm = await Realm.open(realmConfig);
        realmRef.current = chatRealm;
        global.chatRealm = chatRealm;
      } else {
        realmRef.current = global.chatRealm;
        chatRealm = global.chatRealm;
      }

      // remove all message with content of '***'
      const bannedMessages = chatRealm
        .objects(Message)
        .filtered('content == $0 or contentTranslation == $1', '***', '***')
        .snapshot();
      if (bannedMessages.length > 0) {
        chatRealm.write(() => {
          chatRealm.delete(bannedMessages);
          console.log('write ok');
        });
      }

      if (!conversationId) {
        setReady(true);
        return;
      }
      setChatSettings([
        ...chatRealm
          .objects(ChatSetting)
          .filtered(
            'conversationId == $0 OR conversationId == $1',
            conversationId?.toString?.(),
            'global',
          ),
      ]);

      _chatSettings = chatRealm
        .objects(ChatSetting)
        .filtered(
          'conversationId == $0 OR conversationId == $1',
          conversationId?.toString?.(),
          'global',
        );

      _chatSettings.addListener(chatSettingsChangedListener);

      // without conversationId, a limited amount of functions would be available
      // if(!conversationId){
      //   setReady(true);
      //   return;
      // }

      _chatMessages = chatRealm
        .objects(Message)
        .filtered('conversationId == $0', conversationId?.toString?.());

      _chatMessages.addListener(chatMessagesChangedListener);

      if (conversationId && partner) setIsCallingAllowed();
      // console.log(chatSettings);
      console.log('realm init done');

      setReady(true);
    };
    init();
    return () => {
      console.log('realm close');
      // cleanup function
      const chatRealm = realmRef.current;

      if (chatRealm) {
        // close realm and reset states
        // chatRealm.close();
        // realmRef.current = null;
        _chatMessages?.removeListener(chatMessagesChangedListener);
        _chatSettings?.removeListener(chatSettingsChangedListener);
        // setMessages([]);
        // setChatSettings([]);
        // setLoadedMessages(0);
      }
    };
  }, [userDetails]);

  const setIsCallingAllowed = () => {
    const chatRealm = realmRef.current;

    const myMessages = chatRealm
      .objects('Message')
      .filtered(
        'conversationId == $0 && userId != $1 && type!=$2',
        conversationId?.toString?.(),
        partner?.id?.toString?.(),
        'SYSTEM',
      ).length;
    const partnerMessages = chatRealm
      .objects('Message')
      .filtered(
        'conversationId == $0 && userId == $1 && type!=$2',
        conversationId?.toString?.(),
        partner?.id?.toString?.(),
        'SYSTEM',
      ).length;
    // console.log('my message', myMessages);
    // console.log('partner messasge', partnerMessages);
    if (myMessages >= 3 && partnerMessages >= 3) {
      addSetting(CALLING_ALLOWED, true);
    }
    // console.log(chatSettings);
    console.log('myMessages:', myMessages);
    console.log('partnerMessages:', partnerMessages);
  };

  const getUnreadMessages = (conversationId, partnerId) => {
    const chatRealm = realmRef.current;
    if (!chatRealm) return [];
    if (conversationId) {
      if (partnerId) {
        return chatRealm
          .objects(Message)
          .filtered(
            'conversationId == $0 && userId == $1 && isRead == $2',
            conversationId.toString(),
            partnerId.toString(),
            false,
          );
      } else
        return chatRealm
          .objects(Message)
          .filtered(
            'conversationId == $0 && isRead == $1',
            conversationId.toString(),
            false,
          );
    } else {
      return chatRealm.objects(Message).filtered('isRead == $0', false);
    }
  };

  const markAllAsRead = (conversationId) => {
    const chatRealm = realmRef.current;
    chatRealm.write(() => {
      const unreadMessages = chatRealm
        .objects(Message)
        .filtered(
          'conversationId == $0 && isRead == $1',
          conversationId.toString(),
          false,
        )
        .snapshot();
      console.log('unreadMessages', unreadMessages);
      for (let i = 0; i < unreadMessages.length; i++) {
        const unreadMessage = unreadMessages[i];
        unreadMessage.isRead = true;
      }
    });
  };

  const addMessage = (upstreamMessage, convId) => {
    console.log('executing Id', providerId);
    const chatRealm = realmRef.current;
    console.log('chatRealm', chatRealm);
    console.log('addMessage', isReady, conversationId, convId);
    try {
      const convertedData = upstreamChatMessageToLocalAdapter(
        convId ?? conversationId,
        upstreamMessage,
      );
      // try to fetch the message to update
      const specificMessage = chatRealm
        .objects(Message)
        .filtered('_id == $0', convertedData._id);
      if (specificMessage.length > 0) {
        console.log('updated message', convertedData._id);
        const editObject = specificMessage[0];
        console.log(
          editObject.content,
          convertedData.content,
          editObject.contentTranslation,
          convertedData.contentTranslation,
        );
        try {
          chatRealm.write(() => {
            editObject.content = convertedData.content;
            editObject.contentTranslation = convertedData.contentTranslation;
            editObject.updatedTime = convertedData.updatedTime;
            editObject.isRead = convertedData.isRead;
            console.log('write ok');
          });
        } catch (e) {
          console.log('zzzz111', e);
        }
      } else {
        // if not exist then insert
        console.log('added message', convertedData._id, chatRealm);
        chatRealm.write(() => {
          try {
            chatRealm.create('Message', convertedData, true);
            console.log('write ok');
          } catch (e) {
            console.log('zzzz', e);
          }
        });
        if (conversationId) {
          // currently in the chat screen, load more message
          loadMessages(1);
        }
      }
    } catch (e) {
      console.log('realm eeee', e);
    }
  };

  const removeMessage = (upstreamMessage, convId) => {
    console.log('executing Id', providerId);
    const chatRealm = realmRef.current;
    console.log('chatRealm', chatRealm);
    console.log('removeMessage', isReady, conversationId, convId);
    try {
      const convertedData = upstreamChatMessageToLocalAdapter(
        convId ?? conversationId,
        upstreamMessage,
      );
      // try to fetch the message to update
      const specificMessage = chatRealm
        .objects(Message)
        .filtered('_id == $0', convertedData._id);
      if (specificMessage.length > 0) {
        chatRealm.write(() => {
          chatRealm.delete(specificMessage);
          console.log('write ok');
        });
      }
    } catch (e) {
      console.log('realm eeee', e);
    }
  };

  const addCacheImage = (upstreamUrl, localUrl) => {
    const chatRealm = realmRef.current;
    console.log('ADD CACHE', upstreamUrl, localUrl);
    chatRealm.write(() => {
      return chatRealm.create(CacheImage, {
        _id: new BSON.ObjectId(),
        localImageUrl: localUrl,
        upstreamImageUrl: upstreamUrl,
      });
    });
  };
  const getCacheImage = (upstreamUrl, localUrl) => {
    const chatRealm = realmRef.current;
    const entry = chatRealm
      .objects(CacheImage)
      .filtered(
        'upstreamImageUrl == $0 OR localImageUrl == $1',
        upstreamUrl,
        localUrl,
      );
    // console.log('GET CACHE', upstreamUrl, localUrl, entry);
    if (entry.length > 0) {
      return {
        localImageUrl: entry[0].localImageUrl,
        upstreamImageUrl: entry[0].upstreamImageUrl,
      };
    }
    return null;
  };
  const removeCacheImage = (upstreamUrl, localUrl) => {
    const chatRealm = realmRef.current;
    const entry = chatRealm
      .objects(CacheImage)
      .filtered(
        'upstreamImageUrl == $0 OR localImageUrl == $1',
        upstreamUrl,
        localUrl,
      );
    console.log('REMOVE CACHE', upstreamUrl, localUrl, entry);
    if (entry.length > 0) {
      chatRealm.write(() => {
        chatRealm.delete(entry[0]);
      });
    }
    return null;
  };
  const addTempMessage = (userId, message, time, type = 'TEXT') => {
    console.log('excecuting Id', providerId);
    const imageRef = type === 'IMAGE' ? createRef() : undefined;
    console.log('temp message', messages, [
      giftedChatMessageAdapter({
        _id: new BSON.ObjectId().toHexString(),
        conversationId,
        userId,
        content: message,
        type,
        time,
        imageRef,
      }),
      ...messages,
    ]);
    setMessages([
      giftedChatMessageAdapter({
        _id: new BSON.ObjectId().toHexString(),
        conversationId,
        userId,
        content: message,
        type,
        time,
        imageRef,
      }),
      ...messages,
    ]);
    return imageRef;
  };

  const getLastMessage = (convId) => {
    const chatRealm = realmRef.current;
    return chatRealm
      .objects(Message)
      .sorted('time', true)
      .filtered(
        'conversationId == $0 LIMIT(1)',
        convId ?? conversationId.toString(),
      );
  };

  const getTotalMessageInAllConversation = () => {
    const chatRealm = realmRef.current;
    const settings = chatRealm
      .objects('ChatSetting')
      .filtered('name == $0', 'TOTAL_MESSAGE');
    let total = 0;
    settings.forEach((e) => (total += parseInt(e.value)));
    return total;
  };

  const getMyMessages = (convId) => {
    const chatRealm = realmRef.current;
    return chatRealm
      .objects(Message)
      .sorted('time', true)
      .filtered(
        'conversationId == $0 && userId == $1',
        convId ?? conversationId.toString(),
        userDetails?.id?.toString(),
      );
  };

  const getLastUpdatedMessage = (convId) => {
    const chatRealm = realmRef.current;
    return chatRealm
      .objects(Message)
      .sorted('updatedTime', true)
      .filtered(
        'conversationId == $0 LIMIT(1)',
        convId ?? conversationId.toString(),
      );
  };

  // const getLastMessageId = (convId) => {
  //   const chatRealm = realmRef.current;
  //   return chatRealm
  //     .objects(Message)
  //     .filtered('conversationId == $0', convId ?? conversationId.toString())
  //     .sorted('time', true)[0]?._id;
  // };

  const getFirstMessage = (convId) => {
    const chatRealm = realmRef.current;
    return chatRealm
      .objects(Message)
      .sorted('time', false)
      .filtered(
        'conversationId == $0 LIMIT(1)',
        convId ?? conversationId.toString(),
      );
  };

  // const getFirstMessageId = (convId) => {
  //   const chatRealm = realmRef.current;
  //   return chatRealm
  //     .objects(Message)
  //     .filtered('conversationId == $0', convId ?? conversationId.toString())
  //     .sorted('time', false)[0]?._id;
  // };

  const loadMessages = (pageSize) => {
    console.log('excecuting Id', providerId);
    const chatRealm = realmRef.current;
    console.log('ddadas', chatRealm, pageSize, conversationId);
    const loadedMessages = messagesRef.current?.length ?? messages.length;
    if (chatRealm) {
      const newPage = chatRealm
        .objects(Message)
        .filtered('conversationId == $0', conversationId?.toString())
        .sorted('time', true)
        .slice(0, loadedMessages + pageSize);
      const newPageTransformed =
        newPage?.map((e) => giftedChatMessageAdapter(e)) ?? [];

      console.log(
        'last loaded message id before',
        loadedMessages,
        pageSize,
        newPage.length,
        newPage[newPage.length - 1]?._id,
        newPage?.[newPage?.length - 1]?._id,
      );
      // setLoadedMessages(loadedMessages + pageSize);
      setMessages([...newPageTransformed]);
      // setTimeout(() => {
      // console.log(
      //   'last loaded message id after',
      //   loadedMessages,
      //   pageSize,
      //   newPage.length,
      //   newPage[newPage.length - 1]?._id,
      //   newPage?.[newPage?.length - 1]?._id,
      // );
      // }, 1000);
      return newPage?.[newPage?.length - 1];
    }
  };

  const addSetting = (name, value, isGlobal = false, convId) => {
    const chatRealm = realmRef.current;
    const settings = chatRealm
      .objects('ChatSetting')
      .filtered(
        'conversationId == $0',
        isGlobal ? 'global' : convId ?? conversationId?.toString?.(),
      );
    const specificSetting = settings.filtered('name == $0', name);
    if (specificSetting.length > 0) {
      chatRealm.write(() => {
        // console.log('VALUEEE', value);
        specificSetting[0].value = value;
      });
    } else {
      chatRealm.write(() => {
        chatRealm.create('ChatSetting', {
          _id: new BSON.ObjectId(),
          conversationId: isGlobal
            ? 'global'
            : convId ?? conversationId?.toString?.(),
          name,
          value,
        });
      });
    }
  };

  const getSetting = (name) => {
    return chatSettings?.find((e) => e.name === name)?.value;
  };

  const resetRealm = async () => {
    const chatRealm = realmRef.current;
    chatRealm.write(() => {
      // Delete all objects from the realm.
      chatRealm.deleteAll();
    });
  };

  return (
    <ChatContext.Provider
      value={{
        isReady,
        // addMessages,
        // loadedMessages,
        messageCount,
        removeMessage,
        addMessage,
        getUnreadMessages,
        addTempMessage,
        markAllAsRead,
        getLastMessage,
        getLastUpdatedMessage,
        getTotalMessageInAllConversation,
        getMyMessages,
        // getLastMessageId,
        loadMessages,
        addSetting,
        getFirstMessage,
        // getFirstMessageId,
        getSetting,
        resetRealm,
        messages,
        chatSettings,
        addCacheImage,
        removeCacheImage,
        getCacheImage,
        conversationId,
        partner,
        // setConversationId,
        // setPartner,
        // setMessages,
        setChatSettings,
        // setLoadedMessages,
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
