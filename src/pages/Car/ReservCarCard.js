import React from 'react'
import './carcard.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const ReservCarCard = (props) => {

    
    console.log(props.images)
    return (
        <>
            <Link to={`/CarDetails/${props.Id}`} >
                <div class="cardDD">
                    <div class="alignN">
                        <span class={props.isReserv==true ? "red" : "green"}></span>
                    </div>
                    <img src={`data:image/png;base64,${props.carImages}`} />
                    {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwgtQcrkpPx1x5-tW7ODd3nEUTpS8F_NpmDw&usqp=CAU' /> */}
                    <h4><span>Marka: {props.marka}</span></h4>
                    <h4><span>Model: {props.model}</span></h4>
                    <p>Year:{props.year}</p>
                </div>
            </Link>
        </>
    )
}

export default ReservCarCard