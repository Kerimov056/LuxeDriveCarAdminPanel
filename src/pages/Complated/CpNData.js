import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useQuery, useQueryClient } from "react-query";
import { putReservRemove } from "../../Services/reservationServices";

const CpNData = (props) => {

    const queryClient = useQueryClient();

    const handleRemove = async (reservId) => {
        try {
            await putReservRemove(reservId);
            queryClient.invalidateQueries(["reservcomplated", reservId]);
            queryClient.invalidateQueries(["getAllReservComplated"]);
        } catch (error) {
            console.error("Error confirming reservation:", error);
        }
    };


    return (
        <>
            <tbody>
                <tr>
                    <td>{props.number}</td>
                    <td>{props.fullName}</td>
                    <td>{props.marka} {props.model}</td>
                    <td>{props.pick}</td>
                    <td>{props.return}</td>
                    <Link to={`/ComlatedRDetails/${props.Id}`}><td><Button>Details</Button></td></Link>
                    <td><Button onClick={() => handleRemove(props.Id)}  variant="danger">Remove</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default CpNData