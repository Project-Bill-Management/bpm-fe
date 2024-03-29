import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@mui/material';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InviteCircle() {
    const { circle_name } = useParams();
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [show, setShow] = useState(false);
    const [circles, setCircles] = useState([]); // Menambahkan state circles

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
        } else if (username.length < 4) {
            setError('Username must be at least 4-5 characters long');
            setIsValid(false);
            return;
        }
        const isCircleExist = circles.some(circle => circle.username === username);
        if (isCircleExist) {
            setUsernameError('Username already exists');
            setIsValid(false);
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
        setIsValid(true);
    };

    const showModalInvite = () => {
        setUsername("");
        setShowInviteModal(true);
    };

    const closeModalInvite = () => {
        setUsername("")
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
                                            name='username'
                                            autoFocus
                                            onChange={handleChange}
                                            value={username}
                                        />
                                        {error && (
                                            <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                                                {error}
                                            </div>
                                        )}
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
        </DashboardLayout>
    );
}

export default InviteCircle;
