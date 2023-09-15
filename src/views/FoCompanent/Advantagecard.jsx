import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { removeFaqs, UpdateFaqs } from '../../Services/faqsServices';
import { removeAdvatages, byAdvatages, UpdateAdvantage } from '../../Services/advantageServices';
import './advantagecard.scss';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Advantagecard = (props) => {
    const [editAdvantages, setEditAdvantages] = useState(false);
    const [editFaqs, setEditFaqs] = useState(false);

    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data: advantag } = useQuery(['advantages', id], () => byAdvatages(id));


    const notifyRemoveSuccess = () => {
        toast.success(`${props.title} Deleted successfully!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const notifyRemoveError = () => toast.error(`Error Delete ${props.title}.`);

    const notifyFaqsRemoveSuccess = () => {
        toast.success(`Faq Deleted successfully!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const notifyFaqsRemoveError = () => toast.error(`Error Delete Faq.`);


    const handleRemove = async (advantagesId) => {
        try {
            await removeAdvatages(advantagesId);
            queryClient.invalidateQueries(['AdvantagesRemove', advantagesId]);
            queryClient.invalidateQueries(['getAllAdvantages']);
            notifyRemoveSuccess()
        } catch (error) {
            notifyRemoveError();
        }
    };

    const handleRemoveFaqs = async (faqsId) => {
        try {
            await removeFaqs(faqsId);
            queryClient.invalidateQueries(['FaqsRemove', faqsId]);
            queryClient.invalidateQueries(['getFaqs']);
            notifyFaqsRemoveSuccess();
        } catch (error) {
            notifyFaqsRemoveError()
        }
    };

    const [updatedTitle, setUpdatedTitle] = useState(props.title);
    const [updatedDescription, setUpdatedDescription] = useState(props.description);

    const notifySuccess = () => toast.success(`${updatedTitle} updated successfully!`);
    const notifyError = () => toast.error(`Error updating  ${updatedTitle}.`);

    const handleUpdate = async () => {
        try {
            const updatedData = {
                Title: updatedTitle,
                Descrption: updatedDescription,
            };
            await UpdateAdvantage(props.Id, updatedData);
            setEditAdvantages(false);
            queryClient.invalidateQueries(['getAllAdvatages']);
            notifySuccess();
        } catch (error) {
            notifyError();
        }
    };


    const [updatedTitleFaq, setUpdatedTitleFaq] = useState(props.title);
    const [updatedDescriptionFaq, setUpdatedDescriptionFaq] = useState(props.description);

    const notifyFaqsError = () => toast.error(`Error updating  ${updatedTitleFaq}.`);
    const notifyFaqsUpdateSuccess = () => {
        toast.success(`${updatedTitleFaq} Update successfully!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const handleUpdateFaqs = async () => {
        try {
            const updatedData = {
                Title: updatedTitleFaq,
                Descrption: updatedDescriptionFaq,
            };

            await UpdateFaqs(props.Id, updatedData);
            queryClient.invalidateQueries(['getFaqs']);
            setEditFaqs(false);
            notifyFaqsUpdateSuccess()
        } catch (error) {
            notifyFaqsError()
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
                    <div id="SliderEdit">
                        <div className='Advantegeedit'>
                            <label>Title</label><br />
                            <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
                        </div>
                        <div className='Advantegeedit'>
                            <label>Descrption</label><br />
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
                        <Form onSubmit={(e) => e.preventDefault()}>
                            <div className='Advantegeedit' >
                                <label >Title</label>
                                <input type="text" value={updatedTitleFaq} onChange={(e) => setUpdatedTitleFaq(e.target.value)} />
                            </div>
                            <div className='Advantegeedit'>
                                <label>Description</label>
                                <input type="text" value={updatedDescriptionFaq} onChange={(e) => setUpdatedDescriptionFaq(e.target.value)} />
                            </div>
                            <Button onClick={handleUpdateFaqs} className='UpdpateFaq' type="submit">
                                Update
                            </Button>
                        </Form>
                    </div>
                ) : (
                    <></>
                )}
            </tbody>
        </>
    );
};

export default Advantagecard;
