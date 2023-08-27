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
import { useQuery } from "react-query";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { getFaqs, postFaqs } from "../Services/faqsServices";
import Advantagecard from "./FoCompanent/Advantagecard";

const Notifications = () => {


  const [createFaqs, setCreateFaqs] = useState(false);
  const queryClient = useQueryClient();


  const { data: getFaq, isError } = useQuery({
    queryKey: ["getFaqs"],
    queryFn: getFaqs,
    staleTime: 0,
  });
  if (isError) {
    return <div>Bir hata oluştu</div>;
  }


  const mutation = useMutation(postFaqs, {
    onSuccess: () => {
      navigate("/admin/notifications");
      queryClient.invalidateQueries("getFaqs");
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
      <Container>
        <Row>
          <div className='LxDrC'>
            <button data-text="Awesome" class="buttonLXDC">
              <span class="actual-text">&nbsp;Faqs&nbsp;</span>
              <span class="hover-textLCD" aria-hidden="true">&nbsp;Faqs&nbsp;</span>
            </button>
          </div>
          <div>
            <Button onClick={() => setCreateFaqs(!createFaqs)}>Create Faqs</Button>
          </div>
          {createFaqs == true ? <div style={{ width: "100%", height: "120px", display: "flex", alignItems: "center", marginTop: "40px" }}>
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
                  {getFaq?.data?.map((byFaqs, index) => (
                    <Advantagecard key={index} number={index+1} FaqId={byFaqs?.id} title={byFaqs?.title} description={byFaqs?.descrption.slice(0, 120)} />
                  ))}
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Notifications