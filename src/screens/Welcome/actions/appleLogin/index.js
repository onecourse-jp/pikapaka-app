import {appleAuth} from "@invertase/react-native-apple-authentication";
import {loginApple} from "@services/auth";
import {getErrorCode} from "@utils/error";
import {updateUserProfile} from "@actions/users";

export const onAppleLogin = async (navigation, dispatch, isFromStep2) => {
  appleAuth
    .performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })
    .then(async (res) => {
      global.showLoadingView();
      console.log("onAppleLogin", res);
      const {response, data} = await loginApple({
        token: res.identityToken,
      });
      if (response.status === 200) {
        dispatch(updateUserProfile(data?.data?.user));
        if (isFromStep2) {
          data.isFromStep2 = isFromStep2;
        }
        global.processSignIn(data);
        global.hideLoadingView();
      } else {
        global.hideLoadingView();
        // global.showAlertModel({
        //   titleError: `${global.t(`error.${getErrorCode(data.message)}`, {
        //     locale: 'ja',
        //   })} \n ${global.t(`error.${getErrorCode(data.message)}`, {
        //     locale: 'vi',
        //   })}`,
        //   titleAction: global.t('text_action'),
        // });
      }
    })
    .catch((error) => {
      global.hideLoadingView();
      console.log("err", error);
    });
};
