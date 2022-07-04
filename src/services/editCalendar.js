import request from "@utils/request";
import axios from "axios";
import {Platform} from "react-native";

export async function updateShippingAddress(params) {
  return request(`/auth/edit-reservation/${params.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(params),
  });
}

export async function updateDateTime(params) {
  return request(`/auth/edit-reservation/${params.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(params),
  });
}

export async function deleteCalendar(id) {
  return request(`/auth/delete-reservation/${id}`, {
    method: "DELETE",
  });
}

export async function getDetailOwnQuestion(params) {
  return request(`/auth/question-for-edit`, {
    method: "POST",
    data: params,
  });
}

export async function updateCalendar({params, paramId}) {
  return request(`/auth/edit-reservation/${paramId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(params),
  });
}
