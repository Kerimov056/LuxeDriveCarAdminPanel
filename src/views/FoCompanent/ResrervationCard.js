import React from 'react'
import './Reservation.scss'

const ResrervationCard = (props) => {
    return (
        <>
            <div class="carReservaDetd">
                <div class="card_load"><img src="https://cdn4.buysellads.net/uu/1/134924/1688058191-260_200.png" /></div>
                <div class="card_load_extreme_title">{props.}</div>
                <div class="card_load_extreme_descripion">
                    <h3>Car Reservation</h3>
                    <h3>Car Reservation</h3>
                </div>
            </div>
        </>
    )
}

export default ResrervationCard