import React from 'react';
import './BlogCreate.scss';
import { Container, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useQueryClient } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import blogSchema from "../../Validators/blogSchema";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BlogCreate = () => {
    const notify = () => toast("New Blog Created!", {
        style: {
            backgroundColor: 'green',
            color: 'white',
        },
    });

    const notifyError = () => toast.error("Error Created Blog.");

    const queryClient = useQueryClient();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            Title: '',
            Description: '',
            blogImages: [],
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('Title', values.Title);
            formData.append('Description', values.Description);

            for (let i = 0; i < values.blogImages.length; i++) {
                formData.append('blogImages', values.blogImages[i]);
            }

            try {
               
                const response = await axios.post('https://localhost:7152/api/Blogs', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 201) {
                    queryClient.invalidateQueries('newBlog');
                    history.push('/admin/blog');
                    notify();
                }
            } catch (error) {
                console.error('Blog Created error:', error);
                notifyError();
            }
        },
        validationSchema: blogSchema,
    });

    return (
        <Container>
            <h1>Blog Create</h1>
            <Row style={{ marginLeft: '350px', marginTop: '100px' }}>
                <div className="form-container">
                    <form className="form" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="Title">Blog Title</label>
                            <>{formik.touched.Title && formik.errors.Title}</>
                            <input
                                isInvalid={formik.errors.Title && formik.touched.Title}
                                name="Title"
                                value={formik.values.Title}
                                onChange={formik.handleChange}
                                type="text"
                                id="Title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="blogImages">Blog Image</label>
                            <>{formik.touched.blogImages && formik.errors.blogImages}</>
                            <input
                                isInvalid={formik.errors.blogImages && formik.touched.blogImages}
                                multiple
                                name="blogImages"
                                type="file"
                                onChange={(e) =>
                                    formik.setFieldValue('blogImages', e.target.files)
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Description">Blog Description</label>
                            <>{formik.touched.Description && formik.errors.Description}</>
                            <textarea
                                isInvalid={formik.errors.Description && formik.touched.Description}
                                name="Description"
                                value={formik.values.Description}
                                onChange={formik.handleChange}
                                id="Description"
                                rows="10"
                                cols="50"
                            />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <button className="form-submit-btn" type="submit">
                                Submit
                            </button>
                            <button
                                style={{ marginLeft: '50px' }}
                                className="form-submit-btn"
                                type="button"
                            >
                                <Link to={'/admin/blog'}>Go to back</Link>
                            </button>
                        </div>
                    </form>
                </div>
            </Row>
        </Container>
    );
};

export default BlogCreate;


