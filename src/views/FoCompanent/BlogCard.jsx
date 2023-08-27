import React from 'react'
import "./blogcard.scss";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const BlogCard = (props) => {
    return (
        <>
            <div class="flipBlog-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmE2L6L8qtLyZU8sPByOYSYZditr6U1eAN-g&usqp=CAU' />
                    </div>
                    <div class="flip-card-back">
                        <p class="title">{props.title}</p>
                        <p>{props.desc}</p>
                        <Button  >
                            <Link to={`/BlogDetails/${props.Id}`}>
                                Details
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard