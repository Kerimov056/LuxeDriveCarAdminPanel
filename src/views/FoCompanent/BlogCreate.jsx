import React from 'react'
import './BlogCreate.scss'
import { Button, Container, Row } from 'react-bootstrap'
import { Field, useFormik, Form } from "formik";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { postBlog } from "../../Services/blogServices";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const BlogCreate = () => {



    return (
        <Container>
            <h1>Blog Create</h1>
            <Row style={{ marginLeft: "350px", marginTop: "100px" }}>
                <div class="form-container">
                    <form class="form">
                        <div class="form-group">
                            <label for="email">Blog Title</label>
                            <input type="text" id="email" required="" />
                        </div>
                        <div class="form-group">
                            <label for="textarea">Blog Image</label>
                            <input multiple type='file' rows="10" cols="50" required="" />
                        </div>
                        <div class="form-group">
                            <label for="email">Blog Description</label>
                            <textarea name="textarea" id="textarea" rows="10" cols="50" required="">          </textarea>
                        </div>
                        <div style={{ display: "flex" }}>
                            <button class="form-submit-btn" type="submit">Submit</button>
                            <button style={{ marginLeft: "50px" }} class="form-submit-btn" type="submit"><Link to={'/admin/blog'}>Go to back</Link></button>
                        </div>
                    </form>
                </div>
            </Row>
        </Container>
    )
}

export default BlogCreate















// <Form onSubmit={(e) => CreateBlog(e)}>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <p>Image</p>
//                     {
//                         showImage !== null ?
//                             <img
//                                 style={{
//                                     width: "200px",
//                                     height: "100px",
//                                     marginBottom: "10px",
//                                     borderRadius: "unset",
//                                 }}
//                                 src={showImage}
//                                 alt="header image"
//                             /> : null
//                     }
//                     <Form.Control
//                         type="file"
//                         required
//                         onChange={(e) => fileUploadHandler(e)}
//                     />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Label>Title</Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="Enter Title"
//                         required
//                         onFocus={(e) => e.target.placeholder = ''}
//                         onBlur={(e) => e.target.placeholder = 'Enter Title'}
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                 </Form.Group>


//                 <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control
//                         as="textarea"
//                         rows={3}
//                         type="text"
//                         placeholder="Enter Description"
//                         required
//                         onFocus={(e) => e.target.placeholder = ''}
//                         onBlur={(e) => e.target.placeholder = 'Enter Description'}

//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                 </Form.Group>

//                 <Button variant="outline-primary" type="submit">
//                     Create
//                 </Button>
//                 <Link to="/blogTable">
//                     <Button variant="outline-dark" type="submit" className='mx-2'>
//                         Cancel
//                     </Button>
//                 </Link>
//             </Form>