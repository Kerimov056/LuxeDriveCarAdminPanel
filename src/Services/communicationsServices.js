import { httpClient } from "../utils/HttpClient";

export const CommunicationsGet=(searchUser) =>{         //GetAll Communications
    return httpClient.get(`api/Communications?searchUser=${searchUser}`);
};

export const removeCommunicationsId = (CommunicationsId) => {     //Remove Communications         
    return httpClient.delete(`api/Communications/${CommunicationsId}`)
};

export const getByCommunications = (id) => {          //GetBy Communications 
    return httpClient.get(`api/Communications/${id}`);
};