import React from 'react'
import './Reservation.scss'
import moment from 'moment';


const ResrervationCard = (props) => {

    const formatDate = (inputDate) => {
        const date = moment(inputDate);
        return date.format("DD MMMM YYYY");
    };

    return (
        <>
            <div class="carReservaDetd">
                <div class="card_load"><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaPLCH0qt0OXrb0QeVNfH4C0X3tCgr_ggKCw&usqp=CAU"} /></div>
                <div class="card_load_extreme_title">{formatDate(props.PickUpDate)}</div>
                <div class="card_load_extreme_descripion">
                    <h3>{props.marka} {props.model}</h3>
                    <h3>{props.price}</h3>
                </div>
            </div>
        </>
    )
}

export default ResrervationCard