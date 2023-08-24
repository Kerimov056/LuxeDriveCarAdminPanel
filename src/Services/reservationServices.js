import { httpClient } from "../utils/HttpClient";

export const getReservConfirmed = () => {
    return httpClient.get("api/CarReservations/ReservConfirmedCount")
};