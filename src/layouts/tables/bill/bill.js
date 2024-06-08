import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftTypography from "components/SoftTypography";

// Mock function to generate dummy data with payment status
const generateDummyBills = () => {
    return [
        {
            id: 1,
            eventName: 'Music Festival',
            amount: 50.000,
            dueDate: '2024-07-01',
            paid: true
        },
        {
            id: 2,
            eventName: 'Art Exhibition',
            amount: 30.000,
            dueDate: '2024-07-10',
            paid: false
        },
        {
            id: 3,
            eventName: 'Tech Conference',
            amount: 100.000,
            dueDate: '2024-07-15',
            paid: true
        }
    ];
};

function Bill() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedBill, setSelectedBill] = useState(null); // State to manage selected bill for dialog
    const { circleId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBills = async () => {
            try {
                setLoading(true);
                // Simulating an API call with dummy data
                const dummyBills = generateDummyBills();
                setBills(dummyBills);
            } catch (error) {
                console.error("Error fetching bills:", error);
                setError("Failed to fetch bills. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchBills();
    }, [circleId]);

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
                        ) : bills.length === 0 ? (
                            <Box p={2} textAlign="center">
                                <SoftTypography>No event bills</SoftTypography>
                            </Box>
                        ) : (
                            <Box>
                                {bills.map(bill => (
                                    <Box key={bill.id} p={2} borderBottom="1px solid #ddd" display="flex" alignItems="center" justifyContent="space-between" style={{ cursor: 'pointer' }}>
                                        <Box display="flex" alignItems="center" onClick={() => handleClickOpen(bill)}>
                                            <CreditCardIcon style={{ marginRight: '8px' }} />
                                            <Box>
                                                <Typography variant="h6">{bill.eventName}</Typography>
                                                <Typography variant="body1">Amount: Rp{bill.amount}</Typography>
                                                <Typography variant="body2" color="textSecondary">Due Date: {new Date(bill.dueDate).toLocaleDateString()}</Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="body1" color={bill.paid ? 'green' : 'red'}>
                                            {bill.paid ? 'Paid off' : 'Not paid'}
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
                    <DialogTitle>Bill Details</DialogTitle>
                    <DialogContent dividers>
                        {selectedBill && (
                            <Box>
                                <Typography variant="h6">{selectedBill.eventName}</Typography>
                                <Typography variant="body1">Amount: ${selectedBill.amount}</Typography>
                                <Typography variant="body2" color="textSecondary">Due Date: {new Date(selectedBill.dueDate).toLocaleDateString()}</Typography>
                                <Typography variant="body1" color={selectedBill.paid ? 'green' : 'red'}>
                                    {selectedBill.paid ? 'Sudah Dibayar' : 'Belum Dibayar'}
                                </Typography>
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
