import React, { useState } from 'react'
import './map.scss'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Button } from '@chakra-ui/react';
import ShowAllMap from "./Maps/ShowAllMap";
import PickUpMap from "./Maps/PickUpMap";
import ReturnMap from "./Maps/ReturnMap";


const Maps = () => {

    const [all, setAll] = useState(true);
    const [pickUp, setpickUp] = useState(false);
    const [returnL, setReturnL] = useState(false);


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
                    <Button onClick={() => PickUp()}>Lonely Pickup location</Button>
                    <Button onClick={() => Return()}>Lonely Return location</Button>
                </div>
                {all === true && <ShowAllMap />}
                {pickUp === true && <PickUpMap />}
                {returnL === true && <ReturnMap />}

            </div>
        </>
    );
};

export default Maps;

