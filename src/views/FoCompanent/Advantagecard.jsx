import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Field } from "formik";
import { removeAdvatages, byAdvatages } from "../../Services/advantageServices";
import "./advantagecard.scss";


const Advantagecard = (props) => {

    const [editAdvantages, setEditAdvantages] = useState(false);

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: advantag } = useQuery(["advantages", id], () =>
        byAdvatages(id)
    );

    const handleRemove = async (advantagesId) => {
        try {
            await removeAdvatages(advantagesId);
            queryClient.invalidateQueries(["AdvantagesRemove", advantagesId]);
            queryClient.invalidateQueries(["getAllAdvatages"]);
        } catch (error) {
            console.error("Error confirming reservation:", error);
        }
    };

    const updateMutation = useMutation(Advantagecard, {
        onSuccess: () => {
            queryClient.invalidateQueries(["advantages", props.Id]);
        },
        onError: (error) => {
            console.error("Error updating category:", error);
        },
    });

    const handleSubmit = async (values) => {
        updateMutation.mutate({ ...advantag, ...values });
    };

    return (
        <>
            <tbody>
                <tr>
                    <td style={{display:'none'}}>{props.dto}</td>
                    <td >{props.number}</td>
                    <td >{props.title}</td>
                    <td className='Slidersss'>{props.description}</td>
                    <td className='Artirrr'><Button onClick={() => setEditAdvantages(!editAdvantages)} variant="primary">Edit</Button></td>
                    <td className='Artirrr'><Button onClick={() => handleRemove(props.Id)} variant="danger">Remove</Button></td>
                </tr>
                {editAdvantages == true ? <div style={{ height: "250px" }} id='SliderEdit'>
                    <Formik
                        initialValues={{
                            title: props.title,
                            description: props.description,
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Form id='EditAdvantage'>
                            <div>
                                <label>Title</label>
                                <Field type="text" name="title" placeholder="Advantages Title" />
                            </div>
                            <div>
                                <label >Descrption</label>
                                <Field
                                    type="text"
                                    name="description"
                                    placeholder="Advantages Description"
                                />
                            </div>
                            <Button type="submit">Update</Button>
                        </Form>
                    </Formik>
                </div> :
                    <></>
                }
            </tbody>
        </>
    )
}

export default Advantagecard