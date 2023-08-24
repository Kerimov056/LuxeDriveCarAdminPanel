import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './allcar.scss'
import CarCard from './CarCard'
import { useQuery } from "react-query";
import { getCar } from "../../Services/carServices";

const AllCar = () => {

    const { data: allCars } = useQuery({
        queryKey: ["CarCount"],
        queryFn: getCar,
        staleTime: 0,
    });


    return (
        <>
            <Container>
                <Row className='mt-5'>
                    <CarCard />
                    <CarCard />
                    <CarCard />
                    <CarCard />
                    <CarCard />
                    <CarCard />
                </Row>
            </Container>
        </>
    )
}

export default AllCar