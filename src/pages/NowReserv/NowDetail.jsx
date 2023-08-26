import React from 'react'
import './nowDetails.scss'
import { useQuery, useQueryClient } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { getReservNow } from "../../Services/reservationServices";
import { Button, Container, Form, InputGroup, Row } from 'react-bootstrap';
import CarCard from 'pages/Car/CarCard';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const NowDetail = () => {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byNow } = useQuery(["byNow", id], () =>
        getReservNow(id)
    );

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
                            <img src='https://cdn4.buysellads.net/uu/1/138663/1691614506-Considerations_for_a_Highly_Available_260x200.jpg' />
                        </div>
                        <div class="cardDesc shadowDesc">
                            <p>{byNow?.data?.notes}</p>
                        </div>
                        <div className='reservCarOne'>
                            <CarCard marka={byNow?.data?.reservCar.marka} model={byNow?.data.reservCar.model} year={byNow?.data.reservCar.year} />
                        </div>
                        <div className='details'>
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
                                        <input type="text" value={formatDate(byNow?.data?.pickupDate)} />
                                        <label>Picakup Date</label>
                                    </div>
                                    <div class="user-box">
                                        <input type="text" value={formatDate(byNow?.data?.returnDate)} />
                                        <label>Return Date</label>
                                    </div>
                                    <div class="user-box">
                                        <input type="text" value={byNow?.data?.email} />
                                        <label>Email</label>
                                    </div>
                                    <div style={byNow?.data?.pickupLocation == null ? { display: "none" } : {}} class="user-box">
                                        <input type="text" value={byNow?.data?.pickupLocation == null ? "" : byNow?.data?.pickupLocation} />
                                        <label>Pickup Location</label>
                                    </div>
                                    <div style={byReserv?.data.returnLocation == null ? { display: "none" } : {}} class="user-box">
                                        <input type="text" value={byNow?.data?.returnLocation == null ? "" : byNow?.data?.returnLocation} />
                                        <label>Return Location</label>
                                    </div>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>+</InputGroup.Text>
                                        <InputGroup.Text>994</InputGroup.Text>
                                        <Form.Control value={byNow?.data?.number} />
                                    </InputGroup>

                                    {/* <center>
                                        <a id='rdC' href="#" onClick={() => handleConfirm(byReserv?.data?.id)}>
                                            Conform
                                            <span></span>
                                        </a>
                                    </center> */}
                                </form>
                            </div>
                        </div>
                    </div>
                    <Link to="/NotificationsReservation"><Button id='GoToBack'>Go To Back</Button></Link>
                </div>
            </Container>
        </>
    )
}

export default NowDetail