
export const getInitials = name => {
  let initials = Array.prototype.map
    .call(name.split(' '), function(x) {
      return x.substring(0, 1).toUpperCase();
    })
    .join('');
  return initials.substring(0, 2);
};
export const validateEmail = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    return false;
  }else {
    return true;
  }
}

export const toastShowMessage = (message) => {
  const toast = useToast();
  toast.showMessage(message,{
    duration: 1000,
  });
}