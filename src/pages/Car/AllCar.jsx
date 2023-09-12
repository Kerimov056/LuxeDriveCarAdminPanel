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
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';



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

    // const { data: allCars } = useQuery({
    //     queryKey: ["Allcars"],
    //     queryFn: getCar,
    //     staleTime: 0,
    // });

    const { data: Compn } = useQuery({
        queryKey: ["IsCampaigns"],
        queryFn: IsCampaigns,
        staleTime: 0,
    });


    const [allCars, setCars] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    const fetchCars = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://localhost:7152/api/Car/GetAllCar?page=${page}&pageSize=10`);
            if (response.data && response.data.length > 0) {
                setCars(prevCars => [...prevCars, ...response.data]);
                setPage(page + 1);
            } else {
                setLoading(false); // Tüm arabalar yüklendiğinde loading durumunu kapatın
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
            setLoading(false); // Hata durumunda loading durumunu kapatın
        }
    };


    useEffect(() => {
        fetchCars();
    }, []);


    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            if (!loading) {
                fetchCars();
            }
        }
    };



    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


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
                                <CountdownTimer targetDate={new Date(allCars[0]?.pickUpCampaigns)} />
                            </div>
                            <div>Finsh Campaign:
                                <CountdownTimer targetDate={new Date(allCars[0]?.returnCampaigns)} /></div>
                            <div>Campaigns Interest: {allCars[0]?.campaignsInterest}%</div>
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
                {/*
                <Row style={{ marginTop: "40px" }}>
                    <AllCarMap />
                </Row> */}

                <InfiniteScroll
                    pageStart={0}
                    loadMore={fetchCars}
                    hasMore={!loading}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    <Row style={{ marginBottom: "40px" }} className='mt-5'>
                        {allCars?.map((bycars, index) => (
                            <CarCard images={bycars?.carImages} key={index} Id={bycars?.id} isReserv={bycars?.isReserv} marka={bycars?.marka} model={bycars?.model} year={bycars?.year} />
                        ))}
                    </Row>
                </InfiniteScroll>
            </Container>
        </>
    )
}

export default AllCar;















