import React from 'react'
import { Container, Row } from 'react-bootstrap'
import "./chaufcreate.scss";


const ChaufCreate = () => {
    return (
        <>
            <Container>
                <Row>
                    <div class="containerCheuf">
                        <div class="cardCheufff">
                            <a class="singupCheuf">Chauffeurs Create</a>
                            <div class="inputBox1">
                                <input type="email" required="required" />
                                    <span class="user">Email</span>
                            </div>

                            <div class="inputBox">
                                <input type="text" required="required" />
                                    <span>Username</span>
                            </div>

                            <div class="inputBox">
                                <input type="password" required="required" />
                                    <span>Password</span>
                            </div>

                            <button class="enter">Create</button>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default ChaufCreate