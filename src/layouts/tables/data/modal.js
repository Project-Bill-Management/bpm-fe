// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Modal, Form } from "react-bootstrap";
// import Button from "@mui/material/Button";
// import AddIcon from "@mui/icons-material/Add";
// import "bootstrap/dist/css/bootstrap.min.css";

// function ModalCC () {
//     const [NewCircleName, setNewCircleName] = useState("");
//     const [showModal, setShowModal] = useState(false);
//     const [NewCircleNameError, setNewCircleNameError] = useState(null);

//     const handleCloseModal = () => {
//         setShowModal(false);
//         document.body.classList.remove("modal-open");
//     };
    
//     const handleShowModal = () => {
//       console.log("Show modal clicked");
//       setNewCircleName("");
//       setShowModal(true);
//       document.body.classList.add("modal-open");
//     };    
    
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         switch (name) {
//           case 'NewCircleName':
//             setNewCircleName(value);
//             setNewCircleNameError('');
//             break;
//           default:
//             break;
//         }
//     };
    
//     const validateNewCircleName = async () => {
//         let error = '';
//         if (NewCircleName.trim() === '') {
//           error = 'Circle name is required';
//         } else {
//           try {
//             const response = await axios.get(`?NewCircleName=${NewCircleName}`);
//             const isCircleExists = response.data.exists;
//             if (isCircleExists) {
//               error = 'Circle name is already in use';
//             }
//           } catch (error) {
//             console.error('Error checking circle name:', error);
//             error = 'An error occurred while checking circle name';
//           }
//         }
//         return error;
//     };
      
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (NewCircleName === "") {
//           return;
//         } else {
//           try {
//             await axios.post('', {
//               NewCircleName: NewCircleName,
//             });
//             window.location.href = '/tables'; // Ganti ini dengan navigasi ke halaman yang benar
//           } catch (error) {
//             console.error("Error submitting form:", error);
//             // Handle errors as needed
//           }
//         }

//         const newCircleNameError = await validateNewCircleName();
//         setNewCircleNameError(newCircleNameError);
//         const isFormValid = !newCircleNameError;
//         if (isFormValid) {
//           // Lakukan pengiriman formulir ke server
//           setIsSubmitted(true);
//         } else {
//           // Jika ada input yang tidak valid, tampilkan pesan error
//           setError('Please fill in all fields correctly');
//         }
//     };

//     return (
//     showModal && (
//         <div className='body-flex'>
//             <div className="overlay" />
//             <div className="flex">
//                 <div className="col-15 p-5">
//                     <Modal show={showModal} onHide={handleCloseModal} style={{ maxWidth: '1500px', width: '100%' }}>
//                         <div className="overlay-icons" />
//                         <Modal.Header closeButton>
//                             <Modal.Title>Create Circle</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <Form onSubmit={handleSubmit}>
//                                 <Form.Group className='mb-5' controlId='exampleForm.ControlInput1'>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder='Enter Circle Name'
//                                         autoFocus
//                                         onChange={(e) => setNewCircleName(e.target.value)}
//                                         value={NewCircleName}
//                                     />
//                                 </Form.Group>
//                                 {NewCircleNameError && (
//                                     <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
//                                         {NewCircleNameError}
//                                     </div>
//                                 )}
//                                 <Button variant="contained" type='submit'>
//                                     Save
//                                 </Button>
//                             </Form>
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={handleCloseModal}>
//                                 Close
//                             </Button>
//                         </Modal.Footer>
//                     </Modal>
//                 </div>
//             </div>
//         </div>
//     )
// );
//                                 }
// export default ModalCC;
