// import { getAuthority, removeAuthority } from "@/utils/authority";
import axios from "axios";
import Config from "react-native-config";
import AsyncStorage from "@react-native-community/async-storage";
import {getAuthority, removeAuthority} from "./authority";
import {navigationRef} from "src/navigation/NavigationService";
import {SCREEN_LOGIN, SCREEN_WELCOME} from "../screens/screens.constants";
const codeMessage = {
  200: "The server successfully returned the requested data. ",
  201: "Create or modify data successfully. ",
  202: "A request has entered the background queue (asynchronous task). ",
  204: "Delete data successfully. ",
  400: "There was an error in the request sent, and the server did not create or modify data. ",
  401: "The user does not have permission (the token, username, password are wrong). ",
  403: "The user is authorized, but access is forbidden. ",
  404: "The request is for a record that does not exist, and the server is not operating. ",
  406: "The requested format is not available. ",
  410: "The requested resource has been permanently deleted and will no longer be available. ",
  422: "When creating an object, a validation error occurred. ",
  500: "An error occurred in the server, please check the server. ",
  502: "Gateway error. ",
  503: "The service is unavailable, the server is temporarily overloaded or maintained. ",
  504: "The gateway has timed out. ",
};
// config axios- fix CORS
console.log("Config", Config.API_URL);
const instance = axios.create({
  // baseURL: Config.API_URL,
  baseURL: "https://test-tcare.lisod.vn/api",
  timeout: 60000,
  withCredentials: false,
});
// removeAuthority();

instance.interceptors.request //REQUEST
  .use(
    async function (config) {
      var headers = {...config.headers};
      // console.log("hhhhh:", headers);
      const authority = await getAuthority();
      if (authority && authority.data && authority.data.access_token) {
        const {access_token, refreshToken} = authority.data;
        console.log("access_token", access_token);
        headers["Authorization"] = `Bearer ${access_token}`;
      }

      //let auth = localStorage.getItem('authority');
      // let access_token = auth.token.access_token
      //   let authority = getAuthority();
      //var headers = { ...config.headers };
      //   if (authority && authority.token) {
      //     headers["Authorization"] = `Bearer ${authority.token.access_token}`;
      //   }
      //headers["X-Requested-With"] = "XMLHttpRequest";
      //headers["Content-Type"] = "application/json";
      //headers["X-XSRF-TOKEN"] = getCookie("XSRF-TOKEN");
      config.headers = headers;
      return config;
    },
    (error) => {
      if (error && error.request) {
      }
      return Promise.reject(error);
    },
  );
instance.interceptors.response.use(
  async function (response) {
    // console.log("response: ", response);
    // if (response.status === 401) {
    //   // removeAuthority();
    //   removeAuthority();
    //   navigationRef.current.resetRoot({
    //     index: 0,
    //     routes: [{ name: SCREEN_LOGIN }],
    //   });
    // }
    return {
      response,
      data: response.data,
    };
  },
  (error) => {
    console.log("error request", error?.response?.data?.message);
    if (error?.message === "Network Error") {
      return {
        response: {status: 1001, message: error.message},
        data: {message: error.message},
      };
    } else if (
      error?.response?.data?.message === "User is not logged in."
      // && error.response.status === 401
    ) {
      // removeAuthority();
      AsyncStorage.removeItem("@access_token");
      removeAuthority();
      navigationRef.current.resetRoot({
        index: 0,
        routes: [{name: SCREEN_WELCOME}],
      });
    }
    return {response: error.response, data: error?.response?.data ?? {}};
  },
);

const request = (url, options) => {
  return instance.request({...options, url: url});
};
export default request;
