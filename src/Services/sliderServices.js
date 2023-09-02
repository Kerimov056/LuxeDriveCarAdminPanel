import { httpClient } from "../utils/HttpClient";

export const getSlider = () => {
  return httpClient.get("api/Sliders")
};

export const postSlider = (data) => {
  console.log(data);
  return httpClient.post("api/Sliders", data)
};

export const UpdateSliders = (id, data) => {
  return httpClient.put(`api/Sliders/${id}`, data)
};



export const removeSlider = (sliderId) => {
  return httpClient.delete(`api/Sliders/${sliderId}`)
};