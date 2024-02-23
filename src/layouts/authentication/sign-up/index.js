import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import curved14 from "assets/images/curved-images/curved14.jpg";
import { useNavigate } from 'react-router-dom';
import SuiAlert from 'components/SuiAlert';
// import { Alert, AlertTitle } from '@material-ui/lab';

function SignUp() {
  const [state, setState] = useState({
    // inisialisasi state di sini
  });
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreement, setAgreement] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

  const usernameValidator = /^[a-zA-Z0-9_]{3,30}$/;
  const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  const validateUsername = () => {
    let error = '';
    if (username.trim() === '') {
      error = 'Username is required';
    } else if (!usernameValidator.test(username)) {
      error = 'The username must have distinctive characteristics';
    }
    return error;
  };

  const validateEmail = () => {
    let error = '';
    if (email.trim() === '') {
      error = 'Email is required';
    } else if (!emailValidator.test(email)) {
      error = 'Email is not valid';
    }
    return error;
  };

  const validatePassword = () => {
    let error = '';
    if (password.trim() === '') {
      error = 'Password is required';
    } else if (!passwordValidator.test(password)) {
      error = 'Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase';
    }
    return error;
  };

  const validatePasswordConfirmation = () => {
    let error = '';
    if (passwordConfirmation.trim() === '') {
      error = 'Password confirmation is required';
    } else if (passwordConfirmation !== password) {
      error = 'Password confirmation does not match password';
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
      case 'email':
        setEmail(value);
        setEmailError(''); // Reset error
        break;
      case 'password':
        setPassword(value);
        setPasswordError(''); // Reset error
        break;
      case 'passwordConfirmation':
        setPasswordConfirmation(value);
        setPasswordConfirmationError(''); // Reset error
        break;
      default:
        break;
    }
  };

  // Di dalam handleSubmit, Anda perlu menetapkan error untuk masing-masing input
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan validasi input
    const newUsernameError = validateUsername();
    const newEmailError = validateEmail();
    const newPasswordError = validatePassword();
    const newPasswordConfirmationError = validatePasswordConfirmation();

    // Perbarui state error
    setUsernameError(newUsernameError);
    setEmailError(newEmailError);
    setPasswordError(newPasswordError);
    setPasswordConfirmationError(newPasswordConfirmationError);

    const isFormValid = !newUsernameError && !newEmailError && !newPasswordError && !newPasswordConfirmationError;

    if (isFormValid && agreement) {
      // Lakukan pengiriman formulir ke server
      setIsSubmitted(true);
      navigate('/dashboard');
    } else {
      // Jika ada input yang tidak valid, tampilkan pesan error
      setError('Please fill in all fields correctly');
    }
  };

  const handleSetAgreement = () => setAgreement(!agreement);

  return (
    <BasicLayout
      title="Welcome!"
      description="Use this awesome form to log in or create a new account."
      image={curved14}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </SoftBox>
            {usernameError && <div className="errorMsg">{usernameError}</div>}
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              {emailError && <div className="errorMsg">{emailError}</div>}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              {passwordError && <SuiAlert severity="error" message={passwordError} />}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={handleChange}
              />
              {passwordConfirmationError && <SuiAlert severity="error" message={passwordConfirmationError} />}
            </SoftBox>

            <SoftBox display="flex" alignItems="center">
              <Checkbox
                checked={agreement}
                onChange={handleSetAgreement} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                sx={{ cursor: "pointer", userSelect: "none" }}>
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient>
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                type="submit"
                variant="gradient"
                color="dark"
                fullWidth
                onClick={handleSubmit}>
                Sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient>
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
