import { BASE_URL } from "../constants";
import { post } from "./fetchWrapper";

export const login = (username, password) => {
  const body = {
    username,
    password,
  };
  return post(`${BASE_URL}/auth/login`, body, true);
};

export const register = (username, password, email) => {
  const body = {
    username,
    password,
    email,
  };
  return post(`${BASE_URL}/auth/register`, body, true);
};
