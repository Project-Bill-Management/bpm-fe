import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftTypography from "components/SoftTypography";
import axios from 'axios';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PDFViewer, Document, Page } from '@react-pdf/renderer';

function Bill() {
    const [paymentProofs, setPaymentProofs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedBill, setSelectedBill] = useState(null);
    const { id_circle } = useParams();
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
                setLoading(true);
                const response = await axios.get(`http://152.42.188.210:8080/api/auth/payment-proofs/${id_circle}`, { headers });
                setPaymentProofs(response.data.payment_proofs);
            } catch (error) {
                console.error("Error fetching payment proofs:", error);
                setError("Failed to fetch payment proofs. Please try again.");
            } finally {
                setLoading(false);
            }
        };


        fetchPaymentProofs();
    }, [id_circle]);

    const handleClickOpen = (bill) => {
        setSelectedBill(bill);
    };

    const handleClose = () => {
        setSelectedBill(null);
    };

    console.log("kesel, pengen bakar-bakar");

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
                                            <CreditCardIcon style={{ marginRight: '8px' }} />
                                            <Box>
                                                <Typography variant="h6" fontWeight="bold">username : {proof.user.username}</Typography>
                                                <SoftTypography variant="h6"  fontWeight="medium" color="text">status : {proof.status}</SoftTypography>
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
                    <DialogTitle>status kehidupan</DialogTitle>
                    <DialogContent dividers>
                        {selectedBill && (
                            <Box>
                                {/* <Typography variant="h6">{selectedBill.user.username}</Typography> */}
                                <Typography variant="body1">kesel banget eg, pengen resign</Typography>
                                {/* <Typography variant="body2" color="textSecondary">Due Date: {new Date(selectedBill.status).toLocaleDateString()}</Typography>
                                <Typography variant="body1" color={selectedBill.paid ? 'green' : 'red'}>
                                    {selectedBill.paid ? 'Paid off' : (
                                        <Box>
                                            <embed src={`http://152.42.188.210:8080${selectedBill.file_url}`} type="application/pdf" width="100%" height="600px" />
                                        </Box>
                                    )}
                                </Typography> */}
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
