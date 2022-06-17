import request from "@utils/request";

export async function login(params) {
  return request(`/auth/login`, {
    method: "POST",
    data: params,
  });
}

export async function register(params) {
  return request(`/user/sign-up`, {
    method: "POST",
    data: params,
  });
}

export async function logout(params) {
  return request(`/auth/logout`, {
    method: "POST",
    data: params,
  });
}
export async function loginTotp(params) {
  return request(`/auth/login/totp`, {
    method: "POST",
    data: params,
  });
}
export async function authRefresh(params) {
  return request(`/auth/refresh`, {
    method: "POST",
    data: params,
  });
}
export async function authToken(params) {
  return request(`/auth/login/token`, {
    method: "POST",
    data: params,
  });
}
export async function authGoogleLogin(params) {
  return request(`/login/google`, {
    method: "POST",
    data: params,
  });
}
export async function loginFacebook(params) {
  return request(`/login/facebook`, {
    method: "POST",
    data: params,
  });
}
export async function loginApple(params) {
  return request(`/login/apple`, {
    method: "POST",
    data: params,
  });
}
export async function authLineLogin(params) {
  return request(`/login/line`, {
    method: "POST",
    data: params,
  });
}

export async function resetPasswordRequest(params) {
  return request(`/user/reset-password`, {
    method: "PUT",
    data: params,
  });
}
export async function creatReservation(params) {
  return request(`/auth/create-reservation`, {
    method: "POST",
    data: params,
  });
}
export async function getReservation(params) {
  return request(`/auth/get-reservation`, {
    method: "GET",
    params: params,
  });
}
export async function getReservationById(params) {
  return request(`/auth/get-reservation/${params}`, {
    method: "GET",
  });
}

export async function checkReservation(params) {
  return request(
    `/check-reservation?user_id=${params.user_id}&detail_category_medical_of_customer=${params.detail_category_medical_of_customer}`,
    {
      method: "GET",
    },
  );
}

export async function sendForgotPasswordRequest(params) {
  return request(`/user/forgot-password`, {
    method: "POST",
    data: params,
  });
}
export async function changePasswordRequest(params) {
  return request(`/user/change-password`, {
    method: "POST",
    data: params,
  });
}

export async function createReservationAnswer(params) {
  return request(`/auth/add-answer`, {
    method: "POST",
    data: params,
  });
}
export async function getListPictureRevervation(params) {
  return request(`/auth/get-images?reservation_form_id=${params}`, {
    method: "GET",
  });
}
