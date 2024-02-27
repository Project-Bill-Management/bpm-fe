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

function SignUp() {
  const [state, setState] = useState({
    // inisialisasi state di sini
  });
  
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [referralCodeError, setReferralCodeError] = useState('');

  const usernameValidator = /^[a-zA-Z0-9_]{3,30}$/;
  const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  const referralCodeValidator = /^[a-zA-Z0-9]{6}$/;

  const validateUsername = async () => {
    let error = '';
    if (username.trim() === '') {
      error = '*username is required';
    } else if (!usernameValidator.test(username)) {
      error = '*username must have distinctive characteristics';
    } else {
      try {
        const response = await axios.post('', {
          username: username,
        });
        const isUsernameExists = response.data.exists;
        if (isUsernameExists) {
          error = '*username already exists';
        }
      } catch (error) {
        console.error('Error checking username:', error);
        error = '*An error occurred while checking username';
      }
    }
    return error;
};

  const validatePasswordConfirmation = () => {
    let error = '';
    if (passwordConfirmation.trim() === '') {
      error = '*password confirmation is required';
    } else if (passwordConfirmation !== password) {
      error = '*password confirmation does not match password';
    }
    return error;
  };

  const validateReferralCode = async () => {
    let error = '';
    if (referralCode.trim() === '') {
      error = '*referral code is required';
    } else if (!referralCodeValidator.test(referralCode)) {
      error = '*referral code must be 6 characters long and alphanumeric';
    } else {
      try {
        const response = await axios.post('/check-referral-code', {
          referralCode: referralCode,
        });
        const isReferralCodeUsed = response.data.used;
        const isReferralCodeExpired = response.data.expired;
        if (isReferralCodeUsed) {
          error = '*referral code is already used by another user';
        } else if (isReferralCodeExpired) {
          error = '*referral code has expired';
        }
      } catch (error) {
        console.error('Error checking referral code:', error);
        error = '*An error occurred while checking referral code';
      }
    }
    return error;
};

  const handleChange = async (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        setUsernameError(''); // Reset error
        break;
      case 'password':
        setPassword(value);
        setPasswordError('');
        break;
      case 'passwordConfirmation':
        setPasswordConfirmation(value);
        setPasswordConfirmationError('');
        break;
      case 'referralCode':
        setReferralCode(value);
        setReferralCodeError('');
      default:
        break;
    }
  
    e.preventDefault();
    if (username === "" || password === "" || passwordConfirmation === "" || referralCode === "") {
    } else {
      try {
        await axios.post('', {
          username: username,
          password: password,
          passwordConfirmation : passwordConfirmation,
          referralCode: referralCode,
        });
        window.location.href = '/dashboard';
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUsernameError = validateUsername();
    const newPasswordError = validatePassword();
    const newPasswordConfirmationError = validatePasswordConfirmation();
    const newReferralCodeError = validateReferralCode();
    // Perbarui state error
    setUsernameError(newUsernameError);
    setPasswordError(newPasswordError);
    setPasswordConfirmationError(newPasswordConfirmationError);
    setReferralCodeError(newReferralCodeError);
    const isFormValid = !newUsernameError && !newPasswordError && !newPasswordConfirmationError && !newReferralCodeError;
    if (isFormValid) {
      // Lakukan pengiriman formulir ke server
      setIsSubmitted(true);
      navigate('/dashboard');
    } else {
      // Jika ada input yang tidak valid, tampilkan pesan error
      setError('please fill in all fields correctly');
    }
  };

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
            <SoftBox mb={1}>
              <SoftInput
                placeholder="username must have distinctive characteristics"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </SoftBox>
            {usernameError && (
              <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                {usernameError}
              </div>
            )}
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase"
                name="password"
                value={password}
                onChange={handleChange}
              />
              {passwordError && (
                <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                  {passwordError}
                </div>
              )}
              </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="password confirmation must match the password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={handleChange}
              />
                 {passwordConfirmationError && (
                <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                  {passwordConfirmationError}
                </div>
              )}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="referralCode"
                placeholder="Referral Code"
                name="referralCode"
                value={referralCode}
                onChange={handleChange}
              />
                 {referralCodeError && (
                <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                  {referralCodeError}
                </div>
              )}
            </SoftBox>
            {/* <SoftBox display="flex" alignItems="center"> */}
              {/* <Checkbox
                checked={agreement}
                onChange={handleSetAgreement} /> */}
              {/* <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                sx={{ cursor: "pointer", userSelect: "none" }}>
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography> */}
              {/* <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient>
                Terms and Conditions
              </SoftTypography> */}
            {/* </SoftBox> */}
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
