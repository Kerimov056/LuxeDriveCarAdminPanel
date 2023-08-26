import "./chaufferDetails.scss";
import React, { useState, useEffect } from 'react'
import {
    Button, Container, Badge,
    Card,
    Form,
    Navbar,
    Nav,
    Row,
    Col,
    InputGroup
} from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Field, useFormik } from "formik";
import { chauffeursRemove, getByCheuf } from "../../Services/chauffeursServices";

const ChaufferDetails = () => {

    const [CheufEdit, setCheufEdit] = useState(false)

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byCheuf } = useQuery(["getByCheuf", id], () =>
        getByCheuf(id)
    );


    const handleRemove = async (cheufId) => {
        try {
            await chauffeursRemove(cheufId);
            queryClient.invalidateQueries(["chuferRemove", cheufId]);
            queryClient.invalidateQueries(["getChauffeurs"]);
            navigate.push(`/admin/typography`);
        } catch (error) {
            console.error("Error confirming car:", error);
        }
    };


    const updateMutation = useMutation(ChaufferDetails, {
        onSuccess: () => {
            queryClient.invalidateQueries(["getByCheuf", id]);
            navigate("/admin/typography"); // Navigate back to the home page after update
        },
        onError: (error) => {
            console.error("Error updating Cheuffers:", error);
        },
    });

    const handleSubmit = async (values) => {
        updateMutation.mutate({ ...byCheuf, ...values });
    };


    return (
        <>
            <Container>
                <div className='details'>
                    <div>
                        <div className='categoryCarImage'>
                            <img src='http://localhost:3000/static/media/reactlogo.55f6660be18505517e2e.png' />
                        </div>
                        <div className='CarDetailsIMs'>
                            <div class="cardDetailsAdmin">
                                <div class="wrapperRRR">
                                    <div class="color black">
                                        Name
                                        <span class="hex">{byCheuf?.data?.name}</span>
                                    </div>
                                    <div class="color eerie-black">
                                        Number
                                        <span class="hex">{byCheuf?.data?.number}</span>
                                    </div>
                                    <div class="color chinese-black">
                                        Price
                                        <span class="hex">{byCheuf?.data?.price} $</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='asdbbb'>
                    <Button onClick={() => setCheufEdit(!CheufEdit)} variant="success">Edit</Button>
                    <Button onClick={() => handleRemove(byCheuf?.data?.id)} variant="danger">Remove</Button>
                    <Button><Link to='/admin/typography'>Go To Back</Link></Button>
                </div>


                {CheufEdit == true ? <div id='cheufEdit'>
                    <div>
                        {byCheuf ? (
                            <Formik
                                // initialValues={{
                                //     name: category.name,
                                //     description: category.description,
                                // }}
                                onSubmit={handleSubmit}
                            >
                                <Form id="ChefuerEdit">
                                    <Field type="file" name="" placeholder="Chauffer Image" />
                                    <Field type="text"  placeholder="Chauffer Name" />
                                    <Field 
                                        type="text"
                                        // name="description"
                                        placeholder="Chauffer"
                                    />
                                    <Field type="number" placeholder="Chauffer Price" />
                                    <Button variant="primary" onClick={() => setCheufEdit(false)} type="submit">Update</Button>
                                </Form>
                            </Formik>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                </div> : <div></div>}
            </Container>
        </>
    )
}

export default ChaufferDetails