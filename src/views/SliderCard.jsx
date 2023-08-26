import React, { useState } from 'react'
import "./TableListt.scss";
import { Button } from 'react-bootstrap';
import { useQueryClient } from "react-query";
import { removeSlider } from "../Services/sliderServices";

const SliderCard = (props) => {

    const [editSlider, setEditSlider] = useState(false);

    const queryClient = useQueryClient();
    
    const handleRemove = async (sliderId) => {
        try {
            await removeSlider(sliderId);
            queryClient.invalidateQueries(["sliderRemove", sliderId]);
            queryClient.invalidateQueries(["getAllSlider"]);
        } catch (error) {
            console.error("Error confirming reservation:", error);
        }
    };


    return (
        <>
            <tbody>
                <tr>
                    <td>{props.number}</td>
                    <td className='Slidersss'>
                        <div class="cardSlider">
                            <div class="cardSlider2">
                                <img src='https://hips.hearstapps.com/hmg-prod/images/2023-bentley-continental-gt-s-coupe-101-1654526518.jpg?crop=0.678xw:0.763xh;0.116xw,0.176xh&resize=640:*' />
                                {/* <img src={props.imgUrl} /> */}
                            </div>
                        </div>
                    </td>
                    <td className='Artirrr'><Button onClick={() => setEditSlider(!editSlider)} variant="primary">Edit</Button></td>
                    <td className='Artirrr'><Button onClick={() => handleRemove(props.Id)}  variant="danger">Remove</Button></td>
                </tr>
                {editSlider==true ? <div  id='SliderEdit'>
                    asjbdasbads
                </div>:
                    <></>
                }
            </tbody>
        </>
    )
}

export default SliderCard