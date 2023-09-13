import { httpClient } from "../utils/HttpClient";

export const getReservAllConfirmeD = () => {      //tesdiqlenmis olan reservationlar    
    return httpClient.get("api/CarReservations/IsResevConfirmedGetAll")
};

export const getReservAllConfirmLocation = () => {      //tesdiqlenmis olan reservationlar  PickUpLocation and ReturnLocation
    return httpClient.get("api/CarReservations/IsResevConfirmedLocationGetAll")
};

export const getReservAllConfirmePickUp = () => {      //tesdiqlenmis olan Yalniz PickUpLocation'i olanlar   
    return httpClient.get("api/CarReservations/IsResevConfirmedPickUpGetAll")
};

export const getReservAllConfirmeReturn = () => {      //tesdiqlenmis olan Yalniz ReturnLocation'u olanlar   
    return httpClient.get("api/CarReservations/IsResevConfirmedReturnGetAll")
};

export const getReservNow = () => {     //halahzirda user'de  olan reservationlar
    return httpClient.get("api/CarReservations/IsResevNowGetAll")
};

export const getReservConfirmed = () => {     //tesdiqlenmis olan reservationlarin sayi
    return httpClient.get("api/CarReservations/ReservConfirmedCount")
};

export const getReservNowCount = () => {     //tesdiqlenmis olan reservationlarin sayi
    return httpClient.get("api/CarReservations/ReservNowCount")
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


export const getUserReservation = (appUserId) => {  //user Reservasiya
    return httpClient.get(`api/CarReservations/UserId?Id=${appUserId}`);
};