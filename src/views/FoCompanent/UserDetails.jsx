import React, { useState, useEffect } from 'react';
import "./userdetails.scss";
import { Container } from 'react-bootstrap';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { byUser } from "../../Services/authServices";
import { getUserReservation } from "../../Services/reservationServices";
import ResrervationCard from './ResrervationCard';



const UserDetails = () => {

    const { id } = useParams();

    const { data: ByUser } = useQuery(["getByUser", id], () =>
        byUser(id)
    );

    const { data: ByUserReservs } = useQuery(["getByUserReservations", ByUser?.data?.id], () =>
        getUserReservation(ByUser?.data?.id)
    );

    const [reservationCount, setReservationCount] = useState(0);

    useEffect(() => {
        if (ByUserReservs?.data) {
            setReservationCount(ByUserReservs.data.length);
        }
    }, [ByUserReservs?.data]);

    return (
        <>
            <Container style={{ backgroundColor: "black" }}>
                <div id='UserDetailss'>
                    <div className='UserCard'>
                        <div class="wrappeasdasr">
                        <div style={{backgroundImage: `url(${ByUser?.data?.imagePath !== null ? `data:image/png;base64,${ByUser?.data?.imagePath}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDgYH1ojUccuNjEZoqcHCZNqRaN3rW9pl9vQ&usqp=CAU"})`}} class="profile">
                                <div class="overlay">
                                    <div class="about d-flex flex-column">
                                        <h4 style={{ color: "white" }}>{ByUser?.data?.userName}</h4> <span>Software Developer</span>
                                    </div>
                                    <ul class="social-icons">
                                        <li><i class="fa fa-facebook"></i></li>
                                        <li><i class="fa fa-linkedin"></i></li>
                                        <li><i class="fa fa-twitter"></i></li>
                                        <li><i class="fa fa-instagram"></i></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='UserInfo'>
                            <Container>
                                <div class="cardUserDeatils">
                                    <div class="title">
                                        <p class="heading">{ByUser?.data?.userName}</p>
                                        <p class="desc">{ByUser?.data?.fullName}</p>
                                    </div>
                                    <div class="wrapperSS">
                                        <div class="color black">
                                            Email
                                            <span class="hex">{ByUser?.data?.email}</span>
                                        </div>
                                        <div class="color eerie-black">
                                            Number
                                            <span class="hex">{ByUser?.data?.phoneNumber ? ByUser?.data?.phoneNumber : "xxxxxxxxxxx"} </span>
                                        </div>
                                        <div class="color chinese-black">
                                            date of birth
                                            <span class="hex">{ByUser?.data?.birthDate}</span>
                                        </div>
                                        <div class="color night-rider">
                                            Full Name
                                            <span class="hex">{ByUser?.data?.fullName}</span>
                                        </div>
                                        <div class="color chinese-white">
                                            Reservatiom Count
                                            <span class="hex">{reservationCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                    <h1>Car Reservations</h1>
                    <div id='ByUserCarReservation'>
                        <hr />
                        <div style={{ marginTop: "90px" }}>
                            {ByUserReservs?.data?.map((reserv, index) => (
                                <ResrervationCard key={index} CarId={reserv?.reservCar?.id} PickUpDate={reserv?.pickupDate} marka={reserv?.reservCar?.marka} model={reserv?.reservCar?.model} price={reserv?.reservCar?.price} />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default UserDetails