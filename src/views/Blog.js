import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { getBlog } from "../Services/blogServices";
import { useQuery } from "react-query";
import BlogCard from './FoCompanent/BlogCard';
import './FoCompanent/blogcard.scss'

const Blog = () => {

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
              <Button>Create Blog</Button>
            </div>

            <div className="blogssss">
              {getByBlog?.data?.map((blog, index) => (
                <BlogCard key={index} Id={blog?.id} title={blog?.title} desc={blog?.descrtion?.slice(0, 60)} />
              ))}
            </div>

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Blog