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
import Table from "examples/Tables/Table";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
    const [isAllChecked, setIsAllChecked] = useState(false);

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
    const handleMemberSelect = (event) => {
        const { value, checked } = event.target;
        setCheckedMembers((prevCheckedMembers) => ({
            ...prevCheckedMembers,
            [value]: checked,
        }));
    };

    const handleCheckAll = (event) => {
        const { checked } = event.target;
        setIsAllChecked(checked);

        const updatedCheckedMembers = {};
        filteredMembers.forEach((member) => {
            updatedCheckedMembers[member.user_id] = checked;
        });

        setCheckedMembers(updatedCheckedMembers);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const filteredMembers = members.filter((member) =>
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
            setTransactions(prevTransactions => [...prevTransactions, response.data.data]);
            fetchData();
            GetTransaction();
            GetHistoryTransaction();
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
                <Box display="flex" flex="1" style={{ marginTop: '10px' }}>
                    <Box flex="2" marginRight="10px">
                        <Card style={{ maxHeight: '400px', overflow: 'auto' }}>
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
                                                <Typography style={{ marginLeft: '10px' }} variant="h6" fontWeight="bold">
                                                    <EventIcon style={{ marginRight: '5px', verticalAlign: 'middle' }} /> {events.start_event}
                                                </Typography>
                                                <Typography style={{ marginLeft: '10px' }} variant="h6" fontWeight="bold">
                                                    <EventIcon style={{ marginRight: '5px', verticalAlign: 'middle' }} /> {events.end_event}
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold"
                                                    style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}
                                                >
                                                    <AccountCircleIcon style={{ marginRight: '5px' }} />Creator: {events.creator_event}
                                                </Typography>
                                            </div>
                                            <Typography variant="h6" color="text" fontWeight="medium" style={{ textAlign: 'center' }}>
                                                {events.deskripsi}
                                            </Typography>
                                        </React.Fragment>
                                    )}
                                </Box>
                            </Box>
                        </Card>
                        <Box marginTop="10px">
                            <Box flex="2" marginRight="10px">
                                <Card style={{ maxHeight: '400px', overflow: 'auto' }}>
                                    <Box display="flex" flexDirection="column" minHeight="100%" width="100%">
                                        <Typography variant="h6" fontWeight="bold" ml={2} mt={2}>
                                            Split Bill <PaymentIcon style={{ marginRight: 8 }} />
                                        </Typography>
                                        <Box display="flex" flexDirection="column" ml={2} mt={2} mb={2} pr={2}>
                                            {isLoading && <Typography style={{ paddingLeft: '20px' }}>Loading...</Typography>}
                                            {details && details.data && details.data.users ? (
                                                <div>
                                                    {details.data.users.map((user, index) => (
                                                        <Box display="flex" key={index} width="100%">
                                                            <Typography variant="h6" color="text" fontWeight="medium" style={{ flex: 1, borderBottom: '1px solid #000', paddingBottom: '5px' }}>
                                                                {user.username}:
                                                            </Typography>
                                                            <Typography variant="h6" color="text" fontWeight="medium" style={{ flex: 1, textAlign: 'right', borderBottom: '1px solid #000', paddingBottom: '5px', marginLeft: '10px' }}>
                                                                {user.total_price_split}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                    {details.data.total_transaksi !== undefined && details.data.total_transaksi !== null ? (
                                                        <Box display="flex" mt={1} width="100%">
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                                <Typography variant="h6" fontWeight="bold" style={{ flex: 5, paddingRight: '50px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
                                                                    Total Transaction:
                                                                </Typography>
                                                                <Typography variant="h6" color="text" fontWeight="medium" style={{ flex: 1, textAlign: 'right', borderBottom: '1px solid #000', paddingBottom: '5px', marginLeft: '10px' }}>
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
                                </Card>
                            </Box>
                        </Box>
                        <Box marginTop="10px">
                            <Box flex="2" marginRight="10px">
                                <Card style={{ maxHeight: '400px', overflow: 'auto' }}>
                                    <Box display="flex" flexDirection="column" minHeight="100%" width="100%">
                                        <Box display="flex" flexDirection="column" ml={2} mt={2} mb={2} pr={2}>
                                            <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
                                                <Typography variant="h6" color="text" fontWeight="bold">History Transaction</Typography>
                                                <Box>
                                                    <Button variant="contained" startIcon={<AddIcon />} onClick={showModalTransaksi}>
                                                        Add transaction
                                                    </Button>
                                                </Box>
                                            </SoftBox>
                                        </Box>

                                        <Box>
                                            <Table
                                                columns={[
                                                    { name: 'number', align: 'center' },
                                                    { name: 'id-transaction', align: 'center' },
                                                    { name: 'name', align: 'center' },
                                                    { name: 'price', align: 'center' },
                                                ]}
                                                rows={transactionHistory.map((item, index) => ({
                                                    number: index + 1,
                                                    "id-transaction": (<Typography style={{ fontSize: '14px' }}>IDT-{item.transaction_id}</Typography>),
                                                    name: item.transaction_name,
                                                    price: item.price,
                                                }))}
                                            />
                                            {isLoading && <SoftTypography style={{ paddingLeft: '20px' }}>Loading...</SoftTypography>}
                               
                                        </Box>
                                    </Box>
                                </Card>
                            </Box>
                        </Box>
                    </Box>
                    <Box flex="1" borderLeft="0px solid #ccc" paddingLeft="5px">
                        <Card style={{ maxHeight: '400px', overflow: 'auto' }}>
                            <Box display="flex" flexDirection="column" minHeight="100%" width="100%">
                                <Typography variant="h6" fontWeight="bold" ml={2} mt={2}>
                                    About
                                </Typography>
                                <div style={{ borderBottom: '1px solid #ccc', width: '100%', marginTop: '5px', marginBottom: '-10px' }}></div>
                                <Typography ml={2} mt={2}
                                    variant="h6"
                                    fontWeight="bold"
                                    style={{ fontSize: '14px', marginRight: '5px' }}
                                >
                                    1. Add transaction
                                </Typography>
                                <Typography ml={2}
                                    variant="h6"
                                    fontWeight="bold"
                                    style={{ fontSize: '14px', marginRight: '5px' }}
                                >
                                    2. Enter the name and transaction price
                                </Typography>
                                <Typography ml={2}
                                    variant="h6"
                                    fontWeight="bold"
                                    style={{ fontSize: '14px', marginRight: '5px' }}
                                >
                                    3. Select/all member you want to split
                                </Typography>
                                <Typography ml={2}
                                    variant="h6"
                                    fontWeight="bold"
                                    style={{ fontSize: '14px', marginRight: '5px' }}
                                >
                                    4. Transactions will be entered into the transaction table and the split results will be according to the price and number of members selected
                                </Typography>
                            </Box>
                            <SoftBox pb={2} />
                        </Card>
                        <SoftBox pb={2} />
                        <Card style={{ maxHeight: '400px', overflow: 'auto' }}>
                            <Box display="flex" flexDirection="column" minHeight="100%" width="100%">
                                <Typography variant="h6" fontWeight="bold" ml={2} mt={2}>
                                    Note
                                </Typography>
                                <Typography ml={2} mt={1}
                                    variant="h6"
                                    fontWeight="bold"
                                    style={{ fontSize: '14px', marginRight: '5px' }}
                                >
                                    At this event, each member can make additional transactions
                                </Typography>
                            </Box>
                            <div style={{ borderBottom: '1px solid #ccc', width: '100%', marginTop: '5px', marginBottom: '-10px' }}></div>
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
                    </Box>
                </Box>
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
                                        {/* Check All Checkbox */}
                                        <Form.Check
                                            type="checkbox"
                                            label="choose all"
                                            checked={isAllChecked}
                                            onChange={handleCheckAll}
                                            style={{ fontSize: '16px', marginBottom: '10px' }}
                                        />

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
