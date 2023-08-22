export const imageChecker = (url) => {
  return new Promise((resolve, reject) => {
    let image = new Image();

    image.onload = () => {
      image.height >= 50 && image.width >= 50
        ? resolve({ valid: true, msg: null })
        : resolve({
            valid: false,
            msg: "user avatars must be at least 50x50 pixels in size",
          });
    };

    image.onerror = reject;

    image.src = url;
  });
};
