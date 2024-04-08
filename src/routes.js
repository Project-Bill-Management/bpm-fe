import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import { Message } from "@mui/icons-material";
import MessageList from "layouts/message/index";
import withSplashScreen from "../src/components/SplashScreen";
import InviteCircle from "layouts/tables/InviteCircle";
import MessageDisplay from "layouts/message/MessageDisplay";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Circle",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    // name: "Message Box",
    key: "MessageDisplay",
    route: "/MessageDisplay",
    // icon: <Message size="12px" />,
    component: <MessageDisplay />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Message Box",
    key: "MessageList",
    route: "/MessageList",
    icon: <Message size="12px" />,
    component: <MessageList/>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  // { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    // name: "Sign In",
    key: "sign-in",
    route: "/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    // name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    // name: "Invite Circle",
    key: "invite-circle",
    route: "/InviteCircle/:id_circle/:circle_name",
    icon: <SpaceShip size="12px" />,
    component: <InviteCircle/>,
    noCollapse: true,
  },
];



export default routes;
