import { httpClient } from "../utils/HttpClient";

export const AdminLogin=(data) =>{
    return httpClient.post('api/Auth/AdminLogin',data);
};

export const MemberAllUser=(searchUser) =>{
    return httpClient.get(`api/Auth/AllMember?searchUser=${searchUser}`);
};









// https://localhost:7152/api/Auth/Login