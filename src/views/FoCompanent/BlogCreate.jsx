import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Field, useFormik, Form } from "formik";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { postBlog } from "../../Services/blogServices";


const BlogCreate = () => {


    


    return (
        <Container >
            <div style={{display:"flex", justifyContent:"center", alignItems:"center",marginTop:"140px"}}>
                <form>
                    <label>Image</label><br/>
                    <input style={{backgroundColor:"gray"}} type='file' /><br />


                    <label>name</label> <br/>
                    <input style={{backgroundColor:"gray"}} type='text' /><br />


                    <label>Description</label><br/>
                    <input style={{backgroundColor:"gray"}} type='text' /><br />
                </form>
            </div>
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