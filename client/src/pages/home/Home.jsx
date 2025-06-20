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
import {jwtDecode} from "jwt-decode";


const LeftDiv = {
  flex: 1,
  maxWidth: "400px",
  minHeight: "50vh",
  padding: "20px",
  margin: "auto",
  backgroundColor: "rgba(255,255,255,0.95)",
  borderRadius: "12px",
};

const RightDiv = {
  flex: 1,
  maxWidth: "400px",
  minHeight: "50vh",

  padding: "20px",
  margin: "auto",
  backgroundColor: "rgba(255,255,255,0.95)",
  borderRadius: "12px",
  borderLeft: "2px solid #ccc",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",       
  justifyContent: "center",   
  textAlign: "center", 
};

function Home() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [locationError, setLocationError] = useState("");
  const token = localStorage.getItem("accessToken");
  let userId = null;
const [weather, setWeather] = useState(null);

  if (token) {
    const decoded = jwtDecode(token);
userId = decoded.id;
  }
  const handleLogout = () => {
    console.log("User Logged Out");
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmed) return;

    try {
      const response = await axios.delete(
        `http://localhost:3001/user/${userId}`
      );
      alert("Account deleted successfully.");
      localStorage.removeItem("accessToken");
      navigate("/");
    } catch (error) {
      console.error("Delete failed", error);
      alert("Something went wrong while deleting the account.");
    }
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!location) {
    setLocationError("Location is required.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:3001/weather", {
      location,
      userId,
    });

    setWeather(response.data.data); // Store only weather API response
  } catch (error) {
    console.error("Weather fetch failed", error);
    alert("Could not fetch weather data.");
  }
};

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        Height: "100vh",
        backgroundImage: `url(${BG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left side - Form */}
      <Box sx={LeftDiv}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Real-Time Weather
        </Typography>
        <FlexContainer
          sx={{
            justifyContent: "center",
            mt: 2,
            minHeight: "7vh",
          }}
        ></FlexContainer>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Location"
            fullWidth
            variant="outlined"
            size="small"
            error={!!locationError}
            helperText={locationError}
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setLocationError("");
            }}
          />
          <FlexContainer
            sx={{
              justifyContent: "center",
              mt: 2,
              minHeight: "2vh",
            }}
          ></FlexContainer>

          <Button
            fullWidth
            sx={{ mt: 5, backgroundColor: "#2168BA", color: "white" }}
            variant="contained"
            type="submit"
          >
            Generate
          </Button>
        </form>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mt={2}>
          <Button
            sx={{ backgroundColor: "#ff1c07", color: "white" }}
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>

          <Button
            sx={{
              backgroundColor: "white",
              color: "#ff1c07",
              border: "1px solid #ff1c07",
            }}
            variant="contained"
            onClick={() => handleDelete(userId)}
          >
            Delete Account
          </Button>
        </Box>
      </Box>

      {/* Right side - Weather display */}
      <Box sx={RightDiv}>
        <Typography sx={{mb:2}} variant="h6" fontWeight="bold"  gutterBottom>
          Weather Details
        </Typography>

        {weather ? (
          <Box>
            <Typography><strong>Location:</strong> {weather.name}</Typography>
            <Typography><strong>Temperature:</strong> {weather.main.temp} °C</Typography>
            <Typography><strong>Humidity:</strong> {weather.main.humidity} %</Typography>
            <Typography><strong>Weather:</strong> {weather.weather[0].description}</Typography>
            <Typography><strong>Wind:</strong> {weather.wind.speed} m/s</Typography>
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary">
            Enter a location to see real-time weather information.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Home;
