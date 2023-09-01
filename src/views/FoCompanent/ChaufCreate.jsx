import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import "./chaufcreate.scss";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { PostCheuf } from "../../Services/chauffeursServices";
import { useHistory } from "react-router-dom";
import { Field, useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";

const ChaufCreate = () => {

    const navigate = useHistory();
    const queryClient = useQueryClient();

    const mutation = useMutation(PostCheuf, {
        onSuccess: () => {
            navigate("/");
            queryClient.invalidateQueries("newCheuf");
        },
    });

    const formik = useFormik({
        initialValues: {
           name: "",
           number: "",
           price: "",
           image: "",
        },
        onSubmit: async (values) => {
            try {
                mutation.mutateAsync(values);
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <>
            <Container>
                <Row>
                    <div class="containerCheuf">
                        <form>
                            <div class="cardCheufff">
                                <a style={{ fontSize: "23px" }} class="singupCheuf">Chauffeurs Create</a>
                                <div class="inputBox1">
                                    <input name='name' value={formik.values.name} onChange={formik.handleChange} type="text" required="required" />
                                    <span class="user">Fullname</span>
                                </div>


                                <div class="inputBox">
                                    <input name='image' value={formik.values.image} onChange={formik.handleChange} type="file" required="required" />
                                    <span>Profile</span>
                                </div>

                                <div class="inputBox">
                                    <input name='number' value={formik.values.number} onChange={formik.handleChange} type="text" required="required" />
                                    <span>Telefon</span>
                                </div>

                                <div class="inputBox">
                                    <input name='price' value={formik.values.price} onChange={formik.handleChange} type="number" required="required" />
                                    <span>Price</span>
                                </div>

                                <Button type='submit' onClick={formik.handleSubmit} className="enter">Create</Button>
                            </div>
                        </form>
                    </div>
                    <Button style={{ marginLeft: "auto" }} variant='black'><Link to='/admin/typography'>Go To Back</Link></Button>
                </Row>
            </Container>
        </>
    )
}

export default ChaufCreate