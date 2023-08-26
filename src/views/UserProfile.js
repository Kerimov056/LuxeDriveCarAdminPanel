import React, { useState } from "react";

import {
  Button, Container, Badge,
  Card,
  Form,
  Navbar,
  Nav,
  Row, Table,
  Col,
  InputGroup
} from 'react-bootstrap'
import Advantagecard from "./FoCompanent/Advantagecard";
import { useQuery } from "react-query";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { getAdvatages, postAdvatages } from "../Services/advantageServices";

function User() {

  const [createAdvantage, setcreateAdvantage] = useState(false);
  const queryClient = useQueryClient();


  const { data: getadvantage, isError } = useQuery({
    queryKey: ["getAllAdvatages"],
    queryFn: getAdvatages,
    staleTime: 0,
  });
  if (isError) {
    return <div>Bir hata oluştu</div>;
  }


  const mutation = useMutation(postAdvatages, {
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries("getAllAdvatages");
    },
  });

  const formik = useFormik({
    initialValues: {
      Title: "",
      Descrption: "",
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
            <button data-text="Awesome" class="buttonLXDC">
              <span class="actual-text">&nbsp;Advantages&nbsp;</span>
              <span class="hover-textLCD" aria-hidden="true">&nbsp;Advantages&nbsp;</span>
            </button>
          </div>
          <div style={{ marginBottom: "20px", marginLeft: "20px" }}>
            <Button onClick={() => setcreateAdvantage(!createAdvantage)}>Create Advantages</Button>
          </div>
          {createAdvantage == true ? <div style={{ width: "100%", height: "120px", display: "flex", alignItems: "center", marginTop: "20px" }}>
            <div style={{ width: "90%", height: "120px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              <div style={{ width: "70%" }}>



                <form style={{ display: "flex", flexDirection: "column" }} controlId="formFileMultiple" className="mb-3">
                  <Form.Label>Title : </Form.Label>
                  <input type="text" name="Title" value={formik.values.Title} onChange={formik.handleChange} />
                  <Form.Label style={{ marginTop: "20px" }}>Description : </Form.Label>
                  <input type="text" style={{ height: "40px" }} name="Descrption" value={formik.values.Descrption} onChange={formik.handleChange} />
                </form>

              </div>
              <p style={{ width: "20%", marginTop: "35px" }}>
                <Button type="submit" onClick={formik.handleSubmit} style={{ width: "140px" }} variant="success">
                  Create
                </Button>
              </p>
            </div>
          </div> : <></>
          }
        </Row>
        <Row style={{ marginTop: "30px" }}>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Num</th>
                      <th className="border-0">Title</th>
                      <th className="border-0">Description</th>
                      <th className="border-0">Edit</th>
                      <th className="border-0">Remove</th>
                    </tr>
                  </thead>
                  {getadvantage?.data?.map((byAdvantage, index) => (
                    <Advantagecard key={index} number={index} Id={byAdvantage?.id} title={byAdvantage?.title} description={byAdvantage?.descrption.slice(0, 120)} />
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

export default User;
