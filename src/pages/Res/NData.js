import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useQuery, useQueryClient } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { putReservConfirmed } from "../../Services/reservationServices";

const NData = (props) => {

    const queryClient = useQueryClient();
    const navigate = useHistory();

    const handleConfirm = async (reservId) => {
        try {
            await putReservConfirmed(reservId);
            queryClient.invalidateQueries(["reservConform", reservId]);
            queryClient.invalidateQueries(["reservAllPedding"]);
            navigate("/NotificationsReservation");
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
                    <td><Button variant="danger">Cancel</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default NData