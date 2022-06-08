import {GoogleSignin, statusCodes} from "@react-native-google-signin/google-signin";
import Config from "react-native-config";
import {authGoogleLogin} from "@services/auth";
import {setAuthority} from "@utils/authority";
import {getErrorCode} from "@utils/error";
import {updateEmailProfile} from "@actions/updateProfileAction";
import {useDispatch} from "react-redux";
import {updateUserProfile} from "@actions/users";

export const onLoginGoogle = async (navigation, dispatch, isFromStep2) => {
  //   const dispatch = useDispatch();
  GoogleSignin.configure({
    webClientId: Config.GOOGLE_CLIENT_ID,
  });
  try {
    const userInfo = await GoogleSignin.signIn();
    global.showLoadingView();
    console.log("GoogleSignin", userInfo);
    // dispatch(updateEmailProfile(userInfo?.user?.email));
    const {response, data} = await authGoogleLogin({
      id_token: userInfo.idToken,
    });
    console.log("authGoogleLogin", response);
    if (response.status === 201 || response.status === 200) {
      dispatch(updateUserProfile(data?.data?.user));
      console.log("userdata=============***", data);
      global.hideLoadingView();
      if (isFromStep2) {
        data.isFromStep2 = isFromStep2;
      }
      global.processSignIn(data);
    } else {
      console.log("response err", response);
      global.hideLoadingView();
      await GoogleSignin.signOut();
    }
  } catch (e) {
    console.log(" error SingIn google:", e);
    // if (e == 'Error: NETWORK_ERROR') {
    //   console.log('Error: NETWORK_ERROR');
    //   global.showAlertModel({
    //     titleError: `${global.t('error.Network', {
    //       locale: 'ja',
    //     })} \n ${global.t('error.Network', {
    //       locale: 'vi',
    //     })}`,
    //     titleAction: `${global.t('text_action', {
    //       locale: 'ja',
    //     })} ${global.t('text_action', { locale: 'vi' })}`,
    //   });
    // } else if (e.code === statusCodes.SIGN_IN_CANCELLED) {
    //   global.showAlertModel({
    //     titleError: `${global.t('error.CancleSignIn', {
    //       locale: 'ja',
    //     })} \n ${global.t('error.CancleSignIn', {
    //       locale: 'vi',
    //     })}`,
    //     titleAction: `${global.t('text_action', {
    //       locale: 'ja',
    //     })} ${global.t('text_action', { locale: 'vi' })}`,
    //   });
    // } else {
    //   global.showAlertModel({
    //     titleError: `${global.t('error.0', {
    //       locale: 'ja',
    //     })} \n ${global.t('error.0', {
    //       locale: 'vi',
    //     })}`,
    //     titleAction: `${global.t('text_action', {
    //       locale: 'ja',
    //     })} ${global.t('text_action', { locale: 'vi' })}`,
    //   });
    // }
  }
};
