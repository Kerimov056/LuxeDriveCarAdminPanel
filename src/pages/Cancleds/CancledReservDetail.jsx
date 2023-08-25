import React from 'react'
import './cancledReservD.scss'
import { useQuery, useQueryClient } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { getByReserv, putReservCancled } from "../../Services/reservationServices";
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import CarCard from 'pages/Car/CarCard';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const CancledReservDetail = () => {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byReserv } = useQuery(["byReserc", id], () =>
        getByReserv(id)
    );

    const handleCancled = async (reservId) => {
        try {
            await putReservCancled(reservId);
            queryClient.invalidateQueries(["reservcancled", reservId]);
            navigate.push("/ConfirmedReservation");
        } catch (error) {
            console.error("Error confirming reservation:", error);
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
                            <img src='https://cdn4.buysellads.net/uu/1/138663/1691614506-Considerations_for_a_Highly_Available_260x200.jpg' />
                        </div>
                        <div class="cardDesc shadowDesc">
                            <p>{byReserv?.data?.notes}</p>
                        </div>
                        <div className='reservCarOne'>
                            <CarCard marka={byReserv?.data?.reservCar.marka} model={byReserv?.data.reservCar.model} year={byReserv?.data.reservCar.year} />
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

                                    {/* <center>
                                        <a href="#" onClick={() => handleCancled(byReserv?.data?.id)}>
                                            Cancled
                                            <span></span>
                                        </a>
                                    </center> */}
                                </form>
                            </div>
                        </div>
                    </div>
                  <Link to="/CancledReservations"><Button id='GoToBack'>Go To Back</Button></Link> 
                </div>
            </Container>
        </>
    )
}

export default CancledReservDetail