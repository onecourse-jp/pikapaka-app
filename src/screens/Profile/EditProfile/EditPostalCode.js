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
  console.log("route", route.params.data)
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });
  const onSubmit = async (dataSubmit)=>{
    console.log("dataSubmit", dataSubmit)
    if (Object.keys(dataSubmit).length > 0) {
        try {
          const {data, response} = await updateProfileWithToken(dataSubmit);
          if (response.status == 200) {
            dispatch(updateUserProfile(data.data));
            global.hideLoadingView();
            Alert.alert("", "個人情報の編集が完了しました。", [
              {
                text: "はい",
                onPress: () => {
                  navigation.goBack();
                },
              },
            ]);
            console.log("data when update", data);
          } else {
            global.hideLoadingView();
            Alert.alert("Update Profile", "Update fail. Please try again.", [
              {
                text: "OK",
                onPress: () => {},
              },
            ]);
          }
        } catch (error) {
          console.log("error", error);
          global.hideLoadingView();
          Alert.alert("Update Profile", "Update fail. Please try again.", [
            {
              text: "OK",
              onPress: () => {},
            },
          ]);
        }
      }
  }
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundTheme}]}>
      <View style={{width: "100%", marginBottom: 14}}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="postal_code"
          defaultValue={route.params.data.name}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTopWidth: 1,
                  borderTopColor: "#EEEEEE",
                }}
              >
                <Text style={{width: 120}}>郵便番号</Text>
                <TextInput
                  style={{
                    color: colors.textBlack,
                    backgroundColor: colors.white,
                    flex: 1,
                  }}
                  placeholder="山田太郎"
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
      <ButtonOrange disabled={disableSubmit} title="変更する" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
  wrapButton: {paddingHorizontal: 10, marginBottom: 20},
  textError: {color: "red", marginTop: 5},
});