import React, { useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import SliderCard from "./SliderCard";
import { getSlider, postSlider } from "../Services/sliderServices";
import { useQuery } from "react-query";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";


function TableList(props) {

  const [createSlider, setCreateSlider] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation(postSlider, {
    onSuccess: () => {
      queryClient.invalidateQueries("getAllSlider");
    },
  });


  const { data: getSliders, isError } = useQuery({
    queryKey: ["getAllSlider"],
    queryFn: getSlider,
    staleTime: 0,
  });
  if (isError) {
    return <div>Bir hata oluştu</div>;
  }

  const formik = useFormik({
    initialValues: {
      image: ""
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
      <Container fluid>
        <Row>
          <div className='LxDrC'>
            <button onClick={() => setCreateSlider(!createSlider)} data-text="Awesome" class="buttonLXDC">
              <span class="actual-text">&nbsp;Create Slider&nbsp;</span>
              <span class="hover-textLCD" aria-hidden="true">&nbsp;Create Slider&nbsp;</span>
            </button>
          </div>
          {createSlider == true ? <div style={{ width: "100%", height: "120px", display: "flex", alignItems: "center" }}>
            <div style={{ width: "90%", height: "120px",display: "flex",justifyContent:"space-around" , alignItems: "center" }}>
              <div style={{width: "70%"}}>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>Multiple files input example</Form.Label>
                  <Form.Control type="file" multiple />
                </Form.Group>
              </div>
              <p style={{width: "20%",marginTop:"35px"}}>
                <Button style={{width: "140px"}} variant="success">
                  Create
                </Button>
              </p>
            </div>
          </div> : <></>
          }
        </Row>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th style={{ fontSize: "16px" }} className="border-0">Num</th>
                      <th style={{ fontSize: "16px" }} className="border-0">Slider</th>
                      <th style={{ fontSize: "19px" }} className="border-0">Edit</th>
                      <th style={{ fontSize: "19px" }} className="border-0">Remove</th>
                    </tr>
                  </thead>
                  {getSliders?.data?.map((bySlider, index) => (
                    <SliderCard key={index} number={index} Id={bySlider.id} />
                  ))}
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
