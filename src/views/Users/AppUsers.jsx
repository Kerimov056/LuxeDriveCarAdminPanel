import React, { useState } from 'react';
import {
    Card,
    Table,
} from "react-bootstrap";
import UserCard from './UserCard';
import { MemberAllUser } from "../../Services/authServices";
import { Input } from '@chakra-ui/react';
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { SuperAdmin } from "../../components/Export/Export";


const AppUsers = () => {

    const { appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();
    if (appuserid === SuperAdmin) {

        const [searchUser, setSearchUser] = useState('');

        const handleUserSearch = (event) => {
            setSearchUser(event.target.value);
        };

        const { data: getMembers, isError, refetch } = useQuery(["MemberAllUsers", searchUser], () => MemberAllUser(searchUser), {
            staleTime: 0,
        });

        if (isError) {
            return <div>Error</div>;
        }

        return (
            <Card className="card-plain table-plain-bg">
                <Card.Header>
                    <Card.Title as="h4">Search User</Card.Title>
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
                                <th className="border-0">Admin Create</th>
                                <th className="border-0">Remove</th>
                            </tr>
                        </thead>
                        {getMembers?.data?.map((user, index) => (
                            <UserCard key={index} Id={user?.id} Num={index + 1} FullName={user?.fullName} Email={user?.email} />
                        ))}
                    </Table>
                </Card.Body>
            </Card>
        );
    }

    return (
        <><div><h1>You Are Not Authorized</h1></div></>
    )
};

export default AppUsers;
