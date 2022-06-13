import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, Alert, TextInput} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useForm, Controller} from "react-hook-form";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import ButtonProfile from "../Components/ButtonProfile";
import ItemQuestionForm from "../../../components/Form/ItemQuestionForm";
import {changePasswordRequest} from "@services/auth";
import {updateUserProfile} from "@actions/users";
import ButtonOrange from "../../../components/Button/ButtonOrange";

export default function ChangePassword() {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [errorApi, setErrorApi] = useState("");
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(true);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });

  const onSubmit = async (dataSubmit) => {
    global.showLoadingView();
    global.showLoadingView();
    if (dataSubmit.newPassword != dataSubmit.confirmPassword) {
      return setErrorApi("password confirm incorrect");
    }
    try {
      const {data, response} = await changePasswordRequest(dataSubmit);
      if (response.status == 200) {
        dispatch(updateUserProfile(data.data));
        global.hideLoadingView();
        Alert.alert("Update Password", "Success", [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      } else {
        global.hideLoadingView();
        console.log("err changePasswordRequest", data);
        setErrorApi(global.t(data?.message));
      }
    } catch (error) {
      console.log("error", error);
      global.hideLoadingView();
      Alert.alert("Update Password", "Update fail. Please try again.", [
        {
          text: "OK",
          onPress: () => {},
        },
      ]);
    }
  };

  const INFORMATIONBASIC = [
    {
      key: "oldPassword",
      title: "現在のパスワード",
      placeholder: "今ご登録のパスワードを入力",
      state: isOldPasswordVisible,
      togglePassword: () => {
        setIsOldPasswordVisible(!isOldPasswordVisible);
      },
    },
    {
      key: "newPassword",
      title: "新しいパスワード",
      placeholder: "7文字以上の半角英数字",
      state: isNewPasswordVisible,
      togglePassword: () => {
        setIsNewPasswordVisible(!isNewPasswordVisible);
      },
    },
    {
      key: "confirmPassword",
      title: "確認用パスワード",
      placeholder: "パスワードをもう一度入力",
      state: isConfirmPasswordVisible,
      togglePassword: () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
      },
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{}}>
          <View style={{flexDirection: "column", justifyContent: "space-between", flex: 1}}>
            <View>
              {INFORMATIONBASIC.map((item, index) => {
                return (
                  <React.Fragment key={`INFORMATIONBASIC-${index}`}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({field: {onChange, onBlur, value}}) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              borderTopWidth: 1,
                              borderTopColor: colors.borderGrayE,
                              backgroundColor: colors.white,
                              paddingHorizontal: 16,
                            }}
                          >
                            <Text style={{width: 120, fontSize: 12}}>{item.title}</Text>
                            <TextInput
                              style={{
                                color: colors.textBlack,
                                backgroundColor: colors.white,
                                flex: 1,
                                fontSize: 12,
                              }}
                              placeholder={item.placeholder}
                              placeholderTextColor={colors.textPlaceholder}
                              onChangeText={(text) => {
                                onChange(text);
                              }}
                              onBlur={onBlur}
                              value={value}
                              secureTextEntry={item.state}
                            />
                            <TouchableOpacity style={{paddingHorizontal: 8}} onPress={item.togglePassword}>
                              <Image source={require("@assets/images/show_hide_password.png")} />
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                      name={item.key}
                    />
                    {errors[item.key] && (
                      <Text style={styles.textError}>
                        {global.t(item.title)}
                        {global.t("is_require")}
                      </Text>
                    )}
                  </React.Fragment>
                );
              })}
              {errorApi?.length > 0 && <Text style={styles.textError}>{errorApi}</Text>}
            </View>
            <View style={{marginTop: 30, paddingHorizontal: 16}}>
              <ButtonOrange title="パスワード再設定" onPress={handleSubmit(onSubmit)} />
              {/* <ButtonProfile title="情報を編集する" color={colors.headerComponent} onPress={handleSubmit(onSubmit)} />
              <ButtonProfile title="キャンセル" onPress={() => {}} hasBorder={true} color={colors.headerComponent} /> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    flexDirection: "column",
  },
  textError: {color: "red", marginTop: 5, textAlign: "right"},
});
