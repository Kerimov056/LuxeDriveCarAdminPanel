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
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Blog from "views/Blog";

const dashboardRoutes = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-alien-33",
    component: Upgrade,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: " ADVANTAGES",
    icon: "nc-icon nc-paper-2",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Slider",
    icon: "nc-icon nc-button-play",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: " CHAUFFEURS",
    icon: "nc-icon nc-circle-09",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "maps",
    icon: "nc-icon nc-square-pin",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "FAQS",
    icon: "nc-icon nc-email-85",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/blog",
    name: "Blog",
    icon: "nc-icon nc-align-left-2",
    component: Blog,
    layout: "/admin"
  },
];

export default dashboardRoutes;
