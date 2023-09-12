import React from 'react'
import { Container } from 'react-bootstrap';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getByCommunications } from "../../../Services/communicationsServices";
import './CommunDetails.scss'

const CommunucationDetails = () => {

    const { id } = useParams();

    const { data: ByComun } = useQuery(["getByCommunications", id], () =>
        getByCommunications(id)
    );


    return (
        <>
            <Container id="CommunSDetails">
                <div>
                    Salam
                </div>
                <div class="CommunucationDetails">
                    <h2>{ByComun?.data?.note}</h2>
                </div>
            </Container>
        </>
    )
}

export default CommunucationDetails

