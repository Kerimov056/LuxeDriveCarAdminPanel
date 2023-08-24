import { httpClient } from "../utils/HttpClient";

export const getCar = () => {
  return httpClient.get("api/Car")
};

export const getByCar = (id) => {
  return httpClient.get(`api/Car/${id}`);
};