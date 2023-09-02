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


    const [imageFields, setImageFields] = useState([{ files: [] }]);

    const addImageField = () => {
        setImageFields([...imageFields, { files: [] }]);
    };

    const removeImageField = (index) => {
        const updatedFields = imageFields.filter((field, i) => i !== index);
        setImageFields(updatedFields);
    };

    const handleFileChange = (event, index) => {
        const updatedFields = [...imageFields];
        updatedFields[index] = { ...updatedFields[index], files: event.target.files };
        setImageFields(updatedFields);
    };

    const [tagFields, setTagFields] = useState([{ value: '' }]);

    const addTagField = () => {
        setTagFields([...tagFields, { value: '' }]);
    };

    const removeTagField = (index) => {
        const updatedFields = tagFields.filter((_, i) => i !== index);
        setTagFields(updatedFields);
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
            CarImages: imageFields.map((field) => ({ files: field.files })),
             tags: tagFields.filter((field) => !field.id).map((field) => ({ value: field?.value })),
            // tags: tagFields
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

    // console.log(selectedModel, selectedBrand);
    // console.log(imageFields.map((field) => ({ files: field.files })));
    // console.log(tagFields);

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


                                        <Col className="px-1" md="3">

                                        </Col>

                                    </Row>
                                    <Row>

                                        <Col className="pr-" md="6">
                                            {imageFields.map((field, index) => (
                                                <div id='ImgUpload' key={index}>
                                                    <Form.Group style={index === 0 ? { marginLeft: "-70px" } : {}} controlId={`formFileMultiple_${index}`} className="mb-3">
                                                        <Form.Label>Car Images</Form.Label>
                                                        <Form.Control type="file" multiple onChange={(event) => handleFileChange(event, index)} />
                                                    </Form.Group>
                                                    {index > 0 &&
                                                        <Button onClick={() => removeImageField(index)}>-</Button>
                                                    }
                                                </div>
                                            ))}
                                            <Button onClick={addImageField}>+</Button>
                                        </Col>

                                        <Col className="pr-" md="6">
                                            {tagFields.map((field, index) => (
                                                <div id="ImgUpload" key={index}>
                                                    <Form.Group>
                                                        <label style={index === 0 ? { marginLeft: "-70px" } : {}}>Tag</label>
                                                        <InputGroup style={index === 0 ? { marginLeft: "-70px" } : {}} controlId={`formFileMultiple_${index}`} className="mb-3">
                                                            <InputGroup.Text>#</InputGroup.Text>
                                                            <Form.Control
                                                                aria-label="Tag input"
                                                                name={`tags[${index}].value`}
                                                                value={formik.values.tags[index]?.value || ''}  // formik.values.tags dizisinin ilgili indeksi
                                                                onChange={formik.handleChange}
                                                            />
                                                        </InputGroup>
                                                    </Form.Group>
                                                    {index > 0 &&
                                                        <Button onClick={() => removeTagField(index)}>-</Button>
                                                    }
                                                </div>
                                            ))}
                                            <Button onClick={addTagField}>+</Button>
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