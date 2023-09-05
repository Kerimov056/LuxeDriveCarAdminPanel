import { getReservAllConfirmLocation, getReservAllConfirmePickUp, getReservAllConfirmeReturn } from "../Services/reservationServices";
import React, { useState } from 'react'
import './map.scss'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "react-query";
import 'leaflet/dist/leaflet.css';
import { map } from "jquery";
import { useMutation, useQueryClient } from "react-query";
import { Button } from '@chakra-ui/react';
import ShowAllMap from "./Maps/ShowAllMap";
import PickUpMap from "./Maps/PickUpMap";
import ReturnMap from "./Maps/ReturnMap";

// const markerIcon = new L.Icon({
//     iconUrl: require("../assets/img/faces/download.png"),
//     iconSize: [45, 35],
//     iconAnchor: [17, 46],
//     popupAnchor: [0, -46],
// });

const Maps = () => {
    // const position = [40.4093, 49.8671]
    // const queryClient = useQueryClient();

    const [all, setAll] = useState(true);
    const [pickUp, setpickUp] = useState(false);
    const [returnL, setReturnL] = useState(false);



        // const { data: Reservmap, isError } = useQuery({
        //     queryKey: ["ReservMap"],
        //     queryFn: getReservAllConfirmLocation,
        //     staleTime: 0,
        // });
    // queryClient.invalidateQueries(["ReservMap"]);
    
    // const formatDateTime = (inputDate) => {
    //     const date = new Date(inputDate);
    //     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    //     return date.toLocaleDateString('de-DE', options);
    // };
    
    // const [returnLocation, setReturnLocation] = useState(false);
    // const [selectedMarker, setSelectedMarker] = useState(null);

    const PickUpReturn = () => {
        setAll(true)
        setpickUp(false)
        setReturnL(false)
    }

    const PickUp = () => {
        setAll(false)
        setpickUp(true)
        setReturnL(false)
    }

    const Return = () => {
        setAll(false)
        setpickUp(false)
        setReturnL(true)
    }
    
    return (    
        <>
                <div className='ss'>
                    
    <div className='OptionLocation'>
     <Button onClick={() => PickUpReturn()}>PickUp and Return </Button> 
     <Button onClick={() => PickUp() }>Lonely Pickup location</Button> 
     <Button onClick={() => Return() }>Lonely Return location</Button> 
    </div>
            {all === true &&   <ShowAllMap />  }
            {pickUp === true &&   <PickUpMap />  }
            {returnL === true &&   <ReturnMap />  }
                
            </div>
        </>
    );
};

export default Maps;

