import React from 'react'
import { Button } from 'react-bootstrap'

const UserCard = (props) => {
    return (
        <>
            <tbody>
                <tr>
                    <td>{props.Num}</td>
                    <td>{props.FullName}</td>
                    <td>{props.Email}</td>
                    <td><Button>Details</Button></td>
                    <td><Button variant='success'>Admin Create</Button></td>
                    <td><Button variant='danger'>Remove</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default UserCard