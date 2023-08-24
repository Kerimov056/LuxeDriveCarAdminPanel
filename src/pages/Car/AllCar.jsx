import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import './allcar.scss'
import CarCard from './CarCard'
import { useQuery } from "react-query";
import { getCar } from "../../Services/carServices";
import Admin from 'layouts/Admin';
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
                <Row className='mt-5'>
                    <Link to='/createCar'>
                        <Button variant="primary" size="lg">
                            Create Car
                        </Button>
                    </Link>
                </Row>
                <Row className='mt-5'>
                    {allCars?.data.map((bycars, index) => (
                        <CarCard key={index} marka={bycars?.marka} model={bycars?.model} year={bycars?.year} />
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default AllCar