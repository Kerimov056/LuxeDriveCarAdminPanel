/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AllCar from "../src/pages/Car/AllCar";
import NotificationsReservation from "../src/pages/Res/NotificationsReservation";
import ConfirmedReservation from '../src/pages/Conformeds/ConfirmedReservation'
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from '@chakra-ui/react'
const queryClinet = new QueryClient();

import AdminLayout from "layouts/Admin.js";
import ChaufCreate from "views/FoCompanent/ChaufCreate";
import CarDetails from "pages/Car/CarDetails";
import CreateCar from "pages/Car/CreateCar";
import ReservDetail from "pages/Res/ReservDetail";
import CReservDetail from "pages/Conformeds/CReservDetail";
import CancledReservations from "pages/Cancleds/CancledReservations"
import CancledReservDetail from "pages/Cancleds/CancledReservDetail";
import RightNowReserv from "pages/NowReserv/RightNowReserv";
import NowDetail from "pages/NowReserv/NowDetail";
import ComplatedReservation from "pages/Complated/ComplatedReservation";
import ComlatedRDetails from "pages/Complated/ComlatedRDetails";
import ChaufferDetails from "views/FoCompanent/ChaufferDetails";
import BlogDetails from "views/FoCompanent/BlogDetails";
import BlogCreate from "views/FoCompanent/BlogCreate";
import AdvantagesDetails from "views/FoCompanent/AdvantagesDetails";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClinet} >
      <ChakraProvider>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/AllCar" component={AllCar} />
          <Route path="/ChaufCreate" component={ChaufCreate} />
          <Route path="/createCar" component={CreateCar} />
          <Route path="/NotificationsReservation" render={NotificationsReservation} />
          <Route path="/ConfirmedReservation" component={ConfirmedReservation} />
          <Route path="/CancledReservations" component={CancledReservations} />
          <Route path="/RightNowReserv" component={RightNowReserv} />
          <Route path="/BlogCreate" component={BlogCreate} />
          <Route path="/ComplatedReservation" component={ComplatedReservation} />
          <Route path="/AdvantagesDetails/:id" component={AdvantagesDetails} />
          <Route path='/ReservDetail/:id' component={ReservDetail} />
          <Route path='/CReservDetail/:id' component={CReservDetail} />
          <Route path='/CancledReservDetail/:id' component={CancledReservDetail} />
          <Route path='/CancledReservDetail/:id' component={NowDetail} />
          <Route path='/ComlatedRDetails/:id' component={ComlatedRDetails} />
          <Route path="/CarDetails/:id" component={CarDetails} />
          <Route path="/ChaufferDetails/:id" component={ChaufferDetails} />
          <Route path="/BlogDetails/:id" component={BlogDetails} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </ChakraProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
