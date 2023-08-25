import React from 'react'
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
import { getGetAllReservCancled  } from "../../Services/reservationServices";
import moment from 'moment';
import CancledNData from './CancledNData';


const CancledTableR = () => {

    const { data: reservCancledGetAll, isError } = useQuery({
        queryKey: ["reservAllCancled"],
        queryFn: getGetAllReservCancled,
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
            <Col md="12">
                <Card className="card-plain table-plain-bg">
                    <Card.Header>
                        <Card.Title as="h4">Table on Plain Background</Card.Title>
                        <p className="card-category">
                            Here is a subtitle for this table
                        </p>
                    </Card.Header>
                    <Card.Body className="table-full-width table-responsive px-0">
                        <Table className="table-hover">
                            <thead>
                                <tr>
                                    <th className="border-0">Num</th>
                                    <th className="border-0">FullName</th>
                                    <th className="border-0">Car</th>
                                    <th className="border-0">Pickup Date</th>
                                    <th className="border-0">Return Date</th>
                                    <th className="border-0">Details</th>
                                    <th className="border-0">Remove</th>
                                </tr>
                            </thead>
                            {reservCancledGetAll?.data?.map((confirmed, index) => (
                                <CancledNData Id={confirmed?.id}
                                    key={index}
                                    number={index + 1}
                                    marka={confirmed?.reservCar?.marka}
                                    model={confirmed?.reservCar?.model}
                                    pick={formatDate(confirmed?.pickupDate)}
                                    return={formatDate(confirmed?.returnDate)} />
                            ))}
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default CancledTableR