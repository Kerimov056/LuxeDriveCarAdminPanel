import React, { useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import "./chaufcreate.scss";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChauffeursSchema from "../../Validators/ChauffeursSchema";


const ChaufCreate = () => {

    const notifyRemoveSuccess = () => {
        toast.success("New Driver Created!", {
            position: toast.POSITION.TOP_CENTER
        });
    };
    const notifyError = () => toast.error("Error Created Driver.");


    const [image, setImage] = useState(null);
    const history = useHistory();


    const navigate = useHistory();
    const queryClient = useQueryClient();

    const fileUploadHandler = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };


    const formik = useFormik({
        initialValues: {
            Name: "",
            Number: "",
            Price: "",
            Image: null,
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('Name', values.Name);
            formData.append('Number', values.Number);
            formData.append('Price', values.Price);
            formData.append('Image', image);

            try {
                const response = await axios.post('https://localhost:7152/api/Chauffeurss', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 201) {
                    queryClient.invalidateQueries('newBlog');
                    queryClient.invalidateQueries('getChauffeurs');
                    history.push('/admin/typography');
                    notifyRemoveSuccess();
                }
            } catch (error) {
                console.error('Blog Created error:', error);
                notifyError();
            }
        },
        validationSchema: ChauffeursSchema
    });

    return (
        <>
            <Container>
                <Row>
                    <div class="containerCheuf">
                        <form onSubmit={formik.handleSubmit}>
                            <div class="cardCheufff">
                                <a style={{ fontSize: "23px" }} class="singupCheuf">Chauffeurs Create</a>
                                <div class="inputBox1">
                                    <>{formik.touched.Name && formik.errors.Name}</>
                                    <input name='Name'
                                        isInvalid={formik.errors.Name && formik.touched.Name}
                                        value={formik.values.Name} onChange={formik.handleChange} type="text" required="required" />
                                    <span class="user">Fullname</span>
                                </div>


                                <div class="inputBox">
                                    <>{formik.touched.Image && formik.errors.Image}</>
                                    <input name='image'
                                        isInvalid={formik.errors.Name && formik.touched.Name}
                                        onChange={(e) => fileUploadHandler(e)} type="file" accept="image/*" required="required" />
                                    <span>Profile</span>
                                </div>

                                <div class="inputBox">
                                    <>{formik.touched.Number && formik.errors.Number}</>
                                    <input name='Number'
                                        isInvalid={formik.errors.Number && formik.touched.Number}
                                        value={formik.values.Number} onChange={formik.handleChange} type="text" required="required" />
                                    <span>Telefon</span>
                                </div>

                                <div class="inputBox">
                                    <>{formik.touched.Price && formik.errors.Price}</>
                                    <input name='Price'
                                        isInvalid={formik.errors.Price && formik.touched.Price}
                                        value={formik.values.Price} onChange={formik.handleChange} type="Number" required="required" />
                                    <span>Price</span>
                                </div>

                                <Button type='submit' className="enter">Create</Button>
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