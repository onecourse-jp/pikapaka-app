import React, {useEffect, useContext, useState} from "react";
import {Image, ActivityIndicator, View} from "react-native";
import {SCREEN_MAIN, SCREEN_LOGIN, SCREEN_WELCOME, SCREEN_NOTIFICATION} from "@screens/screens.constants";
import {useDispatch, useSelector} from "react-redux";
// import LinearGradient from 'react-native-linear-gradient';

import {navigationRef} from "src/navigation/NavigationService";
import {getMasterDataRequest} from "@actions/masterDataAction";
import {isLogin} from "@utils/authority";
import {getMe} from "@services/profile";
import {getProfileUser} from "@actions/profileAction";
import {UPDATE_PROFILE, INIT_APP_LINK} from "@actions/types";
import AsyncStorage from "@react-native-community/async-storage";
import LocalizationContext from "@context/LocalizationContext";
import {getAppLinks} from "@services/masterData";
import {removeAuthority} from "@utils/authority";
import {NO_NETWORK} from "@utils/RCode";

function SplashScreen({navigation}) {
  const masterDataProcess = useSelector((state) => state.masterDataReducer.loaded);
  const masterDataProcessprocess = useSelector((state) => state.masterDataReducer.process);
  console.log("masterDataProcess:", masterDataProcess, masterDataProcessprocess);

  const {setLocale} = useContext(LocalizationContext);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.users.userDetails);
  const masterDATA = useSelector((state) => state.masterDataReducer.mapData);
  useEffect(() => {
    try {
      if (userDetails) {
        let appLanguage = userDetails.userSetting.displayLanguage === "JAPANESE" ? "ja" : "vi";
        setLocale(appLanguage);
      }
    } catch (e) {
      console.log("=====>eeee", e);
    }
  }, [userDetails]);

  const getData = async () => {
    console.log("call getDAta");
    // Bugsnag.notify(new Error('Test error'));
    setLoading(true);
    global.showLoadingView();
    console.log("1");
    const firstInstall = await AsyncStorage.getItem("@firstInstall");
    const redoObject = (obj) => {
      let newObj = {};
      obj.map((el) => {
        newObj[el.name] = el.link;
      });
      return newObj;
    };
    const appLinkData = await getAppLinks();
    if (appLinkData.response.status === 200) {
      let newData = {};
      let linkJa = appLinkData.response.data.filter((obj) => {
        return obj.language === "ja";
      });
      let linkVi = appLinkData.response.data.filter((obj) => {
        return obj.language === "vi";
      });
      let linkAny = appLinkData.response.data.filter((obj) => {
        return obj.language === "any";
      });
      newData.ja = redoObject(linkJa[0].items);
      newData.vi = redoObject(linkVi[0].items);
      newData.any = redoObject(linkAny[0].items);

      dispatch({
        type: INIT_APP_LINK,
        payload: {...newData},
      });
    }
    if (firstInstall === null || firstInstall === undefined) {
      console.log("2");
      await AsyncStorage.setItem("@firstInstall", "1");
      await removeAuthority();
    }

    // try {
    const _isLogin = await isLogin();
    // dispatch({ type: UPDATE_PROFILE, payload: data });
    if (_isLogin) {
      console.log("3");
      const {response, data} = await getMe();
      if (response.status === 200) {
        dispatch({type: UPDATE_PROFILE, payload: data});

        if (data.profile === null) {
          navigationRef.current.navigate(SCREEN_WELCOME);
          // navigationRef.current.resetRoot({
          //   index: 0,
          //   routes: [{ name: SCREEN_WELCOME }],
          // });
          console.log("4");
        } else {
          let appLanguage = data.userSetting.displayLanguage === "JAPANESE" ? "ja" : "vi";
          console.log("appLanguage", appLanguage);
          setLocale(appLanguage);
          await AsyncStorage.setItem("@language", appLanguage);
          dispatch(getProfileUser(data));
          console.log("7");
          setTimeout(() => {
            navigation.navigate(SCREEN_MAIN);
          }, 500);
          // navigationRef.current.navigate(SCREEN_MAIN);
          // navigationRef.current.resetRoot({
          //   index: 0,
          //   routes: [{ name: SCREEN_MAIN }],
          // });
          console.log("8");
        }
      } else if (response.status === NO_NETWORK) {
        console.log("5");
        global.showConfirmModal2({
          title: global.t("error_network"),
          type: "error",
          buttonVisible: true,
          btnOkText: global.t("try_again"),
          onOkCallback: () => {
            getData();
          },
        });
      } else {
        console.log("error getProfileUser get me splash:", data.message);
        await removeAuthority();
        // navigationRef.current.resetRoot({
        //   index: 0,
        //   routes: [{ name: SCREEN_LOGIN }],
        // });
        navigation.navigate(SCREEN_LOGIN);
      }
    } else {
      // navigationRef.current.resetRoot({
      //   index: 0,
      //   routes: [{ name: SCREEN_LOGIN }],
      // });
      navigation.navigate(SCREEN_LOGIN);
    }
    // } catch (e) {
    //   console.log(e);
    //   console.log('aaaaaaaaaaaaaaaaaa', JSON.stringify(navigationRef, null, 2));
    //   global.showConfirmModal2({
    //     title: global.t('error_techinal'),
    //     type: 'error',
    //     buttonVisible: true,
    //     btnOkText: global.t('try_again'),
    //     onOkCallback: () => {
    //       getData();
    //     },
    //   });
    //   // global.showConfirmModal({
    //   //   title: global.t('error_techinal'),
    //   //   type: 'error',
    //   //   buttonVisible: true,
    //   //   btnOkText: global.t('try_again'),
    //   //   onOkCallback: () => {
    //   //     getData();
    //   //   },
    //   //   // onCancelCallback: () => {},
    //   //   // timeout: 1000,
    //   //   // buttonVisible: false,
    //   // });
    //   console.log('====================================');
    //   console.log('error Splash', e);
    //   console.log('====================================');
    // }
    setLoading(false);
    global.hideLoadingView();
  };

  useEffect(async () => {
    // Bugsnag.releaseStage = 'development';
    // Bugsnag.notifyReleaseStages = ['production', 'staging'];

    setTimeout(async () => {
      await getData();
      dispatch(getMasterDataRequest());
    }, 500);
  }, []);
  return (
    <View>
      {/* <LinearGradient
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      start={{ x: 0, y: 1 }}
      end={{ x: 1.5, y: 0.4 }}
      locations={[0, 0.5, 0.6]}
      colors={['#FF7840', '#F15D69', '#E3496A']}> */}
      <ActivityIndicator style={{marginTop: 10}} color="white" animating={loading} />
      {/* </LinearGradient> */}
    </View>
  );
}

export default SplashScreen;
