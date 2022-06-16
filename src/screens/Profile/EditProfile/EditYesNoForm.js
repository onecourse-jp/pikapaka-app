import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, SafeAreaView, Image, TextInput, Alert} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useThemeColors, Button, useThemeFonts} from "react-native-theme-component";
import ButtonOrange from "../../../components/Button/ButtonOrange";
import {updateProfileWithToken} from "@services/profile";
import {updateUserProfile} from "@actions/users";

export default function EditYesNoForm({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log("route", route?.params?.data);
  const [status, setStatus] = useState(route?.params?.data?.value === 1 ? true : false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });

  const onSubmit = async (dataSubmit) => {
    let changeValue = status === true ? 1 : 2;
    let newDataSubmit = {};
    newDataSubmit[route?.params?.key] = changeValue;
    console.log("dataSubmit", newDataSubmit);
    try {
      const {data, response} = await updateProfileWithToken(newDataSubmit);
      if (response.status == 200) {
        dispatch(updateUserProfile(data.data));
        global.hideLoadingView();
        Alert.alert("", "設定が完了しました。", [
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
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundTheme}]}>
      <View style={{width: "100%", marginBottom: 14}}>
        <View style={{paddingTop: 12, paddingBottom: 12, backgroundColor: colors.backgroundTheme}}>
          <View>
            <Text
              style={{
                fontFamily: fonts.Hiragino,
                fontWeight: "700",
                paddingHorizontal: 16,
                fontSize: 16,
                color: colors.colorTextBlack,
                lineHeight: 23,
              }}
            >
              {route.params.label}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
            borderTopWidth: 1,
            borderColor: "#EEEEEE",
            backgroundColor: colors.white,
          }}
          onPress={() => {
            setStatus(true);
          }}
        >
          <Text>あり</Text>
          {status && <Image source={require("@assets/images/v_green.png")} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
            borderTopWidth: 1,
            borderColor: "#EEEEEE",
            backgroundColor: colors.white,
          }}
          onPress={() => {
            setStatus(false);
          }}
        >
          <Text>なし</Text>
          {!status && <Image source={require("@assets/images/v_green.png")} />}
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 16}}>
        <ButtonOrange title="変更する" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1},
  wrapButton: {paddingHorizontal: 10, marginBottom: 20},
  textError: {color: "red", marginTop: 5},
  box: {
    paddingHorizontal: 16,
  },
});
