import React from 'react'
import './creservDetail.scss'
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { getByReserv, putReservCancled } from "../../Services/reservationServices";
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import ReservCarCard from 'pages/Car/ReservCarCard';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { SendEmailMessage } from "../../Services/messageEmail";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CReservDetail = () => {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byReserv } = useQuery(["byReserc", id], () =>
        getByReserv(id)
    );


    const notifyCanceld = () => {
        toast.success(`Canceld ${byReserv?.data?.fullName} Reservation!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };
    const notifyCancledError = () => toast.error(`Error ${byReserv?.data?.fullName} Canceld.`);


    const handleCancled = async (reservId) => {
        try {
            await putReservCancled(reservId);
            queryClient.invalidateQueries(["reservcancled", reservId]);
            navigate.push("/ConfirmedReservation");
            notifyCanceld()
        } catch (error) {
            notifyCancledError();
        }
    };

    const formatDate = (inputDate) => {
        const date = moment(inputDate);
        return date.format("DD MMMM YYYY");
    };


    const notifySendMessage = () => {
        toast.success(`Send Gamil message ${byReserv?.data?.fullName} Reservation!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };
    const notifySendMessageError = () => toast.error(`Send Gamil message  ${byReserv?.data?.fullName} Confirem.`);



    const mutation = useMutation(SendEmailMessage, {
        onSuccess: (data) => {
            notifySendMessage();
        },
        onError: (error) => {
            notifySendMessageError()
        },
    });

    const formik = useFormik({
        initialValues: {
            Email: "",
            Message: "",
        },
        onSubmit: async (values) => {
            try {
                await mutation.mutateAsync(values);
                resetForm();
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <>
            <Container>
                <div class="ReservDetailCard">
                    <div className='person'>
                        <div class="SrVesiqe">
                            <img style={{ objectFit: "cover" }} src={`data:image/png;base64,${byReserv?.data?.imagePath}`} />
                        </div>
                        <div style={{top:"22%"}} class="cardDesc shadowDesc">
                            <p>{byReserv?.data?.notes}</p>
                        </div>
                        <div style={{top:"39%"}}  className='reservCarOne'>
                            <ReservCarCard
                                carImages={byReserv?.data?.reservCar?.carImages[0]?.imagePath}
                                marka={byReserv?.data?.reservCar.marka}
                                model={byReserv?.data.reservCar.model}
                                year={byReserv?.data.reservCar.year} />
                        </div>
                        <div className='details'>
                            <div class="login-box" style={{ marginLeft: "35px" }}>

                                <form>
                                    <div class="user-box">
                                        <input type="text" value={byReserv?.data?.fullName} />
                                        <label>Name</label>
                                    </div>
                                    <div class="user-box">
                                        <input type="text" value={formatDate(byReserv?.data?.pickupDate)} />
                                        <label>Picakup Date</label>
                                    </div>
                                    <div class="user-box">
                                        <input type="text" value={formatDate(byReserv?.data?.returnDate)} />
                                        <label>Return Date</label>
                                    </div>
                                    <div class="user-box">
                                        <input type="text" value={byReserv?.data?.email} />
                                        <label>Email</label>
                                    </div>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>+</InputGroup.Text>
                                        <InputGroup.Text>994</InputGroup.Text>
                                        <Form.Control value={byReserv?.data?.number} />
                                    </InputGroup>

                                    <center>
                                        <a href="#" onClick={() => handleCancled(byReserv?.data?.id)}>
                                            Cancled
                                            <span></span>
                                        </a>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Link to="/ConfirmedReservation"><Button id='GoToBack'>Go To Back</Button></Link>
                </div>
            </Container>

            <Container>
                <div id='UserEmailMessageSend'>
                    <form onSubmit={formik.handleSubmit} class="formUserEmailMessageSend">
                        <div class="title">Contact us</div>
                        <p>Send an email message to the person making the reservation</p>
                        <input type="email" disabled value={formik.values.Email = byReserv?.data?.email} onChange={formik.handleChange} placeholder="Your email" class="input" />
                        <textarea name='Message' value={formik.values.Message} onChange={formik.handleChange} placeholder="Your message"></textarea>
                        <button style={{ width: "150px", backgroundColor: "#0fb81a" }} type="submit">Send</button>
                    </form>
                </div>
                <Link to="/ConfirmedReservation"><Button id='GoToBack'>Go To Back</Button></Link>

            </Container>
        </>
    )
}

export default CReservDetail