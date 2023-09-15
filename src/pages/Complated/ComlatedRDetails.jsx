import React from 'react'
import '../Cancleds/cancledReservD.scss'
import { useQuery, useQueryClient } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { getByReserv, putReservRemove } from "../../Services/reservationServices";
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import ReservCarCard from 'pages/Car/ReservCarCard';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ComlatedRDetails = () => {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byReserv } = useQuery(["byReserc", id], () =>
        getByReserv(id)
    );

    //Remove
    const notifyRemove = () => {
        toast.success(`Remove ${byReserv?.data?.fullName} Reservation!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };
    const notifyRemoveError = () => toast.error(`Error Remove ${byReserv?.data?.fullName} Reservation.`);


    const handleRemove = async (reservId) => {
        try {
            await putReservRemove(reservId);
            queryClient.invalidateQueries(["reservcomplated", reservId]);
            navigate.push("/ComplatedReservation");
            notifyRemove();
        } catch (error) {
            notifyRemoveError();
        }
    };

    const formatDate = (inputDate) => {
        const date = moment(inputDate);
        return date.format("DD MMMM YYYY");
    };


    return (
        <>
            <Container>
                <div class="ReservDetailCard">
                    <div className='person'>
                        <div class="SrVesiqe">
                            <img style={{ objectFit: "cover" }} src={`data:image/png;base64,${byReserv?.data?.imagePath}`} />
                        </div>
                        <div class="cardDesc shadowDesc">
                            <p>{byReserv?.data?.notes}</p>
                        </div>
                        <div className='reservCarOne'>
                            <ReservCarCard carImages={byReserv?.data?.reservCar?.carImages[0]?.imagePath} marka={byReserv?.data?.reservCar.marka} model={byReserv?.data.reservCar.model} year={byReserv?.data.reservCar.year} />
                        </div>
                        <div className='details'>
                            <div class="login-box" style={{ marginLeft: "30px" }}>
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
                                        <a href="#" onClick={() => handleRemove(byReserv?.data?.id)}>
                                            Remove
                                            <span></span>
                                        </a>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Link to="/ComplatedReservation"><Button id='GoToBack'>Go To Back</Button></Link>
                </div>
            </Container>
        </>
    )
}

export default ComlatedRDetails