export const passwordChecker = async (password) => {
  const testPassword = /.{8}/;

  return testPassword.test(password)
    ? { valid: true, msg: null }
    : { valid: false, msg: "password must be at least 8 characters in length" };
};
