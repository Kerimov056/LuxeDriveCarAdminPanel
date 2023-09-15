import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useQuery, useQueryClient } from "react-query";
import { putReservCancled } from "../../Services/reservationServices";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CNData = (props) => {

    //Cancel
    const notifyCancel = () => {
        toast.success(`Cancel ${props.fullName} Reservation!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };
    const notifyCancelError = () => toast.error(`Error ${props.fullName} Cancel.`);



    const queryClient = useQueryClient();

    const handlecanceld = async (reservId) => {
        try {
            await putReservCancled(reservId);
            queryClient.invalidateQueries(["reservConformed", reservId]);
            queryClient.invalidateQueries(["reservAllConfirmed"]);
            notifyCancel();
        } catch (error) {
            notifyCancelError();
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
                    <td><Button onClick={() => handlecanceld(props.Id)} variant="danger">Cancel</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default CNData