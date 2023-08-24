import { httpClient } from "../utils/HttpClient";

export const getCar = () => {
  return httpClient.get("api/Car")
};

export const getCarCount = () => {
  return httpClient.get("api/Car/Count")
};

export const getReservCarCount = () => {
  return httpClient.get("api/Car/ReservCarCount")
};


export const getByCar = (id) => {
  return httpClient.get(`api/Car/${id}`);
};