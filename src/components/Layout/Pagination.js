import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, FlatList, Image} from "react-native";
import {useThemeColors, useThemeFonts} from "react-native-theme-component";

export default function Pagination({totalPage, page = 1, setPage = () => {}}) {
  const fonts = useThemeFonts();
  const colors = useThemeColors();
  const [totalPagePagination, setTotalPagePagination] = useState(totalPage);
  const [pagePagination, setPagePagination] = useState(page);

  useEffect(() => {
    setPagePagination(page);
  }, [page]);
  useEffect(() => {
    setTotalPagePagination(totalPage);
  }, [totalPage]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 12,
        padding: 0,
        height: 24,
      }}
    >
      <TouchableOpacity
        disabled={pagePagination == 1 ? true : false}
        style={{width: 24, height: 24, borderRadius: 2, flexDirection: "row", justifyContent: "center", alignItems: "center"}}
      >
        {pagePagination == 1 ? (
          <Image style={{width: 24, height: 24}} source={require("@assets/images/icons/pagination-prev.png")} />
        ) : (
          <Image
            style={{width: 7, height: 12, transform: [{rotate: "180deg"}]}}
            source={require("@assets/images/icons/pagination_arrow_right.png")}
          />
        )}
      </TouchableOpacity>
      {Array.from(Array(totalPagePagination).keys()).map((item) => {
        return (
          <TouchableOpacity
            key={`pagination-${item}`}
            onPress={() => {
              setPage(item + 1);
            }}
            style={{
              width: 24,
              height: 24,
              paddingVertical: 1,
              paddingHorizontal: 8,
              borderRadius: 3,
              borderColor: colors.headerComponent,
              borderWidth: pagePagination == item + 1 ? 1 : 0,
            }}
          >
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "500",
                  lineHeight: 20,
                  color: pagePagination == item + 1 ? colors.headerComponent : colors.colorTextBlack,
                  fontFamily: fonts.RobotoBold,
                }}
              >
                {item + 1}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        disabled={pagePagination == totalPagePagination ? true : false}
        style={{width: 24, height: 24, borderRadius: 2, flexDirection: "row", justifyContent: "center", alignItems: "center"}}
      >
        {pagePagination == totalPagePagination ? (
          <Image
            style={{width: 24, height: 24, transform: [{rotate: "180deg"}]}}
            source={require("@assets/images/icons/pagination-prev.png")}
          />
        ) : (
          <Image style={{width: 7, height: 12}} source={require("@assets/images/icons/pagination_arrow_right.png")} />
        )}
      </TouchableOpacity>
    </View>
  );
}
