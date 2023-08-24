import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './allcar.scss'
import Admin from 'layouts/Admin'
import CarCard from './CarCard'

const AllCar = () => {
    return (
        <>
            <Container>
                <Row className='mt-5'>
                    <CarCard />
                </Row>
            </Container>
        </>
    )
}

export default AllCar