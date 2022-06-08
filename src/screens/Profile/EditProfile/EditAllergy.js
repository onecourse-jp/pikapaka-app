import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, SafeAreaView, Image, TextInput, Alert} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useThemeColors, Button, useThemeFonts} from "react-native-theme-component";
import ButtonOrange from "../../../components/Button/ButtonOrange";
import {updateProfileWithToken} from "@services/profile";
import {updateUserProfile} from "@actions/users";

export default function EditAllergy({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const navigation = useNavigation();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const dispatch = useDispatch();
  console.log("route", route.params.data);
  const [isAllergyStatus, setIsAllergyStatus] = useState(route.params.data.allergies === 1 ? true : false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });
  const ListAllergy = [
    {key: "allergy_1", title: "アレルギー1", placeholder: "アレルギーの内容"},
    {key: "allergy_2", title: "アレルギー2", placeholder: "アレルギーの内容"},
    {key: "allergy_3", title: "アレルギー3", placeholder: "アレルギーの内容"},
    {key: "allergy_4", title: "アレルギー4", placeholder: "アレルギーの内容"},
    {key: "allergy_5", title: "アレルギー5", placeholder: "アレルギーの内容"},
  ];
  const onSubmit = async (dataSubmit) => {
    let allergies = isAllergyStatus === true ? 1 : 2;
    let content_allergies = []
    for (let i = 1; i <= Object.keys(dataSubmit).length; i++) {
        if (typeof dataSubmit["allergy_"+i] != "undefined" ) {
             content_allergies.push(dataSubmit["allergy_"+i])
        }
      
    }
    content_allergies = isAllergyStatus === true ? content_allergies : []
    let newDataSubmit = {
        allergies,
        content_allergies
    };
    console.log("dataSubmit", newDataSubmit);
    
    if (Object.keys(dataSubmit).length > 0) {
      try {
        const {data, response} = await updateProfileWithToken(newDataSubmit);
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
        <View style={{paddingTop: 12, paddingBottom: 12, backgroundColor: colors.backgroundTheme}}>
          <View>
            <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.colorTextBlack, lineHeight: 23}}>アレルギーの有無</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 16, borderTopWidth: 1, borderColor: "#EEEEEE", backgroundColor: colors.white}}
          onPress={() => {
            setIsAllergyStatus(true);
          }}
        >
          <Text>あり</Text>
          {isAllergyStatus && <Image source={require("@assets/images/v_green.png")} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 16, borderTopWidth: 1, borderColor: "#EEEEEE", backgroundColor: colors.white}}
          onPress={() => {
            setIsAllergyStatus(false);
          }}
        >
          <Text>なし</Text>
          {!isAllergyStatus && <Image source={require("@assets/images/v_green.png")} />}
        </TouchableOpacity>
        <View style={{paddingTop: 12, paddingBottom: 12, backgroundColor: colors.backgroundTheme}}>
          <View>
            <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.colorTextBlack, lineHeight: 23}}>アレルギーの内容</Text>
          </View>
        </View>
        {ListAllergy.map((item, index) => {
          return (
            <React.Fragment key={`ListAllergy-${index}`}>
              <Controller
                control={control}
                name={item.key}
                defaultValue={route.params.data.content_allergies[index]}
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
                      <Text style={{width: 120, fontSize: 12, color: isAllergyStatus ? colors.colorTextBlack : colors.gray7 }}>{item.title}</Text>
                      <TextInput
                        style={{
                          color: colors.textBlack,
                          backgroundColor: colors.white,
                          flex: 1,
                          fontSize: 12
                        }}
                        placeholder={item.placeholder}
                        placeholderTextColor={colors.textPlaceholder}
                        onChangeText={(text) => {
                          onChange(text);
                        }}
                        onBlur={onBlur}
                        value={value}
                        editable={isAllergyStatus}
                      />
                    </View>
                  );
                }}
              />
            </React.Fragment>
          );
        })}
      </View>
      <ButtonOrange disabled={disableSubmit} title="変更する" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
  wrapButton: {paddingHorizontal: 10, marginBottom: 20},
  textError: {color: "red", marginTop: 5},
  box: {
    paddingHorizontal: 16,
  },
});
