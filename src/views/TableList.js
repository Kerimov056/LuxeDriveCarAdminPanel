import React from "react";

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


function TableList() {
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
                      <th className="border-0">Num</th>
                      <th className="border-0">FullName</th>
                      <th className="border-0">Car</th>
                      <th className="border-0">PickupDate</th>
                      <th className="border-0">ReturnDate</th>
                      <th className="border-0">Details</th>
                      <th className="border-0">Confirm</th>
                      <th className="border-0">Cancel</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>{props.fullName}</td>
                      <td>{props.marka} {props.model}</td>
                      <td>{props.pick}</td>
                      <td>{props.return}</td>
                      <td><Button>Details</Button></td>
                      <td><Button variant="success">Confirm</Button></td>
                      <td><Button variant="danger">Cancel</Button></td>
                    </tr>
                    
                  </tbody>
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
