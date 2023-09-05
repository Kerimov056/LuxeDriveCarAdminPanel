import { httpClient } from "../utils/HttpClient";

export const AdminLogin=(data) =>{
    return httpClient.post('api/Auth/AdminLogin',data);
};








// https://localhost:7152/api/Auth/Login