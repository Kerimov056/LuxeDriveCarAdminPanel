import React from 'react'
import './reservDetail.scss'
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { getByReserv, putReservConfirmed } from "../../Services/reservationServices";
import { useFormik } from "formik";
import { Button, Container, Form, InputGroup, Row } from 'react-bootstrap';
import ReservCarCard from 'pages/Car/ReservCarCard';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { SendEmailMessage } from "../../Services/messageEmail";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ReservDetail = () => {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byReserv } = useQuery(["byReserc", id], () =>
        getByReserv(id)
    );

    const handleConfirm = async (reservId) => {
        try {
            await putReservConfirmed(reservId);
            queryClient.invalidateQueries(["reservConform", reservId]);
            navigate.push("/NotificationsReservation");
        } catch (error) {
            console.error("Error confirming reservation:", error);
        }
    };

    const formatDate = (inputDate) => {
        const date = moment(inputDate);
        return date.format("DD MMMM YYYY");
    };

    const mutation = useMutation(SendEmailMessage, {
        onSuccess: (data) => {
            toast.success('Message sent to Email', { position: toast.POSITION.TOP_RIGHT });

            // queryClient.invalidateQueries("postAdvatage");
        },
        onError: (error) => {
            console.log("Error:", error);
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
                <div style={{ backgroundColor: "black" }} class="ReservDetailCard">
                    <div className='person'>
                        <div class="SrVesiqe">
                            <img style={{objectFit:"cover"}} src={`data:image/png;base64,${byReserv?.data?.imagePath}`} />
                        </div>
                        <div class="cardDesc shadowDesc">
                            <p>{byReserv?.data?.notes}</p>
                        </div>
                        <div className='reservCarOne'>
                            <ReservCarCard carImages={byReserv?.data?.reservCar?.carImages[0]?.imagePath} marka={byReserv?.data?.reservCar.marka} model={byReserv?.data.reservCar.model} year={byReserv?.data.reservCar.year} />
                        </div>
                        <div style={{ backgroundColor: "black" }} className='details'>
                            <div class="login-box">

                                <form>
                                    <div class="user-box">
                                        <input type="text" value={"Ulvi"} />
                                        <label>Name</label>
                                    </div>
                                    <div class="user-box">
                                        <input type="text" value={"Kerimov"} />
                                        <label>Surname</label>
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
                                    <div style={byReserv?.data?.pickupLocation == null ? { display: "none" } : {}} class="user-box">
                                        <input type="text" value={byReserv?.data?.pickupLocation == null ? "" : byReserv?.data?.pickupLocation} />
                                        <label>Pickup Location</label>
                                    </div>
                                    <div style={byReserv?.data.returnLocation == null ? { display: "none" } : {}} class="user-box">
                                        <input type="text" value={byReserv?.data?.returnLocation == null ? "" : byReserv?.data?.returnLocation} />
                                        <label>Return Location</label>
                                    </div>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>+</InputGroup.Text>
                                        <InputGroup.Text>994</InputGroup.Text>
                                        <Form.Control value={byReserv?.data?.number} />
                                    </InputGroup>

                                    <center>
                                        <a id='rdC' href="#" onClick={() => handleConfirm(byReserv?.data?.id)}>
                                            Conform
                                            <span></span>
                                        </a>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container>
                <div id='UserEmailMessageSend'>
                    <form onSubmit={formik.handleSubmit} class="formUserEmailMessageSend">
                        <div class="title">Contact us</div>
                        <p>Send an email message to the person making the reservation</p>
                        <input type="email" disabled value={ formik.values.Email=byReserv?.data?.email} onChange={formik.handleChange} placeholder="Your email" class="input" />
                        <textarea name='Message' value={formik.values.Message} onChange={formik.handleChange} placeholder="Your message"></textarea>
                        <button style={{width:"150px",backgroundColor:"#0fb81a"}} type="submit">Send</button>
                    </form>
                </div>
                <Link to="/NotificationsReservation"><Button id='GoToBack'>Go To Back</Button></Link>

            </Container>

        </>
    )
}

export default ReservDetail