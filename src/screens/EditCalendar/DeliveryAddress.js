import React, {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity} from "react-native";
import {useThemeColors, useThemeFonts, Button} from "react-native-theme-component";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {SCREEN_QUESIONAIRE_STEP2, SCREEN_EDIT_CALENDAR_CONFIRM} from "@screens/screens.constants";
import {getReservationById} from "@services/auth";
import moment from "moment";
import ItemQuestionForm from "@components/Form/ItemQuestionForm";
import {updateShippingAddress} from "@services/editCalendar";
import {updateCalendar} from "@actions/calendarAction";

export default function DeliveryAddress({route}) {
  const colors = useThemeColors();
  const fonts = useThemeFonts();
  const [dataCalendar, setDataCalendar] = useState(route?.params?.data);
  const screenStep = 2;
  const navigation = useNavigation();
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
    global.showLoadingView();
    let dataAddressSubmit = {};
    if (dataSubmit.address && dataSubmit.address != dataCalendar?.address) {
      dataAddressSubmit.address = dataSubmit.address;
    } else {
      dataAddressSubmit.address = dataCalendar?.address;
    }

    if (dataSubmit.postal_code && dataSubmit.postal_code != dataCalendar?.postal_code) {
      dataAddressSubmit.postal_code = dataSubmit.postal_code;
    } else {
      dataAddressSubmit.postal_code = dataCalendar?.postal_code;
    }

    dataAddressSubmit.id = dataCalendar.id;
    dataAddressSubmit.detail_category_medical_of_customer = dataCalendar?.detail_category_medical_of_customer;
    console.log("data address submit", dataAddressSubmit);
    if (Object.keys(dataAddressSubmit).length > 0) {
      try {
        let newDataCalendar = {
          ...dataCalendar,
          address: dataAddressSubmit.address,
          postal_code: dataAddressSubmit.postal_code,
        };
        navigation.navigate(SCREEN_EDIT_CALENDAR_CONFIRM, {data: newDataCalendar});
        // const {data, response} = await updateShippingAddress(dataAddressSubmit);
        // console.log("data---", data)
        // if (response.status == 200) {
        //   dispatch(updateUserProfile(data.data));
        //   global.hideLoadingView();
        //   console.log("data when update", data);
        // } else {
        //   global.hideLoadingView();
        //   console.log("response--------", response);
        // }
      } catch (error) {
        console.log("error", error);
        global.hideLoadingView();
      }
    }
    global.hideLoadingView();
  };

  const ADDRESS = [
    {
      key: "address",
      label: 2,
      title: "住所",
      type: 2,
      value: dataCalendar?.address,
    },
    {
      key: "postal_code",
      label: 2,
      title: "郵便番号",
      type: 2,
      value: dataCalendar?.postal_code,
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <View style={[styles.container]}>
        <ScrollView contentContainerStyle={{}}>
          <View style={{paddingHorizontal: 16}}>
            <Text style={{fontFamily: fonts.RobotoRegular, fontSize: 15, color: colors.gray1, lineHeight: 26}}>
              引っ越しなどで住所が変わられた方は
              <Text style={{color: colors.headerComponent}}>マイページ</Text>
              から変更を行って下さい。
            </Text>
          </View>
          <Text
            style={{
              fontFamily: fonts.NSbold,
              fontSize: 16,
              paddingHorizontal: 16,
              color: colors.textBlack,
              lineHeight: 23,
              marginVertical: 7,
            }}
          >
            今回の配送先を指定
          </Text>
          <View>
            {ADDRESS.map((item, index) => {
              return (
                <React.Fragment key={`ADDRESS-${index}`}>
                  <Controller
                    control={control}
                    rules={{required: true}}
                    name={item.key}
                    defaultValue={item?.value}
                    render={({field: {onChange, onBlur, value}}) => {
                      return <ItemQuestionForm item={item} valueData={value} changeData={onChange} />;
                    }}
                  />
                </React.Fragment>
              );
            })}
          </View>
        </ScrollView>
        <View style={{marginTop: 60, paddingHorizontal: 16}}>
          <Button label="変更内容を確認へ進む" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    flexDirection: "column",
  },
});
