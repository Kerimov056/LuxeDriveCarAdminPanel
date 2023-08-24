import React from 'react'
import {
    Card,
    Row,
    Col,
} from "react-bootstrap";
import "./cardcompanent.scss";
import { useQuery } from "react-query";
import { getCarCount } from "../Services/carServices";


const CardCompanent = () => {

    const { data: cars } = useQuery({
        queryKey: ["CarCount"],
        queryFn: getCarCount,
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
                                    <i className="nc-icon nc-chart text-warning"></i>
                                </div>
                            </Col>
                            <Col xs="7">
                                <div className="numbers">
                                    <p className="card-category">Number</p>
                                    <Card.Title as="h4">{cars?.data}</Card.Title>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                            <i className="fas fa-redo mr-1"></i>
                            Update Now
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </>
    )
}

export default CardCompanent