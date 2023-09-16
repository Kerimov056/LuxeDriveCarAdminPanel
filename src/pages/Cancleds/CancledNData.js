import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import {  useQueryClient } from "react-query";
import { putReservRemove } from "../../Services/reservationServices";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CancledNData = (props) => {

    const queryClient = useQueryClient();
    const naviqate = useHistory();
    
    
    const notifyRemove = () => {
        toast.success(`Canceld ${props.fullName} Reservation!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };
    const notifyRemoveError = () => toast.error(`Error ${props.fullName} Canceld.`);


    const handleRemove = async (reservId) => {
        try {
            await putReservRemove(reservId);
            queryClient.invalidateQueries(["reservCancled", reservId]);
            queryClient.invalidateQueries(["reservAllCancled"]);
            naviqate.push('/CancledReservations');
            notifyRemove();
        } catch (error) {
            notifyRemoveError();
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
                    <Link to={`/CancledReservDetail/${props.Id}`}><td><Button>Details</Button></td></Link>
                    <td><Button onClick={() => handleRemove(props.Id)}  variant="danger">Remove</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default CancledNData