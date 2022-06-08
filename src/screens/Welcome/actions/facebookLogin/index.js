import {AccessToken, LoginManager, GraphRequest, GraphRequestManager} from "react-native-fbsdk";
import {loginFacebook} from "@services/auth";
import {getErrorCode} from "@utils/error";
import {updateUserProfile} from "@actions/users";

export const onFacebookLogin = async (navigation, dispatch, isFromStep2) => {
  global.showLoadingView();
  console.log("login_FB");
  global.hideLoadingView();
  LoginManager.logInWithPermissions(["public_profile", "email", "user_friends"]).then(
    function (result) {
      console.log("dataloginFB2result", result);
      let emailUserFacebook = null;
      const infoRequest = new GraphRequest("/me?fields=email", null, (error, re) => {
        if (error) {
          console.log("Error fetching data: " + error.toString());
        } else {
          emailUserFacebook = re?.email || null;
        }
      });
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
      if (result.isCancelled) {
        console.log("Login cancelled");
        global.hideLoadingView();
      } else {
        AccessToken.getCurrentAccessToken().then(async (dataFacebook) => {
          global.showLoadingView();
          console.log("dataFacebook", dataFacebook);
          let {response, data} = await loginFacebook({
            token: dataFacebook.accessToken,
          });

          global.hideLoadingView();
          if (response.status === 201 || response.status === 200) {
            dispatch(updateUserProfile(data?.data?.user));
            if (isFromStep2) {
              data.isFromStep2 = isFromStep2;
            }
            global.processSignIn(data);
          } else {
            console.log("error login facebook");
          }
        });
      }
    },
    function (error) {
      global.hideLoadingView();
      console.log("Login fail with error: " + error);
      // global.showAlertModel({
      //   titleError: `${global.t("error.Network", {
      //     locale: "ja",
      //   })} \n ${global.t("error.Network", {
      //     locale: "vi",
      //   })}`,
      //   titleAction: `${global.t("text_action", {
      //     locale: "ja",
      //   })} ${global.t("text_action", {locale: "vi"})}`,
      // });
    },
  );
};
