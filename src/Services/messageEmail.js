import { httpClient } from "../utils/HttpClient";


export const PostCheuf = (data) => {
  return httpClient.post("/api/UserMessgess/SendUserMessages", data)
};
