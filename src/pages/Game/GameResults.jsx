import React from "react";

import {
    Card,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { getGame } from "../../Services/gameServices";
import GameData from "./GameData";


function GameResults() {

    const { data: getGamesResults, isError } = useQuery({
        queryKey: ["getGame"],
        queryFn: getGame,
        staleTime: 0,
    });
    if (isError) {
        return <div>Error</div>;
    }


    return (
        <>
            <Container>
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
                                            <tr >
                                                <th className="border-0">Num</th>
                                                <th className="border-0">userName</th>
                                                <th className="border-0">Status</th>
                                                <th className="border-0">User Details</th>
                                                <th className="border-0">Remove</th>
                                            </tr>
                                        </thead>
                                        {getGamesResults?.data?.map((result, index) => (
                                            <GameData Id={result?.id}
                                                key={index}
                                                number={index + 1}
                                                appUserId={result?.appUserId}
                                            />
                                        ))}
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default GameResults;
