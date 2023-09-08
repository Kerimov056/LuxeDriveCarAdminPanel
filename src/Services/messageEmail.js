import { httpClient } from "../utils/HttpClient";


export const SendEmailMessage = (data) => {
  return httpClient.post("/api/UserMessgess/SendUserMessages", data)
};
