import React, {useEffect, useState} from "react";
import {Image, ActivityIndicator} from "react-native";
import {SCREEN_WELCOME, SCREEN_HOME} from "@screens/screens.constants";
// import LinearGradient from "react-native-linear-gradient";

import {navigationRef} from "src/navigation/NavigationService";
import {isLogin} from "@utils/authority";
import {removeAuthority} from "@utils/authority";

import * as semver from "semver";
import {useSelector, useDispatch} from "react-redux";
import useDispatchPromise from "@utils/useDispatchPromise";
const Promise = require("promise/setimmediate/es6-extensions");
const allSettled = (promises) => {
  return Promise.all(
    promises.map((promise) => promise.then((value) => ({status: "fulfilled", value})).catch((reason) => ({status: "rejected", reason}))),
  );
};

function SplashScreen(props) {
  console.log("SplashScreen SplashScreen");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state?.users?.userDetails);
  const dispatch = useDispatchPromise();
  const getData = async () => {
    console.log("call getDAta");
    try {
      setLoading(true);
      const _isLogin = await isLogin();
      console.log("islogin", _isLogin);
      if (_isLogin) {
        console.log("islogin");
      }
      const p = [];

      Promise.all(p)
        .then((values) => {
          console.log("profile", values);
          if (_isLogin) {
            navigationRef.current.resetRoot({
              index: 0,
              routes: [{name: "Tabbar"}],
            });
            return;
          } else {
            navigationRef.current.resetRoot({
              index: 0,
              routes: [{name: "Tabbar"}],
            });
          }
        })
        .catch(async (e) => {
          console.log("error promise", e);
          if (e && e.data && e.data.statusCode === 401) {
            await removeAuthority();
            navigationRef.current.resetRoot({
              index: 0,
              routes: [{name: "Tabbar"}],
            });
          } else {
            console.log("show confirm2");
          }
        });
    } catch (e) {
      console.log("catcher", e);
    }
    return;
  };

  useEffect(async () => {
    getData();
  }, []);
  return <></>;
}

export default SplashScreen;
