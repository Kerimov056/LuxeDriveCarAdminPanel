import React from 'react';
import './BlogCreate.scss';
import { Button, Container, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useQueryClient } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'; 

const BlogCreate = () => {
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
                // Axios ile isteği gönder
                const response = await axios.post('https://localhost:7152/api/Blogs', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 201) {
                    queryClient.invalidateQueries('newBlog');
                    history.push('/admin/blog');
                }
            } catch (error) {
                console.error('Blog Created error:', error);
            }
        },
    });

    return (
        <Container>
            <h1>Blog Create</h1>
            <Row style={{ marginLeft: '350px', marginTop: '100px' }}>
                <div className="form-container">
                    <form className="form" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="Title">Blog Title</label>
                            <input
                                name="Title"
                                value={formik.values.Title}
                                onChange={formik.handleChange}
                                type="text"
                                id="Title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="blogImages">Blog Image</label>
                            <input
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
                            <textarea
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



// console.log("MARKA-----" + formData.getAll("Marka"));
// console.log("MODEL-----" + formData.getAll("Model"));
// console.log("PRICE-----" + formData.getAll("Price"));
// console.log("YEAR-----" + formData.getAll("Year"));
// console.log("DESC-----" + formData.getAll("Description"));
// console.log("TYPE-----" + formData.getAll("CarType"));
// console.log("CATEGORY-----" + formData.getAll("CarCategory"));
// console.log("TAG-----" + formData.getAll("tags"));
// console.log("CarImages-----" + formData.getAll("CarImages"));

// console.log(formData);