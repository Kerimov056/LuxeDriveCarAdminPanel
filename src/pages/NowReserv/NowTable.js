import React, { useState } from "react";

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { getReservNow } from "../../Services/reservationServices";
import moment from 'moment';
import NowData from "./NowData";


function NowTable() {

    const { data: reservNow, isError } = useQuery({
        queryKey: ["getReservNow"],
        queryFn: getReservNow,
        staleTime: 0,
    });
    if (isError) {
        return <div>Bir hata oluştu</div>;
    }

    const formatDate = (inputDate) => {
        const date = moment(inputDate);
        return date.format("DD MMMM YYYY");
      };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Currently Working Reservations</Card.Title>
                                <p className="card-category">
                                Reservations
                                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr sty>
                                            <th className="border-0">Num</th>
                                            <th className="border-0">FullName</th>
                                            <th className="border-0">Car</th>
                                            <th className="border-0">Pickup Date</th>
                                            <th className="border-0">Return Date</th>
                                            <th className="border-0">Details</th>
                                        </tr>
                                    </thead>
                                        {reservNow?.data?.map((now, index) => ( 
                                            <NowData Id={now?.id}
                                                key={index}
                                                number={index + 1}
                                                fullName={now?.fullName}
                                                marka={now?.reservCar?.marka}
                                                model={now?.reservCar?.model}
                                                pick={formatDate(now?.pickupDate)}
                                                return={formatDate(now?.returnDate)} />
                                        ))}
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default NowTable;
