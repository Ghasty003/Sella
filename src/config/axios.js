import axios from "axios";
import { getToken } from "./token";

const BASE_URL = "http://localhost:8080/api/v1";

export default ({ isForm = false } = {}) => {
  const token = getToken();

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: token,
      "Content-Type": isForm ? "multipart/form-data" : "application/json",
    },
  });
};
