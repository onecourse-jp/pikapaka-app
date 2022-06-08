import React from "react";
import {Text, View, Image} from "react-native";
import {useThemeColors} from "react-native-theme-component";
import moment from "moment";

export default function ListTime({data = null, hourPicked}) {
  const colors = useThemeColors();
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: data?.slot > 0 ? colors.gray3 : colors.gray5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 7,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 16,
            width: 16,
            borderRadius: 16,
            borderColor: colors.gray3,
            borderWidth: 1,
            backgroundColor: data?.constant_time?.id === hourPicked?.constant_time?.id ? colors.textBlue : colors.white,
          }}
        />
        <Text style={{fontSize: 14, color: data?.slot > 0 ? colors.gray3 : colors.gray4, marginLeft: 14}}>
          {data?.constant_time?.time_start} ~ {data?.constant_time?.time_end}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{fontSize: 14, color: data?.slot > 0 ? colors.textBlue : colors.gray4}}>
          {data?.slot > 0 ? `あと${data?.slot}枠` : "✕"}
        </Text>
      </View>
    </View>
  );
}
