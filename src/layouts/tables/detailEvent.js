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
import Transaction from 'layouts/billing/components/Transaction';

function DetailEvent() {
  const [event, setEvent] = useState(null);
  const [showTransaksiModal, setShowTransaksiModal] = useState(false);
  const [transaction_name, setTransaction_name] = useState("");
  const [price, setPrice] = useState("");
  const [transaction_nameError, setTransaction_nameError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const { id_circle, circle_name, id_event } = useParams();
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    switch (name) {
      case 'transaction_name' :
        setTransaction_name(value);
        setTransaction_nameError(value.trim() === '' ? '*event name is required' : '');
        setTransaction_nameError('');
        break;
        case 'price' :
          setPrice(value);
          setPriceError(value.trim() === '' ? '*Price is required' : '');
          setPriceError('');
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
    let transaction_nameError = '';
    let priceError = '';

    if (transaction_name === "") {
        transaction_nameError = 'Transaction name is required';
    } else if (transaction_name.length < 3) {
        transaction_nameError = 'Transaction name must be at least 3 characters long';
    }
    if (price === "") {
        priceError = 'Price is required';
    }
    setTransaction_nameError(transaction_nameError);
    setPriceError(priceError);

    if (transaction_nameError || priceError) {
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
        if (error.response) {
            console.error("Headers:", error.response.headers);
            // setError("Server error: " + error.response.data.message);
        } else if (error.request) {
            // console.error("No response received:", error.request);
        } else {
            console.error("Request setup error:", error.message);
        }
    }
};

  return (
    <DashboardLayout>
      <Card>
        <SoftBox pb={3} />
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
          <SoftTypography variant="h6" fontWeight="medium">
            Detail Event
          </SoftTypography>
        </SoftBox>
        <SoftBox pb={3} />
      </Card>
      <SoftBox pb={3} />
      <Card>
        <SoftBox pb={3} />
        <SoftBox px={3}>
          <SoftTypography variant="h6">Event Name: Karaoke Bersama Prabowo</SoftTypography>
          {/* <SoftTypography>{event.nama_event}</SoftTypography> */}
          <SoftTypography variant="h6">Creator Event: OdyFrans</SoftTypography>
          {/* <SoftTypography>{event.creator}</SoftTypography> */}
          <SoftTypography variant="h6">Description: Merayakan kemenangan Prabowo gibran semua makan di tempat karaoke</SoftTypography>
          {/* <SoftTypography>{event.deskripsi}</SoftTypography> */}
          <SoftTypography variant="h6">Start Event: 2024-04-22 08:00:00</SoftTypography>
          {/* <SoftTypography>{event.start_event}</SoftTypography> */}
          <SoftTypography variant="h6">End Event: 2024-04-22 22:00:00</SoftTypography>
          {/* <SoftTypography>{event.end_event}</SoftTypography> */}
          <SoftTypography variant="h6">A : 5.000.000</SoftTypography>
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