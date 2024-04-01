import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@mui/material';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";

function InviteCircle() {
    const { circle_name } = useParams();
    const { id_circle } = useParams();
    const { circleId } = useParams();
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(null);
    const [error, setError] = useState('');
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [recommendedUsers, setRecommendedUsers] = useState([]);
    const [circles, setCircles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const headers = { 'Authorization': `Bearer ${token}` };

            // Hanya lakukan request jika searchKeyword tidak kosong
            if (searchKeyword.trim() !== "") {
                const response = await axios.get(`http://152.42.188.210:8080/api/auth/search_user/${id_circle}`, { keyword: searchKeyword }, { headers });
                if (response.status === 200) {
                    setRecommendedUsers(response.data);
                } else {
                    throw new Error('Failed to fetch search results');
                }
            } else {
                // Bersihkan recommendedUsers jika searchKeyword kosong
                setRecommendedUsers([]);
            }
        } catch (error) {
            console.error("Error searching users:", error);
            toast.error("Failed to fetch search results");
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError("Token not found. Please login again.");
            setLoading(false);
            return;
        }
        const headers = { 'Authorization': `Bearer ${token}` };
        setLoading(true);
        try {
            const response = await axios.get(`http://152.42.188.210:8080/api/auth/invite_circle/${id_circle}/invitations`, { headers });
            console.log("Response dari server:", response.data); // Tambahkan baris ini
            //   console.log("ID pembuat circle:", circles.creator_username);
            setCircles(response.data.data);
            setLoading(false);

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Failed to fetch data. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                setUsernameError('');
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === "") {
            setError('Username is required');
            return;
        }
        const token = localStorage.getItem('jwtToken');
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const response = await axios.post(`http://152.42.188.210:8080/api/auth/invite_circle/${id_circle}`, {
                username: username,
            }, { headers });
            console.log(`Inviting username ${username} to circle ${id_circle}`);
            if (response.status === 200) {
                setUsername('');
                setError('');
                toast.success('Invite To Circle successfully, waiting approve');
                console.log('Invite To Circle successfully, waiting approve');
            } else {
                throw new Error('Failed to invite user to circle');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setError('Make sure the username entered is correct');
            toast.error("Failed to invite");
        }
    };

    const showModalInvite = () => {
        setUsername("");
        setShowInviteModal(true);
    };

    const closeModalInvite = () => {
        setUsername("");
        setShowInviteModal(false);
    };

    return (
        <DashboardLayout>
            <Card>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
                    <SoftTypography variant="h6" fontWeight="medium">
                        {circle_name}
                    </SoftTypography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={showModalInvite}>
                        Invite Circle
                    </Button>
                </SoftBox>
                <SoftBox pb={3} />
            </Card>
            <SoftBox pb={3} />
            <SoftBox textAlign="center">
                <CCardBody>
                    <CTable striped>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">
                                    <SoftTypography variant="body4">No</SoftTypography>
                                </CTableHeaderCell>
                                <CTableHeaderCell scope="col">
                                    <SoftTypography variant="body4">Username</SoftTypography>
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {circles.map((item, index) => {
                                return (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{index + 1}</CTableDataCell>
                                        <CTableDataCell>{item.username}</CTableDataCell>
                                    </CTableRow>
                                );
                            })}

                        </CTableBody>
                    </CTable>
                </CCardBody>
            </SoftBox>
            <div className='body-flex'>
                <div className="overlay" />
                <div className="flex">
                    <div className="col-15 p-5">
                        <Modal show={showInviteModal} onHide={closeModalInvite} style={{ maxWidth: '1500px', width: '100%' }}>
                            <div className="overlay-icons" />
                            <Modal.Header closeButton>
                                <Modal.Title>Invite Circle</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className='mb-5' controlId='exampleForm.ControlInput1'>
                                        <Form.Control
                                            type="text"
                                            placeholder='Enter Username'
                                            name='searchKeyword'
                                            onChange={(e) => {
                                                setSearchKeyword(e.target.value);
                                                handleSearch();
                                            }}
                                            value={searchKeyword}
                                        />
                                        {error && (
                                            <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                                                {error}
                                            </div>
                                        )}
                                        {Array.isArray(recommendedUsers) && recommendedUsers.map(user => (
                                            <div key={user.id} className="user">
                                                {user.name} - {user.email}
                                            </div>
                                        ))}

                                    </Form.Group>
                                    <Button variant="contained" type='submit' onClick={handleSubmit}>
                                        Save
                                    </Button>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={closeModalInvite}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
            <Button
                variant="contained"
                color="primary"
                // onClick={}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '60%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                Create Event
            </Button>
        </DashboardLayout>
    );
}

export default InviteCircle;
