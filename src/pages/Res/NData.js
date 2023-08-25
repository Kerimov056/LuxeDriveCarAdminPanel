import React from 'react'
import { Button,Table } from 'react-bootstrap'


const NData = (props) => {
    return (
        <>
            <Table className="table-hover table-striped">

                <tbody>

                    <tr>
                        <td>{props.number}</td>
                        <td>Ulvi Kerimov</td>
                        <td>{props.marka} {props.model}</td>
                        <td>{props.pick}</td>
                        <td>{props.return}</td>
                        <td><Button>Details</Button></td>
                        <td><Button variant="success">Confirm</Button></td>
                        <td><Button variant="danger">Cancel</Button></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default NData