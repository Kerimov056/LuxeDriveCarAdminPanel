import { httpClient } from "../utils/HttpClient";

export const getAllCommunications = () => {
    return httpClient.get("api/Communications")
};

export const postCommunications = (data) => {
    return httpClient.post(`api/Communications`,data)
}

export const removeCommunicationsId = (CommunicationsId) => {             
    return httpClient.delete(`api/Communications/${CommunicationsId}`)
};

export const UpdateCommunications = (id, data) => {
    return httpClient.put(`api/Communications/${id}`, data)
};
