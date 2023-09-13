import React from 'react'
import {
    Card,
    Row,
    Col,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { getReservNowCount } from "../../Services/reservationServices";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ReservCar = () => {

    const { data: reservCars } = useQuery({
        queryKey: ["ReservCarCount"],
        queryFn: getReservNowCount,
        staleTime: 0,
    });

    return (
        <>
            <Col style={{cursor:"pointer"}} id='CCCC' lg="3" sm="6">
                <Card className="card-stats">
                    <Card.Body>
                        <Row>
                            <Col xs="5">
                                <div className="icon-big text-center icon-warning">
                                    <i className="nc-icon nc-badge text-warning"></i>
                                </div>
                            </Col>
                            <Col xs="7">
                                <div className="numbers">
                                    <p className="card-category">Reserved Cars</p>
                                    <Card.Title as="h4">{reservCars?.data == null ? 0 : reservCars?.data}</Card.Title>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                            <i className="far fa-calendar-alt mr-1"></i>
                           <Link to="../RightNowReserv">Reservation Car</Link> 
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </>
    )
}

export default ReservCar

