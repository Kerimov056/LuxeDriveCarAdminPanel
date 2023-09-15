import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useQuery, useQueryClient } from "react-query";
import { putReservCancled } from "../../Services/reservationServices";

const CNData = (props) => {

    const queryClient = useQueryClient();

    const handleConfirm = async (reservId) => {
        try {
            await putReservCancled(reservId);
            queryClient.invalidateQueries(["reservConformed", reservId]);
            queryClient.invalidateQueries(["reservAllConfirmed"]);
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
                    <Link to={`/CReservDetail/${props.Id}`}><td><Button>Details</Button></td></Link>
                    <td><Button onClick={() => handleConfirm(props.Id)}  variant="danger">Cancel</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default CNData