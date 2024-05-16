import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from '@mui/material';
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import Tooltip from "@mui/material/Tooltip";
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
import SuiBadgeDot from "components/SoftBadge";
import SuiBox from "components/SoftBox";
import Table from "examples/Tables/Table";
import SoftAvatar from "components/SoftAvatar";
import team1 from "assets/images/team1.jpg";
import cat from "assets/images/avatar-animal/cat.png";
import deer from "assets/images/avatar-animal/deer.png";
import jaguar from "assets/images/avatar-animal/jaguar.png";
import meerkar from "assets/images/avatar-animal/meerkat.png";
import pandabear from "assets/images/avatar-animal/pandabear.png"
import turtle from "assets/images/avatar-animal/turtle.png";
import { useParams } from 'react-router-dom';

function MyCircle() {
    const [circles, setCircles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [circle_name, setcircle_name] = useState("");
    const [id_circle, setId_Circle] = useState("");
    const [circle_nameError, setcircle_nameError] = useState(null);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

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
            response.data.data.forEach(circle => {
                console.log(circle.creator_username);
            });
            setCircles(response.data.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
                // } else {
                //   setError("Failed to fetch data. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

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
            console.log(circles.id_circle);
            toast.success('Circle created successfully');
            const newCircle = { id_circle: response.data.id_circle, circle_name: circle_name };
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

    const avatars = (members) =>
        members.map(([image, name]) => (
            <Tooltip key={name} title={name} placeholder="bottom">
                <SoftAvatar
                    src={image}
                    alt="name"
                    size="xs"
                    sx={{
                        border: ({ borders: { borderWidth }, palette: { white } }) =>
                            `${borderWidth[2]} solid ${white.main}`,
                        cursor: "pointer",
                        position: "relative",

                        "&:not(:first-of-type)": {
                            ml: -1.25,
                        },

                        "&:hover, &:focus": {
                            zIndex: "10",
                        },
                    }}
                />
            </Tooltip>
        ));

        const handleChangeUsername = (e) => {
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

          const showModalInvite = (circle) => {
            setId_Circle(circle.id_circle); // Perbarui nilai id_circle saat tombol undangan diklik
            setUsername(""); // Reset nilai username
            setShowInviteModal(true);
        };
        
        const handleSubmitInvite = async (e) => {
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
            console.log("id circle :", circles.id_circle)
            try {
                const response = await axios.post(`http://152.42.188.210:8080/api/auth/circles/${id_circle}/invite`, {
                    username: username,
                }, { headers });
                console.log(`Inviting username ${username} to circle ${id_circle}`);
                if (response.status === 200) {
                    setUsername('');
                    setError('');
                    closeModalInvite();
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
        
        
          const closeModalInvite = () => {
            setUsername("");
            setShowInviteModal(false);
          };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ToastContainer />
            <SoftBox py={3}>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
                        <div>
                            <SoftTypography variant="h6" fontWeight="bold">
                                My Circle
                            </SoftTypography>
                        </div>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={showModalAdd}>
                            Create Circle
                        </Button>
                    </SoftBox>
                    <SoftBox pb={3} />
                    <SoftBox>
                        <SoftBox
                            sx={{
                                "& .MuiTableRow-root:not(:last-child)": {
                                    "& td": {
                                        borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                            `${borderWidth[1]} solid ${borderColor}`,
                                    },
                                },
                            }}
                        >

                            <>

                                <Table
                                    columns={[
                                        { name: "image", align: "center" },
                                        { name: "circle", align: "center" },
                                        { name: "members", align: "center" },
                                        { name: "invite", align: "center" },
                                        { name: "creator", align: "center" },
                                        { name: "action", align: "center" },
                                    ]}
                                    rows={circles.map(circle => ({
                                        image: <SoftAvatar src={team1} />,
                                        circle: <Link to={`/EventMyCircle/${circle.id_circle}/${circle.circle_name}`}>
                                            {circle.circle_name}
                                        </Link>,
                                        members: (
                                            <SoftBox display="flex" py={1}>
                                                {avatars([
                                                    [jaguar, "member"],
                                                    [meerkar, "member"],
                                                    [pandabear, "member"],

                                                ])}
                                            </SoftBox>
                                        ),
                                        invite: (
                                            <Tooltip title="Add User">
                                                <Link to={`/InviteCircle/${circle.id_circle}/${circle.circle_name}`}>
                                                    <SuiBadgeDot size="small" badgeContent="Add User" />
                                                </Link>
                                            </Tooltip>
                                        ),

                                        creator: (<Link to={`/Event/${circle.id_circle}/${circle.circle_name}`}>
                                            {circle.creator_username}
                                        </Link>
                                        ),
                                        action: (
                                            <>
                                                <SoftTypography
                                                    component="a"
                                                    variant="caption"
                                                    color="secondary"
                                                    fontWeight="medium"
                                                    style={{ marginRight: '8px', cursor: 'pointer' }}
                                                    onClick={() => showModalUpdate(circle)}
                                                >
                                                    Edit
                                                </SoftTypography>
                                                <SoftTypography
                                                    component="a"
                                                    variant="caption"
                                                    color="secondary"
                                                    fontWeight="medium"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => showModalDelete(circle)}
                                                >
                                                    Delete
                                                </SoftTypography>

                                            </>
                                        ),

                                    }))}
                                />
                                {loading && <SoftTypography style={{ paddingLeft: '20px' }}>Loading...</SoftTypography>}
                                {error && <SoftTypography style={{ paddingLeft: '20px' }}>{error} </SoftTypography>}
                            </>
                        </SoftBox>
                    </SoftBox>
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
                      onChange={handleChangeUsername}
                      value={username}
                    />
                    {usernameError && (
                      <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                        {usernameError}
                      </div>
                    )}
                  </Form.Group>
                  <Button variant="contained" type='submit' onClick={handleSubmitInvite}>
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
            </SoftBox>
        </DashboardLayout>
    )
}

export default MyCircle;