import React from 'react'
import NTable from "./NTable";
import { useQuery } from "react-query";
import { getReservPedding } from "../../Services/reservationServices";
import { Container } from 'react-bootstrap';


const NotificationsReservation = () => {
    const { data: reservPedding, isError } = useQuery({
        queryKey: ["reservAllPedding"],
        queryFn: getReservPedding,
        staleTime: 0,
    });
    if (isError) {
        return <div>Bir hata oluştu</div>;
    }

    return (
        <>
            <Container>
                <div>{reservPedding?.data?.map((pedding, index) => (
                    <NTable
                        key={index}
                        number={index + 1}
                        marka={pedding?.reservCar?.marka}
                        model={pedding?.reservCar?.model}
                        pick={pedding?.pickupDate}
                        return={pedding?.returnDate} />
                ))}
                </div>
            </Container>
        </>
    )
}

export default NotificationsReservation