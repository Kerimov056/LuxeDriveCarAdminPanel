import { httpClient } from "../utils/HttpClient";

export const getFaqs = () =>{
    return httpClient.get("api/Faqs")
  };