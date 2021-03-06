import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, SafeAreaView, Image, TextInput, Alert} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useThemeColors, Button} from "react-native-theme-component";
import ButtonOrange from "../../../components/Button/ButtonOrange";
import {updateProfileWithToken} from "@services/profile";
import {updateUserProfile} from "@actions/users";

export default function EditEmailAddress({route}) {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });
  const onSubmit = async (dataSubmit) => {
    console.log("dataSubmit", dataSubmit);
    global.showLoadingView();
    if (Object.keys(dataSubmit).length > 0) {
      try {
        const {data, response} = await updateProfileWithToken(dataSubmit);
        if (response.status == 200) {
          dispatch(updateUserProfile(data.data));
          global.hideLoadingView();
          Alert.alert("", "メールアドレスを更新しました", [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
          console.log("data when update", data);
        } else {
          global.hideLoadingView();
          Alert.alert("","個人情報の編集ができません。もう一度お願いします。", [
            {
              text: "OK",
              onPress: () => {},
            },
          ]);
        }
      } catch (error) {
        console.log("error", error);
        global.hideLoadingView();
        Alert.alert("","個人情報の編集ができません。もう一度お願いします。", [
          {
            text: "OK",
            onPress: () => {},
          },
        ]);
      }
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
      <View style={{width: "100%", marginBottom: 14}}>
        <Controller
          control={control}
          rules={{
            required: true,
            validate: (value) => validateEmail(value),
          }}
          name="email"
          defaultValue={route?.params?.data?.email}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                  alignItems: "center",
                  borderTopWidth: 1,
                  borderTopColor: colors.borderGrayE,
                  backgroundColor: colors.white,
                }}
              >
                <Text style={{width: 120, fontWeight: "600", color: colors.colorTextBlack}}>メールアドレス</Text>
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
                  }}
                  onBlur={onBlur}
                  value={value}
                />
              </View>
            );
          }}
        />
        {errors.email && <Text style={styles.textError}>エラーメール</Text>}
      </View>
      <View style={{paddingHorizontal: 16}}>
        <ButtonOrange disabled={disableSubmit} title="変更する" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {paddingVertical: 20, flex: 1},
  wrapButton: {paddingHorizontal: 10, marginBottom: 20},
  textError: {color: "red", marginTop: 5, paddingHorizontal: 16},
});
