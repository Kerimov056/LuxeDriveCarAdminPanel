import React from 'react'
import { Container, Row } from 'react-bootstrap'
import "./chaufcreate.scss";


const ChaufCreate = () => {
    return (
        <>
            <Container>
                <Row>
                    <div class="containerCheuf">
                        <form>
                            <div class="cardCheufff">
                                <a style={{ fontSize: "23px" }} class="singupCheuf">Chauffeurs Create</a>
                                <div class="inputBox1">
                                    <input type="text" required="required" />
                                    <span class="user">Fullname</span>
                                </div>


                                <div class="inputBox">
                                    <input type="file" required="required" />
                                    <span>Profile Image</span>
                                </div>

                                <div class="inputBox">
                                    <input type="text" required="required" />
                                    <span>Telefon</span>
                                </div>

                                <div class="inputBox">
                                    <input type="number" required="required" />
                                    <span>Price</span>
                                </div>

                                <button class="enter">Create</button>
                            </div>
                        </form>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default ChaufCreate