import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, SafeAreaView, Image, TextInput, Alert} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useThemeColors, Button} from "react-native-theme-component";
import ButtonOrange from "../../../components/Button/ButtonOrange";
import {updateProfileWithToken} from "@services/profile";
import {updateUserProfile} from "@actions/users";

export default function EditGender({route}) {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const dispatch = useDispatch();
  console.log("route", route.params.data);
  const [isGenderStatus, setIsGenderStatus] = useState(route.params.data.gender === 1 ? true : false);

  const onSubmit = async () => {
    let gender = isGenderStatus === true ? 1 : 2;
    let dataSubmit = {
      gender,
    };
    console.log("dataSubmit", dataSubmit);
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
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundTheme}]}>
      <View style={{width: "100%", marginBottom: 14}}>
        <TouchableOpacity
          style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 16, borderTopWidth: 1, borderColor: "#EEEEEE"}}
          onPress={() => {
            setIsGenderStatus(true);
          }}
        >
          <Text>男性</Text>
          {isGenderStatus && <Image source={require("@assets/images/v_green.png")} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 16, borderTopWidth: 1, borderColor: "#EEEEEE"}}
          onPress={() => {
            setIsGenderStatus(false);
          }}
        >
          <Text>女性</Text>
          {!isGenderStatus && <Image source={require("@assets/images/v_green.png")} />}
        </TouchableOpacity>
      </View>
      <ButtonOrange disabled={disableSubmit} title="変更する" onPress={onSubmit} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
  wrapButton: {paddingHorizontal: 10, marginBottom: 20},
  textError: {color: "red", marginTop: 5},
});
