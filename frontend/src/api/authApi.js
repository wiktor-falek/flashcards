import { post } from "./fetchWrapper";

export const login = (username, password) => {
  const body = {
    username,
    password,
  };
  return post("http://localhost:3000/auth/login", body, true);
};

export const register = (username, password, email) => {
  const body = {
    username,
    password,
    email,
  };
  return post("http://localhost:3000/auth/register", body, true);
};
