export const getAvatar = (user) => {
  try {
    return user.profile.avatarImage.imageUrl;
  } catch (e) {
    return null;
  }
};
