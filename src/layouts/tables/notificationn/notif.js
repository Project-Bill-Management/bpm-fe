import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Typography } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import megaphone from 'assets/images/megaphone.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('jwtToken');
                const userId = localStorage.getItem('userId');
                if (!token) {
                    throw new Error("Token not found. Please login again.");
                }

                const response = await axios.get(`http://152.42.188.210:8080/api/auth/notifications/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.status === 200) {
                    setNotifications(response.data.notifications);
                } else {
                    throw new Error('Failed to fetch notifications');
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
                setError("Failed to fetch notifications. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [userId]);

    return (
        <DashboardLayout>
            <Box display="flex" flexDirection="column" minHeight="100vh" width="100%">
                <Card>
                    <Box p={4} display="flex" alignItems="center" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                        <ArrowBackIcon />
                        <Typography variant="h6" color="text" style={{ marginLeft: '8px' }}>Back</Typography>
                    </Box>
                    <Box py={2} px={2}>
                        {loading ? (
                            <Box p={3} textAlign="center">
                                <SoftTypography>Loading...</SoftTypography>
                            </Box>
                        ) : notifications.length === 0 ? (
                            <Box p={3} textAlign="center">
                                <SoftTypography>No notifications</SoftTypography>
                            </Box>
                        ) : (
                            <Box py={3} px={5} alignItems="center">
                                {notifications.map(item => (
                                    <Box key={item.id} p={2} borderBottom="1px solid #ddd" display="flex" alignItems="center" style={{ padding: '5px' }}>
                                        <img src={megaphone} alt="Megaphone" style={{ marginRight: '10px', width: '30px', height: '30px' }} />
                                        <SoftTypography variant="description" color="text" style={{ fontSize: '15px' }}>{item.message}</SoftTypography>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Card>
            </Box>
        </DashboardLayout>
    );
    
}

export default Notification;
