import "./chaufferDetails.scss";
import React, { useState } from 'react'
import {
    Button, Container
} from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useQuery, useQueryClient } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { chauffeursRemove, getByCheuf } from "../../Services/chauffeursServices";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ChaufferDetails = () => {

    const [CheufEdit, setCheufEdit] = useState(false)

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byCheuf } = useQuery(["getByCheuf", id], () =>
        getByCheuf(id)
    );

    const notifySuccess = () => toast.success(`${byCheuf?.data?.name} updated successfully!`);
    const notifyRemoveSuccess = () => {
        toast.success(`${byCheuf?.data?.name} Deleted successfully!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const notifyError = () => toast.error(`Error updating  ${byCheuf?.data?.name}.`);
    const notifyRemoveError = () => toast.error(`Error Delete ${byCheuf?.data?.name}.`);



    const handleRemove = async (cheufId) => {
        try {
            await chauffeursRemove(cheufId);
            queryClient.invalidateQueries(["chuferRemove", cheufId]);
            queryClient.invalidateQueries(["getChauffeurs"]);
            navigate.push(`/admin/typography`);
            notifyRemoveSuccess();
        } catch (error) {
            console.error("Error confirming car:", error);
            notifyError();
        }
    };

    const [updatedName, setUpdatedName] = useState(byCheuf?.data?.name);
    const [updatedNumber, setUpdatedNumber] = useState(byCheuf?.data?.number);
    const [updatedPrice, setUpdatedPrice] = useState(byCheuf?.data?.price);
    const [updatedImageChauf, setUpdatedImageChauf] = useState(null);

    const fileUploadHandler = (e) => {
        const file = e.target.files[0];
        setUpdatedImageChauf(file);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const currentImages = byCheuf?.data?.imagePath || [];

        const formData = new FormData();
        formData.append('Name', updatedName);
        formData.append('Number', updatedNumber);
        formData.append('Price', parseFloat(updatedPrice));
        formData.append('Image', updatedImageChauf);


        try {
            await axios.put(`https://localhost:7152/api/Chauffeurss/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            queryClient.invalidateQueries(['getByCheuf', id]);
            setCheufEdit(false);
            notifySuccess();
        } catch (error) {
            console.error('Error updating Blog:', error);
        }
    };

    return (
        <>
            <Container>
                <div className='details'>
                    <div>
                        <div className='categoryCarImage'>
                            <img style={{ objectFit: "cover" }} src={`data:image/png;base64,${byCheuf?.data?.imagePath}`} />
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
                            <form onSubmit={handleUpdateSubmit}>
                                <div className="UpdateChauffers">
                                    <div class="form-container">
                                        <div class="form">
                                            <span class="heading">Update Chauffeurss</span>
                                            <input placeholder="Name" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} type="text" class="input" />
                                            <input placeholder="Number" value={updatedNumber} onChange={(e) => setUpdatedNumber(e.target.value)} type="text" class="input" />
                                            <input placeholder="Price" value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} type="number" class="input" />
                                            <input type="file" onChange={(e) => fileUploadHandler(e)} class="input" />

                                            <div class="button-container">
                                                <Button type="submit" style={{ width: "150px" }} class="send-button">Update</Button>
                                                <div class="reset-button-container">
                                                    <div id="reset-btn" class="reset-button">Reset</div>
                                                </div>
                                                <Button style={{ width: "150px", backgroundColor: "black" }} class="send-button"><Link to={'/admin/typography'}>Go to Back</Link></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                </div> : <div></div>}
            </Container>
        </>
    )
}

export default ChaufferDetails;
