import { httpClient } from "../utils/HttpClient";

export const getReservConfirmed = () => { //tesdiqlenmis olan reservationlar
    return httpClient.get("api/CarReservations/ReservConfirmedCount")
};  

export const getByReserv = (id) => { // getById
    return httpClient.get(`api/CarReservations/${id}`)
};

export const getReservPeddingCount = () => { //gozlemede olan reservationlarin sayi
    return httpClient.get("api/CarReservations/resercPeddingCount")
};

export const getReservPedding = () => { //gozlemede olan reservationlar
    return httpClient.get("api/CarReservations/resercPedding")
};


export const getReservComplatedCount = () => { //tamamlanmis olan reservationlarin sayi
    return httpClient.get("api/CarReservations/ReservComplatedCount")
};   


export const getReservCancledCount = () => { //legv edilmis olan reservationlarin sayi
    return httpClient.get("api/CarReservations/IsResevCanceledCount")
};