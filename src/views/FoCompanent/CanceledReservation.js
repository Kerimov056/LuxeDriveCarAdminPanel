import React from 'react'
import {
    Card,
    Row,
    Col,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { getReservCancledCount } from "../../Services/reservationServices";

const CanceledReservation = () => {

    const { data: cancledReserv } = useQuery({
        queryKey: ["CanceledReservation"],
        queryFn: getReservCancledCount,
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
                                    <i className="nc-icon nc-vector"></i>
                                </div>
                            </Col>
                            <Col xs="7">
                                <div className="numbers">
                                    <p className="card-category">Canceled Reserved</p>
                                    <Card.Title as="h4">{cancledReserv?.data == null ? 0 : cancledReserv?.data}</Card.Title>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                            <i className="nc-icon nc-simple-remove"></i>
                            Reservation
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </>
    )
}

export default CanceledReservation

