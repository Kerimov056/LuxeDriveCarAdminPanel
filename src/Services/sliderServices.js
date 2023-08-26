import { httpClient } from "../utils/HttpClient";

export const getSlider = () => {
  return httpClient.get("api/Sliders")
};

export const postSlider = (data) => {
  return httpClient.post("api/Sliders",data)
};



export const removeSlider = (sliderId) => {
  return httpClient.delete(`api/Sliders/${sliderId}`)
};