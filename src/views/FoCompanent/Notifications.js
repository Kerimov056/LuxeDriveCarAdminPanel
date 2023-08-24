import React from 'react'
import {
    Card,
    Row,
    Col,
} from "react-bootstrap";
import { MdCircleNotifications } from "react-icons/md";
import { useQuery } from "react-query";
import { getReservPeddingCount } from "../../Services/reservationServices";

const Notifications = () => {

    const { data: notification } = useQuery({
        queryKey: ["Notifications"],
        queryFn: getReservPeddingCount,
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
                                    <MdCircleNotifications style={{color:"lightblue"}} />
                                </div>
                            </Col>
                            <Col xs="7">
                                <div className="numbers">
                                    <p className="card-category">Notifications</p>
                                    <Card.Title as="h4">{notification?.data == null ? 0 : notification?.data}</Card.Title>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                            <i className="far fa-calendar-alt mr-1"></i>
                            Notifications Reservation
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </>
    )
}

export default Notifications

