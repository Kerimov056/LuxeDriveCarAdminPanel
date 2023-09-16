import React, { useState, useEffect } from 'react';
import './allcar.scss';
import { Button, Row } from 'react-bootstrap';
import { Input } from '@chakra-ui/react';
import { IsCampaigns, stopCompagins } from "../../Services/carServices";
import { BySuperAdmin } from "../../Services/authServices";
import { useFormik } from "formik";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { SuperAdmin } from "../../components/Export/Export";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Campaign = () => {
    const { appuserid, email } = useSelector((x) => x.authReducer);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate1, setSelectedDate1] = useState(null);
    const dispatch = useDispatch();


    const queryClient = useQueryClient();


    const { data: SuperAdmin } = useQuery({
        queryKey: ["BySuperAdmin"],
        queryFn: BySuperAdmin,
        staleTime: 0,
    });



    const currentDateTime = new Date().toISOString().slice(0, 16);


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

    const notifyError = () => toast.success(`Error Compaign Created!`);

    
    const notifySuccess = () => {
        toast.success(`New Compaign Created successfully!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };


    const formik = useFormik({
        initialValues: {
            PickUpCampaigns: selectedDate ? selectedDate : '',
            ReturnCampaigns: selectedDate1 ? selectedDate1 : '',
            CampaignsInterest: "",
            SuperAdminId: appuserid ? appuserid : "",
            CompaignName: "",
        },
        onSubmit: async (values) => {
            const formData = new FormData();

            formData.append('PickUpCampaigns', selectedDate);
            formData.append("ReturnCampaigns", selectedDate1);
            formData.append("CampaignsInterest", values.CampaignsInterest);
            formData.append("SuperAdminId", values.SuperAdminId);
            formData.append("CompaignName", values.CompaignName);

            try {
                const response = await axios.post('https://localhost:7152/api/Car/Campaigns', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                if (response.status === 201) {
                    queryClient.invalidateQueries('getReservation');
                    queryClient.invalidateQueries('stopCompagins');
                    queryClient.invalidateQueries('IsCampaignss');
                    queryClient.invalidateQueries('IsCampaigns');
                    notifySuccess();
                }

            } catch (error) {
                notifyError()
            }
        },
    });



    const { data: Compn } = useQuery({
        queryKey: ["IsCampaignss"],
        queryFn: IsCampaigns,
        staleTime: 0,
    });



    const mutation = useMutation(() => stopCompagins(appuserid), {
        onSuccess: () => {
            queryClient.invalidateQueries("stopCompagins");
            queryClient.invalidateQueries("IsCampaignss");
            queryClient.invalidateQueries("IsCampaigns");
        },
    });

    const stopCompagin = async () => {
        await mutation.mutateAsync(appuserid);
    };

    if (SuperAdmin?.data === appuserid) {

        return (
            <>
                <Row id='CampaignsInterest'>
                    <h2>Start a Campaign</h2>
                    <form onSubmit={formik.handleSubmit} >

                        <div>
                            <label>Compaign Name</label>
                            <Input 
                                placeholder='Compaign Name'
                                type='text'
                                value={formik.values.CompaignName}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">When do you want the discount to start?</label>
                            <Input
                                placeholder="Select Date and Time"
                                size="2md"
                                type="datetime-local"
                                value={selectedDate}
                                onChange={handleDateChange}
                                min={currentDateTime}
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
                                min={currentDateTime}
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

                        <div>
                            <Button type='submit' variant='success' >Start Campaign</Button>
                        </div>
                    </form>
                    {Compn?.data === true &&
                        <div id='StopCompagins'>
                            <Button onClick={stopCompagin} variant='danger' type='submit'>Stop Compagins</Button>
                        </div>
                    }
                </Row>
            </>
        )
    }
}

export default Campaign