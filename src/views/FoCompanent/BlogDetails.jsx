import "./blogdetails.scss";
import React, { useState } from 'react'
import {
    Button, Container,
} from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useQuery, useQueryClient } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { getByBlog, removeBlog } from "../../Services/blogServices";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BlogDetails = () => {

    const notifySuccess = () => toast.success("Blog updated successfully!");
    const notifyError = () => toast.error("Error updating Blog.");
    const notifyRemoveError = () => toast.error("Error Delete Blog.");
    const notifyRemoveSuccess = () => {
        toast.success("Item Deleted successfully!", {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const [blogEdit, setBlogEdit] = useState(false)


    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byblog } = useQuery(["getByBlog", id], () =>
        getByBlog(id)
    );

    const handleRemove = async (blogId) => {
        try {
            await removeBlog(blogId);
            queryClient.invalidateQueries(["chuferRemove", blogId]);
            queryClient.invalidateQueries(["getChauffeurs"]);
            navigate.push(`/admin/blog`);
            notifyRemoveSuccess();
        } catch (error) {
            console.error("Error confirming car:", error);
            notifyRemoveError();
        }
    };

    const [updatedTitle, setUpdatedTitle] = useState(byblog?.data?.title);
    const [updatedDescription, setUpdatedDescription] = useState(byblog?.data?.description);
    const [updatedImageBlog, setUpdatedImageBlog] = useState(byblog?.data?.blogImages);

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const currentImages = byblog?.data?.blogImages || [];

        const updatedImages = [...currentImages];
        for (let i = 0; i < updatedImageBlog.length; i++) {
            updatedImages.push(updatedImageBlog[i]);
        }

        const formData = new FormData();
        formData.append('Title', updatedTitle);
        formData.append('Description', updatedDescription);

        for (let i = 0; i < updatedImageBlog.length; i++) {
            formData.append('blogImages', updatedImageBlog[i]);
        }

        try {
            await axios.put(`https://localhost:7152/api/Blogs/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            queryClient.invalidateQueries(['getByBlog', id]);
            setBlogEdit(false);
            notifySuccess();

        } catch (error) {
            console.error('Error updating Blog:', error);
            notifyError();
        }
    };

    return (
        <>
            <Container>
                <div className="blogDetailss">
                    <div class="BlofDimg pyramid-loaderRRR">
                        <span class="side side2">{byblog?.data?.blogImages.map((image, index) => (
                            <img style={{ width: "400px", height: "240px", objectFit: "cover", marginTop: "5px" }} src={`data:image/png;base64,${image?.imagePath}`} />
                        ))}
                        </span>
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
                    <Button variant="dark"><Link to='/admin/blog'>Go To Back</Link></Button>
                </div>
                {blogEdit == true ? <div id='cheufEdit'>
                    <div>
                        {byblog ? (
                            <form className="form" id="BlogUpdateE" onSubmit={handleUpdateSubmit}>
                                <div className="form-group">
                                    <label htmlFor="Title">Blog Title</label>
                                    <input
                                        value={updatedTitle}
                                        onChange={(e) => setUpdatedTitle(e.target.value)}
                                        type="text"
                                        id="Title"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="blogImages">Blog Image</label>
                                    <input
                                        multiple
                                        type="file"
                                        onChange={(e) => setUpdatedImageBlog(e.target.files)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Description">Blog Description</label>
                                    <textarea
                                        value={updatedDescription}
                                        onChange={(e) => setUpdatedDescription(e.target.value)}
                                        id="Description"
                                        rows="10"
                                        cols="50"
                                    />
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Button className="form-submit-btn" type="submit">
                                        Submit
                                    </Button>
                                    <Button
                                        style={{ marginLeft: '50px' }}
                                        className="form-submit-btn ssE"
                                        type="button"
                                    >
                                        <Link to={'/admin/blog'}>Go to back</Link>
                                    </Button>
                                </div>
                            </form>

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