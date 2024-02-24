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

const SignIn = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(''); // State untuk pesan kesalahan umum

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const usernameValidator = /^[a-zA-Z0-9_]{3,30}$/;
  const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  const validateUsername = () => {
    let error = '';
    if (username.trim() === '') {
      error = '*username is required';
    } else if (!usernameValidator.test(username)) {
      error = '*username must have distinctive characteristics';
    }
    return error;
  };

  const validatePassword = () => {
    let error = '';
    if (password.trim() === '') {
      error = '*password is required';
    } else if (!passwordValidator.test(password)) {
      error = '*password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUsernameError = validateUsername();
    const newPasswordError = validatePassword();

    setUsernameError(newUsernameError);
    setPasswordError(newPasswordError);
    const isFormValid = !newUsernameError && !newPasswordError;

    if (isFormValid && rememberMe) {
      setIsSubmitted(true);
      navigate('/dashboard');
    } else {
      setError('Please fill in all fields correctly');
    }
  };


  //const handleSetRememberMe = () => setRememberMe(prev => !prev);
    
  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}>
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Username
            </SoftTypography>
          </SoftBox>
          <SoftInput type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
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
          <SoftInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {passwordError && (
                <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                  {passwordError}
                </div>
              )}
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}>
            &nbsp;&nbsp;Remember me
          </SoftTypography>
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
