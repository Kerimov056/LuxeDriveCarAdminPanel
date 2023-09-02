import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { removeFaqs, UpdateFaqs } from '../../Services/faqsServices';
import { removeAdvatages, byAdvatages, UpdateAdvantage } from '../../Services/advantageServices';
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

    const [updatedTitle, setUpdatedTitle] = useState(props.title);
    const [updatedDescription, setUpdatedDescription] = useState(props.description);

    const handleUpdate = async () => {
        try {
            const updatedData = {
                Title: updatedTitle,
                Descrption: updatedDescription,
            };
            await UpdateAdvantage(props.Id, updatedData);
            setEditAdvantages(false);
            queryClient.invalidateQueries(['getAllAdvatages']);
        } catch (error) {
            console.error('Error updating advantage:', error);
        }
    };

    const handleUpdateFaqs = async () => {
        try {
            const updatedData = {
                Title: updatedTitle,
                Descrption: updatedDescription,
            };
            await UpdateFaqs(props.Id, updatedData);
            setEditFaqs(false);
            queryClient.invalidateQueries(['getFaqs']);
        } catch (error) {
            console.error('Error updating faqs:', error);
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
                    <div  id="SliderEdit">
                        <div className='Advantegeedit'>
                            <label>Title</label><br/>
                            <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
                        </div>
                        <div className='Advantegeedit'>
                            <label>Descrption</label><br/>
                            <input type="text" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
                        </div>
                        <Button onClick={handleUpdate} variant="success">
                            Update
                        </Button>
                    </div>
                ) : (
                    <></>
                )}
                {editFaqs === true ? (
                    <div style={{ height: '250px' }} id="SliderEditFaqs">
                        <Formik
                            initialValues={{
                                title: props.title,
                                description: props.description,
                            }}
                            onSubmit={handleUpdateFaqs}
                        >
                            <Form>
                                <div className='Advantegeedit' >
                                    <label >Title</label>
                                    <Field type="text" name="title" placeholder="FAQ Title" />
                                </div>
                                <div className='Advantegeedit'>
                                    <label>Description</label>
                                    <Field type="text" name="description" placeholder="FAQ Description" />
                                </div>
                                <Button className='UpdpateFaq' type="submit">Update</Button>
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
