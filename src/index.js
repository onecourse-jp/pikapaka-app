import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { ToastProvider } from 'react-native-toast-notifications';
// import Toast from 'react-native-toast-notifications/lib/typescript/toast';
// import messaging from '@react-native-firebase/messaging';
// import {
//   InAppNotificationProvider,
//   withInAppNotification,
// } from 'react-native-in-app-notification';
ReactDOM.render(
  <React.StrictMode>
    {/* <InAppNotificationProvider> */}
    {/* <ToastProvider
      placement="top"
      duration={5000}
      animationType="slide-in"
      animationDuration={250}
      normalColor="gray"
      // icon={<Icon />}
      textStyle={{ fontSize: 20 }}
      offset={0} // offset for both top and bottom toasts
      swipeEnabled={true}
      // renderToast={(toastOptions) => }
    > */}
      <App />
    {/* </ToastProvider> */}
    {/* <Toast ref={(ref) => global['toast'] = ref} /> */}
    {/* </InAppNotificationProvider> */}
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
