import React from 'react'
import { Button, Container } from 'react-bootstrap'
import "./cardetails.scss";

const CarDetails = () => {
    return (
        <>
            <Container>
                <div className='MainCarImg'>
                    <img src='https://etimg.etb2bimg.com/photo/92392007.cms' />
                </div>
                <div className='details'>
                    <div>
                        <div className='categoryCarImage'>
                            <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-12.png' />
                        </div>
                        <div className='CarDetailsIMs'>
                            <div class="cardDetailsAdmin">
                                <div class="wrapper">
                                    <div class="color black">
                                        Marka
                                        <span class="hex">#000000</span>
                                    </div>
                                    <div class="color eerie-black">
                                        Model
                                        <span class="hex">#1b1b1b</span>
                                    </div>
                                    <div class="color chinese-black">
                                        Year
                                        <span class="hex">#141414</span>
                                    </div>
                                    <div class="color night-rider">
                                        Price
                                        <span class="hex">#2e2e2e</span>
                                    </div>
                                    <div class="color chinese-white">
                                        Type
                                        <span class="hex">#e1e1e1</span>
                                    </div>
                                    <div class="color anti-flash-white">
                                        Category
                                        <span class="hex">#f3f3f3</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='asdbbb'>
                    <Button variant="success">Update</Button>
                    <Button variant="danger">Remove</Button>
                    <Button>Go To Back</Button>
                </div>
            </Container>
        </>
    )
}

export default CarDetails