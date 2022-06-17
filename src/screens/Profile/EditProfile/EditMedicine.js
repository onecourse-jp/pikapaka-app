import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
} from "react-native";
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
  const [isMedicineStatus, setIsMedicineStatus] = useState(route?.params?.data?.take_medicines === 1 ? true : false);
  const content_medicines = route?.params?.data?.content_medicines ? route?.params?.data?.content_medicines : null;
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
    let content_medicinesParams = [];
    for (let i = 1; i <= Object.keys(dataSubmit).length; i++) {
      if (typeof dataSubmit["medicine_" + i] != "undefined") {
        content_medicinesParams.push(dataSubmit["medicine_" + i]);
      }
    }
    content_medicinesParams = isMedicineStatus === true ? content_medicinesParams : [];
    let newDataSubmit = {
      take_medicines,
      content_medicines: content_medicinesParams,
    };
    console.log("dataSubmit", newDataSubmit);

    if (Object.keys(dataSubmit).length > 0) {
      try {
        const {data, response} = await updateProfileWithToken(newDataSubmit);
        if (response.status == 200) {
          dispatch(updateUserProfile(data.data));
          global.hideLoadingView();
          Alert.alert("", "薬の内容を更新しました。", [
            {
              text: "はい",
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
        } else {
          global.hideLoadingView();
          Alert.alert("", "個人情報の編集ができません。もう一度お願いします。", [
            {
              text: "OK",
              onPress: () => {},
            },
          ]);
        }
      } catch (error) {
        console.log("error", error);
        global.hideLoadingView();
        Alert.alert("", "個人情報の編集ができません。もう一度お願いします。", [
          {
            text: "OK",
            onPress: () => {},
          },
        ]);
      }
    }
  };
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.backgroundTheme}]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
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
                服薬中の薬の有無
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
              setIsMedicineStatus(true);
            }}
          >
            <Text>あり</Text>
            {isMedicineStatus && <Image source={require("@assets/images/v_green.png")} />}
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
              setIsMedicineStatus(false);
            }}
          >
            <Text>なし</Text>
            {!isMedicineStatus && <Image source={require("@assets/images/v_green.png")} />}
          </TouchableOpacity>
          {isMedicineStatus && (
            <>
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
                    服薬中の薬の内容
                  </Text>
                </View>
              </View>
              {ListMedicine.map((item, index) => {
                return (
                  <React.Fragment key={`ListAllergy-${index}`}>
                    <Controller
                      control={control}
                      name={item.key}
                      defaultValue={content_medicines ? content_medicines[index] : null}
                      render={({field: {onChange, onBlur, value}}) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              borderTopWidth: 1,
                              borderTopColor: "#EEEEEE",
                              backgroundColor: colors.white,
                              paddingHorizontal: 16,
                            }}
                          >
                            <Text style={{width: 120, fontSize: 12, color: isMedicineStatus ? colors.colorTextBlack : colors.gray7}}>
                              {item.title}
                            </Text>
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
                              editable={isMedicineStatus}
                            />
                          </View>
                        );
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </>
          )}
          <View style={{paddingHorizontal: 16, paddingTop: 16, paddingBottom: 30}}>
            <ButtonOrange disabled={disableSubmit} title="変更する" onPress={handleSubmit(onSubmit)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
