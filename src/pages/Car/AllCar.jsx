import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import './allcar.scss'
import CarCard from './CarCard'
import { useQuery } from "react-query";
import { getCar } from "../../Services/carServices";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const AllCar = () => {

    const { data: allCars } = useQuery({
        queryKey: ["Allcars"],
        queryFn: getCar,
        staleTime: 0,
    });


    return (
        <>
            <Container>
                <Row>
                    <div className='LxDrC'>
                        <button data-text="Awesome" class="buttonLXDC">
                            <span class="actual-text">&nbsp;LuxeDrive&nbsp;</span>
                            <span class="hover-textLCD" aria-hidden="true">&nbsp;LuxeDrive&nbsp;</span>
                        </button>
                    </div>
                </Row>
                <Row id='AllCarSS' className='mt-5'>
                    <Button variant="primary" size="lg">
                        <Link to='/createCar'>Create Car</Link>
                    </Button>
                    <Button className='RG R'></Button> <span>Booked cars</span>
                    <Button className='RG G'></Button> <span>Rental cars</span>
                </Row>
                <Row className='mt-5'>
                    {allCars?.data.map((bycars, index) => (
                        <CarCard key={index} Id={bycars?.id} isReserv={bycars?.isReserv} marka={bycars?.marka} model={bycars?.model} year={bycars?.year} />
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default AllCar