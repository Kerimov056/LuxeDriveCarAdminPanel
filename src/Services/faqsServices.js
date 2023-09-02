import { httpClient } from "../utils/HttpClient";


export const postFaqs = (Title, Description) => { 
  return httpClient.post(`api/Faqs/PostFaq?Title=${Title}&Descrption=${Description}`);
};


export const getFaqs = () => {
  return httpClient.get("api/Faqs");
};

export const getByFaqs = (id) => {
  return httpClient.get(`api/Faqs/${id}`);
};

export const removeFaqs = (blogId) => {             //cars
  return httpClient.delete(`api/Faqs/${blogId}`)
};

export const UpdateFaqs = (id, data) => {
  console.log(id);
  console.log(data);
  return httpClient.put(`api/Faqs/${id}`, data)
};

