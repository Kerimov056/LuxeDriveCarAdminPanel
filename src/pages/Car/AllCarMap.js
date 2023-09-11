import { getCar } from "../../Services/carServices";
import React, { useState } from 'react'
import './AllCarMap.scss'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "react-query";
import 'leaflet/dist/leaflet.css';
import { useQueryClient } from "react-query";

const markerIcon = new L.Icon({
    iconUrl: require("../../assets/img/faces/download.png"),
    iconSize: [45, 35],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});

const AllCarMap = () => {
    const position = [40.4093, 49.8671]
    const queryClient = useQueryClient();


    const { data: AllCar } = useQuery({
        queryKey: ["AllGetCar"],
        queryFn: getCar,
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
            <div className='ss'>

                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                    />

                    {AllCar?.data?.map((car, index) => (
                        <Marker
                            position={[ car?.latitude, car?.longitude]}
                            key={index}
                            icon={markerIcon}
                            eventHandlers={{
                                click: () => {
                                    setSelectedMarker(car);
                                    setReturnLocation(false);
                                },
                            }}
                        >
                             <Popup >
                                <p style={{ color: "purple" }}>Pickup Location</p>

                                <p> Marka: {car?.marka}</p>
                                <p> Model: {car?.model}</p>
                                <p> Model: {car?.model}</p>
                                <p> Pickup Date: {formatDateTime(car?.pickupDate)}</p>
                                <img
                                    style={{ width: "300px", height: "210px", objectFit: "cover" }}
                                    src={car?.reservCar?.carImages[0]?.imagePath}
                                />
                            </Popup> 
                        </Marker>
                    ))}


                </MapContainer>
            </div>
        </>
    );
};

export default AllCarMap;