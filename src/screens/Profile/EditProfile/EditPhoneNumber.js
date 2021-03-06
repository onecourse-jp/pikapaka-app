import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, SafeAreaView, Image, TextInput, Alert} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useThemeColors, Button} from "react-native-theme-component";
import ButtonOrange from "../../../components/Button/ButtonOrange";
import {updateProfileWithToken} from "@services/profile";
import {updateUserProfile} from "@actions/users";

export default function EditPostalCode({route}) {
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
          Alert.alert("", "電話番号を更新しました", [
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
    global.hideLoadingView();
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundTheme}]}>
      <View style={{width: "100%", marginBottom: 14}}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="phone_number"
          defaultValue={route?.params?.data?.phone_number}
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
                <Text style={{width: 120, fontWeight: "600", color: colors.colorTextBlack}}>電話番号</Text>
                <TextInput
                  style={{
                    color: colors.textBlack,
                    backgroundColor: colors.white,
                    flex: 1,
                  }}
                  placeholder="0123456789"
                  placeholderTextColor={colors.textPlaceholder}
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="number-pad"
                />
              </View>
            );
          }}
        />
        {errors.name && <Text style={styles.textError}>{global.t("is_require")}</Text>}
      </View>
      <View style={{paddingHorizontal: 16}}>
        <ButtonOrange disabled={disableSubmit} title="変更する" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, paddingVertical: 16},
  wrapButton: {paddingHorizontal: 10, marginBottom: 20},
  textError: {color: "red", marginTop: 5},
});
