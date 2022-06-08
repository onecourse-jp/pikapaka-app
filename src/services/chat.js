import request from '@utils/request';

export async function postUpdateChatSettings(params) {
  return request(`/chat/update_chat_setting`, {
    method: 'POST',
    data: params,
  });
}
