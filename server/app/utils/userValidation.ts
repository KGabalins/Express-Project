import { validateEmail } from "./validateEmail.js";

export const validateRegistration = (
  email: string,
  reemail: string,
  name: string,
  surname: string,
  password: string,
  repassword: string
): boolean => {
  if (
    !validateEmail(email) ||
    email !== reemail ||
    name.length <= 1 ||
    password.length < 8 ||
    password !== repassword ||
    (surname && surname.length === 1)
  ) {
    return false;
  }
  return true;
};

export const validateEmailUpdate = (email: string, reemail: string): boolean => {
  if (!validateEmail(email) || !email || !reemail || email !== reemail) {
    return false;
  }
  return true;
};
