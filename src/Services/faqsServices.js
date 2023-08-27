import { httpClient } from "../utils/HttpClient";

export const getFaqs = () =>{
    return httpClient.get("api/Faqs")
  };

  export const getByFaqs = (id) => {
    return httpClient.get(`api/Faqs/${id}`);
  };
  
  export const removeFaqs = (blogId) => {             //cars
    return httpClient.delete(`api/Faqs/${blogId}`)
  };
  
  export const postFaqs = (data) => {         //Create car
    return httpClient.post("api/Faqs",data)
  };
  
  
  export const UpdateFaqs = (id,data) =>{
    return httpClient.put(`/api/Faqs/${id}`,data)
  };
  
  