import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Button } from 'react-bootstrap'
import { useMutation, useQueryClient } from "react-query";
import { removeCommunicationsId } from "../../Services/communicationsServices";


const UserMessage = (props) => {

    const queryClient = useQueryClient();

    const removeMutation = useMutation(() => removeCommunicationsId(props.Id), {
        onSuccess: () => {
            queryClient.invalidateQueries("CommunucationAll");
        },
        onError: (error) => {
            console.error("Error", error);
        }
    });

    const userRemoveHandler = () => {
        removeMutation.mutate();
    }

    return (
        <>
             <tbody>
                <tr>
                    <td>{props.Num}</td>
                    <td>{props.Name}</td>
                    <td>{props.Email}</td>
                    <td><Button><Link to={`/UserDetails/${props.Id}`}>Details</Link></Button></td>
                    <td><Button onClick={userRemoveHandler} variant='danger'>Remove</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default UserMessage