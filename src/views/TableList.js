import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Card,
  Table,
} from "react-bootstrap";
import SliderCard from "./SliderCard";
import { getSlider, postSlider } from "../Services/sliderServices";
import { useQuery } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";

function TableList(props) {
  const [createSlider, setCreateSlider] = useState(false);
  const [showImage, setShowImage] = useState(null);
  const [image, setImage] = useState(null);
  const queryClient = useQueryClient();

  const { data: getSliders, isError } = useQuery(["getAllSlider"], getSlider, {
    staleTime: 0,
  });

  if (isError) {
    return <div>Bir hata oluştu</div>;
  }

  const newSlider = {
    photo: image,
  };

  const fileUploadHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setShowImage(URL.createObjectURL(file));
  };

  const CreateSlider = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("image", image); // "image" adını kullanarak FormData'ya ekleyin.
    
    try {
      const response = await axios.post(`https://localhost:7152/api/Sliders`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type'ı doğru ayarlayın.
        },
        
      });
      setCreateSlider(false);
      queryClient.invalidateQueries("getAllSlider");
    } catch (error) {
      console.error(error); // Hata durumunda hata mesajını loglayın.
    }
  };


  return (
    <Container fluid>
      <Row>
        <div className="LxDrC">
          <button data-text="Awesome" class="buttonLXDC">
            <span class="actual-text">&nbsp;Slider&nbsp;</span>
            <span class="hover-textLCD" aria-hidden="true">
              &nbsp;Slider&nbsp;
            </span>
          </button>
        </div>
        <div
          onClick={() => setCreateSlider(!createSlider)}
          style={{ marginBottom: "20px", marginLeft: "20px" }}
        >
          <Button>Create Slider</Button>
        </div>
        {createSlider && (
          <div
            style={{
              width: "100%",
              height: "290px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "90%",
                height: "120px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <form controlId="formFileMultiple" onSubmit={CreateSlider} className="mb-3">
                <div style={{ width: "70%" }}>
                  <Form.Label>Image:</Form.Label>
                  <p>Image</p>
                  {showImage !== null && (
                    <img
                      style={{
                        width: "200px",
                        height: "100px",
                        objectFit: "cover",
                        marginBottom: "10px",
                        borderRadius: "unset",
                      }}
                      src={showImage}
                      alt="header image"
                    />
                  )}
                  <Form.Control
                    type="file"
                    required
                    onChange={(e) => fileUploadHandler(e)}
                  />
                </div>
                <p style={{ width: "20%", marginTop: "35px" }}>
                  <Button type="submit" style={{ width: "140px" }} variant="success">
                    Create
                  </Button>
                </p>
              </form>
            </div>
          </div>
        )}
      </Row>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th style={{ fontSize: "16px" }} className="border-0">
                      Num
                    </th>
                    <th style={{ fontSize: "16px" }} className="border-0">
                      Slider
                    </th>
                    <th style={{ fontSize: "19px" }} className="border-0">
                      Edit
                    </th>
                    <th style={{ fontSize: "19px" }} className="border-0">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getSliders?.data?.map((bySlider, index) => (
                    <SliderCard key={index} number={index + 1} Id={bySlider.id} />
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TableList;
