import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Headerdetail from '../tables/data/kosong';

function DetailEvent() {
  const [event, setEvent] = useState(null);
  const [showTransaksiModal, setShowTransaksiModal] = useState(false);
  const [transaction_name, setTransaction_name] = useState("");
  const [price, setPrice] = useState("");
  const [transaction_nameError, setTransaction_nameError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const { id_event } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [deskripsi, setDeskripsi] = useState([]);
  const [start_event, setStart_event] = useState([]);
  const [end_event, setEnd_event] = useState([]);
  const [nama_event, setNama_event] = useState([]);
  const [creator_event, setCreator_event] = useState([]);

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
  }

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
      const response = await axios.post(`http://152.42.188.210:8080/api/auth/create_transaksi/id_circle/${id_event}`, {
        transaction_name: transaction_name,
        price: price,
      }, { headers });
      console.log(response);
      closeModalTransaksi();
      toast.success('Transaction created successfully');
      setTransactions([...transactions, response.data.data]);
    } catch (error) {
      console.log('error form:', error);
      toast.error('Failed to create transaction');
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
      const response = await axios.get(`http://152.42.188.210:8080/api/auth/get_events/${id_event}`, { headers });
      console.log("Response dari server:", response.data);
      setEvent(response.data); // Ubah menjadi response.data
      setDeskripsi(response.data.deskripsi); // Set deskripsi event
      setStart_event(response.data.start_event); // Set start_event
      setEnd_event(response.data.end_event); // Set end_event
      setNama_event(response.data.nama_event); // Set nama_event
      setCreator_event(response.data.creator_event); // Set creator_event
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

  return (
    <DashboardLayout>
      <SoftBox pb={2} />
      <Headerdetail/>
      <Card>
        <SoftBox pt={3} px={3} style={{ display: 'flex', flexDirection: 'column',  textAlign: 'center' }}>
          <SoftTypography variant="h6" fontWeight="bold" style={{ fontSize: '18px', alignItems: 'center' }}>
           Event {nama_event} - Creator by {creator_event}
          </SoftTypography>
          <SoftTypography fontWeight="medium" style={{ fontSize: '15px', borderBottom: '1px solid #ccc', paddingBottom: '5px'}}>
           Description: {deskripsi}
          </SoftTypography>
          <SoftBox pb={1} />
          <SoftTypography fontWeight="medium" style={{ fontSize: '15px', paddingBottom: '5px', textAlign: 'left', marginLeft: '15px' }}>
            Start event: {start_event} - End event: {end_event}
          </SoftTypography>
          <SoftTypography fontWeight="medium" style={{ fontSize: '15px', paddingBottom: '5px', textAlign: 'left', marginLeft: '15px' }}>
            Total budget event: 1.500.000
          </SoftTypography>
          <SoftTypography fontWeight="medium" style={{ fontSize: '15px', paddingBottom: '5px', textAlign: 'left', marginLeft: '15px' }}>
            username1: 500.000
          </SoftTypography>
          <SoftTypography fontWeight="medium" style={{ fontSize: '15px', paddingBottom: '5px', textAlign: 'left', marginLeft: '15px' }}>
            username2: 500.000
          </SoftTypography>
          <SoftTypography fontWeight="medium" style={{ fontSize: '15px', paddingBottom: '5px', textAlign: 'left', marginLeft: '15px' }}>
            username3: 500.000
          </SoftTypography>
        </SoftBox>
        <SoftBox pb={3} />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          style={{ position: 'absolute', bottom: '25px', right: '25px' }}
          onClick={showModalTransaksi}
        >
          Add
        </Button>
        <SoftBox pb={3} />
      </Card>
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
                  <Form.Group className='mb-2' controlId='exampleForm.ControlInput1'>
                    <Form.Control
                      type="text"
                      placeholder='Enter transaction name'
                      name='transaction_name'
                      autoFocus
                      onChange={handleChange}
                      value={transaction_name}
                    />
                    {transaction_nameError && (
                      <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                        {transaction_nameError}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group className='mb-2' controlId='exampleForm.ControlInput1'>
                    <Form.Control
                      type="text"
                      placeholder='Enter transaction price'
                      name='price'
                      autoFocus
                      onChange={handleChange}
                      value={price}
                    />
                    {priceError && (
                      <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                        {priceError}
                      </div>
                    )}
                  </Form.Group>
                  <Button variant="contained" type='submit' onClick={handleFormSubmit}>
                    Save
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModalTransaksi}>
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

export default DetailEvent;
