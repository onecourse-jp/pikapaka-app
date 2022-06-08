import {authLineLogin} from "@services/auth";
import LineLogin from "@xmartlabs/react-native-line";
import {updateUserProfile} from "@actions/users";

export const onLineLogin = async (navigation, dispatch, isFromStep2) => {
  try {
    const loginResult = await LineLogin.login();
    console.log("line loginResult", loginResult);
    const {response, data} = await authLineLogin({
      token: loginResult.accessToken.access_token,
    });
    console.log("onLineLogin", response);
    if (response.status === 201 || response.status === 200) {
      console.log("userdata=============***", data);
      dispatch(updateUserProfile(data?.data?.user));
      global.hideLoadingView();
      if (isFromStep2) {
        data.isFromStep2 = isFromStep2;
      }
      global.processSignIn(data);
    } else {
      console.log("response err", response);
      global.hideLoadingView();
    }
  } catch (error) {
    console.log("error", error);
  }
};
