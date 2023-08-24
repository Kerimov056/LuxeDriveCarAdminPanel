import React from 'react'
import {
    Card,
    Row,
    Col,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { getReservComplatedCount } from "../../Services/reservationServices";

const ComplatedReservation = () => {

    const { data: reservComlated } = useQuery({
        queryKey: ["ReservCarCount"],
        queryFn: getReservComplatedCount,
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
                                    <i className="nc-icon nc-app text-success"></i>
                                </div>
                            </Col>
                            <Col xs="7">
                                <div className="numbers">
                                    <p className="card-category">Complated Reservations</p>
                                    <Card.Title as="h4">{reservComlated?.data == null ? 0 : reservComlated?.data}</Card.Title>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                            <i className="nc-icon nc-align-left-2"></i>
                            Reservation 
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </>
    )
}

export default ComplatedReservation

