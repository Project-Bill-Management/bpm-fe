import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Icon from '@mui/material/Icon';
import time from "assets/images/time.png";

function EventJoin() {
    const [isLoading, setIsLoading] = useState(false);
    const [nama_event, setNama_event] = useState("");
    const [nama_eventError, setNama_eventError] = useState(null);
    const [deskripsi, setDeskripsi] = useState("");
    const [deskripsiError, setDeskripsiError] = useState(null);
    const [start_eventErr, setStart_eventErr] = useState(null);
    const [end_eventError, setEnd_eventError] = useState(null);
    const { id_circle, circle_name, id_event } = useParams();
    const [showEventModal, setShowEventModal] = useState(false);
    const [start_event, setStart_event] = useState(new Date().toISOString().slice(0, 19));
    const [end_event, setEnd_event] = useState(new Date().toISOString().slice(0, 19));
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    const fetchData = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError("Token not found. Please login again.");
            setIsLoading(false);
            return;
        }
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const response = await axios.get(`http://152.42.188.210:8080/index.php/api/auth/get_events/${id_circle}`, { headers });
            console.log("Response dari server:", response.data);
            setEvents(response.data.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Failed to fetch data. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleJoinEvent = async (id_event) => {
        const token = localStorage.getItem('jwtToken');
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const response = await axios.post(`http://152.42.188.210:8080/api/auth/join-event/${id_event}`, {}, { headers });
            console.log(response);
            toast.success('Successfully joined the event');
        } catch (error) {
            console.error("error joining event:", error);
            if (error.response) {
                console.error("Status code:", error.response.status);
                console.error("Response data:", error.response.data);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Request setup error:", error.message);
            }
            toast.error('Failed to join the event');
        }
    };

    return (
        <DashboardLayout>
            <ToastContainer />
            <Card>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
                    <div>
                        <SoftTypography variant="h6" fontWeight="bold">
                            Circle {circle_name}
                        </SoftTypography>
                    </div>
                </SoftBox>
                <SoftBox pb={3} />
            </Card>
            <SoftBox pb={2} />
            {events && events.length > 0 && events.map((item) => (
                <Card key={item.id_event} style={{ marginBottom: '20px' }}>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <SoftTypography variant="h5" fontWeight="bold" style={{ marginLeft: "50px", marginRight: "10px" }}>
                                {item.nama_event}
                            </SoftTypography>
                            <img src={time} alt="time" style={{ marginLeft: '25px', marginRight: '25px', width: '150px', height: '150px' }} />
                            <SoftBox ml={2}>
                                <SoftTypography variant="body2" color="text" fontWeight="medium">
                                    {item.start_event} - {item.end_event}
                                </SoftTypography>
                                <SoftTypography variant="body2" color="text" fontWeight="medium">
                                    {item.deskripsi}
                                </SoftTypography>
                                <div style={{ borderBottom: '1px solid #ccc', width: '100%' }}></div>
                                <Link to={`/detailevent/${item.id_event}`}>
                                    <SoftTypography
                                        component="span"
                                        variant="button"
                                        color="text"
                                        fontWeight="medium"
                                        sx={{
                                            mt: "auto",
                                            mr: "auto",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            cursor: "pointer",

                                            "& .material-icons-round": {
                                                fontSize: "1.125rem",
                                                transform: `translate(2px, -0.5px)`,
                                                transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                                            },

                                            "&:hover .material-icons-round, &:focus  .material-icons-round": {
                                                transform: `translate(6px, -0.5px)`,
                                            },
                                        }}
                                    >
                                        view event detail
                                        <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                                    </SoftTypography>
                                </Link>
                            </SoftBox>
                        </div>
                    </SoftBox>
                    <SoftBox display="flex" flexDirection="column" alignItems="flex-end" style={{ marginRight: "20px" }}>
                        {/* <Link to={`/detailevent/${item.id_event}/${item.nama_event}`}> */}
                        <Button variant="contained" color="primary" onClick={() => handleJoinEvent(item.id_event)}>
                            Join
                        </Button>
                        {/* </Link> */}
                    </SoftBox>
                    <SoftBox pb={3} />
                </Card>
            ))}
            <SoftBox pb={3} />
        </DashboardLayout>
    );
}

export default EventJoin;
