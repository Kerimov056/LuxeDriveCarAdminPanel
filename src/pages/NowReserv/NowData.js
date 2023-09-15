import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const NowData = (props) => {
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
                </tr>
            </tbody>
        </>
    )
}

export default NowData