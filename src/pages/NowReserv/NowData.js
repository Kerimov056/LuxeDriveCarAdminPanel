import React from 'react'
import { Button} from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useQueryClient } from "react-query";

const NowData = (props) => {

    const queryClient = useQueryClient();


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
                </tr>
            </tbody>
        </>
    )
}

export default NowData