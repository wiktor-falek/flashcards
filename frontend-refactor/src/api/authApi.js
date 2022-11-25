import { BASE_URL } from "../constants";
import { post } from "./fetchWrapper";

/**
 * 
 * @param {string} input 
 * @param {number} minLen 
 * @param {number} maxLen 
 */
const validateString = (input, minLen, maxLen) => {
  if (!typeof input === "string") throw new Error("Input must be a string");

  let _input = input.trim();

  if (minLen > _input.length > maxLen)
    throw new Error(
      `Length of input cannot be lesser than ${minLen} and greater than ${maxLen}} `
    );

  return `${_input}`; // template literal for return type hint
};

/**
 * 
 * @param {string} email 
 */
const validateEmail = (email) => {
  // call me a theist because only god knows if this works correctly, and I have to believe
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return email;
  }
  return null;
};

/**
 * 
 * @param {string} username 
 * @param {string} password 
 */
export const login = (username, password) => {
  let _username = validateString(username, 6, 30);
  let _password = validateString(password, 8, 100);

  if (!_username)
    throw new Error(`Validation error, invalid username parameter: ${username}`);
  if (!_password)
    throw new Error(`Validation error, invalid password parameter: ${password}`);

  const body = {
    username: _username,
    password: _password,
  };
  return post(`${BASE_URL}/auth/login`, body);
};

/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @param {string} email 
 */
export const register = (username, password, email) => {
  let _username = validateString(username, 6, 30);
  let _password = validateString(password, 8, 100);
  let _email = validateEmail(validateString(email, 6, 254));

  if (!_username)
    throw new Error(`Validation error, invalid username parameter: ${_username}`);
  if (!_password)
    throw new Error(`Validation error, invalid password parameter: ${_password}`);
  if (!_email)
    throw new Error(`Validation error, invalid email parameter: ${_email}`);

  const body = {
    username: _username,
    password: _password,
    email: _email,
  };
  return post(`${BASE_URL}/auth/register`, body);
};
