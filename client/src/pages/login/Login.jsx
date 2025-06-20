import {
  Box,
  Button,
  Grid,
  Link,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import BG from "../../Assests/BG.jpg";
import FlexContainer from "../../components/FlexContainer/FlexContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    minHeight: "60vh",

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



function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");

  

  const handleLogin = (e) => {
    e.preventDefault(); 

    const data = { email, password };

    axios.post("http://localhost:3001/user/login", data)
        .then(response => {
          // console.log("API Response:", response.data);
            const { token, user } = response.data; 
            
            if (token) {
              localStorage.setItem("accessToken", token);
              // console.log("Token stored:", localStorage.getItem("accessToken"));

              if (user.role === "admin") {
                navigate("/userinfo");
              } else if (user.role === "user") {
                navigate("/home");
              } else {
                setError("Invalid user role");
              }
            }
        })
        .catch(error => {
          if (error.response) {
            console.log("Error Response:", error.response);
            
            if (error.response.status === 404) {
              setEmailError("User Doesn't Exist");
            } else if (error.response.status === 401) {
              setPasswordError("Wrong Username, Password Combination");
            } else {
              setPasswordError("Login failed. Please try again.");
            }
          } else {
            setPasswordError("Something went wrong. Please try again.");
          }
        });
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
          Login
        </Typography>
        <FlexContainer
          sx={{
            justifyContent: "center",
            mt: 2,
              minHeight: "10vh",

          }}
        >
        </FlexContainer>
        <form onSubmit={handleLogin}>
          <Box mt={3}>
            <TextField
              label="Username (email)"
              fullWidth
              variant="outlined"
              size="small"
              error={!!emailError}
              helperText={emailError}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailError("")
              }}
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              type="password"
              size="small"
              error={!!passwordError} // Show error style if error exists
              helperText={passwordError} // Show error message
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError("")
              }}
            />
           
          </Box>
          <Button
            fullWidth
            sx={{ mt: 2 , backgroundColor: '#2168BA', color: 'white'}}
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </form>
        <FlexContainer
          sx={{
            my: 1,
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Button
            fullWidth
            sx={{ mt: 1, backgroundColor: '#FFC107', color: 'black' }}
            variant="contained"
            type="submit"
            onClick={() => navigate("/register")}
          >
            I am New
          </Button>

          {/* <Link
            onClick={() => {navigate("/forgot-password")
              console.log("clicked");
              // setShowModal(true);
            }}
            style={{ cursor: "pointer", fontFamily: "Arial", fontSize: "16px" }}
          >
            Forgot Password?
          </Link> */}
        </FlexContainer>
      </LoginDiv>
    </MainDiv>
  );
}

export default Login;
