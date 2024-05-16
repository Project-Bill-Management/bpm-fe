import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import time from "assets/images/time.png";
import Icon from '@mui/material/Icon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MuiIcon from '@mui/material/Icon';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Grid } from '@mui/material';

function EventJoin() {
    const [isLoading, setIsLoading] = useState(false);
    const { id_circle, circle_name, id_event } = useParams();
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
            <Grid container spacing={2}>
                {events && events.length > 0 && events.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id_event}>
                        <Card style={{ marginBottom: '20px' }}>
                            <SoftBox display="flex" justifyContent="space-between" pt={3} px={3}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <SoftTypography variant="h5" fontWeight="bold" style={{ marginRight: '15px' }}>
                                        Event {item.nama_event}
                                    </SoftTypography>
                                    <img src={time} alt="time" style={{ width: '100px', height: '100px' }} />
                                </div>
                            </SoftBox>
                            <SoftBox pb={2} />
                            <div style={{ borderBottom: '1px solid #ccc', width: '100%' }}></div>
                            <SoftBox pb={1} />
                            <SoftBox px={3} pb={3}>
                                <Link to={`/DetailEventMyCircle/${id_circle}/${item.id_event}`}>
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
                                        View Detail
                                        <ArrowForwardIcon sx={{ fontWeight: "bold" }} />
                                    </SoftTypography>
                                </Link>
                            </SoftBox>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <SoftBox pb={3} />
        </DashboardLayout>
    );
}

export default EventJoin;
