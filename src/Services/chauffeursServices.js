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


export const PostCheuf = (data) => {
  return httpClient.post("/api/Chauffeurss", data)
};

export const putCheufers = (id, data) => {
  return httpClient.put(`api/Chauffeurss/${id}`, data)
};
