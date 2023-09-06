import { httpClient } from "../utils/HttpClient";

export const AdminLogin=(data) =>{
    return httpClient.post('api/Auth/AdminLogin',data);
};

export const MemberAllUser=(searchUser) =>{
    return httpClient.get(`api/Auth/AllAdmin?searchUser=${searchUser}`);
};

export const AllAdmin=(searchAdmin) =>{
    return httpClient.get(`api/Auth/AllMember?searchUser=${searchAdmin}`);
};

export const adminCreate=(superAdminId,appUserId) =>{
    return httpClient.post(`api/Auth/AdminCreate?superAdminId=${superAdminId}&appUserId=${appUserId}`);
};

export const adminDelete=(superAdminId,appAdminId) =>{
    return httpClient.post(`api/Auth/AdminDelete?superAdminId=${superAdminId}&appUserId=${appAdminId}`);
};

export const UserRemove=(superAdminId,appUserId) =>{
    return httpClient.delete(`api/Auth/RemoveUser?superAdminId=${superAdminId}&userId=${appUserId}`);
};

export const byUser = (appUserId) => {  //By User
    return httpClient.get(`api/Auth/ByUser?userId=${appUserId}`);
};








// https://localhost:7152/api/Auth/Login