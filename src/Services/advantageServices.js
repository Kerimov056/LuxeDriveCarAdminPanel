import { httpClient } from "../utils/HttpClient";

export const getAdvatages=() =>{
    return httpClient.get('api/Advantages');
};

export const removeAdvatages=(id) =>{
    return httpClient.delete(`api/Advantages/${id}`);
};

export const byAdvatages=(id) =>{
    return httpClient.delete(`api/Advantages/${id}`);
};


export const postAdvatages=(data) =>{
    return httpClient.post(`api/Advantages`,data);
};


export const UpdateAdvantage = (id,data) =>{
    return httpClient.put(`/api/Advantages/${id}`,data)
  };
  
  