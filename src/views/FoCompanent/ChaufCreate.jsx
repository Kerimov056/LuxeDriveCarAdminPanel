    import React, { useState } from 'react'
    import { Button, Container, Row } from 'react-bootstrap'
    import "./chaufcreate.scss";
    import { Link } from 'react-router-dom/cjs/react-router-dom.min';
    import { PostCheuf } from "../../Services/chauffeursServices";
    import { useHistory } from "react-router-dom";
    import { Field, useFormik } from "formik";
    import { useMutation, useQueryClient } from "react-query";
    import axios from 'axios'; // Axios'u içeri aktarın.


    const ChaufCreate = () => {
        
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

                try{
                    const response = await axios.post('https://localhost:7152/api/Chauffeurss', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    if (response.status === 201) {
                        queryClient.invalidateQueries('newBlog');
                        queryClient.invalidateQueries('getChauffeurs');
                        history.push('/admin/typography');
                    }
                }catch (error) {
                    console.error('Blog Created error:', error);
                }
            },
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
                                        <input name='Name' value={formik.values.Name} onChange={formik.handleChange} type="text" required="required" />
                                        <span class="user">Fullname</span>
                                    </div>


                                    <div class="inputBox">
                                        <input name='image'   onChange={(e) => fileUploadHandler(e)}  type="file" accept="image/*"  required="required" />
                                        <span>Profile</span>
                                    </div>

                                    <div class="inputBox">
                                        <input name='Number' value={formik.values.Number} onChange={formik.handleChange} type="text" required="required" />
                                        <span>Telefon</span>
                                    </div>

                                    <div class="inputBox">
                                        <input name='Price' value={formik.values.Price} onChange={formik.handleChange} type="number" required="required" />
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