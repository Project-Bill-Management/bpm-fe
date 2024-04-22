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
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

function DetailEvent() {
  const [event, setEvent] = useState(null);
  const [showTransaksiModal, setShowTransaksiModal] = useState(false);
  const [nama_transaksi, setNama_Transaksi] = useState("");
  const [harga_transaksi, setHarga_Transaksi] = useState("");

  const showModalTransaksi = () => {
    setNama_Transaksi("");
    setHarga_Transaksi("");
    setShowTransaksiModal(true);
  };

  const closeModalTransaksi = () => {
    setNama_Transaksi("");
    setHarga_Transaksi("");
    setShowTransaksiModal(false);
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
                      name='nama_transaksi'
                      autoFocus
                      // onChange={handleChange}
                      value={nama_transaksi}
                    />
                    {/* {circle_nameError && (
                      <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                        {circle_nameError}
                      </div>
                    )} */}
                  </Form.Group>
                  <Form.Group className='mb-2' controlId='exampleForm.ControlInput1'>
                    <Form.Control
                      type="text"
                      placeholder='Enter transaction price'
                      name='harga_transaksi'
                      autoFocus
                      // onChange={handleChange}
                      value={harga_transaksi}
                    />
                    {/* {circle_nameError && (
                      <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                        {circle_nameError}
                      </div>
                    )} */}
                  </Form.Group>
                  <Form.Group className='mb-2' controlId='exampleForm.ControlInput1'>
                    <Form.Check
                      type="checkbox"
                      label="Alfrida"
                      name="payment_method"
                      id="cashRadio"
                    // onChange={handleChange}
                    // checked={paymentMethod === 'cash'}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Deswinta"
                      name="payment_method"
                      id="creditCardRadio"
                    // onChange={handleChange}
                    // checked={paymentMethod === 'credit_card'}
                    />
                  </Form.Group>
                  {/* <Form.Group className='mb-2' controlId='exampleForm.ControlInput1'>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder='Enter transaction notes'
                      name='keterangan_transaksi'
                      // onChange={handleChange}
                      // value={keterangan_transaksi}
                    />
                  </Form.Group> */}
                  <Button variant="contained" type='submit'>
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