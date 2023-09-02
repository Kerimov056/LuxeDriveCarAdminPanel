import React, { useState } from "react";
import {
  Container, Badge,
  Card,
  Form,
  Navbar,
  Nav,
  Row, Table,
  Col,
  InputGroup,
} from 'react-bootstrap'
import { Input, Text, Button, FormControl } from '@chakra-ui/react'
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


  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDesc = (event) => {
    setDesc(event.target.value);
  };

  const mutation = useMutation(() => postFaqs(title, desc), {
    onSuccess: () => {
      queryClient.invalidateQueries("getFaqs");
    },
  });

  const faqsCreate = async () => {
    await mutation.mutateAsync(title, desc);
  };

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
            <form style={{ display: "flex", flexDirection: "column" }}>
              <FormControl>
                <div style={{ width: "90%", height: "120px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <div style={{ width: "70%" }}>
                    <label>Title : </label>
                    <Input type="text" value={title} onChange={handleTitle} />
                    <label style={{ marginTop: "20px" }}>Description : </label>
                    <Input type="text" style={{ height: "40px" }} value={desc} onChange={handleDesc} />
                  </div>
                  <p style={{ width: "20%", marginTop: "35px" }}>
                    <Button type="button" onClick={faqsCreate} style={{ width: "140px" }} colorScheme="green">
                      Create
                    </Button>
                  </p>
                </div>
              </FormControl>
            </form>
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
                      <th className="border-0">Details</th>
                      <th className="border-0">Edit</th>
                      <th className="border-0">Remove</th>
                    </tr>
                  </thead>
                  {getFaq?.data?.map((byFaqs, index) => (
                    <Advantagecard berirleme={2} Id={byFaqs?.id} key={index} number={index + 1} FaqId={byFaqs?.id} title={byFaqs?.title} description={byFaqs?.descrption.slice(0, 120)} />
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














// const mutation = useMutation(postFaqs, {
//   onSuccess: () => {
//     queryClient.invalidateQueries("getFaqsCreate");
//     queryClient.invalidateQueries("getFaqs");
//     navigate("/admin/notifications");
//   },
//   onError: () => {
//     console.log(error.response);
//   },
// });

// const formik = useFormik({
//   initialValues: {
//     Title: "",
//     Descrption: "",
//   },
//   onSubmit: async (values) => {
//     try {
//       console.log(values);
//       await mutation.mutateAsync(values);
//     } catch (error) {
//       console.log(error);
//     }
//   },
// });