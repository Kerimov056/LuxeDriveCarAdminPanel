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
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getByCar, postCar, removeCar } from "../../Services/carServices";
import { useParams, useHistory } from "react-router-dom";
import "./cardetails.scss";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useFormik } from "formik";
import axios from 'axios';
import { carCategory, carType, carYear, carData } from "../../components/Export/Export";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import './AllCarMap.scss'



const markerIcon = new L.Icon({
    iconUrl: require("../../assets/img/faces/download.png"),
    iconSize: [45, 35],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});



const CarDetails = () => {

    const [CarEdit, setCarEdit] = useState(false)

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


    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const handleBrandChange = (event) => {
        const brand = event.target.value;
        setSelectedBrand(brand);
        setSelectedModel("");
        setUpdatedMarka(brand)
    };


    const [returnUpLocationMap, setReturnLocationMap] = useState({ lat: null, lng: null });

    const updatReturnpLocation = (lat, lng) => {
        setReturnLocationMap({ lat, lng });
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


    const [updatedMarka, setUpdatedMarka] = useState(byCar?.data?.marka);
    const [updatedModel, setUpdatedModel] = useState(byCar?.data?.model);
    const [updatedPrice, setUpdatedPrice] = useState(byCar?.data?.price);
    const [updatedYear, setUpdatedYear] = useState(byCar?.data?.year);
    const [updatedDescription, setUpdatedDescription] = useState(byCar?.data?.description);
    const [updatedType, setUpdatedType] = useState(byCar?.data?.carType?.type);
    const [updatedCategory, setUpdatedCategory] = useState(byCar?.data?.carCategory?.category);
    const [updatedTags, setUpdatedTags] = useState(byCar?.data?.marka);
    const [updatedCarImages, setUpdatedCarImages] = useState(byCar?.data?.carImages);


    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const currentImages = byCar?.data?.carImages || [];

        const updatedImages = [...currentImages];
        for (let i = 0; i < updatedCarImages.length; i++) {
            updatedImages.push(updatedCarImages[i]);
        }

        const formData = new FormData();

        formData.append("Marka", updatedMarka);
        formData.append("Model", selectedModel);
        formData.append("Price", updatedPrice);
        formData.append("Year", updatedYear);
        formData.append("Latitude", returnUpLocationMap.lat ? returnUpLocationMap.lat : '');
        formData.append("Longitude", returnUpLocationMap.lng ? returnUpLocationMap.lng : '');
        formData.append("Description", updatedDescription);
        formData.append("CarType.Type", updatedType);
        formData.append("CarCategory.category", updatedCategory);
        formData.append("tags", updatedTags);

        for (let i = 0; i < updatedCarImages.length; i++) {
            formData.append('CarImages', updatedCarImages[i]);
        }

        console.log(formData.getAll("Latitude"));
        console.log(formData.getAll("Longitude"));

        try {
            await axios.put(`https://localhost:7152/api/Car/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            queryClient.invalidateQueries(['getByCar', id]);
            setCarEdit(false);
        } catch (error) {
            console.error('Error updating Car:', error);
        }
    };


    const position = [byCar?.data?.latitude, byCar?.data?.longitude]

    return (
        <>
            <Container>
                <div className='MainCarImg'>
                    <img src={`data:image/png;base64,${byCar?.data?.carImages[0]?.imagePath}`} />
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
                                    <div class="color anti-flash-white">
                                        Booked cars
                                        <Link to={`/CancledReservDetail/${byCar?.data?.reservationsId}`}><span class="hex">Reservation Person {">"}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Row style={{ marginTop: "150px" }}>
                    <div className='ss'>

                        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                            />
                            <FeatureGroup>
                                <EditControl position='topright' onCreated={handleDrawReturnCreated} draw={{ rectangle: false, circlemarker: false, polygon: false, marker: true, }} />
                            </FeatureGroup>
                            <Marker
                                position={position}
                                icon={markerIcon}
                            >
                                <Popup >
                                    <p style={{ color: "purple" }}>Car Location</p>

                                    <p> Marka: {byCar?.data?.marka}</p>
                                    <p> Model: {byCar?.data?.model}</p>
                                    <p> Year: {byCar?.data?.year}</p>
                                </Popup>
                            </Marker>


                        </MapContainer>
                    </div>
                </Row>

                <div className='carDetails'>
                    <span>Description</span><br />
                    {byCar?.data?.description}
                </div>
                <div className='asdbbb'>
                    <Button onClick={() => setCarEdit(!CarEdit)} variant="success">Edit</Button>
                    <Button onClick={() => handleRemove(byCar?.data?.id)} variant="danger">Remove</Button>
                    <Button><Link to='/AllCar'>Go To Back</Link></Button>
                </div>


                {CarEdit == true ? <div id='carEdit'>
                    <Row style={{ marginLeft: "140px" }}>
                        <Col md="8">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Create Car</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleUpdateSubmit}>
                                        <Row>
                                            <Col className="pr-1" md="5">
                                                <Form.Group>
                                                    <div className='MM'>
                                                        <label>Marka:</label>
                                                        <Form.Select id='FS' size='lg'
                                                            value={updatedMarka} onChange={(event) => {
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
                                                            values={updatedYear}
                                                            onChange={(e) => setUpdatedYear(e.target.value)}
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
                                                            values={updatedType}
                                                            onChange={(e) => setUpdatedType(e.target.value)}
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
                                                            values={updatedCategory}
                                                            onChange={(e) => setUpdatedCategory(e.target.value)}
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
                                                                    value={updatedPrice}
                                                                    onChange={(e) => setUpdatedPrice(e.target.value)}
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
                                                        <Form.Label style={{ marginLeft: "440px" }} className='InputCreateCarimage'>Car Images</Form.Label>
                                                        <input
                                                            style={{ marginLeft: "440px" }}
                                                            className='InputCreateCarimage ll'
                                                            type="file"
                                                            multiple
                                                            onChange={(e) => setUpdatedCarImages(e.target.files)} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div class="inputBox1">
                                            <Form.Label>Car tag</Form.Label>
                                            <input className='CarCreateTag'
                                                value={updatedTags}
                                                onChange={(e) => setUpdatedTags(e.target.value)}
                                                type="text"
                                                required="required" />
                                        </div>
                                        <Row>
                                            <Col md="12">
                                                <Form.Group>
                                                    <label>Description</label>
                                                    <Form.Control
                                                        className='CarCreateDesc'
                                                        cols="90"
                                                        value={updatedDescription}
                                                        onChange={(e) => setUpdatedDescription(e.target.value)}
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
                                            style={{ width: "150px", marginTop: "24px" }}
                                        >
                                            Create Car
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