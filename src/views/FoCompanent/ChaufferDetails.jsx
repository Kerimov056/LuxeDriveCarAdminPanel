import "./chaufferDetails.scss";
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
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useQuery, useQueryClient } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { chauffeursRemove, getByCheuf } from "../../Services/chauffeursServices";

const ChaufferDetails = () => {

    const [CheufEdit, setCheufEdit] = useState(false)

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byCheuf } = useQuery(["getByCheuf", id], () =>
        getByCheuf(id)
    );


    const handleRemove = async (cheufId) => {
        try {
            await chauffeursRemove(carId);
            queryClient.invalidateQueries(["chuferRemove", carId]);
            queryClient.invalidateQueries(["getChauffeurs"]);
            navigate.push(`./admin/typography`);
        } catch (error) {
            console.error("Error confirming car:", error);
        }
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
                <div className='details'>
                    <div>
                        <div className='categoryCarImage'>
                            <img  src='http://localhost:3000/static/media/reactlogo.55f6660be18505517e2e.png' />
                        </div>
                        <div className='CarDetailsIMs'>
                            <div class="cardDetailsAdmin">
                                <div class="wrapperRRR">
                                    <div class="color black">
                                        Name
                                        <span class="hex">{byCheuf?.data?.name}</span>
                                    </div>
                                    <div class="color eerie-black">
                                        Number
                                        <span class="hex">{byCheuf?.data?.number}</span>
                                    </div>
                                    <div class="color chinese-black">
                                        Price
                                        <span class="hex">{byCheuf?.data?.price} $</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='asdbbb'>
                    <Button onClick={() => setCheufEdit(!CheufEdit)} variant="success">Edit</Button>
                    <Button onClick={() => handleRemove(byCheuf?.data?.id)} variant="danger">Remove</Button>
                    <Button><Link to='/AllCar'>Go To Back</Link></Button>
                </div>

 
               {CheufEdit==true ?  <div id='carEdit'>
                    <Row>
                        <Col md="8">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Car Edit</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                       
                                        
                                        <Button
                                            style={{ width: "200px", marginTop: "20px" }}
                                            className="btn-fill pull-right"
                                            type="submit"
                                            // onClick={formik.handleSubmit}
                                            variant="primary"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            style={{ width: "200px", marginTop: "20px",marginLeft:"20px" }}
                                            type="submit"
                                            variant="primary"
                                            onClick={() => setCheufEdit(false)}
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

export default ChaufferDetails