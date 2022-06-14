import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, SafeAreaView, Image, TextInput, Alert} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {useThemeColors, Button} from "react-native-theme-component";
import ButtonOrange from "../../../components/Button/ButtonOrange";
import DateInput from "@components/items/DateInput";
import {updateProfileWithToken} from "@services/profile";
import {updateUserProfile} from "@actions/users";
import moment from "moment";

export default function EditBirthday({route}) {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [maxInput, setMaxInput] = useState(null);
  const [statusErrorMax, setStatusErrorMax] = useState(false);
  const [errorInputMax, setErrorInputMax] = useState("");
  const [statusSubmitMax, setStatusSubmitMax] = useState([]);
  const [currentBirthday, setCurrentBirthday] = useState(null);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    required: true,
  });
  const validateBirthday = (day) => {
    const resultValidate = moment(day).format("YYYY-MM-DD");
    console.log("validateBirthday", resultValidate);
    return resultValidate && resultValidate != "Invalid date" ? true : false;
  };
  const onChangeInputMax = () => {
    setStatusErrorMax(false);
  };
  const getDayInput = (data) => {
    let DayInput = new Date(`${data.year}-${data.month}-${data.day}`);
    setMaxInput(DayInput);
  };
  useEffect(() => {
    console.log("maxinput", maxInput);
  }, [maxInput]);
  const getErrorInputMax = (error) => {
    setStatusErrorMax(true);
    setErrorInputMax(error);
  };
  useEffect(() => {
    if (route?.params?.data?.birthday) {
      setCurrentBirthday(Number(moment(route?.params?.data?.birthday).format("YYYYMMDD")));
      console.log(Number(moment(route?.params?.data?.birthday).format("YYYYMMDD")));
    }
  }, [route]);
  const onSubmit = async (dataSubmit) => {
    console.log("dataSubmit", dataSubmit);
    if (maxInput) {
      global.showLoadingView();
      try {
        const birthdayParams = moment(maxInput).format("YYYY-MM-DD");
        const {data, response} = await updateProfileWithToken({birthday: birthdayParams});
        if (response.status == 200) {
          dispatch(updateUserProfile(data.data));
          global.hideLoadingView();
          Alert.alert("", "生年月日を更新しました。", [
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
    <SafeAreaView style={[styles.container, {backgroundColor: colors.backgroundTheme}]}>
      <View style={{width: "100%", marginBottom: 14}}>
        <Text style={{paddingHorizontal: 16, fontWeight: "600", color: colors.colorTextBlack}}>生年月日</Text>
        {/* <Controller
          control={control}
          rules={{
            required: true,
            validate: (value) => validateBirthday(value),
          }}
          name="birthday"
          defaultValue={route?.params?.data?.birthday}
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
                <Text style={{width: "30%", fontWeight: "600", color: colors.colorTextBlack}}>生年月日</Text>
                <TextInput
                  style={{
                    color: colors.textBlack,
                    backgroundColor: colors.white,
                    flex: 1,
                    fontSize: 14,
                  }}
                  placeholder="フリガナを入力 (yyyy-mm-dd)"
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
        {errors.birthday && <Text style={styles.textError}> 年／月／日のフォーマットで入力してください。</Text>} */}
      </View>
      <View style={{flexDirection: "row", justifyContent: "center", backgroundColor: colors.white, paddingBottom: 8}}>
        <DateInput
          isFromProfile={true}
          disableInput={statusSubmitMax.length === 0 ? false : true}
          onChangeInput={onChangeInputMax}
          minYear={false}
          maxYear={false}
          currentTime={currentBirthday ? currentBirthday.toString() : null}
          getErrorInput={getErrorInputMax}
          getDataBirthday={(val) => getDayInput(val)}
        />
      </View>
      {statusErrorMax && <Text style={styles.textError}>{errorInputMax}</Text>}
      <View style={{paddingHorizontal: 16, marginTop: 20}}>
        <ButtonOrange disabled={disableSubmit} title="変更する" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {paddingVertical: 20, flex: 1},
  wrapButton: {paddingHorizontal: 10, marginBottom: 20},
  textError: {color: "red", marginTop: 5, paddingHorizontal: 16},
});
