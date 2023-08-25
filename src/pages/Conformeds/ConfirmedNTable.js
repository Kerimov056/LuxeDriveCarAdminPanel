import React, { useState } from "react";

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
import NData from "./NData";
import { useQuery } from "react-query";
import { getReservPedding } from "../../Services/reservationServices";
import moment from 'moment';


function ConfirmedNTable() {

    const { data: reservPedding, isError } = useQuery({
        queryKey: ["reservAllPedding"],
        queryFn: getReservPedding,
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
                                <Card.Title as="h4">Striped Table with Hover</Card.Title>
                                <p className="card-category">
                                    Here is a subtitle for this table
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
                                            <th className="border-0">Confirm</th>
                                            <th className="border-0">Cancel</th>
                                        </tr>
                                    </thead>
                                        {reservPedding?.data?.map((pedding, index) => ( 
                                            <NData Id={pedding?.id}
                                                key={index}
                                                number={index + 1}
                                                marka={pedding?.reservCar?.marka}
                                                model={pedding?.reservCar?.model}
                                                pick={formatDate(pedding?.pickupDate)}
                                                return={formatDate(pedding?.returnDate)} />
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

export default ConfirmedNTable;
