import React, { useState, useEffect, useRef } from 'react'
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
import { useLocation, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import axios from 'axios';
import { carCategory, carType, carYear, carData } from "../../components/Export/Export";
//---LeafLet
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import carCreateSchema from "../../Validators/carCreateSchema";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const markerIcon = new L.Icon({
    iconUrl: require("./download.png"),
    iconSize: [45, 35],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});





const CreateCar = () => {
    const navigate = useHistory();
    const queryClient = useQueryClient();

    //---------leaflet

    const [center, setCenter] = useState({ lat: 40.4093, lng: 49.8671 });
    const mapRef = useRef();

    const [userLocation, setUserLocation] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setUserLocation(userLocation)
    }, [useLocation]);

    const openModalL = () => {
        setShowModal(true);
    };

    const closeModalL = () => {
        setShowModal(false);
        setUserLocation(null);
    };

    const handleMapClick = () => {
        openModalL();
    };

    const shareLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("location not found: ", error);
                }
            );
        } else {
            alert("Your browser does not support the location service.");
        }
        closeModalL();
    };

    const [data, setData] = useState('Veri A');

    const updateData = (newData) => {
        setData(newData);
    };



    const [returnUpLocationMap, setReturnLocationMap] = useState({ lat: null, lng: null });

    const updatReturnpLocation = (lat, lng) => {
        setReturnLocationMap({ lat, lng });
        closeModal(false);
    };

    const handleDrawReturnCreated = (e) => {
        const { layerType, layer } = e;
        if (layerType === 'marker') {
            const latlng = layer.getLatLng();
            const lat = latlng.lat;
            const lng = latlng.lng;
            updatReturnpLocation(lat, lng);
        }
    };




    function closeModal() {
        setIsOpen(false);
    }



    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const handleBrandChange = (event) => {
        const brand = event.target.value;
        setSelectedBrand(brand);
        setSelectedModel("");
    };



    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    const notifyError = () => toast.success(`New ${selectedBrand} car Created!`);

    
    const notifyCarCreatedSuccess = () => {
        toast.success(`New ${selectedBrand} car Created successfully!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const formik = useFormik({
        initialValues: {
            Marka: selectedBrand,
            Model: selectedModel,
            Price: undefined,
            Year: undefined,
            Latitude: null,
            Longitude: null,
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
            formData.append("Latitude", returnUpLocationMap.lat ? returnUpLocationMap.lat : '');
            formData.append("Longitude", returnUpLocationMap.lng ? returnUpLocationMap.lng : '');
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
                    notifyCarCreatedSuccess()
                }
            } catch (error) {
                notifyError()
            }
        },
        validationSchema: carCreateSchema,
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
                                                    <>{formik.touched.Marka && formik.errors.Marka}</>
                                                    <Form.Select isInvalid={formik.errors.Marka && formik.touched.Marka} id='FS' size='lg' name='Marka' value={selectedBrand} onChange={(event) => {
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
                                                            <>{formik.touched.Model && formik.errors.Model}</>

                                                            <Form.Select isInvalid={formik.errors.Model && formik.touched.Model} id='FS' name='Model' value={selectedModel} onChange={(e) => {
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
                                                    <>{formik.touched.Year && formik.errors.Year}</>
                                                    <Form.Select
                                                        isInvalid={formik.errors.Year && formik.touched.Year}
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
                                                    <>{formik.touched.CarType && formik.errors.CarType}</>
                                                    <Form.Select
                                                        isInvalid={formik.errors.CarType && formik.touched.CarType}
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
                                                    <>{formik.touched.CarCategory && formik.errors.CarCategory}</>
                                                    <Form.Select
                                                        isInvalid={formik.errors.CarCategory && formik.touched.CarCategory}
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
                                                        <>{formik.touched.Price && formik.errors.Price}</>
                                                        <InputGroup className="mb-2">
                                                            <InputGroup.Text>$</InputGroup.Text>
                                                            <Form.Control
                                                                isInvalid={formik.errors.Price && formik.touched.Price}
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
                                                    <>{formik.touched.CarImages && formik.errors.CarImages}</>
                                                    <input
                                                        isInvalid={formik.errors.CarImages && formik.touched.CarImages}
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
                                                <>{formik.touched.Description && formik.errors.Description}</>
                                                <Form.Control
                                                    isInvalid={formik.errors.Description && formik.touched.Description}
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
                                    <div id='myLocation' style={{ marginTop: "30px", marginBottom: "30px" }}>
                                        <div>
                                            <span style={{ fontSize: "20px", color: "#ff7700", fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>Car Location</span>
                                            <Button style={{ marginLeft: "10px" }} onClick={openModalL}>View Location</Button>
                                        </div>
                                        {showModal && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <p>Want to share your location?</p>
                                                    <div>
                                                        <Button backgroundColor={"green"} onClick={shareLocation}>Yes</Button>
                                                        <Button backgroundColor={"red.700"} onClick={closeModalL}>No</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className='ss'>
                                        <MapContainer center={userLocation === null ? [40.3798, 49.8486] : userLocation} zoom={13} scrollWheelZoom={false} ref={mapRef}>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                                            />
                                            <FeatureGroup>
                                                <EditControl position='topright' onCreated={handleDrawReturnCreated} draw={{ rectangle: false, circlemarker: false, polygon: false, marker: true, }} />
                                            </FeatureGroup>
                                            {userLocation && (
                                                <Marker
                                                    position={userLocation}
                                                    icon={markerIcon}
                                                >
                                                    <Popup>My Location</Popup>
                                                </Marker>
                                            )}
                                        </MapContainer>
                                    </div>

                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        variant="success"
                                        style={{ width: "150px", marginTop: "40px" }}
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

