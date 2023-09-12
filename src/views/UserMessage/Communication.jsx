import React from 'react'
import UserMessage from './UserMessage'
import {
    Card,
    Table,
} from "react-bootstrap";
import { Input } from '@chakra-ui/react';


const Communication = () => {
    return (
        <>
            <Card className="card-plain table-plain-bg">
                <Card.Header>
                    <Card.Title as="h4">Search User</Card.Title>
                    <Input value={""} onChange={""} placeholder='Search by user' />
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover">
                        <thead>
                            <tr>
                                <th className="border-0">Num</th>
                                <th className="border-0">Full Name</th>
                                <th className="border-0">Email</th>
                                <th className="border-0">Details</th>
                                <th className="border-0">Remove</th>
                            </tr>
                        </thead>
                        <UserMessage />
                        {/* {getMembers?.data?.map((user, index) => (
                            <UserMessage key={index} Id={user?.id} Num={index + 1} FullName={user?.fullName} Email={user?.email} />
                        ))} */}
                    </Table>
                </Card.Body>
            </Card>
        </>
    )
}

export default Communication