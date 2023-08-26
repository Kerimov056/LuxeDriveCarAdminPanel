import { httpClient } from "../utils/HttpClient";

export const getReservAllConfirmeD = () => {      //tesdiqlenmis olan reservationlar
    return httpClient.get("api/CarReservations/IsResevConfirmedGetAll")
};

export const getReservNow = () => {     //halahzirda user'de  olan reservationlar
    return httpClient.get("api/CarReservations/IsResevNowGetAll")
};

export const getReservConfirmed = () => {     //tesdiqlenmis olan reservationlarin sayi
    return httpClient.get("api/CarReservations/ReservConfirmedCount")
};

export const putReservConfirmed = (resrcId) => {  //confirim etemk ucun
    return httpClient.put(`api/CarReservations/Confirmed?Id=${resrcId}`);
};

export const putReservCancled = (resrcId) => {  //cancled etmek ucun
    return httpClient.put(`api/CarReservations/Cancled?Id=${resrcId}`);
};

export const putReservRemove = (resrcId) => {  //silmek ucun
    return httpClient.delete(`api/CarReservations/${resrcId}`);
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


export const getAllReservComplated = () => { //tamamlanmis olan reservationlar
    return httpClient.get("api/CarReservations/IsResevComplatedGetAll")
};


export const getReservCancledCount = () => { //legv edilmis olan reservationlarin sayi
    return httpClient.get("api/CarReservations/IsResevCanceledCount")
};


export const getGetAllReservCancled = () => { //legv edilmis olan reservationlar
    return httpClient.get("api/CarReservations/IsResevCanceledGetAll")
};