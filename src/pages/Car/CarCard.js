import React from 'react'
import './carcard.scss'

const CarCard = (props) => {
    return (
        <>
            <div class="cardDD">
                <div class="alignN">
                    <span class="red"></span>
                    <span class="yellow"></span>
                    <span class="green"></span>
                </div>

                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwgtQcrkpPx1x5-tW7ODd3nEUTpS8F_NpmDw&usqp=CAU' />
                <h4><span>Marka: {props.marka}</span></h4>
                <h4><span>Model: {props.model}</span></h4>
                <p>Year:{props.year}</p>
            </div>
        </>
    )
}

export default CarCard