import React, { useState } from 'react';
import "./TableListt.scss";
import { Button, Form } from 'react-bootstrap';
import { useQueryClient } from "react-query";
import { removeSlider } from "../Services/sliderServices";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SliderCard = (props) => {
    const [editSlider, setEditSlider] = useState(false);
    const [image, setImage] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const queryClient = useQueryClient();

    const notifyRemoveSuccess = () => {
        toast.success(`Slider Deleted successfully!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };
    const notifyRemoveError = () => toast.error(`Error Delete Slider.`);

    const notifySuccess = () => toast.success(`Slider updated successfully!`);
    const notifyError = () => toast.error(`Error updating Slider.`);
   

    const handleRemove = async (sliderId) => {
        try {
            await removeSlider(sliderId);
            queryClient.invalidateQueries(["sliderRemove", sliderId]);
            queryClient.invalidateQueries(["getAllSlider"]);
            notifyRemoveSuccess();
        } catch (error) {
            notifyRemoveError();
        }
    };



    const fileUploadHandler = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setShowImage(URL.createObjectURL(file));
    };

    const handleUpdateSlider = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image); 

        await axios.put(`https://localhost:7152/api/Sliders/${props.Id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                queryClient.invalidateQueries("getAllSlider");
                setEditSlider(false);
                notifySuccess();
            })
            .catch((err) => {
                notifyError()
            });
    };

    return (
        <>
            <tbody>
                <tr >
                    <td style={{width:"30px"}}>{props.number}</td>
                    <td className='Slidersss'>
                        <div className="cardSlider">
                            <div className="cardSlider2">
                                <img src={`data:image/jpg;base64,${props.imgUrl}`} />
                            </div>
                        </div>
                    </td>
                    <td className='Artirrr'>
                        <Button onClick={() => setEditSlider(!editSlider)} variant="primary">
                            Edit
                        </Button>
                    </td>
                    <td className='Artirrr'>
                        <Button onClick={() => handleRemove(props.Id)} variant="danger">
                            Remove
                        </Button>
                    </td>
                </tr>
                {editSlider == true ? (
                    <div id='SliderEdit' style={{ marginTop: "30px" }}>
                        <form className="mb-3" onSubmit={handleUpdateSlider}>
                            <div>
                                <Form.Control
                                    type="file"
                                    required
                                    onChange={(e) => fileUploadHandler(e)}
                                />
                                <p style={{ width: "20%", marginTop: "35px" }}>
                                    <Button type="submit" style={{ width: "140px" }} variant="success">
                                        Update
                                    </Button>
                                </p>
                            </div>
                        </form>
                    </div>
                ) : (
                    <></>
                )}
            </tbody>
        </>
    );
}

export default SliderCard;
