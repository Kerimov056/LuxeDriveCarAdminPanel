import { httpClient } from "../utils/HttpClient";

export const getReservAllConfirmeD = () => {      //tesdiqlenmis olan reservationlar
    return httpClient.get("api/CarReservations/IsResevConfirmedGetAll")
};


export const getReservConfirmed = () => {      //tesdiqlenmis olan reservationlarin sayi
    return httpClient.get("api/CarReservations/ReservConfirmedCount")
};

export const putReservConfirmed = (resrcId) => {
    return httpClient.put(`api/CarReservations/Confirmed?Id=${resrcId}`);
};

export const putReservCancled = (resrcId) => {
    return httpClient.put(`api/CarReservations/Cancled?Id=${resrcId}`);
};

export const putReservRemove = (resrcId) => {
    return httpClient.put(`api/CarReservations/${resrcId}`);
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


export const getGetAllReservCancled = () => { //legv edilmis olan reservationlar
    return httpClient.get("api/CarReservations/IsResevCanceledGetAll")
};