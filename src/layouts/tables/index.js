import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import authorsTableData from "layouts/tables/data/authorsTableData";

function Tables() {
  const [state, setState] = useState({
  });

  const [NewCircleName, setNewCircleName] = useState("");
  const [id, setId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { columns, rows } = authorsTableData;
  const [NewCircleNameError, setNewCircleNameError] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.classList.remove("modal-open");
  };

  const handleShowModal = () => {
    console.log("Show modal clicked");
    setNewCircleName("");
    setShowModal(true);
    document.body.classList.add("modal-open");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'NewCircleName':
        setNewCircleName(value);
        setNewCircleNameError('');
        break;
      default:
        break;
    }
  };

  const validateNewCircleName = async () => {
    let error = '';
    if (NewCircleName.trim() === '') {
      error = 'Circle name is required';
    } else {
      try {
        const response = await axios.get(`?NewCircleName=${NewCircleName}`);
        const isCircleExists = response.data.exists;
        if (isCircleExists) {
          error = 'Circle name is already in use';
        }
      } catch (error) {
        console.error('Error checking circle name:', error);
        error = 'An error occurred while checking circle name';
      }
    }
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (NewCircleName === "") {
      setNewCircleNameError('   Circle name is required');
      return;
    } else {
      const newCircleNameError = await validateNewCircleName();
      setNewCircleNameError(newCircleNameError);
      const isFormValid = newCircleNameError === '';
      if (isFormValid) {
        try {
          await axios.post('', {
            NewCircleName: NewCircleName,
          });
          window.location.href = '/tables'; // Ganti ini dengan navigasi ke halaman yang benar
        } catch (error) {
          console.error("Error submitting form:", error);
          // Handle errors as needed
          setError('An error occurred while submitting the form');
        }
      } else {
        // Jika ada input yang tidak valid, tampilkan pesan error
        setError('Please fill in all fields correctly');
        return; // Kembalikan agar formulir tidak terkirim
      }
    }
  };

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Circle List</SoftTypography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleShowModal}>
                Create Circle
              </Button>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}>
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <div className='body-flex'>
        <div className="overlay" />
        <div className="flex">
          <div className="col-15 p-5">
            <Modal show={showModal} onHide={handleCloseModal} style={{ maxWidth: '1500px', width: '100%' }}>
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
                      name='NewCircleName'
                      autoFocus
                      onChange={handleChange}
                      value={NewCircleName}
                    />
                    {NewCircleNameError && (
                      <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                        {NewCircleNameError}
                      </div>
                    )}
                  </Form.Group>
                  <Button variant="contained" type='submit' onClick={handleSubmit}>
                    Save
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
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

export default Tables;
