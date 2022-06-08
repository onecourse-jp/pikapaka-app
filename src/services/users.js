import request from "@utils/request";

export async function updateNotificationToken(params) {
  console.log("REQUEST PARAMS ", params);
  return request("/me/update-notification-token", {
    method: "POST",
    data: params,
  });
}

export async function chatUploadImage(image, onUploadProgress) {
  let formData = new FormData();
  formData.append(
    "image",
    image instanceof Blob
      ? image
      : {
          uri: image,
          type: "image/jpg",
          name: "1.jpg",
        },
    image instanceof Blob ? "1.png" : "1.jpg",
  );
  return request("/chat/uploadImage", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    onUploadProgress,
  });
}

export async function getDayCalendar(params) {
  return request(`/check-calendar?detail_category_medical_of_customer=${params}`, {
    method: "GET",
  });
}
export async function getHourCalendar(params) {
  return request(`/calendar?date_time=${params.date_time}&detail_category_medical_of_customer=${params.detail_category_medical_of_customer}`, {
    method: "GET",
  });
}
