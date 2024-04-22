import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from '@mui/material';
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Tables() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [circle_name, setcircle_name] = useState("");
  const [id_circle, setId_Circle] = useState("");
  const [circle_nameError, setcircle_nameError] = useState(null);
  const [error, setError] = useState('');
  const [circles, setCircles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("created_at");
  const [currentUser, setCurrentUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'circle_name':
        setcircle_name(value);
        setcircle_nameError('');
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let error = '';
    if (circle_name === "") {
      error = 'Circle name is required';
    } else if (circle_name.length < 3) {
      error = 'Circle name must be at least 3 characters long';
    }
    if (error) {
      setcircle_nameError(error);
      return;
    }
    const isCircleExist = circles.some(circle => circle.circle_name === circle_name);
    if (isCircleExist) {
      setcircle_nameError('Circle name already exists');
      return;
    }

    const token = localStorage.getItem('jwtToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      const response = await axios.post('http://152.42.188.210:8080/index.php/api/auth/create_circle', {
        circle_name: circle_name,
      }, { headers });
      console.log(response);
      closeModalAdd();
      console.log(circles.creator_username);
      toast.success('Circle created successfully');
      const newCircle = { id_circle: response.data.id_circle, circle_name: circle_name, creator_username: currentUser };
      setCircles([...circles, newCircle]);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error here
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server error response:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
        setError("Server error: " + error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        setError("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", error.message);
        setError("Request setup error: " + error.message);
      }
    }
  };

  //get
  const fetchData = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError("Token not found. Please login again.");
      setLoading(false);
      return;
    }
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      const response = await axios.get('http://152.42.188.210:8080/index.php/api/auth/get_circle', { headers });

      console.log("Response dari server:", response.data);
      console.log("Creator Circle:", circles.creator_username);
      response.data.data.forEach(circle => {
        console.log(circle.creator_username);
      });
      setCircles(response.data.data);

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
  }, [currentUser]);


  const showModalAdd = () => {
    setcircle_name("");
    setShowAddModal(true);
  };

  const closeModalAdd = () => {
    setcircle_name("")
    setShowAddModal(false);
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

  //update
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
        throw new Error('ID circle is not defined');
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
      <DashboardNavbar />
      <ToastContainer />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <div>
                <Button variant="contained" startIcon={<AddIcon />} onClick={showModalAdd}>
                  Create Circle
                </Button>
              </div>
            </SoftBox>
            <SoftBox textAlign="center">
              <CCardBody>
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">
                        <SoftTypography variant="body4">No</SoftTypography>
                        {sortField === "index" && (
                          <IconButton size="small">
                          </IconButton>
                        )}
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        <SoftTypography variant="body4">Circle Name</SoftTypography>
                        {sortField === "circle_name" && (
                          <IconButton size="small">
                          </IconButton>
                        )}
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                        <SoftTypography variant="body4">Creator</SoftTypography>
                        {sortField === "creator_circle" && (
                          <IconButton size="small">
                          </IconButton>
                        )}
                      </CTableHeaderCell>
                      {/* {circles.some(circle => circle.creator_username === currentUser) && ( // Tambahkan kondisi di sini
                        <CTableHeaderCell scope="col">
                          <SoftTypography variant="body4">Action</SoftTypography>
                        </CTableHeaderCell>
                      )} */}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {circles.map((item, index) => {
                      console.log(item.creator_username);
                      return (
                        <CTableRow key={index}>
                          <CTableDataCell>
                            <Link to={`/Event/${item.id_circle}/${item.circle_name}`}>{index + 1}</Link>
                          </CTableDataCell>
                          <CTableDataCell>
                            <Link to={`/Event/${item.id_circle}/${item.circle_name}`}>{item.circle_name}</Link>
                          </CTableDataCell>
                          <CTableDataCell>
                            <Link to={`/Event/${item.id_circle}/${item.circle_name}`}>{item.creator_username}</Link>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton className='btn btn-primary text-white me-2' onClick={() => showModalUpdate(item)}>
                              <EditIcon />
                            </CButton>
                            <CButton className='btn btn-danger text-white' onClick={() => showModalDelete(item)}>
                              <DeleteIcon />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      );
                    })}

                  </CTableBody>

                </CTable>
              </CCardBody>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Link to="/InviteToCircle" className="btn btn-primary">Invite to Circle</Link> */}
      <div className='body-flex'>
        <div className="overlay" />
        <div className="flex">
          <div className="col-15 p-5">
            <Modal show={showAddModal} onHide={closeModalAdd} style={{ maxWidth: '1500px', width: '100%' }}>
              <div className="overlay-icons" />
              <Modal.Header closeButton>
                <Modal.Title>Create Circle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className='mb-5' controlId='exampleForm.ControlInput1'>
                    <Form.Control
                      type="text"
                      placeholder='Enter Circle Name'
                      name='circle_name'
                      autoFocus
                      onChange={handleChange}
                      value={circle_name}
                    />
                    {circle_nameError && (
                      <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                        {circle_nameError}
                      </div>
                    )}
                  </Form.Group>
                  <Button variant="contained" type='submit' onClick={handleFormSubmit}>
                    Save
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModalAdd}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
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

export default Tables;
