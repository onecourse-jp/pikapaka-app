import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, SafeAreaView, Platform} from "react-native";
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
  let {currentIndex} = route.params;
  if (Platform.OS === "ios") {
    currentIndex = route.params?.currentIndex === 1 ? 4 : 0;
  } else {
    currentIndex = currentIndex - 1;
  }
  const colors = useThemeColors();
  const [index, setIndex] = React.useState(currentIndex);
  const [routes] = React.useState([
    {key: "first", title: "スキンケア", icon: require("@assets/images/icons/ic_tab_1.png")},
    {key: "second", title: "ダイエット", icon: require("@assets/images/icons/ic_tab_2.png"), disable: true},
    {key: "third", title: "ピル", icon: require("@assets/images/icons/ic_tab_3.png")},
    {key: "fourth", title: "ED", icon: require("@assets/images/icons/ic_tab_4.png")},
    {key: "fifth", title: "AGA", icon: require("@assets/images/icons/ic_tab_5.png"), disable: true},
  ]);
  const [tabNow, setTabNow] = useState(0)
  const listColor = [colors.buttonSkincare, colors.textDiet, colors.colorPill, colors.colorED07, colors.colorAGA07];

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case "first": {
        setTabNow(1)
        return <TopSkinCare />;
      }
      case "second": {
        setTabNow(2)
        return <TopDiet />;
      }
      case "third": {
        setTabNow(3)
        return <TopPill />;
      }
      case "fourth": {
        setTabNow(4)
        return <TopED />;
      }
      case "fifth": {
        // setTabNow(5)
        return <TopAGA />;
      }
    }
  };

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: colors.colorHome04, maxHeight: 66}}>
        {props.navigationState.routes.map((route, i) => {
          const backgroundColor = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) => (inputIndex === i ? listColor[index] : colors.colorHome02)),
          });
          return (
            <TouchableOpacity
              onPress={() => setIndex(i)}
              disabled={route?.disable}
              key={`step-${i}`}
              style={{
                flexDirection: "column",
                width: "20%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                borderRightWidth: i + 1 < props.navigationState.routes.length ? 1 : 0,
                borderRightColor: colors.white,
                paddingVertical: 7,
                backgroundColor: route?.disable ? colors.gray7 : index === i ? listColor[index] : colors.colorHome02,
              }}
            >
              <View>
                <Image source={route.icon} />
              </View>
              <Text style={{color: colors.white, fontSize: 12, fontWeight: "700", marginTop: 5}}>{route.title}</Text>
              {route?.disable && <Text style={{color:"white", fontSize: 10}}>(準備中)</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  useEffect(() => {
    if (route.params.currentIndex && Platform.OS === "ios") {
      setTimeout(() => {
        setIndex(route.params.currentIndex - 1);
      }, 500);
    }
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
          swipeEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
}
