import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { adminDelete, UserRemove } from "../../Services/authServices";
import { Link } from 'react-router-dom/cjs/react-router-dom';

const AdminCard = (props) => {
    const { token, username, appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const mutation = useMutation(() => adminDelete(appuserid, props.Id), {
        onSuccess: () => {
            queryClient.invalidateQueries("adminDelete");
            queryClient.invalidateQueries("AllAdmin");
            queryClient.invalidateQueries("MemberAllUsers");
        },
        onError: (error) => {
            console.error("Error", error);
        }
    });

    const adminDeleteHandler = () => {
        mutation.mutate();
    }


    
    const removeMutation = useMutation(() => UserRemove(appuserid, props.Id), {
        onSuccess: () => {
            queryClient.invalidateQueries("RemoveUser");
            queryClient.invalidateQueries("MemberAllUsers");
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
                    <td>{props.FullName}</td>
                    <td>{props.Email}</td>
                    <td><Button><Link to={`/UserDetails/${props.Id}`}>Details</Link></Button></td>
                    <td><Button onClick={adminDeleteHandler} variant='success'>Admin Delete</Button></td>
                    <td><Button onClick={userRemoveHandler} variant='danger'>Remove</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default AdminCard;
