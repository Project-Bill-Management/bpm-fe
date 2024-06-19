import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftTypography from "components/SoftTypography";
import axios from 'axios';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SoftBox from "components/SoftBox";
import business from "assets/images/business.png";
import cat from "assets/images/avatar-animal/cat.png";
import clipboard from "assets/images/avatar-animal/clipboard.png";
import group from "assets/images/avatar-animal/group.png";
import time from "assets/images/time.png";
import { Button as BootstrapButton } from 'react-bootstrap';

function Bill() {
    const [paymentProofs, setPaymentProofs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedBill, setSelectedBill] = useState(null);
    const { id_circle, id_event } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaymentProofs = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                setError("Token not found. Please login again.");
                setLoading(false);
                return;
            }
            const headers = { 'Authorization': `Bearer ${token}` };
            try {
                const response = await axios.get(`http://152.42.188.210:8080/index.php/api/auth/circles/${id_circle}/events/${id_event}/payment-proofs`, { headers });
                if (response.data && Array.isArray(response.data.payment_proofs)) {
                    setPaymentProofs(response.data.payment_proofs);
                } else {
                    setPaymentProofs([]);
                }
            } catch (error) {
                console.error("Error fetching payment proofs:", error);
                setError("Failed to fetch payment proofs. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentProofs();
    }, [id_circle, id_event]);

    const handleClickOpen = (bill) => {
        setSelectedBill(bill);
    };

    const handleClose = () => {
        setSelectedBill(null);
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
                        ) : error ? (
                            <Box p={2} textAlign="center">
                                <SoftTypography color="error">{error}</SoftTypography>
                            </Box>
                        ) : paymentProofs.length === 0 ? (
                            <Box p={2} textAlign="center">
                                <SoftTypography>No payment proofs found</SoftTypography>
                            </Box>
                        ) : (
                            <Box>
                                {paymentProofs.map(proof => (
                                    <Box key={proof.id} p={2} borderBottom="1px solid #ddd" display="flex" alignItems="center" justifyContent="space-between" style={{ cursor: 'pointer' }}>
                                        <Box display="flex" alignItems="center" onClick={() => handleClickOpen(proof)}>
                                            <img src={business} style={{ width: '30px', height: '30px', marginLeft: '10px', marginRight: "10px" }} />
                                            <Box>
                                                <Typography variant="h6" fontWeight="bold">Hi, your friend makes payment circle from {proof.circle_name} check and and approves!</Typography>
                                                <SoftTypography variant="description" color="text" style={{ fontSize: '15px' }}>{proof.username} - {proof.status}</SoftTypography>
                                            </Box>
                                        </Box>
                                        <Typography variant="body1" color={proof.paid ? 'green' : 'red'}>
                                            {proof.paid ? 'Paid off' : <PictureAsPdfIcon onClick={() => handleClickOpen(proof)} />}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Card>

                <Dialog
                    open={!!selectedBill}
                    onClose={handleClose}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        <SoftTypography>Payment Detail</SoftTypography>
                    </DialogTitle>
                    <DialogContent dividers>
                        {selectedBill && (
                            <Box>
                                <SoftTypography variant="body1" color={selectedBill.paid ? 'green' : 'red'}>
                                    <SoftBox pb={3} />
                                    {selectedBill.paid ? 'Paid off' : (
                                        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Box>
                                            <SoftTypography variant="description" color="text" style={{ fontSize: '15px' }}>
                                            <img src={group} style={{ width: '30px', height: '30px', marginBottom: '10px', marginLeft: '10px', marginRight: "10px" }} />
                                            circle : {selectedBill.circle_name}
                                            </SoftTypography>
                                            <SoftTypography variant="description" color="text" style={{ fontSize: '15px' }}>
                                            <img src={time} style={{ width: '30px', height: '30px', marginBottom: '10px', marginLeft: '10px', marginRight: "10px" }} />
                                            event : {selectedBill.event_name}
                                         
                                            </SoftTypography>
                                            </Box>
                                            <Box>
                                                <SoftTypography variant="description" color="text" style={{ fontSize: '15px' }}>
                                                    <img src={cat} style={{ width: '30px', height: '30px', marginBottom: '10px', marginLeft: '10px', marginRight: "10px" }} />
                                                    from : {selectedBill.username}</SoftTypography>
                                                <SoftTypography variant="description" color="text" style={{ fontSize: '15px' }}>
                                                    <img src={clipboard} style={{ width: '30px', height: '30px', marginLeft: '10px', marginRight: "10px" }} />status : {selectedBill.status}</SoftTypography>
                                            </Box>
                                            <embed src={`http://152.42.188.210:8080${selectedBill.file_url}`} type="application/pdf" width="100%" height="600px" />
                                            <Box>
                                            <BootstrapButton variant="danger" style={{ marginBottom: '10px', marginTop: '10px', marginLeft: '10px' }}>
                                                rejected
                                                </BootstrapButton>
                                                <BootstrapButton variant="primary" style={{ marginBottom: '10px', marginTop: '10px', marginLeft: '10px' }}>
                                                accepted
                                                </BootstrapButton>
                                            </Box>
                                            <Box className="alert alert-warning" role="alert">
                                                Pay attention to the attached proof of payment! Click approve if appropriate and decline if not appropriate
                                            </Box>
                                        </Box>
                                    )}
                                </SoftTypography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </DashboardLayout>
    );
}

export default Bill;
