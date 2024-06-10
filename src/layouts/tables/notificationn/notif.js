import React, { useState, useEffect } from 'react';
import { Box, Card, Typography } from "@mui/material";
import { Button as BootstrapButton } from 'react-bootstrap';
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import megaphone from 'assets/images/megaphone.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
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

    const handleApprove = async (notificationId) => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                throw new Error("Token not found. Please login again.");
            }

            await axios.post(`http://152.42.188.210:8080/api/auth/notifications/${notificationId}/approve`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setNotifications(notifications.filter(notification => notification.id !== notificationId));
        } catch (error) {
            console.error("Error approving notification:", error);
            setError("Failed to approve notification. Please try again.");
        }
    };

    const handleDecline = async (notificationId) => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                throw new Error("Token not found. Please login again.");
            }

            await axios.post(`http://152.42.188.210:8080/api/auth/notifications/${notificationId}/decline`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setNotifications(notifications.filter(notification => notification.id !== notificationId));
        } catch (error) {
            console.error("Error declining notification:", error);
            setError("Failed to decline notification. Please try again.");
        }
    };

    return (
        <DashboardLayout>
            <Box display="flex" flexDirection="column" width="100%">
                <Card>
                    <Box p={2} display="flex" alignItems="center" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                        <ArrowBackIcon />
                        <Typography variant="h6" color="text" style={{ marginLeft: '8px' }}>Back</Typography>
                    </Box>
                    <Box py={2} px={2}>
                        {loading ? (
                            <Box p={2} textAlign="center">
                                <SoftTypography>Loading...</SoftTypography>
                            </Box>
                        ) : notifications.length === 0 ? (
                            <Box p={2} textAlign="center">
                                <SoftTypography>No notifications</SoftTypography>
                            </Box>
                        ) : (
                            <Box>
                                {notifications.map(item => (
                                    <Box key={item.id} p={2} borderBottom="1px solid #ddd" display="flex" alignItems="center" justifyContent="space-between">
                                        <Box display="flex" alignItems="center">
                                            <img src={megaphone} alt="Megaphone" style={{ marginRight: '10px', width: '30px', height: '30px' }} />
                                            <SoftTypography variant="description" color="text" style={{ fontSize: '15px' }}>{item.message}</SoftTypography>
                                        </Box>
                                        <Box>
                                            <BootstrapButton ariant="primary" className="px-4" onClick={() => handleApprove(item.id)} style={{ marginRight: '8px' }}>Approve</BootstrapButton>
                                            <BootstrapButton type='submit' variant="danger" onClick={() => handleDecline(item.id)}>Decline</BootstrapButton>
                                        </Box>
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
