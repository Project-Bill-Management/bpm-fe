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
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreement, setAgreement] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    setIsValid(validateForm());
  };

  const validateForm = () => {
    return name !== '' && email.endsWith('@gmail.com') && password.length >= 8 && agreement;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!isValid) {
    //   alert('Please fill in all fields correctly.');
    //   return;
    // }
    if (name === "") {
      alert("The field cannot be empty");
      return;
    } if (!email.endsWith('@gmail.com')) {
      alert('Emails must end with @gmail.com');
      return;
      //validasi email menggunakan regex
      //memiliki pola, jenisnya banyak
    } if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
      //konfirmasi BE disesuaikan
      //tambah 1 field konfirm pw, harus sama dengan pw atasnya
    }
    setIsSubmitted(true);
    navigate('/dashboard');
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
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleChange} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange} />
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
