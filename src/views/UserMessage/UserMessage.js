import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Button } from 'react-bootstrap'


const UserMessage = (props) => {
    return (
        <>
             <tbody>
                <tr>
                    <td>{props.Num}</td>
                    <td>{props.FullName}</td>
                    <td>{props.Email}</td>
                    <td><Button><Link to={`/UserDetails/${props.Id}`}>Details</Link></Button></td>
                    <td><Button onClick={''} variant='danger'>Remove</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default UserMessage