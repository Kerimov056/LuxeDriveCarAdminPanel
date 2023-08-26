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
import { getAllReservComplated } from "../../Services/reservationServices";
import moment from 'moment';
import CpNData from "./CpNData";


function ComplatedTable() {

    const { data: resgetComplted, isError } = useQuery({
        queryKey: ["getAllReservComplated"],
        queryFn: getAllReservComplated,
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
                                            <th className="border-0">Remove</th>
                                        </tr>
                                    </thead>
                                        {resgetComplted?.data?.map((now, index) => ( 
                                            <CpNData Id={now?.id}
                                                key={index}
                                                number={index + 1}
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

export default ComplatedTable;
