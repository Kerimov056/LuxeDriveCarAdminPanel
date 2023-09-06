import { httpClient } from "../utils/HttpClient";

export const AdminLogin=(data) =>{
    return httpClient.post('api/Auth/AdminLogin',data);
};

export const MemberAllUser=(searchUser) =>{
    return httpClient.get(`api/Auth/AllMember?searchUser=${searchUser}`);
};


export const adminCreate=(superAdminId,appUserId) =>{
    return httpClient.post(`api/Auth/AdminCreate?superAdminId=${superAdminId}&appUserId=${appUserId}`);
};

export const UserRemove=(superAdminId,appUserId) =>{
    return httpClient.delete(`api/Auth/RemoveUser?superAdminId=${superAdminId}&userId=${appUserId}`);
};







// https://localhost:7152/api/Auth/Login