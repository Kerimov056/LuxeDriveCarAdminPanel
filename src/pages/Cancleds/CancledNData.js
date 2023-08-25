import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useQuery, useQueryClient } from "react-query";
import { putReservCancled } from "../../Services/reservationServices";

const CancledNData = (props) => {

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
                    <td>Ulvi Kerimov</td>
                    <td>{props.marka} {props.model}</td>
                    <td>{props.pick}</td>
                    <td>{props.return}</td>
                    <Link to={`/CancledReservDetail/${props.Id}`}><td><Button>Details</Button></td></Link>
                </tr>
            </tbody>
        </>
    )
}

export default CancledNData