import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { removeAdvatages, byAdvatages } from '../../Services/advantageServices';
import { removeFaqs, UpdateFaqs } from '../../Services/faqsServices';
import './advantagecard.scss';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Advantagecard = (props) => {
    const [editAdvantages, setEditAdvantages] = useState(false);
    const [editFaqs, setEditFaqs] = useState(false);

    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data: advantag } = useQuery(['advantages', id], () => byAdvatages(id));

    const handleRemove = async (advantagesId) => {
        try {
            await removeAdvatages(advantagesId);
            queryClient.invalidateQueries(['AdvantagesRemove', advantagesId]);
            queryClient.invalidateQueries(['getAllAdvantages']);
        } catch (error) {
            console.error('Error removing advantages:', error);
        }
    };

    const handleRemoveFaqs = async (faqsId) => {
        try {
            await removeFaqs(faqsId);
            queryClient.invalidateQueries(['FaqsRemove', faqsId]);
            queryClient.invalidateQueries(['getFaqs']);
        } catch (error) {
            console.error('Error confirming reservation:', error);
        }
    };

    const updateAdvantageMutation = useMutation((updatedData) => UpdateAdvantage(id, updatedData), {
        onSuccess: () => {
            queryClient.invalidateQueries(['advantages', id]);
            setEditAdvantages(false);
        },
        onError: (error) => {
            console.error('Error updating advantages:', error);
        },
    });

    const handleAdvantageSubmit = async (values) => {
        updateAdvantageMutation.mutate({ ...advantag, ...values });
    };

    const mutation = useMutation((updatedData) => UpdateFaqs(props.Id, updatedData), {
        onSuccess: () => {
            queryClient.invalidateQueries('getFaqs');
            setEditFaqs(false);
        },
    });

    const handleUpdate = async (values) => {
        try {
            await mutation.mutateAsync(values);
        } catch (error) {
            console.error('Error updating FAQ:', error);
        }
    };

    return (
        <>
            <tbody>
                <tr>
                    <td style={{ display: 'none' }}>{props.dto}</td>
                    <td>{props.number}</td>
                    <td>{props.title}</td>
                    <td style={props.berirleme === 1 ? {} : { display: 'none' }} className="Slidersss">
                        <Button style={{ backgroundColor: 'yellow' }}>
                            <Link to={`/AdvantagesDetails/${props.Id}`}>Details</Link>
                        </Button>
                    </td>
                    <td style={props.berirleme === 2 ? {} : { display: 'none' }} className="Slidersss">
                        <Button style={{ backgroundColor: 'yellow' }}>
                            <Link to={`/FaqsDetails/${props.Id}`}>Details</Link>
                        </Button>
                    </td>
                    <td className="Artirrr" style={props.berirleme === 1 ? {} : { display: 'none' }}>
                        <Button onClick={() => setEditAdvantages(!editAdvantages)} variant="primary">
                            Edit
                        </Button>
                    </td>
                    <td className="Artirrr" style={props.berirleme === 2 ? {} : { display: 'none' }}>
                        <Button onClick={() => setEditFaqs(!editFaqs)} variant="primary">
                            Edit
                        </Button>
                    </td>
                    <td style={props.berirleme === 1 ? {} : { display: 'none' }} className="Artirrr">
                        <Button onClick={() => handleRemove(props.Id)} variant="danger">
                            Remove
                        </Button>
                    </td>
                    <td style={props.berirleme === 2 ? {} : { display: 'none' }} className="Artirrr">
                        <Button onClick={() => handleRemoveFaqs(props.FaqId)} variant="danger">
                            Remove
                        </Button>
                    </td>
                </tr>
                {editAdvantages === true ? (
                    <div style={{ height: '250px' }} id="SliderEdit">
                        <Formik
                            initialValues={{
                                Title: advantag?.title,
                                Descrption: advantag?.description,
                            }}
                            onSubmit={handleAdvantageSubmit}
                        >
                            <Form id="EditAdvantage">
                                <div>
                                    <label>Title</label>
                                    <Field
                                        type="text"
                                        name="Title"
                                        placeholder="Advantages Title"
                                    />
                                </div>
                                <div>
                                    <label>Descrption</label>
                                    <Field
                                        type="text"
                                        name="Descrption"
                                        placeholder="Advantages Description"
                                    />
                                </div>
                                <Button type="submit">Update</Button>
                            </Form>
                        </Formik>
                    </div>
                ) : (
                    <></>
                )}
                {editFaqs === true ? (
                    <div style={{ height: '250px' }} id="SliderEdit">
                        <Formik
                            initialValues={{
                                title: props.title,
                                description: props.description,
                            }}
                            onSubmit={handleUpdate}
                        >
                            <Form>
                                <div>
                                    <label>Title</label>
                                    <Field type="text" name="title" placeholder="FAQ Title" />
                                </div>
                                <div>
                                    <label>Description</label>
                                    <Field type="text" name="description" placeholder="FAQ Description" />
                                </div>
                                <button type="submit">Update</button>
                            </Form>
                        </Formik>
                    </div>
                ) : (
                    <></>
                )}
            </tbody>
        </>
    );
};

export default Advantagecard;
