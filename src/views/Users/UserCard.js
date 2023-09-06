import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { adminCreate } from "../../Services/authServices";

const UserCard = (props) => {
    const { token, username, appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const mutation = useMutation(() => adminCreate(appuserid, props.Id), {
        onSuccess: () => {
            queryClient.invalidateQueries("AdminCreate");
        },
        onError: (error) => {
            console.error("Error", error);
        }
    });

    const adminCreateHandler = () => {
        mutation.mutate();
    }

    return (
        <>
            <tbody>
                <tr>
                    <td>{props.Num}</td>
                    <td>{props.FullName}</td>
                    <td>{props.Email}</td>
                    <td><Button>Details</Button></td>
                    <td><Button onClick={adminCreateHandler} variant='success'>Admin Create</Button></td>
                    <td><Button variant='danger'>Remove</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default UserCard;
