import { httpClient } from "../utils/HttpClient";

export const login=(data) =>{
    return httpClient.post('api/Auth/Login',data);
};






// https://localhost:7152/api/Auth/Login