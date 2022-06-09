import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, SafeAreaView, Image, TextInput, Alert} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useThemeColors, Button, useThemeFonts} from "react-native-theme-component";
import ButtonOrange from "../../../components/Button/ButtonOrange";
import {updateProfileWithToken} from "@services/profile";
import {updateUserProfile} from "@actions/users";

export default function EditMedicine({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const navigation = useNavigation();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const dispatch = useDispatch();
  console.log("route", route.params.data);
  const [isMedicineStatus, setIsMedicineStatus] = useState(route.params.data.take_medicines === 1 ? true : false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });
  const ListMedicine = [
    {key: "medicine_1", title: "薬1", placeholder: "薬の内容"},
    {key: "medicine_2", title: "薬2", placeholder: "薬の内容"},
    {key: "medicine_3", title: "薬3", placeholder: "薬の内容"},
    {key: "medicine_4", title: "薬4", placeholder: "薬の内容"},
    {key: "medicine_5", title: "薬5", placeholder: "薬の内容"},
  ];
  const onSubmit = async (dataSubmit) => {
    let take_medicines = isMedicineStatus === true ? 1 : 2;
    let content_medicines = []
    for (let i = 1; i <= Object.keys(dataSubmit).length; i++) {
        if (typeof dataSubmit["medicine_"+i] != "undefined" ) {
            content_medicines.push(dataSubmit["medicine_"+i])
        }
      
    }
    content_medicines = isMedicineStatus === true ? content_medicines : []
    let newDataSubmit = {
        take_medicines,
        content_medicines
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
            <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.colorTextBlack, lineHeight: 23}}>服薬中の薬の有無</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 16, borderTopWidth: 1, borderColor: "#EEEEEE", backgroundColor: colors.white}}
          onPress={() => {
            setIsMedicineStatus(true);
          }}
        >
          <Text>あり</Text>
          {isMedicineStatus && <Image source={require("@assets/images/v_green.png")} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 16, borderTopWidth: 1, borderColor: "#EEEEEE", backgroundColor: colors.white}}
          onPress={() => {
            setIsMedicineStatus(false);
          }}
        >
          <Text>なし</Text>
          {!isMedicineStatus && <Image source={require("@assets/images/v_green.png")} />}
        </TouchableOpacity>
        <View style={{paddingTop: 12, paddingBottom: 12, backgroundColor: colors.backgroundTheme}}>
          <View>
            <Text style={{fontFamily: fonts.NSbold, fontSize: 16, color: colors.colorTextBlack, lineHeight: 23}}>服薬中の薬の内容</Text>
          </View>
        </View>
        {ListMedicine.map((item, index) => {
          return (
            <React.Fragment key={`ListAllergy-${index}`}>
              <Controller
                control={control}
                name={item.key}
                defaultValue={route.params.data.content_medicines[index]}
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
                      <Text style={{width: 120, fontSize: 12, color: isMedicineStatus ? colors.colorTextBlack : colors.gray7 }}>{item.title}</Text>
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
                        editable={isMedicineStatus}
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