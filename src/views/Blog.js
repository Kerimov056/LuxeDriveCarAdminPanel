import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { getBlog } from "../Services/blogServices";
import BlogCard from './FoCompanent/BlogCard';
import { Field, useFormik, Form } from "formik";
import { useQuery, useMutation, useQueryClient } from "react-query";
import './FoCompanent/blogcard.scss'

const Blog = () => {
  const [create, setCreate] = useState(false);
  const [imageFields, setImageFields] = useState([{ files: [] }]);

  const addImageField = () => {
    setImageFields([...imageFields, { files: [] }]);
  };

  const removeImageField = (index) => {
    const updatedFields = imageFields.filter((field, i) => i !== index);
    setImageFields(updatedFields);
  };

  const handleFileChange = (event, index) => {
    const updatedFields = [...imageFields];
    updatedFields[index] = { ...updatedFields[index], files: event.target.files };
    setImageFields(updatedFields);
  };


  const { data: getByBlog, isError } = useQuery({
    queryKey: ["getBlogs"],
    queryFn: getBlog,
    staleTime: 0,
  });

  if (isError) {
    return <div>Bir hata oluştu</div>;
  }

  return (
    <>
      <Container>
        <Row>
          <Col md="12">
            <div className='LxDrC'>
              <button data-text="Awesome" class="buttonLXDC">
                <span class="actual-text">&nbsp;Blog&nbsp;</span>
                <span class="hover-textLCD" aria-hidden="true">&nbsp;Blog&nbsp;</span>
              </button>
            </div>
            <div>
              <Button onClick={()=> setCreate(!create)}>Create Blog</Button>
              {create === true &&

                <div>
                </div>


              }
            </div>

            <div className="blogssss">
              {getByBlog?.data?.map((blog, index) => (
                <BlogCard key={index} Id={blog?.id} title={blog?.title} desc={blog?.descrtion?.slice(0, 60)} />
              ))}
            </div>

          </Col>
        </Row>
      </Container >
    </>
  )
}

export default Blog


















// <div>
//                   <Form>
//                     <Row>
//                       <Col className="pr-1" md="5">
//                         <Form.Group>
//                           <Col md="12">
//                             <Form.Group>
//                               <label>Description</label>
//                               <Form.Control
//                                 cols="80"
//                                 defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm inthat two seat Lambo."
//                                 placeholder="Here can be your description"
//                                 name="Description"
//                                 // value={formik.values.Description}
//                                 // onChange={formik.handleChange}
//                                 rows="4"
//                                 as="textarea"
//                               ></Form.Control>
//                             </Form.Group>
//                           </Col>


//                           <Col className="pr-" md="6">
//                             {imageFields.map((field, index) => (
//                               <div id='ImgUpload' key={index}>
//                                 <Form.Group style={index === 0 ? { marginLeft: "-70px" } : {}} controlId={`formFileMultiple_${index}`} className="mb-3">
//                                   <Form.Label>Car Images</Form.Label>
//                                   <Form.Control type="file" multiple onChange={(event) => handleFileChange(event, index)} />
//                                 </Form.Group>
//                                 {index > 0 &&
//                                   <Button onClick={() => removeImageField(index)}>-</Button>
//                                 }
//                               </div>
//                             ))}
//                             <Button onClick={addImageField}>+</Button>
//                           </Col>

//                           <Col md="12">
//                             <Form.Group>
//                               <label>Description</label>
//                               <Form.Control
//                                 cols="80"
//                                 defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm inthat two seat Lambo."
//                                 placeholder="Here can be your description"
//                                 name="Description"
//                                 // value={formik.values.Description}
//                                 // onChange={formik.handleChange}
//                                 rows="4"
//                                 as="textarea"
//                               ></Form.Control>
//                             </Form.Group>
//                           </Col>
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Button
//                       className="btn-fill pull-right"
//                       type="submit"
//                       // onClick={formik.handleSubmit}
//                       variant="success"
//                     >
//                       Create Car
//                     </Button>
//                     <div className="clearfix"></div>
//                   </Form>