import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useQuery, useQueryClient } from "react-query";
import { getByCar } from "../../Services/carServices";
import { useParams, useHistory } from "react-router-dom";
import "./cardetails.scss";

const CarDetails = () => {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byCar } = useQuery(["getByCar", id], () =>
        getByCar(id)
    );

    const sport = "SPORT";
    const Premium = "Premium";
    const Luxury = "Lux";
    const Business = "Business";

    const [imgUrl, setImgUrl] = useState('');
    
    useEffect(() => {
        if (byCar?.data?.carCategory?.category.toUpperCase() === sport.toUpperCase()) {
            setImgUrl("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-9.png");
        } else if (byCar?.data?.carCategory?.category.toUpperCase() === Premium.toUpperCase()) {
            setImgUrl("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-10.png");
        } else if (byCar?.data?.carCategory?.category.toUpperCase() === Luxury.toUpperCase()) {
            setImgUrl("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/Vihecle-single-corner-img-.png");
        } else if (byCar?.data?.carCategory?.category.toUpperCase() === Business.toUpperCase()) {
            setImgUrl("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-12.png");
        } else {
            setImgUrl('');
        }
    }, [byCar?.data?.carCategory?.category]);

    return (
        <>
            <Container>
                <div className='MainCarImg'>
                    <img src='https://etimg.etb2bimg.com/photo/92392007.cms' />
                </div>
                <div className='details'>
                    <div>
                        <div className='categoryCarImage'>
                            <img src={imgUrl} />
                        </div>
                        <div className='CarDetailsIMs'>
                            <div class="cardDetailsAdmin">
                                <div class="wrapper">
                                    <div class="color black">
                                        Marka
                                        <span class="hex">{byCar?.data?.marka}</span>
                                    </div>
                                    <div class="color eerie-black">
                                        Model
                                        <span class="hex">{byCar?.data?.model}</span>
                                    </div>
                                    <div class="color chinese-black">
                                        Year
                                        <span class="hex">{byCar?.data?.year}</span>
                                    </div>
                                    <div class="color night-rider">
                                        Price
                                        <span class="hex">{byCar?.data?.price}</span>
                                    </div>
                                    <div class="color chinese-white">
                                        Type
                                        <span class="hex">{byCar?.data?.carType?.type}</span>
                                    </div>
                                    <div class="color anti-flash-white">
                                        Category
                                        <span class="hex">{byCar?.data?.carCategory?.category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='carDetails'>
                    <span>Description</span><br />
                    {byCar?.data?.description}
                </div>
                <div className='asdbbb'>
                    <Button variant="success">Edit</Button>
                    <Button variant="danger">Remove</Button>
                    <Button>Go To Back</Button>
                </div>
            </Container>
        </>
    )
}

export default CarDetails