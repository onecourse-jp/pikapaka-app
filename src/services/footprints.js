import request from '@utils/request';

export async function getFootPrints(params) {
  return request(`/me/footprints?take=${params.take}&skip=${params.skip}`, {
    method: 'GET',
    params: {
      orderBy: params.orderBy
    },
  });
}
