import request from "@utils/request";
import axios from "axios";
import {Platform} from "react-native";

export async function getQuestionFormCalendar(params) {
  return request(`/auth/get-question/?medical_type=${params}`, {
    method: "GET",
  });
}

export async function getMe() {
  return request(`/me`, {
    method: "GET",
  });
}

export async function updateProfileWithToken(params) {
  return request(`/user/detail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(params),
  });
}
export async function getNotificationCount() {
  return request("/me/notification-count", {
    method: "GET",
  });
}