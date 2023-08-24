import { httpClient } from "../utils/HttpClient";

export const getCar = () => { //carlar
  return httpClient.get("api/Car")
};

export const getCarCount = () => { //carlarin sayini gosteriri
  return httpClient.get("api/Car/Count")
};

export const getReservCarCount = () => { //hal haizrda reservde olan carlarin sayi
  return httpClient.get("api/Car/ReservCarCount")
};


export const getByCar = (id) => {  //car details
  return httpClient.get(`api/Car/${id}`);
};