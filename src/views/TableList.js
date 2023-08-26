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
} from "react-bootstrap";
import SliderCard from "./SliderCard";
import { getSlider } from "../Services/sliderServices";
import { useQuery } from "react-query";


function TableList(props) {

  const { data: getSliders, isError } = useQuery({
    queryKey: ["getAllSlider"],
    queryFn: getSlider,
    staleTime: 0,
  });
  if (isError) {
    return <div>Bir hata oluştu</div>;
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Striped Table with Hover</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
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
