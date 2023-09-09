import React, { useState, useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import './allcar.scss'
import CarCard from './CarCard'
import { useQuery } from "react-query";
import { getCar, PostCampagins } from "../../Services/carServices";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { Input } from '@chakra-ui/react';
import { SuperAdmin } from "../../components/Export/Export";

const AllCar = () => {
    const queryClient = useQueryClient();

    const { appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();

    const { data: allCars } = useQuery({
        queryKey: ["Allcars"],
        queryFn: getCar,
        staleTime: 0,
    });

    if(appuserid === SuperAdmin){
        
    }
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate1, setSelectedDate1] = useState(null);

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            PickupDate: selectedDate ? selectedDate : "",
            ReturnDate: selectedDate1 ? selectedDate1 : "",
        });
    }, [selectedDate, selectedDate1]);

    const handleDateChange = (e) => {
        const selected = new Date(e.target.value);
        const now = new Date();

        if (selected < now) {
            return;
        }
        setSelectedDate(e.target.value);
    };

    const handleDateChange1 = (e) => {
        const selected = new Date(e.target.value);
        if (selectedDate === null) {
            return;
        }
        if (selected < selectedDate) {
            return;
        }
        setSelectedDate1(e.target.value);
    };


    const mutation = useMutation(PostCampagins, {
        onSuccess: (data) => {
        },
        onError: (error) => {
            console.log("Error:", error);
        },
    });


    const formik = useFormik({
        initialValues: {
            PickUpCampaigns: "",
            ReturnCampaigns: "",
            CampaignsInterest: "",
            SuperAdminId: appuserid ? appuserid : "",
        },
        onSubmit: async (values) => {
            try {
                console.log(values);
                await mutation.mutateAsync(values);
            } catch (error) {
                console.log(error);
            }
        },
    });



    return (
        <>
            <Container>
                <Row>
                    <div className='LxDrC'>
                        <button data-text="Awesome" class="buttonLXDC">
                            <span class="actual-text">&nbsp;LuxeDrive&nbsp;</span>
                            <span class="hover-textLCD" aria-hidden="true">&nbsp;LuxeDrive&nbsp;</span>
                        </button>
                    </div>
                </Row>
                <Row id='AllCarSS' className='mt-5'>
                    <Button variant="primary" size="lg">
                        <Link to='/createCar'>Create Car</Link>
                    </Button>
                    <Button className='RG R'></Button> <span>Booked cars</span>
                    <Button className='RG G'></Button> <span>Rental cars</span>
                </Row>


                <Row id='CampaignsInterest'>
                    <h2>Start a Campaign</h2>
                    <div>
                        <label htmlFor="password">When do you want the discount to start?</label>
                        <Input
                            placeholder="Select Date and Time"
                            size="2md"
                            type="datetime-local"
                            value={selectedDate}
                            onChange={handleDateChange}
                            style={{
                                borderTop: "none",
                                borderRight: "none",
                                borderLeft: "none",
                                borderBottom: "1px solid white",
                            }}
                        />

                    </div>

                    <div>
                        <label htmlFor="password">When do you want the download to end?</label>
                        <Input
                            placeholder="Select Date and Time"
                            size="2md"
                            type="datetime-local"
                            value={selectedDate1}
                            onChange={handleDateChange1}
                            style={{
                                borderTop: "none",
                                borderRight: "none",
                                borderLeft: "none",
                                borderBottom: "1px solid white",
                            }}
                        />
                    </div>

                    <div>
                        <label>How much interest rate discount do you want to make?</label>
                        <Input type='number' placeholder='Enter Campaigns Interest' name='CampaignsInterest' value={formik.values.CampaignsInterest} onChange={formik.handleChange} />

                    </div>
                </Row>


                <Row className='mt-5'>
                    {allCars?.data.map((bycars, index) => (
                        <CarCard images={bycars?.carImages} key={index} Id={bycars?.id} isReserv={bycars?.isReserv} marka={bycars?.marka} model={bycars?.model} year={bycars?.year} />
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default AllCar