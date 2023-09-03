import React, { useState } from 'react'
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
    InputGroup
} from "react-bootstrap";
import "./createcar.scss";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import axios from 'axios';


const CreateCar = () => {
    const navigate = useHistory();
    const queryClient = useQueryClient();

    const carCategory = [
        {
            Category: "Sport"
        },
        {
            Category: "Lux"
        }
    ];


    const carType = [
        {
            type: "Sedan"
        },
        {
            type: "Furqon"
        }
    ];

    const carYear = [
        {
            year: 2023
        },
        {
            year: 2022
        }
    ];

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
        setSelectedModel("");
    };


    const formik = useFormik({
        initialValues: {
            Marka: selectedBrand,
            Model: selectedModel,
            Price: undefined,
            Year: undefined,
            Description: "",
            CarType: { type: '' },
            CarCategory: { Category: '' },
            CarImages: [],
            tags: "",
        },
        onSubmit: async (values) => {
            const formData = new FormData();

            formData.append("Marka", values.Marka);
            formData.append("Model", values.Model);
            formData.append("Price", values.Price);
            formData.append("Year", values.Year);
            formData.append("Description", values.Description);
            formData.append("CarType.type", values.CarType.type);
            formData.append("CarCategory.Category", values.CarCategory.Category);
            formData.append("tags", values.tags);

            for (let i = 0; i < values.CarImages.length; i++) {
                formData.append('CarImages', values.CarImages[i]);
            }

            try {
                const response = await axios.post('https://localhost:7152/api/Car/postCar', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 201) {
                    queryClient.invalidateQueries('newCar');
                    navigate.push('/AllCar');
                }
            } catch (error) {
                console.log(error);
            }
        },
    });


    return (
        <>
            <Container fluid>
                <Row style={{ marginLeft: "400px" }}>
                    <Col md="8">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Create Car</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>
                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <div className='MM'>
                                                    <label>Marka:</label>
                                                    <Form.Select id='FS' size='lg' name='Marka' value={selectedBrand} onChange={(event) => {
                                                        formik.handleChange(event);
                                                        handleBrandChange(event);
                                                    }}>
                                                        <option size="lg" value="">Marka option</option>
                                                        {carData.map((car, index) => (
                                                            <option id="asd" key={index} value={car.brand}>
                                                                {car.brand}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                    {selectedBrand && (
                                                        <div className='MM'>
                                                            <label>Model:</label>
                                                            <Form.Select id='FS' name='Model' value={selectedModel} onChange={(e) => {
                                                                formik.handleChange(e);
                                                                setSelectedModel(e.target.value);
                                                            }}>
                                                                <option value="">Model option</option>
                                                                {carData.find((car) => car.brand === selectedBrand).models.map((model, index) => (
                                                                    <option id="asd" key={index} value={model}>
                                                                        {model}
                                                                    </option>
                                                                ))}
                                                            </Form.Select>
                                                        </div>
                                                    )}


                                                    <label>Year:</label>
                                                    <Form.Select
                                                        name="Year"
                                                        values={formik.values.Year}
                                                        onChange={formik.handleChange}
                                                        id='FS' size='lg' >
                                                        <option size="lg" value="">Year option</option>
                                                        {carYear.map((year, index) => (
                                                            <option id="asd" key={index} value={year.year}>
                                                                {year.year}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                    <label>Type:</label>
                                                    <Form.Select
                                                        name="CarType.type"
                                                        values={formik.values.CarType.type}
                                                        onChange={formik.handleChange}
                                                        id='FS' size='lg' >
                                                        <option size="lg" value="">Type option</option>
                                                        {carType.map((type, index) => (
                                                            <option id="asd" key={index} value={type.type}>
                                                                {type.type}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                    <label>Category:</label>
                                                    <Form.Select
                                                        name="CarCategory.Category"
                                                        values={formik.values.CarCategory.Category}
                                                        onChange={formik.handleChange}
                                                        id='FS' size='lg'>
                                                        <option size="lg" value="">Category option</option>
                                                        {carCategory.map((Category, index) => (
                                                            <option id="asd" key={index} value={Category.Category}>
                                                                {Category.Category}
                                                            </option>
                                                        ))}
                                                    </Form.Select>


                                                    <Form.Group>
                                                        <label>Price</label>
                                                        <InputGroup className="mb-2">
                                                            <InputGroup.Text>$</InputGroup.Text>
                                                            <Form.Control
                                                                type='number'
                                                                name='Price'
                                                                value={formik.values.Price}
                                                                onChange={formik.handleChange}
                                                                aria-label="Amount (to the nearest dollar)" />
                                                            <InputGroup.Text>.00</InputGroup.Text>
                                                        </InputGroup>
                                                    </Form.Group>

                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-" md="6">
                                            <div id='ImgUpload' >
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='InputCreateCarimage'>Car Images</Form.Label>
                                                    <input
                                                        className='InputCreateCarimage ll'
                                                        name='CarImages'
                                                        type="file"
                                                        multiple
                                                        onChange={(e) =>
                                                            formik.setFieldValue('CarImages', e.target.files)} />
                                                </Form.Group>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div class="inputBox1">
                                        <Form.Label>Car tag</Form.Label>
                                        <input className='CarCreateTag' name='tags' value={formik.values.tags} onChange={formik.handleChange} type="text" required="required" />
                                    </div>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Description</label>
                                                <Form.Control
                                                    className='CarCreateDesc'
                                                    cols="90"
                                                    defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm inthat two seat Lambo."
                                                    placeholder="Here can be your description"
                                                    name="Description"
                                                    value={formik.values.Description}
                                                    onChange={formik.handleChange}
                                                    rows="4"
                                                    as="textarea"
                                                    style={{ width: "730px" }}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        variant="success"
                                        style={{ width: "150px" }}
                                    >
                                        Create Car
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