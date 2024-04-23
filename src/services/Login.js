import http from "./httpService";
import config from "./config.json";

export const UserValidation = data => {
  return http.post(`${config.api}/auth/login`,data)
}