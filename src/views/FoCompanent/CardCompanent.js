import React from 'react'
import {
    Card,
    Row,
    Col,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { getCarCount } from "../../Services/carServices";
import { AiFillCar } from "react-icons/ai";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const CardCompanent = () => {

    const { data: cars } = useQuery({
        queryKey: ["CarCount"],
        queryFn: getCarCount,
        staleTime: 0,
    });

    return (
        <>
            <Col style={{ cursor: "pointer" }} id='CCCC' lg="3" sm="6">
                <Card className="card-stats">
                    <Card.Body>
                        <Row>
                            <Col xs="5">
                                <div className="icon-big text-center icon-warning">
                                    <AiFillCar style={{ color: "#fff" }} />
                                </div>
                            </Col>
                            <Col xs="7">
                                <div className="numbers">
                                    <p className="card-category">All Cars</p>
                                    <Card.Title as="h4">{cars?.data == null ? 0 : cars?.data}</Card.Title>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                            <i className="nc-icon nc-layers-3"></i>
                            <Link to="/AllCar">  Car Show</Link>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </>
    )
}

export default CardCompanent