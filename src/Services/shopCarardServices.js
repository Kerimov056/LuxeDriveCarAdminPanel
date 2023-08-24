import { httpClient } from "../utils/HttpClient";

export const getCarImage = () =>{
    return httpClient.get("api/CarImage")
  };