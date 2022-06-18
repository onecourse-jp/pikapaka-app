import React, {useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, SafeAreaView, ScrollView, Platform} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useNavigation} from "@react-navigation/native";
import * as usersAction from "@actions/users";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useDispatch, useSelector} from "react-redux";
import {login} from "@services/auth";
import {SCREEN_REGISTER, SCREEN_FORGOT_PASSWORD, SCREEN_LOGIN} from "@screens/screens.constants";
import {navigationRef} from "src/navigation/NavigationService";
import AsyncStorage from "@react-native-community/async-storage";
import {OTPRegisterSuccess} from "@actions/otpRegisterAction";
import {setAuthority} from "@utils/authority";
import {updateUserProfile} from "@actions/users";
import {onLoginGoogle} from "./actions/googleLogin";
import {onFacebookLogin} from "./actions/facebookLogin";
import {onAppleLogin} from "./actions/appleLogin";
import {onLineLogin} from "./actions/lineLogin";
import {SCREEN_SERVICE_STEP3} from "../screens.constants";
import ButtonSocialLogin from "./components/ButtonSocialLogin";

export default function WelcomeScreen({route}) {
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const dispatch = useDispatch();
  const isFromStep2 = route?.params?.isFromStep2;
  console.log(route?.params, route?.params);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [errorApi, setErrorApi] = useState("");
  const calendar = useSelector((state) => state?.calendar);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });
  const navigation = useNavigation();
  const onSubmit = async (dataSubmit) => {
    setDisableSubmit(true);
    global.showLoadingView();
    const paramLogin = {email: dataSubmit.email, password: dataSubmit.password};
    const {data, response} = await login(paramLogin);
    if (response?.status === 200) {
      console.log("data login", data);
      const jsonValue = JSON.stringify(data?.data);
      dispatch(OTPRegisterSuccess(data.data));
      dispatch(updateUserProfile(data?.data?.user));
      if (isFromStep2) {
        data.isFromStep2 = isFromStep2;
      }
      global.processSignIn(data);
      global.hideLoadingView();
      setDisableSubmit(false);
      // if (isFromStep2) {
      //   navigationRef.current.resetRoot({
      //     index: 0,
      //     routes: [{name: SCREEN_SERVICE_STEP3}],
      //   });
      // } else {
      //   navigationRef.current.resetRoot({
      //     index: 0,
      //     routes: [{name: "Tabbar"}],
      //   });
      // }
    } else {
      setDisableSubmit(false);
      global.hideLoadingView();
      console.log("error login", data);
      setErrorApi(global.t(data.errors));
    }
  };
  const validateEmail = (email) => {
    const resultValidate = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    return resultValidate ? true : false;
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
          <View style={[styles.container]}>
            <View>
              <Text style={{fontSize: 16, lineHeight: 30, color: "black", textAlign: "center", marginTop: 40}}>
                {global.t("online_medical_care_app")}
              </Text>
              <Text style={{fontSize: 30, marginBottom: 64, textAlign: "center", marginTop: 6, color: colors.headerComponent}}>
                {global.t("AppName")}
              </Text>
              <Text style={{fontSize: 16, marginBottom: 14, textAlign: "center"}}>{global.t("LoginScreenTitle")}</Text>

              <ButtonSocialLogin
                title={global.t("LINE")}
                image={require("@assets/images/logo-line-login.png")}
                onPress={() => {
                  onLineLogin(navigation, dispatch, isFromStep2);
                }}
                backgroundColor={colors.backgroundLineLogin}
                textColor={colors.white}
                boderColor="#DDDDDD"
              />
              <View style={{marginBottom: 10}} />
              {(Platform.OS === "ios" || Platform.OS === "web") && (
                <>
                  <ButtonSocialLogin
                    title={global.t("Apple")}
                    image={require("@assets/images/logo-apple-login.png")}
                    onPress={() => {
                      onAppleLogin(navigation, dispatch, isFromStep2);
                    }}
                    backgroundColor="#000000"
                    textColor={colors.white}
                    boderColor="#DDDDDD"
                  />
                  <View style={{marginBottom: 10}} />
                </>
              )}

              <ButtonSocialLogin
                title={global.t("Google")}
                image={require("@assets/images/logo-google-login.png")}
                onPress={() => {
                  onLoginGoogle(navigation, dispatch, isFromStep2);
                }}
                backgroundColor={colors.white}
                textColor={colors.colorTextBlack}
                boderColor="#CCCCCC"
              />
              <View style={{marginBottom: 10}} />
              <ButtonSocialLogin
                title={global.t("Facebook")}
                image={require("@assets/images/logo-facebook-login.png")}
                onPress={() => {
                  onFacebookLogin(navigation, dispatch, isFromStep2);
                }}
                backgroundColor={colors.backgroundFacebookLogin}
                textColor={colors.white}
                boderColor="#CCCCCC"
              />
              {/* <View style={{marginBottom: 10}} /> */}
              <Text
                style={{
                  fontSize: 16,
                  color: colors.colorTextBlack,
                  fontFamily: fonts.Hiragino,
                  lineHeight: 24,
                  marginVertical: 14,
                  textAlign: "center",
                }}
              >
                もしくは
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  height: 47,
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 5,
                  borderColor: colors.headerComponent,
                }}
                onPress={() => {
                  navigation.navigate(SCREEN_LOGIN, {data: route});
                }}
              >
                <Text style={{fontSize: 16, textAlign: "center", color: colors.headerComponent}}>
                  {global.t("Log_in_with_your_email_address")}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10, width: "100%"}}>
             
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(SCREEN_REGISTER);
                }}
                style={{
                  boderColor: colors.headerComponent,
                  height: 47,
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text style={{fontSize: 16, textAlign: "center", fontWeight: "600", color: colors.headerComponent}}>
                  {global.t("New_registration_with_email_address")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: 10,
                }}
                onPress={() => {
                  navigation.navigate("Tabbar");
                }}
              >
                <Text style={{fontSize: 16, textAlign: "center", color: colors.headerComponent}}>{`TOPに戻る`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: "column", marginTop: 5, paddingHorizontal: 22, justifyContent: "space-between"},
  textError: {color: "red", marginTop: 5},
});
