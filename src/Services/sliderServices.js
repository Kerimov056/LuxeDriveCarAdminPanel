import { httpClient } from "../utils/HttpClient";

export const getSlider = () =>{
    return httpClient.get("api/Sliders")
  };


  export const removeSlider = (sliderId) =>{
    return httpClient.delete(`api/Sliders/${sliderId}`)
  };