import React, { useState, useEffect } from 'react';
import {
    Card,
    Table,
} from "react-bootstrap";
import AdminCard from './AdminCard';
import { AllAdmin } from "../../Services/authServices";
import { useQuery } from "react-query";
import { Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";


const Admin = () => {

    const { email } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();
    const [superAdmin, setSuperAdmin] = useState('');

    useEffect(() => {
        async function fetchSuperAdmin() {
            try {
                const response = await axios.get(`https://localhost:7152/api/Auth/ByAdmin?email=${email}`);
                setSuperAdmin(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        if (email) {
            fetchSuperAdmin();
        }
    }, [email]);


    if (superAdmin!==null) {

        const [searchAdmin, setSearchAdmin] = useState('');

        const handleAdminSearch = (event) => {
            setSearchAdmin(event.target.value);
        };

        const { data: getAdmin, isError } = useQuery(["AllAdmin", searchAdmin], () => AllAdmin(searchAdmin), {
            staleTime: 0,
        });

        if (isError) {
            return <div>Bir hata oluştu</div>;
        }

        return (
            <Card className="card-plain table-plain-bg">
                <Card.Header>
                    <Card.Title as="h4">Search Admin</Card.Title>
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
                            <AdminCard key={index} Id={admin?.id} Num={index + 1} FullName={admin?.fullName} Email={admin?.email} />
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

export default Admin;
