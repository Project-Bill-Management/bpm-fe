import { useState } from "react";
import { Link } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const SignIn = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false); // State untuk menampilkan pesan error

  const validateUsernameAndPassword = async () => {
    let usernameError = '';
    let passwordError = '';
    let isValid = true;
  
    // Validasi username tidak boleh kosong
    if (username.trim() === '') {
      usernameError = '*Username is required';
      isValid = false;
    }
  
    // Validasi password tidak boleh kosong
    if (password.trim() === '') {
      passwordError = '*Password is required';
      isValid = false;
    }
    // Jika input username dan password tidak kosong, lakukan validasi server
    if (isValid) {
      try {
        const response = await axios.post('http://152.42.188.210:8080/index.php/api/auth/login', {
          username: username,
          password: password,
        });
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        // localStorage.setItem('username', username);
        axios.interceptors.request.use(
          config => {
            const token = localStorage.getItem('jwtToken');
            setIsLoggedIn(true);
            // setUsername(username);
            console.log(token);
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
          },
          error => {
            return Promise.reject(error);
          }
        );
        const { success, message } = response.data;
        if (!success) {
          // Jika username benar, password salah
          if (message === 'Invalid username or password') {
            passwordError = '*Incorrect password';
          } else {
            setError(message || 'An error occurred');
          }
          isValid = false;
        }
      } catch (error) {
        console.error('Error validating username and password:', error);
        setError('An error occurred while validating username and password');
        isValid = false;
      }
    }
  
    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setShowError(true); // Menampilkan pesan error
    return isValid;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        setUsernameError(value.trim() === '' ? '*Username is required' : ''); // Set error if username is empty
        setPasswordError(''); // Reset password error
        break;
      case 'password':
        setPassword(value);
        setPasswordError(value.trim() === '' ? '*Password is required' : ''); // Set error if password is empty
        setUsernameError(''); // Reset username error
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateUsernameAndPassword();
    if (isValid) {
      setIsLoggedIn(true);
      navigate('/dashboard');
    }
  };

  return (
    <CoverLayout
      title="Welcome back!"
      description="Enter username and password to sign in"
      image={curved9}>
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Username
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
          />
          {usernameError && (
            <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
              {usernameError}
            </div>
          )}
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          {passwordError && (
            <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
              {passwordError}
            </div>
          )}
        </SoftBox>
        {showError && error && (
          <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
            {error}
          </div>
        )}
        <SoftBox mt={4} mb={1}>
          <SoftButton
            type="submit"
            variant="gradient"
            color="dark"
            fullWidth
            onClick={handleSubmit}>
            Sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient>
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
};


export default SignIn;
