import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";
import CardCompanent from "./FoCompanent/CardCompanent";
import ReservCar from "./FoCompanent/ReservCar";
import Notifications from "./FoCompanent/Notifications";
import Confirmed from "./FoCompanent/Confirmed";
import ComplatedReservation from "./FoCompanent/ComplatedReservation";
import CanceledReservation from "./FoCompanent/CanceledReservation";
import { useQuery } from "react-query";
import { getCampaignStatistik } from "../Services/campaignStatistik";
import { getReservAll } from "../Services/reservationServices";
import GameList from "./FoCompanent/Game/GameList";



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


function Dashboard() {

  const { data: statistik } = useQuery({
    queryKey: ["getCampaignStatistik"],
    queryFn: getCampaignStatistik,
    staleTime: 0,
  });

  const { data: reservAll } = useQuery({
    queryKey: ["getReservAll"],
    queryFn: getReservAll,
    staleTime: 0,
  });

  const statis = statistik?.data[0]?.reservationSum;
  const reserv = reservAll?.data;

  const change = reserv - statis;

  const faizChange = 50 - change;
  const faizStatis = 50  - faizChange;

  return (
    <>
      <Container fluid>
        <Row>

          <CardCompanent />  {/*All Cars */}

          <ReservCar />   {/* hal hazirda reservde olan car */}

          <Confirmed />   {/* tesdiqlenmis reservation */}

          <Notifications /> {/* Reserv tesdiqi gozlenilen reservationlar*/}

          <ComplatedReservation />  {/*Tamamlanmis Reservatonlar */}

          <CanceledReservation />  {/*Legv edilmis Reservationlar */}

          <GameList />  {/*Game'den  endirim qazaimis Userler */}

        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Users Behavior</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "9:00AM",
                        "12:00AM",
                        "3:00PM",
                        "6:00PM",
                        "9:00PM",
                        "12:00PM",
                        "3:00AM",
                        "6:00AM",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                        [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">  {/* carlarin qrafiki */}
            <Card>
              <Card.Header>
                <Card.Title as="h4">{statistik?.data[0]?.campaignName} Campaign Statistics</Card.Title>
                <p className="card-category"><CountdownTimer targetDate={new Date(statistik?.data[0]?.finshTime)} /></p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: [faizChange ? faizChange : '', faizStatis ? faizStatis : '',"50%"],
                      series: [change ? change : '', statis ? statis : '', reserv ? reserv : ''],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Reservation <i className="fas fa-circle text-danger"></i>
                  Bounce <i className="fas fa-circle text-warning"></i>
                  All Reservation
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Statistics of Reservations after discount
                </div>
              </Card.Body>
            </Card>
          </Col>      {/* ------- */}
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
