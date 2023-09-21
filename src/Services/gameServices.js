import { httpClient } from "../utils/HttpClient";

export const getGame = () => {
  return httpClient.get("api/GameCars")
};

export const removeGame = (gameId) => {
  return httpClient.delete(`api/GameCars/${gameId}`)
};

export const gameResponse = (AppUserId) => {
  return httpClient.get(`api/GameCars/ByUserGameResponse?AppUserId=${AppUserId}`)
};