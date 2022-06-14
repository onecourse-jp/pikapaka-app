import request from "@utils/request";
import axios from "axios";

export async function updatePaymentApple(params) {
  return request("/payments/apple", {
    method: "POST",
    data: params,
  });
}
export async function updatePaymentGoogle(params) {
  return request("/payments/google", {
    method: "POST",
    data: params,
  });
}
export async function createStripePaymentIntent(params) {
  return request("/payments/create-payment-intent", {
    method: "POST",
    data: params,
  });
}
export async function createStripeCheckoutSession(params) {
  return request("/auth/payment/create-session", {
    method: "POST",
    data: params,
  });
}
export async function cancelStripePayment(params) {
  return request("/me/cancelStripePayment", {method: "POST"});
}

export async function getBillPayment(params) {
  return request("/auth/get-bill", {method: "GET", params: params});
}
export async function paymentStripe(params) {
  return request("/auth/payment-stripe", {method: "POST", data: params});
}
