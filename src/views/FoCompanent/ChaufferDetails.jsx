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


    
    const [updatedName, setUpdatedName] = useState(byCheuf?.data?.name);
    const [updatedNumber, setUpdatedNumber] = useState(byCheuf?.data?.number);
    const [updatedPrice, setUpdatedPrice] = useState(byCheuf?.data?.price);
    const [updatedImageBlog, setUpdatedImageBlog] = useState(byCheuf?.data?.imagePath);



    // const handleUpdateSubmit = async (e) => {
    //     e.preventDefault();

    //     const currentImages = byblog?.data?.blogImages || [];

    //     const updatedImages = [...currentImages];
    //     for (let i = 0; i < updatedImageBlog.length; i++) {
    //         updatedImages.push(updatedImageBlog[i]);
    //     }

    //     const formData = new FormData();
    //     formData.append('Title', updatedTitle);
    //     formData.append('Description', updatedDescription);
        
    //     for (let i = 0; i < updatedImageBlog.length; i++) {
    //         formData.append('blogImages', updatedImageBlog[i]);
    //     }

    //     try {
    //         await axios.put(`https://localhost:7152/api/Blogs/${id}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         queryClient.invalidateQueries(['getByBlog', id]);
    //         setBlogEdit(false);
    //     } catch (error) {
    //         console.error('Error updating Blog:', error);
    //     }
    // };




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
                            <div className="UpdateChauffers">
                                <div class="form-container">
                                    <div class="form">
                                        <span class="heading">Update Chauffeurss</span>
                                        <input placeholder="Name" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} type="text" class="input" />
                                        <input placeholder="Number" value={updatedNumber} onChange={(e) => setUpdatedNumber(e.target.value)} type="number" class="input" />
                                        <input placeholder="Price" value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} type="number" class="input" />
                                        <input type="file" onChange={(e) => setUpdatedImageBlog(e.target.files)}  class="input" />

                                        <div class="button-container">
                                            <Button style={{width:"150px"}} class="send-button">Send</Button>
                                            <div class="reset-button-container">
                                                <div id="reset-btn" class="reset-button">Reset</div>
                                            </div>
                                            <Button style={{width:"150px"}} class="send-button"><Link to={'/admin/typography'}>Go to Back</Link></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>Loading...</div>  //onClick={() => setCheufEdit(false)}
                        )}
                    </div>
                </div> : <div></div>}
            </Container>
        </>
    )
}

export default ChaufferDetails