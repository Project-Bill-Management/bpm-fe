import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Card, Button, Box, Grid, Typography } from '@mui/material';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import info from "assets/images/info.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@material-ui/icons/Event';
import checklist2 from 'assets/images/checklist2.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import PaymentIcon from '@mui/icons-material/Payment';
import SearchIcon from '@material-ui/icons/Search';

function DetailEventMyCircle() {
    const { id_circle, id_event } = useParams();
    const navigate = useNavigate();
    const [showTransaksiModal, setShowTransaksiModal] = useState(false);
    const [transaction_name, setTransaction_name] = useState("");
    const [price, setPrice] = useState("");
    const [transaction_nameError, setTransaction_nameError] = useState(null);
    const [priceError, setPriceError] = useState(null);
    const [selected_users, SetSelected_users] = useState([]);
    const [transactionHistory, settransactionHistory] = useState([]);
    const [events, setEvents] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [details, setDetails] = useState([]);
    const [userSplit, setUserSplit] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [checkedMembers, setCheckedMembers] = useState([]);

    console.log("id_circle:", id_circle);
    console.log("id_event:", id_event);

    useEffect(() => {
        const fetchMembers = async () => {
            const token = localStorage.getItem('jwtToken');
            const headers = { 'Authorization': `Bearer ${token}` };
            try {
                const response = await axios.get(`http://152.42.188.210:8080/api/auth/events/${id_event}/members`, { headers });
                setMembers(response.data.data);
                console.log("id event :", id_event);
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

    const GetHistoryTransaction = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError("Token not found. Please login again.");
            setIsLoading(false);
            return;
        }
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const response = await axios.get(`http://152.42.188.210:8080/api/auth/events/${id_event}/transactions`, { headers });
            console.log("Response dari server:", response.data);
            settransactionHistory(response.data.data); // Menyimpan data transaksi ke dalam state transactionHistory
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
        GetHistoryTransaction();
    }, [id_event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = '';

        switch (name) {
            case 'transaction_name':
                setTransaction_name(value);
                if (!/^[A-Za-z\s]+$/.test(value)) {
                    errorMessage = '* Transaction name must contain only letters';
                } else {
                    errorMessage = value.trim() === '' ? '* Transaction name is required' : '';
                }
                setTransaction_nameError(errorMessage);
                break;
            case 'price':
                if (!isNaN(value) || value === '') {
                    setPrice(value);
                    errorMessage = value.trim() === '' ? '* Price is required' : '';
                } else {
                    errorMessage = '* Price must be a number';
                }
                setPriceError(errorMessage);
                break;
            default:
                break;
        }
    };
    const handleMemberSelect = (e) => {
        const { value, checked } = e.target;
        setCheckedMembers(prev => {
            // Jika ceklis diberi, tambahkan anggota ke dalam objek checkedMembers
            // Jika tidak, hapus anggota dari objek checkedMembers
            return {
                ...prev,
                [value]: checked
            };
        });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredMembers = members.filter(member =>
        member.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

        const selectedUsers = Object.keys(checkedMembers).filter(userId => checkedMembers[userId]);

        if (selectedUsers.length === 0) {
            toast.error('Please select at least one member');
            return;
        }

        const token = localStorage.getItem('jwtToken');
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const response = await axios.post(`http://152.42.188.210:8080/api/auth/create_transaksi/${id_circle}/${id_event}`, {
                transaction_name: transaction_name,
                price: price,
                members: selectedUsers,
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

    useEffect(() => {
        setIsFormValid(transaction_name.trim() !== '' && price.trim() !== '' && selected_users.length > 0);
    }, [transaction_name, price, selected_users]);

    const fetchUserSplit = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError("Token not found. Please login again.");
            setIsLoading(false);
            return;
        }
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const response = await axios.get(`http://152.42.188.210:8080/api/auth/user_split/${id_event}`, { headers });
            console.log("User split data:", response.data.data);
            setUserSplit(response.data.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Failed to fetch user split data. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserSplit();
    }, [id_event]);


    return (
        <DashboardLayout>
            <Box display="flex" flexDirection="column" minHeight="100vh" width="100%">
                <ToastContainer />
                <Card>
                    <Box display="flex" flexDirection="column" minHeight="100%" width="100%">
                        <Box position="relative">
                            <ArrowBackIcon
                                style={{ position: 'absolute', top: '40px', left: '40px', cursor: 'pointer' }}
                                onClick={() => navigate(-1)}
                            />
                        </Box>
                        <Box display="flex" alignItems="center" flexDirection="column" mb={-5} mt={4}>
                            <img src={info} alt="Invitation" style={{ width: '100px', height: '100px', margin: 'auto' }} />
                        </Box>
                        <Box display="flex" alignItems="center" flexDirection="column" mb={4} mt={8}>
                            {events && (
                                <React.Fragment key={events.id_event}>
                                    <Typography variant="h6" fontWeight="bold" style={{ display: 'flex', alignItems: 'center' }}>
                                        Detail Event {events.nama_event}
                                        <img src={checklist2} style={{ width: '20px', height: '20px', marginLeft: '5px' }} />
                                    </Typography>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="h6" fontWeight="bold">
                                            <EventIcon style={{ verticalAlign: 'middle' }} /> {events.start_event} - {events.end_event}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}
                                        >
                                            <AccountCircleIcon style={{ marginRight: '5px' }} /> Creator: {events.creator_event}
                                        </Typography>
                                    </div>
                                    <Typography variant="h6" color="text" fontWeight="medium" style={{ marginRight: '30px' }}>
                                        {events.deskripsi}
                                    </Typography>
                                </React.Fragment>
                            )}
                        </Box>
                    </Box>
                </Card>
                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <Box display="flex" flexDirection="column" minHeight="100%" width="100%">
                                <Typography variant="h6" fontWeight="bold" ml={2} mt={2}>
                                    Transaction <PaymentIcon style={{ marginRight: 8 }} />
                                </Typography>
                                <Box display="flex" alignItems="flex-start" flexDirection="column" justifyContent="center">
                                    <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center" ml={10} mb={4} mt={2}>
                                        {isLoading && <SoftTypography style={{ paddingLeft: '20px' }}>Loading...</SoftTypography>}
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
                                                {details.data.total_transaksi !== undefined && details.data.total_transaksi !== null ? (
                                                    <Box display="flex" mt={1} width="100%">
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant="h6" fontWeight="bold" style={{ flex: 5, paddingRight: '50px' }}>
                                                                Total Transaction:
                                                            </Typography>
                                                            <Typography variant="h6" fontWeight="bold" style={{ flex: 1, textAlign: 'right' }}>
                                                                {details.data.total_transaksi}
                                                            </Typography>
                                                        </div>
                                                    </Box>
                                                ) : (
                                                    <Typography variant="h6" color="text" fontWeight="medium">
                                                        Not found
                                                    </Typography>
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
                            <Box display="flex" justifyContent="flex-end" alignItems="flex-end" mr={3} mb={3}>
                                <Button variant="contained" color="primary" onClick={showModalTransaksi}>
                                    Add Transaction
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <Box display="flex" flexDirection="column" minHeight="100%" width="100%">
                                <Typography variant="h6" fontWeight="bold" ml={2} mt={2}>
                                    Event members <InfoIcon style={{ marginRight: 8 }} />
                                </Typography>
                                <Box display="flex" alignItems="flex-start" flexDirection="column" justifyContent="center" ml={4} mb={4} mt={2}>
                                    {Array.isArray(members) && members.length > 0 ? (
                                        members.map((member) => (
                                            <Typography
                                                key={member.user_id}
                                                variant="h6"
                                                fontWeight="bold"
                                                style={{ fontSize: '14px' }}
                                            >
                                                <PeopleIcon /> {member.username}
                                            </Typography>
                                        ))
                                    ) : (
                                        <Typography variant="h6" color="text" fontWeight="medium">
                                            No members found
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Card>
                            <Box display="flex" flexDirection="column" minHeight="100%" width="100%">
                                <Typography variant="h6" fontWeight="bold" ml={2} mt={2}>
                                    Transaction History
                                </Typography>
                                <Box display="flex" alignItems="flex-start" flexDirection="column" justifyContent="center" ml={2} mb={4} mt={2}>
                                    {Array.isArray(transactionHistory) && transactionHistory.length > 0 ? (
                                        transactionHistory.map((item, index) => (
                                            <Box display="flex" key={index} width="100%" mb={2} alignItems="center">
                                                <Typography variant="h6" color="text" fontWeight="medium" style={{ flex: 0.5 }}>
                                                    {item.transaction_name}
                                                </Typography>
                                                <Typography variant="h6" color="text" fontWeight="medium" style={{ flex: 0.5 }}>
                                                    {item.price}
                                                </Typography>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography variant="h6" color="text" fontWeight="medium">
                                            No transaction history found
                                        </Typography>
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
                                        {/* <Form.Label>Transaction Name</Form.Label> */}
                                        <Form.Control
                                            type="text"
                                            name="transaction_name"
                                            placeholder="Enter transaction name"
                                            value={transaction_name}
                                            onChange={handleChange}
                                            isInvalid={!!transaction_nameError}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {transaction_nameError}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className='mb-2' controlId="price">
                                        {/* <Form.Label>Price</Form.Label> */}
                                        <Form.Control
                                            type="text"
                                            name="price"
                                            value={price}
                                            placeholder="Enter price"
                                            onChange={handleChange}
                                            isInvalid={!!priceError}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {priceError}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className='mb-2' controlId="search_member">
                                        {/* Search Input */}

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <SearchIcon />
                                            </InputGroup.Text>
                                            <FormControl
                                                type="text"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                placeholder="Search by username"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className='mt-2'>
                                        {/* Display User Split Data */}
                                        {userSplit.length > 0 &&
                                            userSplit.map(user => (
                                                <div key={user.user_id}>{user.username}: {user.split}</div>
                                            ))
                                        }
                                    </Form.Group>
                                    <Form.Group className='mb-2' controlId="members">
                                        {/* Member Checkboxes */}
                                        {Array.isArray(filteredMembers) && filteredMembers.length > 0 ? (
                                            filteredMembers.map(member => (
                                                <Form.Check
                                                    key={member.user_id}
                                                    type="checkbox"
                                                    label={member.username}
                                                    value={member.user_id}
                                                    checked={checkedMembers[member.user_id]} // Menggunakan status dari state checkedMembers
                                                    onChange={handleMemberSelect}
                                                    style={{ fontSize: '16px' }}
                                                />
                                            ))
                                        ) : (
                                            <div>
                                                <SoftTypography variant="h6" color="error">
                                                    No member available
                                                </SoftTypography>
                                            </div>
                                        )}
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={closeModalTransaksi}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleFormSubmit}
                                // disabled={!isFormValid} style={{ backgroundColor: isFormValid ? 'blue' : 'grey' }}
                                >
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </DashboardLayout >
    );
}

export default DetailEventMyCircle;
