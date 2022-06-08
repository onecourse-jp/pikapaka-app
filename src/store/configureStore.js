import {createStore, compose, applyMiddleware, combineReducers} from "redux";
import {persistStore, persistCombineReducers, persistReducer} from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import {createLogger} from "redux-logger";
import createSagaMiddleware from "redux-saga";

import {
  loginReducer,
  loadingReducer,
  masterDataReducer,
  otpReducer,
  registerReducer,
  updateProfileReducer,
  profileReducer,
  users,
  payments,
  chats,
  formSearch,
  search,
  appLink,
  calendar,
  medicalHistory
} from "src/reducers"; // where reducers is a object of reducers
import sagas from "src/sagas";
import {Platform} from "react-native";
// import persistReducer from 'redux-persist';
const config = {
  key: "root",
  storage: AsyncStorage,
  // blacklist: ["loadingReducer"],
  whitelist: [
    "users",
    "masterDataReducer",
    "systems",
    "search",
    // ...(Platform.OS == 'web' ? ['chats'] : []),
  ],
  debug: true, //to get useful logging
};
const chatReducerConfig = {
  key: "chats",
  storage: AsyncStorage,
  // whitelist: [...(Platform.OS == 'web' ? ['settings'] : [])],
  blacklist: ["messages"],
  debug: true, //to get useful logging
};
const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

const reducers = persistCombineReducers(config, {
  loginReducer,
  loadingReducer,
  // masterDataReducer,
  otpReducer,
  registerReducer,
  updateProfileReducer,
  profileReducer,
  users,
  chats: persistReducer(chatReducerConfig, chats),
  formSearch,
  // search,
  // appLink,
  payments,
  calendar,
  medicalHistory
});
const enhancers = [applyMiddleware(...middleware)];
// const initialState = {};
const persistConfig = {enhancers};
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
  //   console.log('Test', store.getState());
});
const configureStore = () => {
  return {persistor, store};
};

sagaMiddleware.run(sagas);

export default configureStore;
