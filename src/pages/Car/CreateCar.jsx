import React, { useState } from 'react'
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col
} from "react-bootstrap";
import "./createcar.scss";

const CreateCar = () => {

    const carData = [
        {
            brand: "BMW",
            models: ["M5", "M4", "M3"]
        },
        {
            brand: "Mercedes",
            models: ["S500", "S600", "S450"]
        },
        // Diğer markalar ve modeller
    ];

    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const handleBrandChange = (event) => {
        const brand = event.target.value;
        setSelectedBrand(brand);
        setSelectedModel(""); // Marka değiştiğinde model seçimini sıfırla
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Create Car</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>


                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <div className='MM'>
                                                    <label>Marka:</label>
                                                    <Form.Select id='FS' size='lg' value={selectedBrand} onChange={handleBrandChange}>
                                                        <option size="lg" value="">Marka Seçiniz</option>
                                                        {carData.map((car, index) => (
                                                            <option id="asd" key={index} value={car.brand}>
                                                                {car.brand}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                    {selectedBrand && (
                                                        <div className='MM'>
                                                            <label>Model:</label>
                                                            <Form.Select id='FS' value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                                                                <option value="">Model Seçiniz</option>
                                                                {carData.find((car) => car.brand === selectedBrand).models.map((model, index) => (
                                                                    <option id="asd" key={index} value={model}>
                                                                        {model}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                        </div>
                                                    )}
                                                </div>
                                            </Form.Group>
                                        </Col>




                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <label>Company (disabled)</label>
                                                <Form.Control
                                                    defaultValue="Creative Code Inc."
                                                    disabled
                                                    placeholder="Company"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="3">
                                            <Form.Group>
                                                <label>Username</label>
                                                <Form.Control
                                                    defaultValue="michael23"
                                                    placeholder="Username"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Email address
                                                </label>
                                                <Form.Control
                                                    placeholder="Email"
                                                    type="email"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>First Name</label>
                                                <Form.Control
                                                    defaultValue="Mike"
                                                    placeholder="Company"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Last Name</label>
                                                <Form.Control
                                                    defaultValue="Andrew"
                                                    placeholder="Last Name"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Address</label>
                                                <Form.Control
                                                    defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                    placeholder="Home Address"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <Form.Group>
                                                <label>City</label>
                                                <Form.Control
                                                    defaultValue="Mike"
                                                    placeholder="City"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <Form.Group>
                                                <label>Country</label>
                                                <Form.Control
                                                    defaultValue="Andrew"
                                                    placeholder="Country"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <Form.Group>
                                                <label>Postal Code</label>
                                                <Form.Control
                                                    placeholder="ZIP Code"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>About Me</label>
                                                <Form.Control
                                                    cols="80"
                                                    defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
                                                    placeholder="Here can be your description"
                                                    rows="4"
                                                    as="textarea"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        variant="info"
                                    >
                                        Update Profile
                                    </Button>
                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CreateCar