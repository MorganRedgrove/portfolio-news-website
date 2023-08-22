export const nameChecker = async (name) => {
  const testName = /^\w+\s+\w+/;

  return testName.test(name)
    ? { valid: true, msg: null }
    : { valid: false, msg: "please provide your full name" };
};
