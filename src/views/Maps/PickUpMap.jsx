import { getReservAllConfirmePickUp } from "../../Services/reservationServices";
import React, { useState } from 'react'
import '../map.scss'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "react-query";
import 'leaflet/dist/leaflet.css';
import {useQueryClient } from "react-query";

const markerIcon = new L.Icon({
    iconUrl: require("../../assets/img/faces/download.png"),
    iconSize: [45, 35],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});

const PickUpMap = () => {
    const position = [40.4093, 49.8671]
    const queryClient = useQueryClient();


    const { data: Reservmap, isError } = useQuery({
        queryKey: ["ReservPickUpMap"],
        queryFn: getReservAllConfirmePickUp,
        staleTime: 0,
    });
    queryClient.invalidateQueries(["ReservMap"]);

    const formatDateTime = (inputDate) => {
        const date = new Date(inputDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('de-DE', options);
    };

    const [returnLocation, setReturnLocation] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);

    return (
        <>
            <div className='sss'>

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

                                <p> FullName: {maps?.fullName}</p>
                                <p> Email: {maps?.email}</p>
                                <p> Pickup Date: {formatDateTime(maps?.pickupDate)}</p>
                                <img
                                    style={{ width: "300px", height: "210px", objectFit: "cover" }}
                                    src={`data:image/png;base64,${maps?.reservCar?.carImages[0]?.imagePath}`}
                                />
                            </Popup>
                        </Marker>
                    ))}


                </MapContainer>
            </div>
        </>
    );
};

export default PickUpMap;