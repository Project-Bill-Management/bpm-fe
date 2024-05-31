import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import axios from 'axios';
import AddIcon from "@mui/icons-material/Add";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button as BootstrapButton, Form, InputGroup } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import invite from "assets/images/invite.png";
import Table from "examples/Tables/Table";
import SoftAvatar from "components/SoftAvatar";
import cat from "assets/images/avatar-animal/cat.png";
import SuiBadgeDot from "components/SoftBadge";
import SuiBox from "components/SoftBox";
import SearchIcon from '@material-ui/icons/Search';

function InviteCircle() {
  const { id_circle, circle_name } = useParams();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [circles, setCircles] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
  const showModalInvite = () => {
    setUsername("");
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
    console.log("id circle :", id_circle);
    try {
      const response = await axios.post(`http://152.42.188.210:8080/api/auth/circles/${id_circle}/invite`, {
        username: username,
      }, { headers });
      console.log(`Inviting username ${username} to circle ${id_circle}`);
      if (response.status === 200) {
        setUsername('');
        setError('');
        closeModalInvite();
        toast.success('Invite successfully');
        console.log('Invite successfully');
        fetchData();
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
      const response = await axios.get(`http://152.42.188.210:8080/api/auth/circles/${id_circle}/members`, { headers });
      console.log("Response dari server:", response.data);
      setMembers(response.data.data);
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

  const handleClickUser = (user) => {
    setUsername(user.username);
    setSearchKeyword(user.username);
    setRecommendedUsers([]);
  };

  return (
    <DashboardLayout>
      <ToastContainer />
      <Box display="flex" flexDirection="column" minHeight="100vh" width="80%">
        <Card>
          <Box py={3} px={3}>
            <Box
              display="flex" flexDirection="column" width="100%" height="80%">
              <Box display="flex" textAlign="center" mb={1}>
                <SoftTypography variant="h6" fontWeight="bold">
                  Pay attention to your inviters. When you invite another user, that user will enter your circle automatically.
                </SoftTypography>
              </Box>
            </Box>
          </Box>
        </Card>
        <SoftBox pb={2} />
        <Card>
          <Box py={8} px={8}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
              height="100%"
            >
              <Box display="flex" alignItems="center" mb={2}>
                <img src={invite} alt="Invitation" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                <SoftTypography variant="h6" fontWeight="bold">
                  Add a username to join your circle
                </SoftTypography>
              </Box>
              <Box mb={2}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={showModalInvite}>
                  Add Username
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
        <SoftBox pb={2} />
        <Card>
          <Box py={2} px={2}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
              height="80%"
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
                <div>
                  <SoftTypography variant="h6" fontWeight="bold">
                    Member Circle {circle_name}
                  </SoftTypography>
                </div>
              </Box>
            </Box>
          </Box>
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
                    { name: "status", align: "center"},
                    { name: "name", align: "center" },
                  ]}
                  
                  rows={members.map(item => ({
                    image: <SoftAvatar src={cat} sx={{ width: '32px', height: '32px' }} />,
                    status: (
                      <SuiBox ml={-1.325}>
                          <SuiBadgeDot size="small" badgeContent="member active" />
                      </SuiBox>
                  ),
                    name: item.invited_username,
                  }))}
                />
                 {loading && <SoftTypography style={{ paddingLeft: '20px' }}>Loading...</SoftTypography>}
                {error && <SoftTypography style={{ paddingLeft: '20px' }}>{error} </SoftTypography>}
              </>
            </SoftBox>
          </SoftBox>
        </Card>
      </Box>
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
                  <InputGroup>
                    <InputGroup.Text>
                      <SearchIcon />
                    </InputGroup.Text>
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
                  </InputGroup>
                  {usernameError && (
                    <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                      {usernameError}
                    </div>
                  )}
                  {Array.isArray(recommendedUsers) && recommendedUsers.map(user => (
                    <div
                      key={user.id}
                      className="user"
                      onClick={() => handleClickUser(user)}
                      style={{ cursor: 'pointer', padding: '5px 0', borderBottom: '1px solid #ddd' }}
                    >
                      <SoftTypography variant="h6" color="text" style={{ marginRight: '20px' }}>
                        {user.username}
                      </SoftTypography>
                    </div>
                  ))}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <BootstrapButton variant="primary" className="px-4" onClick={handleSubmitInvite}>
                Invite
              </BootstrapButton>
              <BootstrapButton type='submit' variant="danger" onClick={closeModalInvite}>
                Cancel
              </BootstrapButton>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
    </DashboardLayout>
  )


}
export default InviteCircle;