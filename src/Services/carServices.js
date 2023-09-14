import { httpClient } from "../utils/HttpClient";

export const getCar = () => {             //cars
  return httpClient.get("api/Car/GetAllCar")
};

export const IsCampaigns = () => {             //companinanin olub olmamasini bildirir
  return httpClient.get("api/Car/IsCampaigns")
};

export const removeCar = (carId) => {             //cars
  return httpClient.delete(`api/Car/${carId}`)
};

export const stopCompagins = (superAdminId) => {   //Compagins'in dayandirlmasi
  return httpClient.post(`api/Car/StopCampaigns?superAdminId=${superAdminId}`)
};

export const IsReservTrue = (carId) => {   //Car'i reservini true edir
  return httpClient.put(`api/Car/IsReservTrue?id=${carId}`)
};

export const IsReservFalse = (carId) => {   //Car'i reservini false edir
  return httpClient.put(`api/Car/IsReservFalse?id=${carId}`)
};

export const postCar = (data) => {         //Create car
  return httpClient.post("api/Car/postCar",data)
};

export const PostCampagins = (data) => {         //Campoanies
  return httpClient.post("api/Car/Campaigns",data)
};

export const getCarCount = () => {         //carlarin sayini gosteriri
  return httpClient.get("api/Car/Count")
};

export const getReservCarCount = () => {   //hal haizrda reservde olan carlarin sayi
  return httpClient.get("api/Car/ReservCarCount")
};


export const getByCar = (id) => {          //car details
  return httpClient.get(`api/Car/${id}`);
};