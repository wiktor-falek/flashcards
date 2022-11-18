import { post } from "./fetchWrapper";

export const login = (username, password) => {
  const body = {
    username,
    password,
  };
  return post("https://flashcards-backend.onrender.com/auth/login", body, true);
};

export const register = (username, password, email) => {
  const body = {
    username,
    password,
    email,
  };
  return post("https://flashcards-backend.onrender.com/auth/register", body, true);
};
