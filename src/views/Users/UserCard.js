import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { adminCreate, UserRemove } from "../../Services/authServices";
import { Link } from 'react-router-dom/cjs/react-router-dom';

const UserCard = (props) => {
    const { appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const mutation = useMutation(() => adminCreate(appuserid, props.Id), {
        onSuccess: () => {
            queryClient.invalidateQueries("AdminCreate");
            queryClient.invalidateQueries("MemberAllUsers");
        },
        onError: (error) => {
            console.error("Error", error);
        }
    });

    const adminCreateHandler = () => {
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
                    <td><Button onClick={adminCreateHandler} variant='success'>Admin Create</Button></td>
                    <td><Button onClick={userRemoveHandler} variant='danger'>Remove</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default UserCard;
