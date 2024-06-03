import { Box, Card } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import megaphone from 'assets/images/megaphone.png';
import { Link } from 'react-router-dom';

function ItemNotif() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { userId } = useParams();

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
                    // Ambil 3 item terbaru
                    const latestNotifications = response.data.notifications.slice(0, 3);
                    setNotifications(latestNotifications);
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
        <Box display="flex" flexDirection="row">
        <Card style={{ width: '300px' }}>
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
                        <Link key={item.id} to={`/Notification`}>
                            <Box p={2} borderBottom="1px solid #ddd" display="flex" alignItems="center" style={{ padding: '2px' }}>
                                <img src={megaphone} alt="Megaphone" style={{ marginRight: '10px', width: '30px', height: '30px' }} />
                                <SoftTypography variant="description" color="text" style={{ fontSize: '14px'}}>{item.message}</SoftTypography>
                            </Box>
                        </Link>
                    ))}
                </Box>
            )}
        </Card>
    </Box>
    );
    
}

export default ItemNotif;