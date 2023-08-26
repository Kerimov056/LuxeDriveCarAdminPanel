import { httpClient } from "../utils/HttpClient";

export const getChauffeurs = () => {
  return httpClient.get("api/Chauffeurss")
};

export const chauffeursRemove = (id) => {
  return httpClient.delete(`api/Chauffeurss/${id}`)
};


export const getByCheuf = (id) => {
  return httpClient.get(`api/Chauffeurss/${id}`)
};


export const putCheufers = (id) => {
  return httpClient.put(`api/Chauffeurss/${id}`)
};
