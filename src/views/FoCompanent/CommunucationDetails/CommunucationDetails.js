import React from 'react'
import { Container } from 'react-bootstrap';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getByCommunications } from "../../../Services/communicationsServices";


const CommunucationDetails = () => {

    const { id } = useParams();

    const { data: ByComun } = useQuery(["getByCommunications", id], () =>
        getByCommunications(id)
    );


    return (
        <>
            <Container>
                Salam
            </Container>
        </>
    )
}

export default CommunucationDetails