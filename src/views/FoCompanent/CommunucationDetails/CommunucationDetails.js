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
                <div className='UserComun'>
                    <h2>Name: <span>{ByComun?.data?.name}</span></h2>
                    <h2>SurName: <span>{ByComun?.data?.surName}</span></h2>
                    <h2>Number: <span>{ByComun?.data?.phone}</span></h2>
                    <h2>Email: <span>{ByComun?.data?.email}</span></h2>
                </div>
                <div class="CommunucationDetails">
                    <h2>{ByComun?.data?.note}</h2>
                </div>
            </Container>
            <Container>
                
            </Container>
        </>
    )
}

export default CommunucationDetails

