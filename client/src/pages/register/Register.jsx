import {
  Box,
  Button,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import Axios from "axios";
import React, { useCallback, useState } from "react";
import BG from "../../Assests/BG.jpg";
import FlexContainer from "../../components/FlexContainer/FlexContainer";
import { useNavigate } from "react-router-dom";

const MainDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  minWidth: "100vw",
  margin: 0,
  padding: 0,
  backgroundImage: `url(${BG})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const LoginDiv = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    width: "300px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "300px",
  },
  [theme.breakpoints.up("md")]: {
    width: "350px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "350px",
  },
  borderRadius: "20px",
  backgroundColor: "white",
  padding: "20px",
}));


function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [confirmPassworderror, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emaiFormatlError, setEmaiFormatlError] = useState("");
  const [passworderror, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page reload

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z]{2,50}$/;
    const passwordRegex =
      /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;

    const phoneRegex = /^0\d{9}$/;

    if (!firstName.match(nameRegex)) {
      setFirstNameError("Invalid first name.");
      return;
    }
    setFirstNameError("");
    if (!lastName.match(nameRegex)) {
      setLastNameError("Invalid last name.");
      return;
    }
    setLastNameError("");
    if (!email.match(emailRegex)) {
      setEmaiFormatlError("Invalid email format.");
      return;
    }
    setEmaiFormatlError("");
    console.log("Password:", password);
    console.log("Regex Test:", passwordRegex.test(password));

    if (!password.match(passwordRegex)) {
      setPasswordError(
        "Password must be between 8 and 32 characters, with uppercase, lowercase, number, and special character."
      );
      return;
    }
    setPasswordError("");
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      return;
    }

    // Reset error if passwords match
    setConfirmPasswordError("");
    
   
    

    try {
      // Check if the email already exists
      const emailExists = await Axios.get(
        `http://localhost:3001/user/email-check/${email}`
      );
      if (emailExists.data.exists) {
        setEmailError("Email already exists! Please use a different one.");
        return;
      }

      // Reset email error if email is valid
      setEmailError("");

      // Proceed with the registration if email is not already taken
      await Axios.post("http://localhost:3001/user", {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        role: "user",
      });
      navigate("/"); // Redirect after successful registration
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };
  return (
    <MainDiv>
      <LoginDiv>
        <Typography
          textAlign={"center"}
          color={"black"}
          fontSize={"22px"}
          fontWeight={600}
        >
          Register
        </Typography>
        <FlexContainer
          sx={{
            justifyContent: "center",
            mt: 2,
            mb: 2,
          }}
        >
        </FlexContainer>
        <form onSubmit={handleRegister}>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <Box >
              <TextField
                label="First Name"
                fullWidth
                variant="outlined"
                size="small"
                error={!!firstNameError}
                helperText={firstNameError}
                onChange={(event) => {
                  setFirstName(event.target.value);
                  setFirstNameError("");
                }}
              />
            </Box>
            <Box >
              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                size="small"
                error={!!lastNameError}
                helperText={lastNameError}
                onChange={(event) => {
                  setLastName(event.target.value);
                  setLastNameError("");
                }}
              />
            </Box>
            </Box>
             <Box display="grid"  gap={2} mt={2}>
            <Box >
              <TextField
                label="Username (Email)"
                fullWidth
                variant="outlined"
                size="small"
                error={!!emaiFormatlError || !!emailError} // Show error style if error exists
                helperText={emaiFormatlError || emailError} // Show error message
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmaiFormatlError("");
                  setEmailError("");
                }}
              />
            </Box>
            <Box >
              <TextField
                label="Password"
                fullWidth
                type="password"
                variant="outlined"
                size="small"
                error={!!passworderror}
                helperText={passworderror}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError("");
                }}
              />
            </Box>
            <Box >
              <TextField
                label="Confirm Password"
                fullWidth
                type="password"
                variant="outlined"
                size="small"
                error={!!confirmPassworderror} // Show error style if error exists
                helperText={confirmPassworderror} // Show error message
                onChange={(event) => {
                  setconfirmPassword(event.target.value);
                
                }}
              />
            </Box>
         
          </Box>
           
          <Button
            fullWidth
            sx={{ mt: 2, backgroundColor: "#2168BA", color: "white" }}
            variant="contained"
            type="submit"
          >
            Register
          </Button>
        </form>
        <FlexContainer
          sx={{
            my: 2,
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Button fullWidth variant="outlined"
          sx={{  backgroundColor: "white", color: "#2168BA" }}
           onClick={() => navigate("/")}>
            I Already Have an Account
          </Button>
        </FlexContainer>
      </LoginDiv>
    </MainDiv>
  );
}

export default Register;
