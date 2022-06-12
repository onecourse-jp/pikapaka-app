import React, {useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useNavigation} from "@react-navigation/native";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {SCREEN_REGISTER, SCREEN_WELCOME, SCREEN_RESET_PASSWORD} from "@screens/screens.constants";
import {navigate} from "../../navigation/NavigationService";
import {sendForgotPasswordRequest} from "@services/auth";
import ButtonOrange from "../../components/Button/ButtonOrange";

export default function ForgotPassword() {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [errorApi, setErrorApi] = useState("");
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
    const params = {email: dataSubmit.email};
    const {response, data} = await sendForgotPasswordRequest(params);
    if (response?.status === 200) {
      navigation.navigate(SCREEN_RESET_PASSWORD, params);
    } else {
      console.log("response err", data);
      setErrorApi(global.t(data.errors));
    }
    setDisableSubmit(false);
    global.hideLoadingView();
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
      <View style={[styles.container]}>
        <View>
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
                    <Text style={{width: 120, fontSize: 14, fontFamily: fonts.Hiraginoƒ}}>メールアドレス</Text>
                    <TextInput
                      style={{
                        color: colors.textBlack,
                        backgroundColor: colors.white,
                        flex: 1,
                      }}
                      placeholder={"ご登録中のメールアドレス"}
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
              name="email"
            />
          </View>
          <View style={{paddingHorizontal: 16}}>
            {errors.email && <Text style={styles.textError}>ーメールアドレスを間違えています。</Text>}
            {errorApi.length > 0 && <Text style={styles.textError}>{errorApi}</Text>}
            <ButtonOrange disabled={disableSubmit} title="メールを送信" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: "column"},
  textError: {color: "red", paddingBottom: 12, paddingTop: 6},
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
