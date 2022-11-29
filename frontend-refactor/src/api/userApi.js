import { get } from "./fetchWrapper";
import { BASE_URL } from "../constants";

export const getUser = () => {
  return get(`${BASE_URL}/api/v1/user/`);
};
