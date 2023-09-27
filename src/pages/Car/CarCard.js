import React, { useEffect } from 'react'
import './carcard.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import AOS from 'aos'
import "aos/dist/aos.css";


const CarCard = (props) => {

    useEffect(() => {
        AOS.init({
            offset: 300,
            duration: 500,
            delay: 1360,
        });
        AOS.refresh();
    }, [])
    
    return (
        <>
            <Link to={`/CarDetails/${props.Id}`} >
                <div data-aos="fade-up" class="cardDD">
                    <div class="alignN">
                        <span class={props.isReserv==true ? "red" : "green"}></span>
                    </div>
                    <img style={{objectFit:"cover"}} src={`data:image/png;base64,${props.images[0]?.imagePath}`} />
                    {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwgtQcrkpPx1x5-tW7ODd3nEUTpS8F_NpmDw&usqp=CAU' /> */}
                    <h4><span>Marka: {props.marka}</span></h4>
                    <h4><span>Model: {props.model}</span></h4>
                    <p>Year:{props.year}</p>
                </div>
            </Link>
        </>
    )
}

export default CarCard