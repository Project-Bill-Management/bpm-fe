import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@mui/material';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Event() {
  const [isLoading, setIsLoading] = useState(false);
  const [nama_event, setNama_event] = useState("");
  const [nama_eventError, setNama_eventError] = useState(null);
  const [deskripsi, setDeskripsi] = useState("");
  const [deskripsiError, setDeskripsiError] = useState(null);
  const [start_eventErr, setStart_eventErr] = useState(null);
  const [end_eventError, setEnd_eventError] = useState(null);
  const { id_circle, circle_name, id_event } = useParams();
  const [showEventModal, setShowEventModal] = useState(false);
  const [start_event, setStart_event] = useState(new Date().toISOString().slice(0, 19));
  const [end_event, setEnd_event] = useState(new Date().toISOString().slice(0, 19));
  const [eventData, setEventData] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  // const [id_circle, setId_Circle] = useState([]);

  const handleStartDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
    setStart_event(formattedDate);
  };

  const handleEndDataChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
    setEnd_event(formattedDate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'nama_event':
        setNama_event(value);
        setNama_eventError(value.trim() === '' ? '*Event name is required' : '');
        setNama_eventError('');
        break;
      case 'deskripsi':
        setDeskripsi(value);
        setDeskripsiError(value.trim() === '' ? '*Description event is required' : '');
        setDeskripsiError('');
        break;
      default:
        break;
    }
  }

  const showModalEvent = () => {
    setNama_event("");
    setDeskripsi("");
    setShowEventModal(true);
    setStart_event(new Date());
    setEnd_event(new Date());
  };
  const closeModalEvent = () => {
    setNama_event("");
    setDeskripsi("");
    setStart_event(new Date());
    setEnd_event(new Date());
    setShowEventModal(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let nama_eventError = '';
    // let deskripsiError = '';
    let start_eventErr = '';
    let end_eventError = '';

    if (nama_event === "") {
      nama_eventError = 'Event name is required';
    } else if (nama_event.length < 3) {
      nama_eventError = 'Event name must be at least 3 characters long';
    }
   
  if (!start_event || new Date(start_event) < new Date()) {
    start_eventErr = 'Start date must be today or later';
  }

  if (!end_event || new Date(end_event) < new Date()) {
    end_eventError = 'End date must be today or later';
  }

  if (!end_event || new Date(end_event) < new Date(start_event)) {
    end_eventError = 'End date must be after start event';
  }
    setNama_eventError(nama_eventError);
    setStart_eventErr(start_eventErr);
    setEnd_eventError(end_eventError);

    if (nama_eventError || start_eventErr || end_eventError) {
      return;
    }
    const token = localStorage.getItem('jwtToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      const response = await axios.post(`http://152.42.188.210:8080/index.php/api/auth/post_events/${id_circle}`, {
        nama_event: nama_event,
        deskripsi: deskripsi,
        start_event: start_event,
        end_event: end_event,
      }, { headers });
      toast.success('Event created successfully');
      console.log(response);
      closeModalEvent();
      fetchData();
      setEvents(response.data.data);
    } catch (error) {
      console.error("error form:", error);
      if (error.response) {
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request setup error:", error.message);
      }
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError("Token not found. Please login again.");
      setIsLoading(false);
      return;
    }
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      const response = await axios.get(`http://152.42.188.210:8080/index.php/api/auth/get_events`, { headers });
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
  }, []);

  return (
    <DashboardLayout>
      <ToastContainer />
      <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
          <div>
            <Link to={`/InviteCircle/${id_circle}/${circle_name}`}>
              <SoftTypography variant="h6" fontWeight="bold">
                Circle {circle_name}
              </SoftTypography>
            </Link>
          </div>
          <Button variant="contained" startIcon={<AddIcon />} onClick={showModalEvent}>
            Create Event
          </Button>
        </SoftBox>
        <SoftBox pb={3} />
      </Card>
      <SoftBox pb={3} />
      {events && events.length > 0 && (
        events.map((item) => (
          <SoftBox key={item.id_event} mb={2}>
            <Card p={2}>
              <Link to={`/DetailEvent/${id_circle}/${item.id_event}`}>
                <SoftBox pt={3} px={2} style={{ marginLeft: '18px', marginRight: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <SoftTypography fontWeight="bold" style={{ fontSize: '15px' }}>
                      Event {item.nama_event} - Created by {item.creator_event}
                    </SoftTypography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <SoftTypography fontWeight="medium" style={{ color: 'red', fontSize: '15px', margin: '0 8px' }}>
                        -500.000
                      </SoftTypography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ alignSelf: 'flex-end', justifyContent: 'flex-end' }}
                      >
                        Detail
                      </Button>
                    </div>
                  </div>
                </SoftBox>
              </Link>
              <SoftBox pb={2} />
            </Card>
          </SoftBox>
        ))
      )}
      <SoftBox pb={3} />
      <div className='body-flex'>
        <div className="overlay" />
        <div className="flex">
          <div className="col-15 p-5">
            <Modal show={showEventModal} onHide={closeModalEvent}>
              <Modal.Header closeButton>
                <Modal.Title>Create Event</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className='mb-4' controlId="formEventName">
                    <Form.Control
                      type="text"
                      placeholder='Enter event name'
                      rows={1}
                      name='nama_event'
                      value={nama_event}
                      onChange={handleChange}
                    />
                    {nama_eventError && (
                      <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                        {nama_eventError}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group className='mb-4' controlId="formEventDescription">
                    <Form.Control
                      as="textarea"
                      placeholder='Enter Description Event'
                      rows={3}
                      name="deskripsi"
                      value={deskripsi}
                      onChange={handleChange}
                    />
                    {/* {deskripsiError && (
                      <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                        {deskripsiError}
                      </div>
                    )} */}
                  </Form.Group>
                  <Form.Group className='mb-2' controlId="formStartEvent" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <TextField
                        label="Start Event"
                        type="datetime-local"
                        value={start_event}
                        onChange={handleStartDateChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {start_eventErr && (
                        <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                          {start_eventErr}
                        </div>
                      )}
                    </div>
                    <div>
                      <TextField
                        label="End Event"
                        type="datetime-local"
                        value={end_event}
                        onChange={handleEndDataChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {end_eventError && (
                        <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                          {end_eventError}
                        </div>
                      )}
                    </div>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModalEvent}>
                  Close
                </Button>
                <Button variant="contained" type='submit' onClick={handleFormSubmit}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


export default Event;