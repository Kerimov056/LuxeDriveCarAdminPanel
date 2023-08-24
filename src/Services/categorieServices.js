import { httpClient } from "../utils/HttpClient";

export const getCategorie = () => {
  return httpClient.get("api/CarCategory")
};
