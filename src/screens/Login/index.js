import React, {useState} from "react";
import {TextInput, StyleSheet, Text, View, TouchableOpacity, Image, Alert, SafeAreaView, ScrollView} from "react-native";
import {useThemeColors, Button} from "react-native-theme-component";
import {useForm, Controller} from "react-hook-form";
import {navigationRef} from "src/navigation/NavigationService";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {SCREEN_FORGOT_PASSWORD} from "@screens/screens.constants";
import {login} from "@services/auth";
import {OTPRegisterSuccess} from "@actions/otpRegisterAction";
import {updateUserProfile} from "@actions/users";
import ButtonOrange from "../../components/Button/ButtonOrange";
export default function LoginScreen({route}) {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFromStep2 = route?.params?.isFromStep2;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [errorApi, setErrorApi] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (dataSubmit) => {
    setDisableSubmit(true);
    global.showLoadingView();
    const paramLogin = {email: dataSubmit.email, password: dataSubmit.password};
    console.log("paramLogin", paramLogin);
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
    <View style={[styles.container, {backgroundColor: colors.backgroundTheme}]}>
      <View style={{width: "100%", marginVertical: 16}}>
        <Controller
          control={control}
          rules={{
            required: true,
            validate: (value) => validateEmail(value),
          }}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <View style={styles.wrapInput}>
                <Text style={{width: 120}}>メールアドレス</Text>
                <TextInput
                  style={{
                    color: colors.textBlack,
                    backgroundColor: colors.white,
                    flex: 1,
                  }}
                  placeholder={global.t("email_address")}
                  placeholderTextColor={colors.textPlaceholder}
                  onChangeText={(text) => {
                    onChange(text);
                    setErrorApi("");
                  }}
                  onBlur={onBlur}
                  value={value}
                  maxLength={80}
                />
              </View>
            );
          }}
          name="email"
        />
        {errors.email && <Text style={styles.textError}>メールアドレスが間違っています。</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 8,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.wrapInput}>
              <Text style={{width: 120}}>パスワード</Text>
              <TextInput
                style={{
                  color: colors.textBlack,
                  backgroundColor: colors.white,
                  flex: 1,
                }}
                type={"password"}
                placeholder={"7文字以上の半角英数字"}
                placeholderTextColor={colors.textPlaceholder}
                secureTextEntry={showPassword ? false : true}
                onChangeText={(text) => {
                  onChange(text);
                  setErrorApi("");
                }}
                onBlur={onBlur}
                value={value}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={require("@assets/images/show_hide_password.png")} />
              </TouchableOpacity>
            </View>
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.textError}>
            {errors.password.type === "required" ? "パスワードが必要です" : `パスワードは８文字以上必要です`}.
          </Text>
        )}
        {errorApi?.length > 0 && <Text style={styles.textError}>{errorApi}</Text>}
      </View>
      {/* <Button disabled={disableSubmit} label={global.t("login")} onPress={handleSubmit(onSubmit)} /> */}
      <View style={{paddingHorizontal: 16}}>
        <ButtonOrange disabled={disableSubmit} title={global.t("login")} onPress={handleSubmit(onSubmit)} />
        <TouchableOpacity onPress={() => navigation.navigate(SCREEN_FORGOT_PASSWORD)}>
          <Text style={{fontSize: 14, marginTop: 14, textAlign: "center", color: colors.headerComponent}}>
            {global.t("Click_here_if_you_have_forgotten_your_password")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapButton: {paddingHorizontal: 10, marginBottom: 20},
  textError: {color: "red", marginTop: 5},
  wrapInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
});
