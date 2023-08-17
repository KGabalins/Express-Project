import { validateEmail } from "./validateEmail.js";

export const validateRegistration = (
  email,
  reemail,
  name,
  surname,
  password,
  repassword
) => {
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

export const validateEmailUpdate = (email, reemail) => {
  if (!validateEmail(email) || !email || !reemail || email !== reemail) {
    return false;
  }
  return true;
};
