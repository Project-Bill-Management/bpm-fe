//login
import { useState } from "react";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [token, setToken] = useState('');

  const validateUsername = async () => {
    let error = '';
    if (username.trim() === '') {
      error = '*Username is required';
    } else {
      try {
        const response = await axios.post('http://152.42.188.210:8080/index.php/api/auth/login', {
          username: username,
        });
        const isUsernameValid = response.data.isValid;
        if (!isUsernameValid) {
          error = '*Username not found';
        }
      } catch (error) {
        console.error('Error checking username:', error);
        error = '*An error occurred while checking username';
      }
    }
    return error;
  };
  
  const validatePassword = async () => {
    let error = '';
    if (password.trim() === '') {
      error = '*Password is required';
    } else {
      try {
        const response = await axios.post('http://152.42.188.210:8080/index.php/api/auth/login', {
          username: username,
          password: password,
        });
        const isPasswordValid = response.data.isValid;
        if (!isPasswordValid) {
          error = '*Password is incorrect';
        }
      } catch (error) {
        console.error('Error checking password:', error);
        error = '*An error occurred while checking password';
      }
    }
    return error;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        setUsernameError(''); // Reset error
        break;
      case 'password':
        setPassword(value);
        setPasswordError(''); // Reset error
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUsernameError = await validateUsername();
    const newPasswordError = await validatePassword();
    setUsernameError(newUsernameError);
    setPasswordError(newPasswordError);
  
    if (newUsernameError || newPasswordError) {
      setError('Username and password not registered');
      return;
    }
  
    try {
      const response = await axios.post('http://152.42.188.210:8080/index.php/api/auth/login', {
        username: username,
        password: password,
      });
      const token = response.data.token;
      // Simpan token di localStorage
      localStorage.setItem('jwtToken', token);
      // setToken(token);
      // const decodedToken = jwtDecode(token); //digunakan kecuali butuh get data dan parameter
      setIsLoggedIn(true);
      setIsSubmitted(true);
      navigate('/dashboard');
      // Set interceptor setelah token diperoleh
      axios.interceptors.request.use(
        config => {
          const token = localStorage.getItem('jwtToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      setError('Incorrect username or password');
    }
  }  
  
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
          <SoftInput type="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
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
          <SoftInput type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {passwordError && (
                <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                  {passwordError}
                </div>
              )}
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
        </SoftBox>
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
}

export default SignIn;
