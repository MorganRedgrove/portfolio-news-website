import { getUser } from "./ApiCalls";

export const usernameChecker = async (username) => {
  const testUsername = /^\S*$/;

  return getUser(username)
    .then(() => {
      return { valid: false, msg: "username has already been taken" };
    })
    .catch(() => {
      return testUsername.test(username)
        ? { valid: true, msg: null }
        : { valid: false, msg: "usernames cannot contain whitespace" };
    });
};
