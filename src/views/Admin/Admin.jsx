import React, { useState } from 'react';
import {
    Card,
    Table,
} from "react-bootstrap";
import { AllAdmin } from "../../Services/authServices";
import { useQuery } from "react-query";
import { Input } from '@chakra-ui/react';


const Admin = () => {

    const [searchAdmin, setSearchAdmin] = useState('');

    const handleAdminSearch = (event) => {
        setSearchAdmin(event.target.value);
    };

    const { data: getAdmin, isError, refetch } = useQuery(["AllAdmin", searchAdmin], () => AllAdmin(searchAdmin), {
        staleTime: 0,
    });

    if (isError) {
        return <div>Bir hata oluştu</div>;
    }

    return (
        <Card className="card-plain table-plain-bg">
            <Card.Header>
                <Card.Title as="h4">Search User</Card.Title>
                <Input value={searchAdmin} onChange={handleAdminSearch} placeholder='Search by user' />
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                    <thead>
                        <tr>
                            <th className="border-0">Num</th>
                            <th className="border-0">Full Name</th>
                            <th className="border-0">Email</th>
                            <th className="border-0">Details</th>
                            <th className="border-0">Admin Create</th>
                            <th className="border-0">Remove</th>
                        </tr>
                    </thead>
                    {getAdmin?.data?.map((admin, index) => (
                        <UserCard key={index} Id={admin?.id} Num={index + 1} FullName={admin?.fullName} Email={admin?.email} />
                    ))}
                </Table>
            </Card.Body>
        </Card>
    );
};

export default Admin;
