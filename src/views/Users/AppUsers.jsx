import React from 'react'
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import UserCard from './UserCard';
import { MemberAllUser } from "../../Services/authServices";
import { useQuery } from "react-query";

const AppUsers = () => {


    //   const { data: getMembers, isError } = useQuery({
    //     queryKey: ["MemberAllUsers"],
    //     queryFn: MemberAllUser,
    //     staleTime: 0,
    //   });
    //   if (isError) {
    //     return <div>Bir hata oluştu</div>;
    //   }


    return (
        <>
            <Col md="12">
                <Card className="card-plain table-plain-bg">
                    <Card.Header>
                        <Card.Title as="h4">Table on Plain Background</Card.Title>
                        <p className="card-category">
                            Here is a subtitle for this table
                        </p>
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
                            {getMembers?.data?.map((users, index) => (
                                <UserCard key={index} Num={index+1} FullName={users.FullName} Email={users.Email} />
                            ))}
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default AppUsers