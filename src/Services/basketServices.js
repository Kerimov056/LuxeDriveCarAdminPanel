import { httpClient } from "../utils/HttpClient";

export const removeByCar = (carId) => {
    return httpClient.delete(`api/Baskets/ProductItem?Id=${carId}`)
};

export const PostCar = (carId) => {
    return httpClient.post(`api/Baskets?Id=${carId}`);
};

export const getBasketCars = () => {
    return httpClient.get("api/Baskets")
};

export const getBasketItemCount = () => {
    return httpClient.get("api/Baskets/Get-Basket-Count")
};

