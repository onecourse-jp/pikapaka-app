import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, SafeAreaView} from "react-native";
import styles from "./styles";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";
import {TabView, TabBar, Icon} from "react-native-tab-view";
import Headercomponent from "@components/Layout/Header";
import TopSkinCare from "./TopSkinCare";
import TopPill from "./TopPill";
import TopDiet from "./TopDiet";
import TopED from "./TopED";
import TopAGA from "./TopAGA";

export default function Top({navigation, route}) {
  const {currentIndex} = route.params;
  const colors = useThemeColors();
  const [index, setIndex] = React.useState(currentIndex - 1);
  const [routes] = React.useState([
    {key: "first", title: "スキンケア"},
    {key: "second", title: "ダイエット", icon: require("@assets/images/icons/ic_tab_2.png")},
    {key: "third", title: "ピル", icon: require("@assets/images/icons/ic_tab_3.png")},
    {key: "fourth", title: "ED", icon: require("@assets/images/icons/ic_tab_4.png")},
    {key: "fifth", title: "AGA", icon: require("@assets/images/icons/ic_tab_5.png")},
  ]);

  const listColor = [colors.buttonSkincare, colors.textDiet, colors.colorPill, colors.colorED07, colors.colorAGA07];

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case "first": {
        return <TopSkinCare />;
      }
      case "second": {
        return <TopDiet />;
      }
      case "third": {
        return <TopPill />;
      }
      case "fourth": {
        return <TopED />;
      }
      case "fifth": {
        return <TopAGA />;
      }
    }
  };

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: colors.colorHome04}}>
        {props.navigationState.routes.map((route, i) => {
          const backgroundColor = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) => (inputIndex === i ? listColor[index] : colors.colorHome02)),
          });
          return (
            <TouchableOpacity
              onPress={() => setIndex(i)}
              key={`step-${i}`}
              style={{
                flexDirection: "column",
                width: "20%",
                alignItems: "center",
                borderRightWidth: i + 1 < props.navigationState.routes.length ? 1 : 0,
                borderRightColor: colors.white,
                paddingVertical: 7,
                backgroundColor: index === i ? listColor[index] : colors.colorHome02,
              }}
            >
              <View>
                <Image source={route.icon} />
              </View>
              <Text style={{color: colors.white, fontSize: 12, fontWeight: "700", marginTop: 5}}>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  useEffect(() => {
    setIndex(route.params.currentIndex - 1);
  }, [route]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundTheme}}>
      <Headercomponent />
      <View style={[styles.container]}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{flex: 1}}
          renderTabBar={renderTabBar}
        />
      </View>
    </SafeAreaView>
  );
}
