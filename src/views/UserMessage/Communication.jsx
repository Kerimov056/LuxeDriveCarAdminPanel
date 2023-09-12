import React, { useState } from 'react'
import UserMessage from './UserMessage'
import {
    Card,
    Table,
} from "react-bootstrap";
import { Input } from '@chakra-ui/react';
import { CommunicationsGet } from "../../Services/communicationsServices";
import { useQuery } from "react-query";

const Communication = () => {

    const [searchUser, setSearchUser] = useState('');


    const handleUserSearch = (event) => {
        setSearchUser(event.target.value);
    };

    const { data: getCommun, isError, refetch } = useQuery(["CommunucationAll", searchUser], () => CommunicationsGet(searchUser), {
        staleTime: 0,
    });

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <>
            <Card className="card-plain table-plain-bg">
                <Card.Header>
                    <Card.Title as="h4">Search Communication</Card.Title>
                    <Input value={searchUser} onChange={handleUserSearch} placeholder='Search by user' />
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
                        {getCommun?.data?.map((user, index) => (
                            <UserMessage key={index} Id={user?.id} Num={index + 1} Name={user?.name} Email={user?.email} />
                        ))}
                    </Table>
                </Card.Body>
            </Card>
        </>
    )
}

export default Communication