import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Grid, Button, CircularProgress } from '@mui/material';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import time from "assets/images/time.png";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function EventJoin() {
    const [isLoading, setIsLoading] = useState(false);
    const { id_circle, circle_name } = useParams();
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [userJoinedEvents, setUserJoinedEvents] = useState([]);

    const fetchData = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError("Token not found. Please login again.");
            setIsLoading(false);
            return;
        }
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const response = await axios.get(`http://152.42.188.210:8080/index.php/api/auth/get_events/${id_circle}`, { headers });
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
    }, [id_circle]);

    useEffect(() => {
        const checkUserJoinedEvents = async () => {
            const joinedEvents = [];
            for (const event of events) {
                const isJoined = await isUserJoined(event.id_event);
                if (isJoined) {
                    joinedEvents.push(event.id_event);
                }
            }
            setUserJoinedEvents(joinedEvents);
        };
        checkUserJoinedEvents();
    }, [events]);
    
    const isUserJoined = async (id_event) => {
        const token = localStorage.getItem('jwtToken');
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const response = await axios.get(`http://152.42.188.210:8080/api/auth/events/${id_event}/members`, { headers });
            const members = response.data.data;
            const currentUser = localStorage.getItem('userId');
            console.log('Current user:', currentUser); // Tambahkan log ini untuk memeriksa nilai currentUser
            console.log('Members:', members); // Tambahkan log ini untuk memeriksa nilai members
            return members.some(member => member.user_id === currentUser);
        } catch (error) {
            console.error("Error checking user join status:", error);
            return false;
        }
    };
    
    const handleJoinEvent = async (id_event) => {
        const token = localStorage.getItem('jwtToken');
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            await axios.post(`http://152.42.188.210:8080/api/auth/join-event/${id_event}`, {}, { headers });
            toast.success('Successfully joined the event');
            setUserJoinedEvents(prev => [...prev, id_event]); // Update userJoinedEvents state
        } catch (error) {
            console.error("Error joining event:", error);
            if (error.response) {
                console.error("Status code:", error.response.status);
                console.error("Response data:", error.response.data);
                if (error.response.status === 400 && error.response.data.message === "User already joined the event") {
                    toast.error('Failed to join the event because you have already joined.');
                } else {
                    toast.error('You have already joined this event');
                }
            } else if (error.request) {
                console.error("No response received:", error.request);
                toast.error('Failed to join the event');
            } else {
                console.error("Request setup error:", error.message);
                toast.error('Failed to join the event');
            }
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
            {isLoading ? (
                <Grid display="flex" justifyContent="center" alignItems="center" height="100px">
                   {isLoading && <SoftTypography style={{ paddingLeft: '20px' }}>Loading...</SoftTypography>}
                </Grid>
            ) : (
                <Grid container spacing={2}>
                    {events.length > 0 ? (
                        events.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id_event}>
                                <Card style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <SoftBox display="flex" justifyContent="space-between" pt={3} px={3}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <SoftTypography variant="h5" fontWeight="bold" style={{ marginLeft: '15px', marginRight: '20px' }}>
                                                    Event {item.nama_event}
                                                </SoftTypography>
                                                <img src={time} alt="time" style={{ marginLeft: '20px', marginRight: '15px', width: '100px', height: '100px' }} />
                                            </div>
                                        </SoftBox>
                                        <SoftBox pb={2} />
                                        <div style={{ borderBottom: '1px solid #ccc', width: '100%' }}></div>
                                        <SoftBox pb={1} />
                                    </div>
                                    <SoftBox px={3} pb={3} display="flex" justifyContent="space-between">
                                        {userJoinedEvents.includes(item.id_event) ? (
                                            <Button variant="outlined" disabled>
                                                Joined
                                            </Button>
                                        ) : (
                                            <Button variant="secondary" color="primary" onClick={() => handleJoinEvent(item.id_event)}>
                                                Join
                                            </Button>
                                        )}
                                        {isUserJoined(item.id_event) && (
                                            <Link to={`/DetailEventMyCircle/${id_circle}/${item.id_event}`}>
                                                <Button variant="secondary" color="primary">
                                                    View Detail
                                                    <ArrowForwardIcon style={{ marginLeft: '5px' }} />
                                                </Button>
                                            </Link>
                                        )}
                                    </SoftBox>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <SoftBox display="flex" justifyContent="center" alignItems="center" height="100px">
                                <SoftTypography variant="h6" color="text" fontWeight="medium">
                                    No events found
                                </SoftTypography>
                            </SoftBox>
                        </Grid>
                    )}
                </Grid>
            )}
            <SoftBox pb={3} />
        </DashboardLayout>
    );
}

export default EventJoin;
