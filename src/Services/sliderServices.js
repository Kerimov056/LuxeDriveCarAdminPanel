import { httpClient } from "../utils/HttpClient";

export const getSlider = () =>{
    return httpClient.get("api/Sliders")
  };