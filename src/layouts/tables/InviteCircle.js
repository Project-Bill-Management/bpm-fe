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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
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
import 'bootstrap-icons/font/bootstrap-icons.css';

function InviteCircle() {
  const { circle_name, id_circle } = useParams();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [error, setError] = useState('');
  const [searchKeyword, setSearchKeyword] = useState("");
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [circle_nameError, setcircle_nameError] = useState(null);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const headers = { 'Authorization': `Bearer ${token}` };

      if (searchKeyword.trim() !== "") {
        const response = await axios.post(`http://152.42.188.210:8080/api/auth/search_user/${id_circle}`, { keyword: searchKeyword }, { headers });
        if (response.status === 200) {
          const filteredUsers = response.data.data.filter(user => user.username.toLowerCase().startsWith(searchKeyword.toLowerCase()));
          setRecommendedUsers(filteredUsers);
        } else {
          throw new Error('Failed to fetch search results');
        }
      } else {
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
      console.log("Response dari server:", response.data);
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
        setUsernameError(value.trim() === '' ? '*Username is required' : '');
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = '';

    if (username === "") {
      error = 'Username is required';
    }

    setUsernameError(error);
    if (error) {
      setError(error);
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
        toast.success('Invite successfully, waiting approve');
        console.log('Invite successfully, waiting approve');
      } else {
        throw new Error('Failed to invite user to circle');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError('Failed to invite. Make sure the username entered is correct');
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

  const handleClickUser = (user) => {
    setUsername(user.username);
    setRecommendedUsers([]);
  };

  const showModalUpdate = (data) => {
    setcircle_name(data.circle_name);
    setId_Circle(data.id_circle);
    setShowUpdateModal(true);
  };


  const closeModalUpdate = () => {
    setcircle_name("");
    setId_Circle("");
    setShowUpdateModal(false);
  };

  const showModalDelete = (data) => {
    setcircle_name(data.circle_name);
    setId_Circle(data.id_circle);
    setShowDeleteModal(true);
  };

  const closeModalDelete = () => {
    setcircle_name("");
    setId_Circle("");
    setShowDeleteModal(false);
  };

  const updatedCircles = async (e) => {
    e.preventDefault();
    let error = '';
    if (id_circle === "") {
      error = 'Circle ID is required';
    } else {
      if (circle_name === "") {
        error = 'Circle name is required';
      } else if (circle_name.length < 3) {
        error = 'Circle name must be at least 3 characters long';
      }
    }
    if (error) {
      setcircle_nameError(error);
      return;
    }
    const token = localStorage.getItem('jwtToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      const response = await axios.put(`http://152.42.188.210:8080/index.php/api/auth/update_circle/${id_circle}`, {
        circle_name: circle_name,
      }, { headers });
      closeModalUpdate();
      toast.success('Circle updated successfully');
      const updatedData = circles.map(circle =>
        circle.id_circle === id_circle ? { ...circle, circle_name: circle_name } : circle
      );
      setCircles(updatedData); // Memperbarui lingkaran yang diubah dalam state circles
    } catch (error) {
      console.error("Error updating circle:", error);
    }
  };

  //deleted
  const DeleteDataCircle = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('jwtToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      if (!id_circle) {
        console.error('ID circle is not defined');
        return;
      }
      const deleteData = await axios.delete(
        `http://152.42.188.210:8080/index.php/api/auth/delete_circle/${id_circle}`,
        { headers }
      );
      console.log(deleteData.data);
      closeModalDelete();
      toast.success('Circle delete successfully');
      const updatedData = circles.filter(circle => circle.id_circle !== id_circle);
      setCircles(updatedData);
    } catch (error) {
      toast.error("Failed to delete");
      console.error("Error delete circle:", error);
    }
  };

  return (
    <DashboardLayout>
      {/* <Card sx={{ margin: 'auto', maxWidth: 'sm' }}> */}
        <SoftBox display="flex" justifyContent="center" alignItems="center" pt={2} px={2}>
          <SoftTypography variant="h6" fontWeight="medium">
            Detail {circle_name}
          </SoftTypography>
        </SoftBox>
        <SoftBox pb={3} />
        <SoftBox display="flex" justifyContent="center">
          <Box textAlign="center" mr={5}>
            <i className="bi bi-pencil-square" style={{ cursor: 'pointer' }} onClick={showModalUpdate}></i>
            <SoftTypography variant="h6" mt={1}>Edit</SoftTypography>
          </Box>
          <Box textAlign="center" mr={5}>
            <i className="bi bi-trash" style={{ cursor: 'pointer' }} onClick={showModalDelete}></i>
            <SoftTypography variant="h6" mt={1}>Delete</SoftTypography>
          </Box>
          <Box textAlign="center">
            <i className="bi bi-person-plus-fill" style={{ cursor: 'pointer' }} onClick={showModalInvite}></i>
            <SoftTypography variant="h6" mt={1}>Add</SoftTypography>
          </Box>
        </SoftBox>
        <SoftBox pb={3} />
      {/* </Card> */}
      <SoftBox p={3}>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">
                  <SoftTypography variant="h6">Member</SoftTypography>
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {circles.map((item, index) => {
                return (
                  <CTableRow key={index}>
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
                    {usernameError && (
                      <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                        {usernameError}
                      </div>
                    )}
                    {Array.isArray(recommendedUsers) && recommendedUsers.map(user => (
                      <div
                        key={user.id}
                        className="user"
                        onClick={() => handleClickUser(user)} // Set username when user is clicked
                      >
                        {user.username}
                      </div>
                    ))}
                  </Form.Group>
                  <Button variant="contained" type='submit' onClick={handleSubmit}>
                    Invite
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModalInvite}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      {/* <Button
                variant="contained"
                color="primary"
                // onClick={}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                Create Event
            </Button> */}
      <div className='body-flex'>
        <div className="overlay" />
        <div className="flex">
          <div className="col-15 p-5">
            <Modal show={showUpdateModal} onHide={closeModalUpdate} style={{ maxWidth: '1500px', width: '100%' }}>
              <div className="overlay-icons" />
              <Modal.Header closeButton>
                <Modal.Title>Update Circle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={updatedCircles}>
                  <Form.Group className='mb-5' controlId='exampleForm.ControlInput1'>
                    <Form.Control
                      type="text"
                      autoFocus
                      onChange={(e) => setcircle_name(e.target.value)}
                      value={circle_name}
                    />
                    {circle_nameError && (
                      <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                        {circle_nameError}
                      </div>
                    )}
                  </Form.Group>
                  <Button variant="contained" type='submit' onClick={updatedCircles}>
                    Save
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModalUpdate}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <Modal show={showDeleteModal} onHide={closeModalDelete} style={{ maxWidth: '1500px', width: '100%' }}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you deleted this data?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <p className="col-4 card-text">
                    Circle Name
                  </p>
                  <p className="col-6 card-text">
                    : {circle_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' color="primary" className="px-4" onClick={DeleteDataCircle}>
            Delete
          </Button>
          <Button variant="danger" onClick={closeModalDelete}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
}

export default InviteCircle;
