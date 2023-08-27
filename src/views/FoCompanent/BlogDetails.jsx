import "./blogdetails.scss";
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
import { getByBlog, removeBlog } from "../../Services/blogServices";


const BlogDetails = () => {

    const [blogEdit, setBlogEdit] = useState(false)

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byblog } = useQuery(["getByBlog", id], () =>
        getByBlog(id)
    );


    const updateMutation = useMutation(BlogDetails, {
        onSuccess: () => {
            queryClient.invalidateQueries(["getByBlog", id]);
            console.log(setFieldValue);
            navigate("/admin/maps");
        },
        onError: (error) => {
            console.error("Error updating Blog:", error);
        },
    });

    const handleSubmit = async (values) => {
        updateMutation.mutate({ ...byCheuf, ...values });
    };


    const handleRemove = async (blogId) => {
        try {
            await removeBlog(blogId);
            queryClient.invalidateQueries(["chuferRemove", blogId]);
            queryClient.invalidateQueries(["getChauffeurs"]);
            navigate.push(`/admin/maps`);
        } catch (error) {
            console.error("Error confirming car:", error);
        }
    };


    return (
        <>
            <Container>
                <div className="blogDetailss">
                    <div class="BlofDimg pyramid-loaderRRR">
                        <div class="wrappeRRRRRr">
                            <span class="side side1"></span>
                            <span class="side side2"><img src="data:image/jpeg;base64,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" /></span>
                            <span class="side side3"><img src="data:image/jpeg;base64,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" /></span>
                            <span class="side side4"></span>
                            <span class="shadow"></span>
                        </div>
                    </div>
                    <div className="BlofDtext">
                        <div class="w-60 bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600 border border-slate-300 grid grid-col-2 justify-center p-4 gap-4 rounded-lg shadow-md">
                            <div style={{ fontSize: "30px" }} class="col-span-2 text-lg font-bold capitalize rounded-md">
                                {byblog?.data?.title}
                            </div>
                            <div class="col-span-2 rounded-md">
                                {byblog?.data?.description}
                            </div>
                            <div class="col-span-1">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="OptionsByBlog">
                    <Button onClick={() => setBlogEdit(!blogEdit)} variant="info">Edit</Button>
                    <Button onClick={() => handleRemove(byblog?.data?.id)} variant="danger">Remove</Button>
                    <Button variant="dark"><Link to='/admin/maps'>Go To Back</Link></Button>
                </div>
                {blogEdit == true ? <div id='cheufEdit'>
                    <div>
                        {byblog ? (
                            <Formik
                                initialValues={{
                                    name: byblog?.data?.title,
                                    number: byblog?.data?.description,
                                    //image: byblog?.
                                }}
                                onSubmit={handleSubmit}
                            >
                                {({ setFieldValue }) => (
                                    <Form id="ChefuerEdit">
                                        <input
                                            type="file"
                                            onChange={(event) => {
                                                const selectedFile = event.target.files[0];
                                                setFieldValue("imagePath", selectedFile);
                                            }}
                                        />
                                        {/* {byblog?.data?.imagePath && <div>{byCheuf.data.imagePath.name}</div>} */}
                                        <Field type="text" name="name" placeholder="Blog Title" />
                                        <Field type="text" name="number" placeholder="Blog Description" />
                                        <Button variant="primary" type="submit">Update</Button>
                                    </Form>
                                )}
                            </Formik>
                        ) : (
                            <div>Loading...</div>  //onClick={() => setCheufEdit(false)}
                        )}
                    </div>
                </div> : <div></div>}
            </Container>
        </>
    )
}

export default BlogDetails