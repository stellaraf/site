/**
 * Generous email address validator
 */
export const validateEmail = (value: string) => {
  if (!value.match(/^\w+\@\w+\.\w+/m)) {
    return `'${value}' is an invalid email address`;
  } else {
    return true;
  }
};
