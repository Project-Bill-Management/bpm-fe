import React, { useState, useEffect } from 'react';
import { Box, Card } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Notification() {
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
          setNotifications(response.data.notifications); // Menggunakan response.data.notifications
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
      <Box display="flex" flexDirection="column" minHeight="100vh" width="80%">
        <Card>
          <Box py={3} px={3}>
            <Box
              display="flex" flexDirection="column" width="100%" height="80%">
              <Box display="flex" textAlign="center" mb={1}>
                <SoftTypography variant="h6" fontWeight="bold">
                  Notifications
                </SoftTypography>
              </Box>
            </Box>
          </Box>
        </Card>
        <Box py={2} px={2}>
          <Card>
            {loading ? (
              <Box p={3} textAlign="center">
                <SoftTypography>Loading...</SoftTypography>
              </Box>
            ) : notifications.length === 0 ? (
              <Box p={3} textAlign="center">
                <SoftTypography>No notifications</SoftTypography>
              </Box>
            ) : (
              <Box>
                {notifications.map(item => (
                  <Box key={item.id} p={3} borderBottom="1px solid #ddd">
                    <SoftTypography variant="body1">{item.message}</SoftTypography>
                    <SoftTypography variant="caption" color="textSecondary">{item.created_at}</SoftTypography>
                  </Box>
                ))}
              </Box>
            )}
          </Card>
        </Box>
      </Box>
    </DashboardLayout>
  );
}

export default Notification;
