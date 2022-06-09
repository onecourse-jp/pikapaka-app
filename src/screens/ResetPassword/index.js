import React, {useState} from "react";
import {StyleSheet, Text, View, Alert, TextInput, SafeAreaView, TouchableOpacity} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {navigationRef} from "src/navigation/NavigationService";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useThemeColors, Button} from "react-native-theme-component";
import {SCREEN_HOME, SCREEN_WELCOME} from "@screens/screens.constants";
import {resetPasswordRequest} from "@services/auth";
import ButtonOrange from "../../components/Button/ButtonOrange";

export default function ResetPassword() {
  const colors = useThemeColors();
  const route = useRoute();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const routeParams = route?.params;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });
  const navigation = useNavigation();
  const [passwordForm, setPasswordForm] = useState("");
  const [errorApi, setErrorApi] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const onSubmit = async (dataSubmit) => {
    setDisableSubmit(true);
    global.showLoadingView();
    const params = {email: routeParams.email, password: dataSubmit.password, token: dataSubmit.pincode};
    // navigation.navigate(SCREEN_HOME);
    const {response, data} = await resetPasswordRequest(params);
    if (response?.status === 200) {
      console.log("data", data);
      Alert.alert("パスワード再設定", "パスワード再設定が成功です。", [
        {
          text: "戻る",
          onPress: () =>
            navigationRef.current.resetRoot({
              index: 0,
              routes: [{name: SCREEN_WELCOME}],
            }),
        },
      ]);
      // navigation.navigate(SCREEN_OTP, {totpToken: data.totpToken, paramRegister: paramLogin});
    } else {
      console.log("error Reset password", data);
      setErrorApi(global.t(data.errors));
    }
    setDisableSubmit(false);
    global.hideLoadingView();
  };

  const validateConfirmPassword = (pass) => {
    return pass === passwordForm ? true : false;
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <View>
          <View style={{width: "100%", marginBottom: 14}}>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 6,
                maxLength: 6,
              }}
              render={({field: {onChange, onBlur, value}}) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTopWidth: 1,
                      borderTopColor: "#EEEEEE",
                      paddingHorizontal: 16,
                      backgroundColor: colors.white,
                    }}
                  >
                    <Text style={{width: 120}}>メールアドレス</Text>
                    <TextInput
                      style={{
                        color: colors.textBlack,
                        backgroundColor: colors.white,
                        flex: 1,
                      }}
                      keyboardType="numeric"
                      placeholder={"メールに記載の6桁のコード"}
                      placeholderTextColor={colors.textPlaceholder}
                      onChangeText={(text) => {
                        onChange(text);
                        setErrorApi("");
                      }}
                      onBlur={onBlur}
                      value={value}
                      maxLength={30}
                    />
                  </View>
                );
              }}
              name="pincode"
            />
            {errors.pincode && (
              <Text style={styles.textError}>
                {errors.pincode.type === "required" ? "Pincode is required" : `Length of Pincode equal 6`}.
              </Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTopWidth: 1,
                    borderTopColor: "#EEEEEE",
                    paddingHorizontal: 16,
                    backgroundColor: colors.white,
                  }}
                >
                  <Text style={{width: 120}}>新しいパスワード</Text>
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
                      setPasswordForm(text);
                      setErrorApi("");
                    }}
                    onBlur={onBlur}
                    value={value}
                    maxLength={30}
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
                {errors.password.type === "required" ? "パスワードが必要です" : `7文字以上の半角英数字`}.
              </Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
                validate: (value) => validateConfirmPassword(value),
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTopWidth: 1,
                    borderTopColor: "#EEEEEE",
                    paddingHorizontal: 16,
                    backgroundColor: colors.white,
                  }}
                >
                  <Text style={{width: 120}}>確認用パスワード</Text>
                  <TextInput
                    style={{
                      color: colors.textBlack,
                      backgroundColor: colors.white,
                      flex: 1,
                    }}
                    type={"password"}
                    placeholder={"パスワードをもう一度入力"}
                    placeholderTextColor={colors.textPlaceholder}
                    secureTextEntry={showConfirmPassword ? false : true}
                    onChangeText={(text) => {
                      onChange(text);
                      setErrorApi("");
                    }}
                    onBlur={onBlur}
                    value={value}
                    maxLength={30}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Image source={require("@assets/images/show_hide_password.png")} />
                  </TouchableOpacity>
                </View>
              )}
              name="corfirmpassword"
            />
            {errors.corfirmpassword && <Text style={styles.textError}>入力されたパスワードが一致しません。</Text>}
            {errorApi.length > 0 && <Text style={styles.textError}>{errorApi}</Text>}
          </View>
          <View style={{paddingHorizontal: 16}}>
            <ButtonOrange disabled={disableSubmit} title="パスワード再設定" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: "column", marginTop: 5, justifyContent: "space-between"},
  textError: {color: "red", paddingBottom: 12, paddingTop: 6},
});
