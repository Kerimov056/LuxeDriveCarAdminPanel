import React, { useState, useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import './allcar.scss';
import CarCard from './CarCard';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getCar, IsCampaigns } from "../../Services/carServices";
import Campaign from './Campaign';
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import AllCarMap from './AllCarMap';

const CountdownTimer = ({ targetDate }) => {
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
                setCountdown('Discounts Have Started');
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setCountdown(`${days} day ${hours} hour ${minutes} minute ${seconds} second`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return <div>{countdown}</div>;
};

const AllCar = () => {


    const { appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();

    const { data: allCars } = useQuery({
        queryKey: ["Allcars"],
        queryFn: getCar,
        staleTime: 0,
    });

    const { data: Compn } = useQuery({
        queryKey: ["IsCampaigns"],
        queryFn: IsCampaigns,
        staleTime: 0,
    });


    return (
        <>
            <Container>
                <Row>
                    <div className='LxDrC'>
                        <button data-text="Awesome" class="buttonLXDC">
                            <span class="actual-text">&nbsp;LuxeDrive&nbsp;</span>
                            <span class="hover-textLCD" aria-hidden="true">&nbsp;LuxeDrive&nbsp;</span>
                        </button>
                    </div>
                </Row>

                {Compn?.data === true &&
                    <Row id='IsComp'>
                        <img src='https://www.bellwetheragency.com.au/wp-content/uploads/2022/04/Campaign-Brief-logo-1.png' />
                        <div className='Compagins'>
                            <div>
                                PickUp Campaign:
                                <CountdownTimer targetDate={new Date(allCars?.data[0]?.pickUpCampaigns)} />
                            </div>
                            <div>Finsh Campaign:
                                <CountdownTimer targetDate={new Date(allCars?.data[0]?.returnCampaigns)} /></div>
                            <div>Campaigns Interest: {allCars?.data[0]?.campaignsInterest}%</div>
                        </div>

                    </Row>
                }

                <Row id='AllCarSS' className='mt-5'>
                    <Button variant="primary" size="lg">
                        <Link to='/createCar'>Create Car</Link>
                    </Button>
                    <Button className='RG R'></Button> <span>Booked cars</span>
                    <Button className='RG G'></Button> <span>Rental cars</span>
                </Row>

                <Campaign />

                <Row style={{ marginTop: "40px" }}>
                    <AllCarMap />
                </Row>


                <Row style={{ marginBottom: "40px" }} className='mt-5'>
                    {allCars?.data.map((bycars, index) => (
                        <CarCard images={bycars?.carImages} key={index} Id={bycars?.id} isReserv={bycars?.isReserv} marka={bycars?.marka} model={bycars?.model} year={bycars?.year} />
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default AllCar;