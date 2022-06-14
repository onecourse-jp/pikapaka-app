import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, SafeAreaView, Image, TextInput, Alert} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useThemeColors, Button, useThemeFonts} from "react-native-theme-component";
import ButtonOrange from "../../../components/Button/ButtonOrange";
import {updateProfileWithToken} from "@services/profile";
import {dataMedicalHistory} from "../../../data";
import {updateUserProfile} from "@actions/users";

export default function EditMedicalHistory({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const navigation = useNavigation();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const dispatch = useDispatch();
  const [listValue, setListValue] = useState(route?.params?.value || []);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });

  const checkAndTickValue = (val) => {
    let newList = [...listValue];
    if (listValue?.includes(val)) {
      newList.splice(newList.indexOf(val), 1);
    } else {
      newList.push(val);
    }
    setListValue(newList);
  };

  const onSubmit = async (dataSubmit) => {
    try {
      const {data, response} = await updateProfileWithToken({medical_history: listValue});
      if (response.status == 200) {
        console.log("updateProfileWithToken", data.data);
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
  };
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.backgroundTheme}]}>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
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
                アレルギーの有無
              </Text>
            </View>
          </View>
          {dataMedicalHistory.map((item, index) => {
            if (item.value != 0) {
              return (
                <TouchableOpacity
                  key={`dataMedicalHistory-${index}`}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 16,
                    borderTopWidth: 1,
                    borderColor: "#EEEEEE",
                    backgroundColor: listValue && item?.value && listValue?.includes(item?.value) ? colors.bgAccentOrange : colors.white,
                  }}
                  onPress={() => checkAndTickValue(item.value)}
                >
                  <Text
                    style={{
                      color: listValue && item?.value && listValue?.includes(item?.value) ? colors.accentOrange : colors.colorTextBlack,
                    }}
                  >
                    {item.label}
                  </Text>
                  {listValue && item?.value && listValue?.includes(item?.value) && <Image source={require("@assets/images/v_green.png")} />}
                </TouchableOpacity>
              );
            }
          })}
        </View>
        <ButtonOrange disabled={disableSubmit} title="変更する" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1},
  wrapButton: {paddingHorizontal: 10, marginBottom: 20},
  textError: {color: "red", marginTop: 5, paddingHorizontal: 16},
  box: {
    paddingHorizontal: 16,
  },
});
