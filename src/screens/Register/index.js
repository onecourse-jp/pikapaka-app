import React, {useState} from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {useForm, Controller} from "react-hook-form";
import {navigationRef} from "src/navigation/NavigationService";
import {useNavigation} from "@react-navigation/native";
import {register} from "@services/auth";
import {SCREEN_WELCOME} from "@screens/screens.constants";
import ButtonOrange from "../../components/Button/ButtonOrange";

export default function Register() {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });
  const navigation = useNavigation();
  const [errorApi, setErrorApi] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (dataSubmit) => {
    global.showLoadingView();
    setDisableSubmit(true);
    const paramRegister = {email: dataSubmit.email, password: dataSubmit.password};
    const {response, data} = await register(paramRegister);
    if (response.status === 200) {
      console.log("response", data);
      setDisableSubmit(false);
      Alert.alert("", "新規登録が完了しました。", [
        {
          text: "はい",
          onPress: () =>
            navigationRef.current.resetRoot({
              index: 0,
              routes: [{name: SCREEN_WELCOME}],
            }),
        },
      ]);
    } else {
      setDisableSubmit(false);
      // setErrorApi(global.t(data.errors));
      setErrorApi(data.errors);
    }
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
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <ScrollView contentContainerStyle={{height: "100%"}}>
          <View style={[styles.container]}>
            <View style={{width: "100%", marginTop: 16}}>
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
                        placeholder={"メールアドレス"}
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

              {errors.email && <Text style={styles.textError}>正しいメールアドレスを入力してください。</Text>}

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
                      placeholderTextColor={colors.textPlaceholder}
                      placeholder={"7文字以上の半角英数字"}
                      secureTextEntry={showPassword ? false : true}
                      onChangeText={(text) => {
                        onChange(text);
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
            </View>
            <View style={{paddingHorizontal: 16}}>
              {/* <Text style={{fontSize: 30, marginBottom: 88, textAlign: "center", marginTop: 60}}>Tケアクリニック</Text>
              <Text style={{fontSize: 16, marginBottom: 14, textAlign: "center"}}>メールアドレスで新規登録</Text> */}
              {errors.password && (
                <Text style={styles.textError}>
                  {errors.password.type === "required" ? "パスワードが必要です" : `7文字以上の半角英数字`}.
                </Text>
              )}
              {errorApi.length > 0 && <Text style={styles.textError}>{errorApi}</Text>}
              <View style={{flexDirection: "row", marginTop: 14, flexWrap: "wrap", alignItems: "center"}}>
                <Text style={{fontSize: 13, textAlign: "center", flexDirection: "row", alignItems: "center"}}>
                  登録またはログインすることで、
                  <TouchableOpacity>
                    <Text
                      style={{fontSize: 13, position: "relative", top: 3, color: colors.headerComponent, textDecorationLine: "underline"}}
                    >
                      利用規約
                    </Text>
                  </TouchableOpacity>
                  と
                  <TouchableOpacity>
                    <Text
                      style={{fontSize: 13, position: "relative", top: 3, color: colors.headerComponent, textDecorationLine: "underline"}}
                    >
                      プライバシーポリシー
                    </Text>
                  </TouchableOpacity>
                  に同意したものとみなします。
                </Text>
              </View>
              <View style={{height: 10}}></View>
              <ButtonOrange disabled={disableSubmit} title="新規登録" onPress={handleSubmit(onSubmit)} />
              {/* <Button disabled={disableSubmit} label="新規登録する" onPress={handleSubmit(onSubmit)} /> */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeView: {
    paddingHorizontal: 20,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  viewTextInput: {
    paddingHorizontal: 10,
    marginTop: 20,
    borderColor: "black",
    borderRadius: 10,
  },
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
