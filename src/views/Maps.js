import React, { useState } from 'react'
import './map.scss'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useQuery } from "react-query";
import { getReservAllConfirmeD } from "../Services/reservationServices";
import { useMutation, useQueryClient } from "react-query";
import { Button } from '@chakra-ui/react';

const markerIcon = new L.Icon({
    iconUrl: require("../assets/img/faces/download.png"),
    iconSize: [45, 35],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});

const Maps = () => {
    const position = [40.4093, 49.8671]
    const queryClient = useQueryClient();

    const { data: Reservmap, isError } = useQuery({
        queryKey: ["ReservMap"],
        queryFn: getReservAllConfirmeD,
        staleTime: 0,
    });

    const formatDateTime = (inputDate) => {
        const date = new Date(inputDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('de-DE', options);
    };

    const [returnLocation, setReturnLocation] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);

    return (
        <>
            <div className='ss'>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                    />

                    {Reservmap?.data?.map((maps, index) => (
                        <Marker
                            position={[
                                returnLocation
                                    ? maps?.returnLocation?.latitude
                                    : maps?.pickupLocation?.latitude,
                                returnLocation
                                    ? maps?.returnLocation?.longitude
                                    : maps?.pickupLocation?.longitude,
                            ]}
                            key={index}
                            icon={markerIcon}
                            eventHandlers={{
                                click: () => {
                                    setSelectedMarker(maps);
                                    setReturnLocation(false);
                                },
                            }}
                        >
                            <Popup> 
                                <p style={{ color: "purple" }}>Pickup Location</p>
                                <Button
                                    onClick={() => setReturnLocation(true)}
                                    style={{ color: "black", cursor: "pointer" }}
                                >
                                    Go To Return Location {">"}
                                </Button>
                                <p> FullName: {maps?.fullName}</p>
                                <p> Email: {maps?.email}</p>
                                <p> Pickup Date: {formatDateTime(maps?.pickupDate)}</p>
                                <img
                                    style={{ width: "300px", height: "210px", objectFit: "cover" }}
                                    src={maps?.reservCar?.carImages[0]?.imagePath}
                                />
                            </Popup>
                        </Marker>
                    ))}

                    {selectedMarker===true && (
                        <Marker
                            position={[
                                selectedMarker?.returnLocation?.latitude,
                                selectedMarker?.returnLocation?.longitude,
                            ]}
                            icon={markerIcon}
                        >
                            <Popup>
                                <p style={{ color: "purple" }}>Pickup Location</p>
                                <Button backgroundColor={"white"}
                                    onClick={() => setReturnLocation(false)}
                                    style={{ color: "white", cursor: "pointer" }}
                                >
                                    Go To Pickup Location {">"}
                                </Button>
                                <p> FullName: {selectedMarker?.fullName}</p>
                                <p> Email: {selectedMarker?.email}</p>
                                <p> Pickup Date: {formatDateTime(selectedMarker?.returnDate)}</p>
                                <img
                                    style={{ width: "300px", height: "210px", objectFit: "cover" }}
                                    src={selectedMarker?.reservCar?.carImages[0]?.imagePath}
                                />
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
        </>
    );
};

export default Maps;
