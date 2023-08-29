import { imageChecker } from "./imageChecker";
import { usernameChecker } from "./usernameChecker";
import { nameChecker } from "./nameChecker";
import { passwordChecker } from "./passwordChecker";

export const formChecker = (form, setValid, setWarning) => {
  const { formUsername, formName, formPassword, formAvatar } = form;

  return Promise.all([
    usernameChecker(formUsername),
    nameChecker(formName),
    passwordChecker(formPassword),
    imageChecker(formAvatar),
  ]).then((checkerArr) => {
    setValid(checkerArr.every(({ valid }) => valid));
    setWarning({
      usernameWarning: checkerArr[0].msg,
      nameWarning: checkerArr[1].msg,
      passwordWarning: checkerArr[2].msg,
      imageWarning: checkerArr[3].msg,
    });
  });
};
