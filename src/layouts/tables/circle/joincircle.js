import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from '@mui/material';
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SuiBadgeDot from "components/SoftBadge";
import SuiBox from "components/SoftBox";
import Table from "examples/Tables/Table";
import SoftAvatar from "components/SoftAvatar";
import team2 from "assets/images/team2.jpg";
import cat from "assets/images/avatar-animal/cat.png";
import deer from "assets/images/avatar-animal/deer.png";
import jaguar from "assets/images/avatar-animal/jaguar.png";
import meerkar from "assets/images/avatar-animal/meerkat.png";
import pandabear from "assets/images/avatar-animal/pandabear.png"
import turtle from "assets/images/avatar-animal/turtle.png";
import Tooltip from "@mui/material/Tooltip";

function JoinCircle() {
    const [circles, setCircles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [circle_name, setcircle_name] = useState("");
    const [id_circle, setId_Circle] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError("Token not found. Please login again.");
            setLoading(false);
            return;
        }
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const response = await axios.get('http://152.42.188.210:8080/api/auth/invited-circles', { headers });
            console.log("Response dari server:", response.data);
            response.data.data.forEach(circle => {
                console.log(circle.creator_username);
            });
            setCircles(response.data.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const avatars = (members) =>
        members.map(([image, name]) => (
          <Tooltip key={name} title={name} placeholder="bottom">
            <SoftAvatar
              src={image}
              alt="name"
              size="xs"
              sx={{
                border: ({ borders: { borderWidth }, palette: { white } }) =>
                  `${borderWidth[2]} solid ${white.main}`,
                cursor: "pointer",
                position: "relative",
    
                "&:not(:first-of-type)": {
                  ml: -1.25,
                },
    
                "&:hover, &:focus": {
                  zIndex: "10",
                },
              }}
            />
          </Tooltip>
        ));


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ToastContainer />
            <SoftBox py={3}>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
                            <SoftTypography variant="h6" fontWeight="bold">
                                Circle Join
                            </SoftTypography>
                    </SoftBox>
                    <SoftBox pb={3} />
                    <SoftBox>
                        <SoftBox
                            sx={{"& .MuiTableRow-root:not(:last-child)": {
                                    "& td": {borderBottom: ({ borders: { borderWidth, borderColor } }) =>`${borderWidth[1]} solid ${borderColor}`,
                                    },
                                },
                            }}
                        >

                            <>

                                <Table
                                    columns={[
                                        { name: "image", align: "center" },
                                        { name: "circle", align: "center" },
                                        { name: "members", align:"center"},
                                        { name: "status", align: "center" },
                                        { name: "creator", align: "center" },
                                    ]}
                                    rows={circles.map(circle => ({
                                        image: <SoftAvatar src={team2} />,
                                        circle: <Link to={`/EventJoin/${circle.id_circle}/${circle.circle_name}`}>
                                        {circle.circle_name}
                                    </Link>,
                                        status: (
                                            <SuiBox ml={-1.325}>
                                                <SuiBadgeDot size="small" badgeContent="circle active" />
                                            </SuiBox>
                                        ),
                                        members: (
                                            <SoftBox display="flex" py={1}>
                                                {avatars([
                                                    [cat, "member"],
                                                    [deer, "member"],
                                                    [jaguar, "member"],
                                                    [meerkar, "member"],
                                                    [pandabear, "member"],
                                                    [turtle, "member"],
                                                ])}
                                            </SoftBox>
                                        ),
                                        creator: circle.creator_username,
                                        
                                    }))}
                                />
                                {loading && <SoftTypography style={{ paddingLeft: '20px' }}>Loading...</SoftTypography>}
                                {error && <SoftTypography style={{ paddingLeft: '20px' }}>{error} </SoftTypography>}
                            </>
                        </SoftBox>
                    </SoftBox>
                </Card>
                           </SoftBox>
        </DashboardLayout>
    )
}

export default JoinCircle;