export const getErrorCode = (message) => {
  //   const ar = message.includes(':') ? message.split(':') : ['911'];
  if (!message) return 0;
  const ar = message.split(':');
  if (ar.length > 0) {
    return ar[0];
  }
  return 0;
};
