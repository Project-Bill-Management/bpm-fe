import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function ModalInviteCircle({ showModalInvite, setShowModalInvite, id_circle }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      setError('Username is required');
      return;
    }
  
    try {
      const token = localStorage.getItem('jwtToken');
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await axios.post(`http://152.42.188.210:8080/api/auth/invite_circle/${id_circle}`, {
        username: username,
      }, { headers });
      console.log(`Inviting username ${username} to circle ${id_circle}`);
      if (response.status === 200) {
        setUsername('');
        setError('');
        setShowModalInvite(false);
        toast.success('Invite To Circle successfully, waiting approve');
        console.log('Invite To Circle successfully, waiting approve'); // tambahkan ini untuk cek status pesan notifikasi
      } else {
        throw new Error('Failed to invite user to circle');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError('Make sure the username entered is correct');
      toast.error("Failed to invite");
    }
  };  

  const closeModalInvite = () => {
    setUsername("");
    showModalInvite(false);
  };

  return (
    <Modal show={showModalInvite} onHide={closeModalInvite}>
      <Modal.Header closeButton>
        <Modal.Title>Invite To Circle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Control
              type="text"
              placeholder='Enter Username'
              name='username'
              autoFocus
              onChange={handleChangeUsername}
              value={username}
            />
            {error && (
              <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                {error}
              </div>
            )}
          </Form.Group>
          <Button type='submit' onClick={handleSubmit} variant="primary" disabled={loading}>
            {loading ? 'Loading...' : 'Save'}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModalInvite}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalInviteCircle.propTypes = {
  showModalInvite: PropTypes.bool, // Properti showModalInvite yang harus berupa boolean
  setShowModalInvite: PropTypes.func, // Properti setShowModalInvite yang harus berupa fungsi
  id_circle: PropTypes.string, // Properti id_circle yang harus berupa string
  //setNotification: PropTypes.func, // Properti setNotification yang harus berupa fungsi
};

export default ModalInviteCircle;
