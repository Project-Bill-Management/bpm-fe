import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Card, Button, TextField, Box, Icon } from '@mui/material';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import AddIcon from "@mui/icons-material/Add";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import info from "assets/images/info.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@material-ui/icons/Event';
import checklist2 from 'assets/images/checklist2.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Grid } from '@material-ui/core'
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import PaymentIcon from '@mui/icons-material/Payment';
import Typography from '@mui/material/Typography';

function DetailEventMyCircle() {
    const { id_circle, id_event } = useParams();
    const navigate = useNavigate();
    const [showTransaksiModal, setShowTransaksiModal] = useState(false);
    const [transaction_name, setTransaction_name] = useState("");
    const [price, setPrice] = useState("");
    const [transaction_nameError, setTransaction_nameError] = useState(null);
    const [priceError, setPriceError] = useState(null);
    const [selected_users, SetSelected_users] = useState([]);
    const [events, setEvents] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [details, setDetails] = useState([]);

    console.log("id_circle:", id_circle);
    console.log("id_event:", id_event);

    useEffect(() => {
        const fetchMembers = async () => {
            const token = localStorage.getItem('jwtToken');
            const headers = { 'Authorization': `Bearer ${token}` };
            try {
                const response = await axios.get(`http://152.42.188.210:8080/api/auth/events/${id_event}/members`, { headers });
                setMembers(response.data.data);
                console.log("id event :", id_event)
            } catch (error) {
                console.log('Failed to fetch members:', error);
            }
        };

        fetchMembers();
    }, [id_event]);

    const fetchData = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError("Token not found. Please login again.");
            setIsLoading(false);
            return;
        }
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const response = await axios.get(`http://152.42.188.210:8080/index.php/api/auth/event/${id_event}`, { headers });
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
    }, [id_event]);

    const GetTransaction = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError("Token not found. Please login again.");
            setIsLoading(false);
            return;
        }
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const response = await axios.get(`http://152.42.188.210:8080/api/auth/get_detail/${id_event}`, { headers });
            console.log("Response dari server:", response.data);
            setDetails(response.data);
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
        GetTransaction();
    }, [id_event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'transaction_name':
                setTransaction_name(value);
                setTransaction_nameError(value.trim() === '' ? '* Transaction name is required' : '');
                break;
            case 'price':
                setPrice(value);
                setPriceError(value.trim() === '' ? '* Price is required' : '');
                break;
            default:
                break;
        }
    };

    const handleMemberSelect = (e) => {
        const { value, checked } = e.target;
        SetSelected_users(prev =>
            checked ? [...prev, value] : prev.filter(member => member !== value)
        );
    };

    const showModalTransaksi = () => {
        setTransaction_name("");
        setPrice("");
        setShowTransaksiModal(true);
    };

    const closeModalTransaksi = () => {
        setTransaction_name("");
        setPrice("");
        setShowTransaksiModal(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!transaction_name || !price) {
            setTransaction_nameError('* Transaction name is required');
            setPriceError('* Price is required');
            return;
        }

        const existingTransaction = transactions.find(transaksi => transaksi.transaction_name === transaction_name);
        if (existingTransaction) {
            toast.error('Transaction already exists');
            return;
        }

        const token = localStorage.getItem('jwtToken');
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const response = await axios.post(`http://152.42.188.210:8080/api/auth/create_transaksi/${id_circle}/${id_event}`, {
                transaction_name: transaction_name,
                price: price,
                members: selected_users,
            }, { headers });
            console.log(response);
            console.log("id:", id_circle);
            closeModalTransaksi();
            setTransactions([...transactions, response.data.data]);
            toast.success('Transaction created successfully');
        } catch (error) {
            console.log('error form:', error);
            toast.error('Failed to create transaction');
        }
    };

    return (
        <DashboardLayout>
            <ToastContainer />
            <Box display="flex" flexDirection="column" minHeight="100vh" width="100%">
                <Card>
                    <Box display="flex" flexDirection="column" minHeight="100%" width="100%">
                        <Box position="relative">
                            <ArrowBackIcon style={{ position: 'absolute', top: '40px', left: '40px', cursor: 'pointer' }} onClick={() => navigate(-1)} />
                        </Box>
                        <Box display="flex" alignItems="center" flexDirection="column" mb={-5} mt={4}>
                            <img src={info} alt="Invitation" style={{ width: '100px', height: '100px', margin: 'auto' }} />
                        </Box>
                        <Box display="flex" alignItems="center" flexDirection="column" mb={4} mt={8}>
                            {events && (
                                <React.Fragment key={events.id_event}>
                                    <SoftTypography variant="h6" fontWeight="bold" style={{ display: 'flex', alignItems: 'center' }}>
                                        Detail Event {events.nama_event}
                                        <img src={checklist2} style={{ width: '20px', height: '20px', marginLeft: '5px' }} />
                                    </SoftTypography>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <SoftTypography variant="h6" fontWeight="bold">
                                            <EventIcon style={{ verticalAlign: 'middle' }} /> {events.start_event} - {events.end_event}
                                        </SoftTypography>
                                        <SoftTypography variant="h6" fontWeight="bold" style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                                            <AccountCircleIcon style={{ marginRight: '5px' }} /> Creator: {events.creator_event}
                                        </SoftTypography>
                                    </div>
                                    <SoftTypography variant="h6" color="text" fontWeight="medium" style={{ marginRight: '30px' }}>
                                        {events.deskripsi}
                                    </SoftTypography>
                                </React.Fragment>
                            )}
                        </Box>
                    </Box>
                </Card>
                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                    <Grid item xs={8} style={{ flexBasis: '70%' }}>
                        <Card>
                            <Box display="flex" flexDirection="column" minHeight="100%" width="100%">
                                <SoftTypography variant="h6" fontWeight="bold" ml={4} mt={4}>
                                    Transaction <PaymentIcon style={{ marginRight: 8 }} />
                                </SoftTypography>
                                <Box display="flex" alignItems="flex-start" flexDirection="column" justifyContent="center">
                                    <Box display="flex" alignItems="flex-start" flexDirection="column" justifyContent="center">
                                        <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center" ml={10} mb={4} mt={2}>
                                            {details && details.data && details.data.users ? (
                                                <div>
                                                    {details.data.users.map((user, index) => (
                                                        <Box display="flex" key={index} width="100%">
                                                            <Typography variant="h6" color="text" fontWeight="medium" style={{ flex: 1 }}>
                                                                {user.username}:
                                                            </Typography>
                                                            <Typography variant="h6" color="text" fontWeight="medium" style={{ flex: 1, textAlign: 'right', paddingLeft: '50px' }}>
                                                                {user.total_price_split}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                    {details.data.total_transaksi && (
                                                        <Box display="flex" mt={2} width="100%">
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <Typography variant="h6" fontWeight="bold" style={{ flex: 5, paddingRight:'50px' }}>
                                                                    Total Transaction:
                                                                </Typography>
                                                                <Typography variant="h6" fontWeight="bold" style={{ flex: 1, textAlign: 'right' }}>
                                                                    {details.data.total_transaksi}
                                                                </Typography>
                                                            </div>

                                                        </Box>
                                                    )}
                                                </div>
                                            ) : (
                                                <Typography variant="h6" color="text" fontWeight="medium">
                                                    Not found
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="flex-end" alignItems="flex-end" mr={3} mb={3}>
                                <Button variant="contained" color="primary" onClick={showModalTransaksi}>
                                    Add Transaction
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={6} style={{ flexBasis: '30%' }}>
                        <Card>
                            <Box display="flex" flexDirection="column" minHeight="100%" width="100%">
                                <SoftTypography variant="h6" fontWeight="bold" ml={4} mt={4}>
                                    Event members <InfoIcon style={{ marginRight: 8 }} />
                                </SoftTypography>
                                <Box display="flex" alignItems="flex-start" flexDirection="column" justifyContent="center" ml={10} mb={4} mt={2}>
                                    {Array.isArray(members) && members.length > 0 ? (
                                        members.map(member => (
                                            <SoftTypography key={member.user_id} variant="h6" fontWeight="bold">
                                                <PeopleIcon /> {member.username}
                                            </SoftTypography>
                                        ))
                                    ) : (
                                        <SoftTypography variant="h6" color="text" fontWeight="medium">
                                            No members found
                                        </SoftTypography>
                                    )}
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

            </Box>
            <div className='body-flex'>
                <div className="overlay" />
                <div className="flex">
                    <div className="col-15 p-5">
                        <Modal show={showTransaksiModal} onHide={closeModalTransaksi} style={{ maxWidth: '1500px', width: '100%' }}>
                            <div className="overlay-icons" />
                            <Modal.Header closeButton>
                                <Modal.Title>Transaction</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className='mb-2' controlId="transaction_name">
                                        <Form.Label>Transaction Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="transaction_name"
                                            value={transaction_name}
                                            onChange={handleChange}
                                            isInvalid={!!transaction_nameError}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {transaction_nameError}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className='mb-2' controlId="price">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="price"
                                            value={price}
                                            onChange={handleChange}
                                            isInvalid={!!priceError}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {priceError}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className='mb-2' controlId="members">
                                        {Array.isArray(members) && members.length > 0 ? (
                                            members.map(member => (
                                                <Form.Check
                                                    key={member.user_id}
                                                    type="checkbox"
                                                    label={member.username}
                                                    value={member.user_id}
                                                    onChange={handleMemberSelect}
                                                />
                                            ))
                                        ) : (
                                            <div>No members available</div>
                                        )}
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={closeModalTransaksi}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleFormSubmit}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DetailEventMyCircle;
