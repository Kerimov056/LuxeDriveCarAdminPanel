import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


const NData = (props) => {
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
                    <td><Button variant="success">Confirm</Button></td>
                    <td><Button variant="danger">Cancel</Button></td>
                </tr>
            </tbody>
        </>
    )
}

export default NData