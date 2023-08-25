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

const CreateCar = () => {

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

    const [imageFields, setImageFields] = useState([{ id: 1, files: [] }]);

    const addImageField = () => {
        const newId = imageFields[imageFields.length - 1].id + 1;
        setImageFields([...imageFields, { id: newId, files: [] }]);
    };

    const removeImageField = (id) => {
        const updatedFields = imageFields.filter((field) => field.id !== id);
        setImageFields(updatedFields);
    };

    const handleFileChange = (event, id) => {
        const updatedFields = imageFields.map((field) => {
            if (field.id === id) {
                return { ...field, files: event.target.files };
            }
            return field;
        });
        setImageFields(updatedFields);
    };

    const handleUpload = async () => {
        imageFields.forEach(async (field) => {
            const formData = new FormData();
            field.files.forEach((file) => {
                formData.append('images', file);
            });

            try {
                const response = await axios.post('/api/upload', formData);
                console.log(`Uploaded images for field ${field.id}:`, response.data);
            } catch (error) {
                console.error(`Error uploading images for field ${field.id}:`, error);
            }
        });
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


                                                    <label>Year:</label>
                                                    <Form.Select id='FS' size='lg' >
                                                        <option size="lg" value="">Marka Seçiniz</option>
                                                        {carYear.map((year, index) => (
                                                            <option id="asd" key={index} value={year.year}>
                                                                {year.year}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                    <label>Type:</label>
                                                    <Form.Select id='FS' size='lg' >
                                                        <option size="lg" value="">Marka Seçiniz</option>
                                                        {carType.map((type, index) => (
                                                            <option id="asd" key={index} value={type.type}>
                                                                {type.type}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                    <label>Category:</label>
                                                    <Form.Select id='FS' size='lg'>
                                                        <option size="lg" value="">Marka Seçiniz</option>
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
                                                            <Form.Control aria-label="Amount (to the nearest dollar)" />
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
                                            {imageFields.map((field) => (
                                                <div id='ImgUpload' key={field.id}>
                                                    <Form.Group style={field.id==1 ? {marginLeft:"-70px"} : {}} controlId={`formFileMultiple_${field.id}`} className="mb-3">
                                                        <Form.Label>Car Images</Form.Label>
                                                        <Form.Control type="file" multiple onChange={(event) => handleFileChange(event, field.id)} />
                                                    </Form.Group>
                                                    {field.id > 1 &&
                                                        <Button onClick={() => removeImageField(field.id)}>-</Button>
                                                    }
                                                </div>
                                            ))}
                                            <Button onClick={addImageField}>+</Button>
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
                                                    rows="4"
                                                    as="textarea"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
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