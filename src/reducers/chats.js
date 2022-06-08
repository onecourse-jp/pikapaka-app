import createReducer from 'src/lib/createReducer';
import {
  DELETE_CHAT_MESSAGE,
  UPDATE_CHAT_DATA,
  UPDATE_CHAT_MESSAGE,
  UPDATE_CHAT_SETTINGS,
} from '../actions/types';
const initialState = {
  matching: [],
  online: [],
  chatting: [],
  error: false,
  messages: {},
  settings: {},
};

export const chats = createReducer(initialState, {
  [UPDATE_CHAT_DATA](state, { payload, type }) {
    return { ...state, ...payload };
  },
  [DELETE_CHAT_MESSAGE](state, { payload }) {
    const { conversationId, _id } = payload;
    const conversationDataCopy = [
      ...(state.messages[conversationId] ?? []),
    ].filter((e, i, arr) => {
      return e._id != _id;
    });
    conversationDataCopy.sort((a, b) => {
      return new Date(a.time) < new Date(b.time) ? 1 : -1;
    });
    console.log(conversationDataCopy);
    const modifiedState = {
      ...state,
      messages: {
        ...state.messages,
        [conversationId]: conversationDataCopy,
      },
    };
    return modifiedState;
  },
  [UPDATE_CHAT_MESSAGE](state, { payload }) {
    console.log('start reducing');
    console.log(payload);
    const { conversationId, _id } = payload;
    const conversationDataCopy = [...(state.messages[conversationId] ?? [])];
    let isMessageFound = false;
    conversationDataCopy.forEach((e, i, arr) => {
      if (e._id == _id) {
        isMessageFound = true;
        arr[i] = {
          ...payload,
        };
      }
    });
    console.log(isMessageFound);
    if (!isMessageFound) {
      conversationDataCopy.push(payload);
    }
    conversationDataCopy.sort((a, b) => {
      return new Date(a.time) < new Date(b.time) ? 1 : -1;
    });
    console.log(conversationDataCopy);
    const modifiedState = {
      ...state,
      messages: {
        ...state.messages,
        [conversationId]: conversationDataCopy,
      },
    };
    return modifiedState;
  },
  [UPDATE_CHAT_SETTINGS](state, { payload }) {
    const { conversationId, name } = payload;
    const conversationDataCopy = [...(state.settings[conversationId] ?? [])];
    let isSettingsFound = false;
    conversationDataCopy.forEach((e, i, arr) => {
      if (e.name == name) {
        isSettingsFound = true;
        arr[i] = {
          ...payload,
        };
      }
    });
    console.log(isSettingsFound);
    if (!isSettingsFound) {
      conversationDataCopy.push(payload);
    }
    console.log(conversationDataCopy);
    const modifiedState = {
      ...state,
      settings: {
        ...state.settings,
        [conversationId]: conversationDataCopy,
      },
    };
    return modifiedState;
  },
});
