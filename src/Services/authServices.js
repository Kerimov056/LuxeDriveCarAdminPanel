import { httpClient } from "../utils/HttpClient";

export const AdminLogin=(data) =>{
    return httpClient.post('api/Auth/AdminLogin',data);
};

export const MemberAllUser=() =>{
    return httpClient.get('api/Auth/AllMember');
};









// https://localhost:7152/api/Auth/Login