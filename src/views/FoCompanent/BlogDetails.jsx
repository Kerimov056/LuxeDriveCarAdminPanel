import "./blogdetails.scss";
import React, { useState, useEffect } from 'react'
import {
    Button, Container, Badge,
    Card,
    Form,
    Navbar,
    Nav,
    Row,
    Col,
    InputGroup
} from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Field, useFormik } from "formik";
import { getByBlog } from "../../Services/blogServices";


const BlogDetails = () => {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byCheuf } = useQuery(["getByBlog", id], () =>
        getByBlog(id)
    );


    return (
        <>
            Salam
        </>
    )
}

export default BlogDetails