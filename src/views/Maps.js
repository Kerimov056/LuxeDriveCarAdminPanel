import React from 'react'
import './map.scss'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useQuery } from "react-query";
import { getReservNow } from "../Services/reservationServices";
import { useMutation, useQueryClient } from "react-query";
import Moment from "moment";

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
        queryFn: getReservNow,
        staleTime: 0,
    });


    const formatDateTime = (inputDate) => {
        const date = new Date(inputDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('de-DE', options); 
      };

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
                            position={[maps?.pickupLocation?.latitude, maps?.pickupLocation?.longitude]}
                            key={index}
                            icon={markerIcon}
                        >
                            <Popup>
                                <p style={{ color: "purple" }}>Pickup Location</p>
                                <p> FullName: {maps?.fullName}</p>
                                <p> Email: {maps?.email}</p>
                                <p> Pickup Date:  {formatDateTime(maps?.pickupDate)}</p>
                                <img style={{width:"300px",height:"210px",objectFit:"cover"}} src={maps?.reservCar?.carImages[0]?.imagePath} />
                            </Popup>
                        </Marker>
                    ))}

                </MapContainer>
            </div>
        </>
    )
}

export default Maps




