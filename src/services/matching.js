import request from '@utils/request';

export async function likeSomeOne(params) {
  return request(`/matchings`, {
    method: 'POST',
    data: params,
  });
}

export async function getMatchingBetween(userId, partnerId) {
  return request(`/matchings/between?userId=${userId}&partnerId=${partnerId}`, {
    method: 'GET',
  });
}

export async function skipSomeOne(params) {
  return request(`/matchings`, {
    method: 'POST',
    data: params,
  });
}
export async function getAllMatchings(params) {
  return request(`/matchings`, {
    method: 'GET',
    params: params,
  });
}
