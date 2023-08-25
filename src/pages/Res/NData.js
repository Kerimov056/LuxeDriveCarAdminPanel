import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useQuery, useQueryClient } from "react-query";
import { putReservConfirmed, putReservCancled } from "../../Services/reservationServices";

const NData = (props) => {

    const queryClient = useQueryClient();

    const handleConfirm = async (reservId) => {
        try {
            await putReservConfirmed(reservId);
            queryClient.invalidateQueries(["reservConform", reservId]);
            queryClient.invalidateQueries(["reservAllPedding"]);
        } catch (error) {
            console.error("Error confirming reservation:", error);
        }
    };

    
    const handleCancled = async (reservId) => {
        try {
            await putReservCancled(reservId);
            queryClient.invalidateQueries(["reservCancled", reservId]);
            queryClient.invalidateQueries(["reservAllPedding"]);
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
                    <Link to={`/ReservDetail/${props.Id}`}><td><Button>Details</Button></td></Link>
                    <td><Button onClick={() => handleConfirm(props.Id)} variant="success">Confirm</Button></td>
                    <td><Button onClick={() => handleCancled(props.Id)} variant="danger">Cancel</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default NData