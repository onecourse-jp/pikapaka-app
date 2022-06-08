import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SCREEN_CHAT,
  SCREEN_NOTIFICATION,
  SCREEN_PROFILE_EDIT,
  SCREEN_PROFILE_SETTING,
  SCREEN_PROFILE,
  SCREEN_CHAT_ACTIONS_MODAL,
  SCREEN_TRANSLATION_MODAL,
  SCREEN_CHATTING,
} from '../screens/screens.constants';
import ChatScreen from '../screens/Chat';
import ChattingScreen from '@screens/Chat/ChatScreen';
import ProfileStack from './ProfileStack';
import Edit from '@screens/Profile/edit';
import Settings from '@screens/Profile/settings';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { defaultStackNavigation } from '@config/navigations';
import I18n from 'src/i18n';
import LocalizationContext from '@context/LocalizationContext';
import TranslationModal from '../screens/Chat/TranslationModal';
import ActionsModal from '../screens/Chat/ActionsModal';
import { ChatProvider } from '../providers/chatProvider';

const HomeStack = createNativeStackNavigator();
function ChatStackScreen() {
  const { t } = React.useContext(LocalizationContext);
  return (
    // <ChatProvider>
    <HomeStack.Navigator screenOptions={defaultStackNavigation.screenOptions}>
      <HomeStack.Screen
        name={SCREEN_CHAT}
        component={ChatScreen}
        options={{
          title: t('CHAT_HEADER'),
          // headerShown: false,
          headerLeft: null,
        }}
      />
    </HomeStack.Navigator>
    // </ChatProvider>
  );
}

export default ChatStackScreen;
