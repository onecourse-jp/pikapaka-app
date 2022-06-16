/* global require */
import React, {createRef, useContext, useEffect, useState} from "react";
import {View, Text, Pressable, StyleSheet, TouchableOpacity, Dimensions, Image, FlatList} from "react-native";
import LocalizationContext from "@context/LocalizationContext";
import {useThemeColors, Button} from "react-native-theme-component";
import Colors from "@config/styles";
import {getListPictureRevervation} from "@services/auth";

export default function ModalViewListImageOnCall({navigation, route}) {
  const [listImage, setListImage] = useState([]);
  const colors = useThemeColors();
  let {width, height} = Dimensions.get("window");
  useEffect(async () => {
    if (route?.params?.id) {
      try {
        const {data, response} = await getListPictureRevervation(route?.params?.id);
        if (response.status == 200) {
          console.log("data getListPictureRevervation", data);
          setListImage(data?.data || []);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [route]);
  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity key={`_renderItem-${index}`} onPress={() => console.log("hahah")}>
        <Image
          style={{width: (width - 70) / 2, height: 163, backgroundColor: "#C4C4C4", marginTop: 8}}
          source={{
            uri: item.image,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <Pressable
        style={[StyleSheet.absoluteFill, {backgroundColor: "rgba(0, 0, 0, 0.5)"}]}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          height: height - 60,
          width: width,
          backgroundColor: "white",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          paddingVertical: 25,
        }}
      >
        <View
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 30,
            paddingHorizontal: 24,
          }}
        >
          <TouchableOpacity style={{width: 20, height: 20, paddingHorizontal: 24}} onPress={() => navigation.goBack()}>
            <Image source={require("@assets/images/icons/close_black.png")} style={{width: 20, height: 20}} resizeMode="cover" />
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={2}
          // horizontal={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
          }}
          columnWrapperStyle={{justifyContent: "space-between"}}
          data={listImage}
          renderItem={(item, index) => _renderItem(item, index)}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    backgroundColor: "transparent",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    paddingTop: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  imageWarn: {
    margin: 32,
    alignSelf: "center",
  },
  topTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.color.COLOR_BLACK,
    marginTop: 30,
  },
});
