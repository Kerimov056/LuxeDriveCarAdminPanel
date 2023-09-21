import React from 'react'
import {
    Card,
    Row,
    Col,
} from "react-bootstrap";
import { useQuery } from "react-query";
// import { getReservCancledCount } from "../../Services/reservationServices";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const GameList = () => {

    // const { data: cancledReserv } = useQuery({
    //     queryKey: ["gameCount"],
    //     queryFn: getReservCancledCount,
    //     staleTime: 0,
    // });

    return (
        <>
            <Col style={{cursor:"pointer"}} id='CCCC' lg="3" sm="6">
                <Card className="card-stats">
                    <Card.Body>
                        <Row>
                            <Col xs="5">
                                <div className="icon-big text-center icon-warning">
                                    <i className="nc-icon nc-puzzle-10"></i>
                                </div>
                            </Col>
                            <Col xs="7">
                                <div className="numbers">
                                    <p className="card-category">Find Your Car</p>
                                    {/* <Card.Title as="h4">{cancledReserv?.data == null ? 0 : cancledReserv?.data}</Card.Title> */}
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                            <i className="nc-icon nc-simple-remove"></i>
                          <Link to='/GameResults'> Car Game Results</Link> 
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </>
    )
}

export default GameList

