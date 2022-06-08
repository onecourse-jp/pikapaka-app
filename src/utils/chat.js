export const getConversationId = (userId, partnerId) => {
  if (userId && partnerId) {
    try {
      let id = '';
      if (userId > partnerId) {
        id = userId.toString() + partnerId.toString();
      } else {
        id = partnerId.toString() + userId.toString();
      }
      return id;
    } catch (error) {
      return;
    }
  }
};
