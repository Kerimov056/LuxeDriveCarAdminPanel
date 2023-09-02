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
    Col,
    InputGroup
} from "react-bootstrap";
import "./createcar.scss";
import { postCar } from "../../Services/carServices";
import { useHistory } from "react-router-dom";
import { Field, useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";

const CreateCar = () => {
    const navigate = useHistory();
    const queryClient = useQueryClient();

    const HandleGoToCrud = () => {
        navigate("/");
    };

    const mutation = useMutation(postCar, {
        onSuccess: () => {
            navigate("/");
            queryClient.invalidateQueries("newCar");
        },
    });

    // name="name"
    // value={formik.values.name}
    // onChange={formik.handleChange}




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
        setSelectedModel(""); // Marka değiştiğinde model seçimini sıfırla
    };




    const formik = useFormik({
        initialValues: {
            Marka: selectedBrand,
            Model: selectedModel,
            Price: undefined,
            Year: undefined,
            Description: "",
            CarType: "",
            CarCategory: "",
            CarImages: "",
            tags: "",
            // tags: tagField
        },
        onSubmit: async (values) => {
            const formData = new FormData();

            formData.append("CarCategory", values.carCategory)
            formData

            console.log(values)
            try {
                mutation.mutateAsync(formData);
            } catch (error) {
                console.log(error);
            }
        },
    });


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
                                                    <Form.Select id='FS' size='lg' name='Marka' value={selectedBrand} onChange={(event) => {
                                                        formik.handleChange(event);  // Formik tarafından sağlanan handleChange fonksiyonu
                                                        handleBrandChange(event);    // Özel işlev
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
                                                                formik.handleChange(e);  // Formik tarafından sağlanan handleChange fonksiyonu
                                                                setSelectedModel(e.target.value); // Özel işlev
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
                                                        name="CarType"
                                                        values={formik.values.CarType}
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
                                                        name="CarCategory"
                                                        values={formik.values.CarCategory}
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
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text>$</InputGroup.Text>
                                                            <Form.Control
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

                                        <Row>

                                            <Col >
                                                <Form.Group>
                                                    <label>Tags</label>
                                                    <Form.Control
                                                        cols="40"
                                                        as="textarea"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Row>
                                    <Row>
                                        <Col className="pr-" md="6">
                                            <div id='ImgUpload' >
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Car Images</Form.Label>
                                                    <Form.Control type="file" multiple />
                                                </Form.Group>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Description</label>
                                                <Form.Control
                                                    cols="80"
                                                    defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm inthat two seat Lambo."
                                                    placeholder="Here can be your description"
                                                    name="Description"
                                                    value={formik.values.Description}
                                                    onChange={formik.handleChange}
                                                    rows="4"
                                                    as="textarea"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        onClick={formik.handleSubmit}
                                        variant="success"
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