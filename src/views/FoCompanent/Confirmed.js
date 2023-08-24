import React from 'react'
import {
    Card,
    Row,
    Col,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { getReservConfirmed } from "../../Services/reservationServices";

const Confirmed = () => {

    const { data: confirmed } = useQuery({
        queryKey: ["ReservConfirmedCount"],
        queryFn: getReservConfirmed,
        staleTime: 0,
    });

    return (
        <>
            <Col id='CCCC' lg="3" sm="6">
                <Card className="card-stats">
                    <Card.Body>
                        <Row>
                            <Col xs="5">
                                <div className="icon-big text-center icon-warning">
                                    <i className="far fa-calendar-alt mr-1"></i>
                                </div>
                            </Col>
                            <Col xs="7">
                                <div className="numbers">
                                    <p className="card-category">Reservation</p>
                                    <Card.Title as="h4">{confirmed?.data == null ? 0 : confirmed?.data}</Card.Title>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                            <i className="nc-icon nc-check-2"></i>
                            Confirmed Reservation
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </>
    )
}

export default Confirmed

