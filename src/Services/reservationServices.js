import { httpClient } from "../utils/HttpClient";

export const getReservConfirmed = () => { //tesdiqlenmis olan reservationlar
    return httpClient.get("api/CarReservations/ReservConfirmedCount")
};