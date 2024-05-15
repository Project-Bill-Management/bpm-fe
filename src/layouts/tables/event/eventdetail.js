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

function DetailEvent() {
    const { id_circle, id_event } = useParams();
    const navigate = useNavigate();
    const [showTransaksiModal, setShowTransaksiModal] = useState(false);
    const [transaction_name, setTransaction_name] = useState("");
    const [price, setPrice] = useState("");
    const [transaction_nameError, setTransaction_nameError] = useState(null);
    const [priceError, setPriceError] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [events, setEvents] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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
            const response = await axios.get(`http://152.42.188.210:8080/index.php/api/auth/get_events/${id_event}`, { headers });
            console.log("Response dari server:", response.data);
            setEvents(response.data);
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
        setSelectedMembers(prev =>
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
                members: selectedMembers
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
                        <Box display="flex" alignItems="center" mb={8} mt={8}>
                            <Box position="relative">
                                <ArrowBackIcon style={{ position: 'absolute', top: '-100px', left: '50px', cursor: 'pointer' }} onClick={() => navigate(-1)} />
                            </Box>
                            <Box>
                                <img src={info} alt="Invitation" style={{ width: '150px', height: '150px', marginRight: '20px', marginLeft: "60px" }} />
                            </Box>
                            <Box>
                                {events && events.length > 0 && events.map((event) => (
                                    <React.Fragment key={event.id_event}>
                                        <SoftTypography variant="h6" fontWeight="bold">
                                            Detail Event {event.nama_event}
                                        </SoftTypography>
                                        <SoftTypography variant="h6" fontWeight="bold">
                                            {event.start_event} - {event.end_event}
                                        </SoftTypography>
                                        <SoftTypography variant="h6" color="text" fontWeight="medium" style={{ marginRight: '30px' }}>
                                            {event.deskripsi}
                                        </SoftTypography>
                                    </React.Fragment>
                                ))}
                                <SoftTypography variant="h6" fontWeight="bold">
                                    Split Bill
                                </SoftTypography>
                                {Array.isArray(members) && members.length > 0 ? (
                                    members.map(members => (
                                        <SoftTypography key={members.user_id} variant="h6" fontWeight="bold">
                                            {members.username}
                                        </SoftTypography>
                                    ))
                                ) : (
                                    <SoftTypography variant="h6" color="text" fontWeight="medium">
                                        No members found
                                    </SoftTypography>
                                )}
                                <Box display="flex" justifyContent="space-between" width="80%">
                                    <SoftTypography variant="h6" fontWeight="bold">
                                        Total bill: 1.000.000
                                    </SoftTypography>
                                    <SoftTypography
                                        display="flex" justifyContent="flex-end" width="50%"
                                        component="a"
                                        href="#"
                                        variant="button"
                                        color="text"
                                        fontWeight="medium"
                                        sx={{
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
                                        detail transaction
                                        <Icon className="material-icons-round" sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                                    </SoftTypography>
                                </Box>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="flex-end" alignItems="flex-end" mr={3} mb={3}>
                            <Button variant="contained" color="primary" onClick={showModalTransaksi}>
                                Add Transaction
                            </Button>
                        </Box>
                    </Box>
                </Card>
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

export default DetailEvent;
