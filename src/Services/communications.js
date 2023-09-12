import { httpClient } from "../utils/HttpClient";


export const getAllCommunications = () => {         //GetAll Communications
    return httpClient.get("api/Communications")
};

export const postCommunications = (data) => {       //Post Communications
    return httpClient.post(`api/Communications`, data)
}

export const removeCommunicationsId = (CommunicationsId) => {     //Remove Communications         
    return httpClient.delete(`api/Communications/${CommunicationsId}`)
};

export const getByCommunications = (id) => {          //GetBy Communications 
    return httpClient.get(`api/Car/${id}`);
};