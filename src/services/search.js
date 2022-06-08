import request from "@utils/request";

export async function getListContent(params) {
  return request("/get-content", {
    method: "GET",
    params: params,
  });
}
export async function getListFaq(params) {
  return request(`/get-faq`, {
    method: "GET",
    params: params,
  });
}
export async function getProfile() {
  return request("/auth/me", {
    method: "GET",
  });
}
