import React from 'react'
import './reservDetail.scss'
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { getByReserv } from "../../Services/reservationServices";

const ReservDetail = () => {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useHistory();

    const { data: byReserv } = useQuery(["byReserc", id], () =>
        getByReserv(id)
    );

    console.log(byReserv);
    return (
        <>
            <div class="ReservDetailCard">
                sadasd
            </div>
        </>
    )
}

export default ReservDetail