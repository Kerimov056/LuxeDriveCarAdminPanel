import { httpClient } from "../utils/HttpClient";

export const getChauffeurs = () =>{
    return httpClient.get("api/Chauffeurss")
  };