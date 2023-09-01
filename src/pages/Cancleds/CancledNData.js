import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import {  useQueryClient } from "react-query";
import { putReservRemove } from "../../Services/reservationServices";

const CancledNData = (props) => {

    const queryClient = useQueryClient();
    const naviqate = useHistory();

    const handleRemove = async (reservId) => {
        try {
            await putReservRemove(reservId);
            queryClient.invalidateQueries(["reservCancled", reservId]);
            queryClient.invalidateQueries(["reservAllCancled"]);
            naviqate.push('/CancledReservations');
        } catch (error) {
            console.error("Error confirming reservation:", error);
        }
    };


    return (
        <>
            <tbody>
                <tr>
                    <td>{props.number}</td>
                    <td>Ulvi Kerimov</td>
                    <td>{props.marka} {props.model}</td>
                    <td>{props.pick}</td>
                    <td>{props.return}</td>
                    <Link to={`/CancledReservDetail/${props.Id}`}><td><Button>Details</Button></td></Link>
                    <td><Button onClick={() => handleRemove(props.Id)}  variant="danger">Remove</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default CancledNData