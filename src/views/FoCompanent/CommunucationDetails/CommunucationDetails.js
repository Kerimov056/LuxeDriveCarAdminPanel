import React from 'react'
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from "react-router-dom";
import { getByCommunications } from "../../../Services/communicationsServices";
import './CommunDetails.scss'
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { SendEmailMessage } from "../../../Services/messageEmail";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CommunucationDetails = () => {

    const { id } = useParams();

    const { data: ByComun } = useQuery(["getByCommunications", id], () =>
        getByCommunications(id)
    );

    const notifySendMessage = () => {
        toast.success(`Send Gamil message ${ByComun?.data?.name} Reservation!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };
    const notifySendMessageError = () => toast.error(`Send Gamil message  ${byReserv?.data?.fullName} Confirem.`);



    const mutation = useMutation(SendEmailMessage, {
        onSuccess: (data) => {
            notifySendMessage();
        },
        onError: (error) => {
            notifySendMessageError()
        },
    });

    const formik = useFormik({
        initialValues: {
            Email: "",
            Message: "",
        },
        onSubmit: async (values) => {
            try {
                await mutation.mutateAsync(values);
                resetForm();
            } catch (error) {
                console.log(error);
            }
        },
    });


    return (
        <>
            <Container id="CommunSDetails">
                <div className='UserComun'>
                    <h3>Name: <span>{ByComun?.data?.name}</span></h3>
                    <h3>SurName: <span>{ByComun?.data?.surName}</span></h3>
                    <h3>Number: <span>{ByComun?.data?.phone}</span></h3>
                    <h3>Email: <span>{ByComun?.data?.email}</span></h3>
                </div>
                <div class="CommunucationDetails">
                    <h3>{ByComun?.data?.note}</h3>
                </div>
            </Container>
            <Container>
                <Container>
                    <div id='UserEmailMessageSend'>
                        <form onSubmit={formik.handleSubmit} class="formUserEmailMessageSend">
                            <div class="title">Contact us</div>
                            <p>Send message to person</p>
                            <input type="email" disabled value={formik.values.Email = ByComun?.data?.email} onChange={formik.handleChange} placeholder="Your email" class="input" />
                            <textarea name='Message' value={formik.values.Message} onChange={formik.handleChange} placeholder="Your message"></textarea>
                            <button style={{ width: "150px", backgroundColor: "#0fb81a" }} type="submit">Send</button>
                        </form>
                    </div>
                    <Link to="/NotificationsReservation"><Button id='GoToBack'>Go To Back</Button></Link>

                </Container>
            </Container>
        </>
    )
}

export default CommunucationDetails

