import React from 'react'
import "./blogdetails.scss";
import { Button, Container } from 'react-bootstrap';
import { byAdvatages } from "../../Services/advantageServices";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import { Formik, Field, useFormik } from "formik";

const AdvantagesDetails = () => {


    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byAdvan } = useQuery(["byAdvatages", id], () =>
        byAdvatages(id)
    );

    return (
        <>
            <Container>
                <div className="blogDetailss">
                    <div className="BlofDtext">
                        <div class="w-60 bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600 border border-slate-300 grid grid-col-2 justify-center p-4 gap-4 rounded-lg shadow-md">
                            <div style={{ fontSize: "30px" }} class="col-span-2 text-lg font-bold capitalize rounded-md">
                                {byAdvan?.data?.title}
                            </div>
                            <div class="col-span-2 rounded-md">
                                {byAdvan?.data?.descrption}
                            </div>
                            <div class="col-span-1">
                            </div>
                        </div>
                    </div>
                </div>
                <Button style={{marginLeft:"900px"}}><Link to={"/admin/user"}>Go To back</Link></Button>
            </Container>
        </>
    )
}

export default AdvantagesDetails