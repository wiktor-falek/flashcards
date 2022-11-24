import { BASE_URL } from "../constants";
import { post } from "./fetchWrapper";

const validateString = (input, minLen, maxLen) => {
  if (!typeof input === "string") throw new Error("Input must be a string");

  const input = input.trim();

  if (minLen > input.length > maxLen)
    throw new Error(
      `Length of input cannot be lesser than ${minLen} and greater than ${maxLen}} `
    );

  return input;
};

const validateEmail = (email) => {
  // call me a theist because only god knows if this works correctly, and I have to believe
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return email;
  }
  return null;
};

export const login = (username, password) => {
  const username = validateString(username, 6, 30);
  const password = validateString(password, 8, 100);

  if (!username)
    throw new Error(`Validation error, invalid username parameter: ${username}`);
  if (!password)
    throw new Error(`Validation error, invalid password parameter: ${password}`);

  const body = {
    username,
    password,
  };
  return post(`${BASE_URL}/auth/login`, body);
};

export const register = (username, password, email) => {
  const username = validateString(username, 6, 30);
  const password = validateString(password, 8, 100);
  const email = validateEmail(validateString(email, 6, 254));

  if (!username)
    throw new Error(`Validation error, invalid username parameter: ${username}`);
  if (!password)
    throw new Error(`Validation error, invalid password parameter: ${password}`);
  if (!email)
    throw new Error(`Validation error, invalid email parameter: ${email}`);

  const body = {
    username,
    password,
    email,
  };
  return post(`${BASE_URL}/auth/register`, body);
};
