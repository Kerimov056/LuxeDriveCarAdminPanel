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

const CancledTableR = () => {
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
                                    <th className="border-0">Cancel</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Dakota Rice</td>
                                    <td>$36,738</td>
                                    <td>Niger</td>
                                    <td>Oud-Turnhout</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default CancledTableR