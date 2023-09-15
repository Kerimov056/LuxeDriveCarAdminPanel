import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useQuery, useQueryClient } from "react-query";
import { putReservConfirmed, putReservCancled } from "../../Services/reservationServices";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const NData = (props) => {

    //Confirem
    const notifyConfirem = () => {
        toast.success(`Confirem ${props.fullName} Reservation!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };
    const notifyConfiremError = () => toast.error(`Error ${props.fullName} Confirem.`);

    //Cancel
    const notifyCancel = () => {
        toast.success(`Cancel ${props.fullName} Reservation!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };
    const notifyCancelError = () => toast.error(`Error ${props.fullName} Cancel.`);



    const queryClient = useQueryClient();

    const handleConfirm = async (reservId) => {
        try {
            await putReservConfirmed(reservId);
            queryClient.invalidateQueries(["reservConform", reservId]);
            queryClient.invalidateQueries(["reservAllPedding"]);
            notifyConfirem();
        } catch (error) {
            notifyConfiremError();
        }
    };


    const handleCancled = async (reservId) => {
        try {
            await putReservCancled(reservId);
            queryClient.invalidateQueries(["reservCancled", reservId]);
            queryClient.invalidateQueries(["reservAllPedding"]);
            notifyCancel();
        } catch (error) {
            notifyCancelError()
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
                    <Link to={`/ReservDetail/${props.Id}`}><td><Button>Details</Button></td></Link>
                    <td><Button onClick={() => handleConfirm(props.Id)} variant="success">Confirm</Button></td>
                    <td><Button onClick={() => handleCancled(props.Id)} variant="danger">Cancel</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default NData