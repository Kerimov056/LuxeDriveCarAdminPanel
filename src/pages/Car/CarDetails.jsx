import React, { useState, useEffect } from 'react'
import {
    Button, Container, Badge,
    Card,
    Form,
    Navbar,
    Nav,
    Row,
    Col,
    InputGroup
} from 'react-bootstrap'
import { useQuery, useQueryClient } from "react-query";
import { getByCar, removeCar } from "../../Services/carServices";
import { useParams, useHistory } from "react-router-dom";
import "./cardetails.scss";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useFormik } from "formik";

const CarDetails = () => {

    const[CarEdit, setCarEdit] = useState(false)

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byCar } = useQuery(["getByCar", id], () =>
        getByCar(id)
    );

    const sport = "SPORT";
    const Premium = "Premium";
    const Luxury = "Lux";
    const Business = "Business";

    const [imgUrl, setImgUrl] = useState('');

    useEffect(() => {
        if (byCar?.data?.carCategory?.category.toUpperCase() === sport.toUpperCase()) {
            setImgUrl("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-9.png");
        } else if (byCar?.data?.carCategory?.category.toUpperCase() === Premium.toUpperCase()) {
            setImgUrl("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-10.png");
        } else if (byCar?.data?.carCategory?.category.toUpperCase() === Luxury.toUpperCase()) {
            setImgUrl("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/Vihecle-single-corner-img-.png");
        } else if (byCar?.data?.carCategory?.category.toUpperCase() === Business.toUpperCase()) {
            setImgUrl("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-12.png");
        } else {
            setImgUrl('');
        }
    }, [byCar?.data?.carCategory?.category]);


    const handleRemove = async (carId) => {
        try {
            await removeCar(carId);
            queryClient.invalidateQueries(["carRemove", carId]);
            queryClient.invalidateQueries(["Allcars"]);
            navigate.push(`/AllCar`);
        } catch (error) {
            console.error("Error confirming car:", error);
        }
    };


    //-------------------------------------------------------
    //-------------------------------------------------------

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


    const [imageFields, setImageFields] = useState([{ files: [] }]);//byCar?.data?.carImages

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
            tags: byCar?.data?.carTags
        },
        onSubmit: async (values) => {
            try {
                mutation.mutateAsync(values);
            } catch (error) {
                console.log(error);
            }
        },
    });


    return (
        <>
            <Container>
                <div className='MainCarImg'>
                    <img src='https://etimg.etb2bimg.com/photo/92392007.cms' />
                </div>
                <div className='details'>
                    <div>
                        <div className='categoryCarImage'>
                            <img src={imgUrl} />
                        </div>
                        <div className='CarDetailsIMs'>
                            <div class="cardDetailsAdmin">
                                <div class="wrapperRRR">
                                    <div class="color black">
                                        Marka
                                        <span class="hex">{byCar?.data?.marka}</span>
                                    </div>
                                    <div class="color eerie-black">
                                        Model
                                        <span class="hex">{byCar?.data?.model}</span>
                                    </div>
                                    <div class="color chinese-black">
                                        Year
                                        <span class="hex">{byCar?.data?.year}</span>
                                    </div>
                                    <div class="color night-rider">
                                        Price
                                        <span class="hex">{byCar?.data?.price}</span>
                                    </div>
                                    <div class="color chinese-white">
                                        Type
                                        <span class="hex">{byCar?.data?.carType?.type}</span>
                                    </div>
                                    <div class="color anti-flash-white">
                                        Category
                                        <span class="hex">{byCar?.data?.carCategory?.category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='carDetails'>
                    <span>Description</span><br />
                    {byCar?.data?.description}
                </div>
                <div className='asdbbb'>
                    <Button onClick={() => setCarEdit(!CarEdit)} variant="success">Edit</Button>
                    <Button onClick={() => handleRemove(byCar?.data?.id)} variant="danger">Remove</Button>
                    <Button><Link to='/AllCar'>Go To Back</Link></Button>
                </div>


               {CarEdit==true ?  <div id='carEdit'>
                    <Row>
                        <Col md="8">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Car Edit</Card.Title>
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
                                                            <option size="lg" value="">{byCar?.data?.marka}</option>
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
                                                                    <option value="">{byCar?.data?.model}</option>
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
                                                            <option size="lg" value="">{byCar?.data?.year}</option>
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
                                                            <option size="lg" value="">{byCar?.data?.carType?.type}</option>
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
                                                            <option size="lg" value="">{byCar?.data?.carCategory?.category}</option>
                                                            {carCategory.map((Category, index) => (
                                                                <option id="asd" key={index} value={Category.Category}>
                                                                    {Category.Category}
                                                                </option>
                                                            ))}
                                                        </Form.Select>


                                                        <Form.Group>
                                                            <label style={{ fontSize: "18px", marginTop: "15px" }}>Price</label>
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text>$</InputGroup.Text>
                                                                <Form.Control
                                                                    style={{ width: "300px" }}
                                                                    name='Price'
                                                                    placeholder={byCar?.data?.price}
                                                                    value={formik.values.Price}
                                                                    onChange={formik.handleChange} />
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
                                                        <Form.Group style={index === 0 ? { marginLeft: "0px" } : {}} controlId={`formFileMultiple_${index}`} className="mb-3">
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


                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <Form.Group>
                                                    <label>Description</label>
                                                    <Form.Control
                                                        cols="80"
                                                        defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm inthat two seat Lambo."
                                                        placeholder={byCar?.data?.description}
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
                                            style={{ width: "200px", marginTop: "20px" }}
                                            className="btn-fill pull-right"
                                            type="submit"
                                            onClick={formik.handleSubmit}
                                            variant="primary"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            style={{ width: "200px", marginTop: "20px",marginLeft:"20px" }}
                                            type="submit"
                                            variant="primary"
                                            onClick={() => setCarEdit(false)}
                                            >   
                                            Details
                                        </Button>
                                        <div className="clearfix"></div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div> : <div></div>}
            </Container>
        </>
    )
}

export default CarDetails