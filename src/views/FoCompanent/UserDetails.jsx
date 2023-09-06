import React from 'react'
import "./userdetails.scss";
import { Container } from 'react-bootstrap';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { byUser } from "../../Services/authServices";



const UserDetails = () => {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: ByUser } = useQuery(["getByUser", id], () =>
        byUser(id)
    );

    return (
        <>
            <Container style={{ backgroundColor: "black" }}>
                <div id='UserDetailss'>
                    <div className='UserCard'>
                        <div class="wrappeasdasr">
                            <div class="profile">
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
                                        <p class="desc">Full Name</p>
                                    </div>
                                    <div class="wrapperSS">
                                        <div class="color black">
                                            Email
                                            <span class="hex">#000000</span>
                                        </div>
                                        <div class="color eerie-black">
                                            Number
                                            <span class="hex">#1b1b1b</span>
                                        </div>
                                        <div class="color chinese-black">
                                            date of birth
                                            <span class="hex">#141414</span>
                                        </div>
                                        <div class="color night-rider">
                                            Full Name
                                            <span class="hex">#2e2e2e</span>
                                        </div>
                                        <div class="color chinese-white">
                                            Reservatiom Count
                                            <span class="hex">#e1e1e1</span>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </Container>
        </>
    )
}

export default UserDetails