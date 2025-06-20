import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import BG from "../../Assests/BG.jpg";
import "./table.css";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  minWidth: "100vw",
  backgroundImage: `url(${BG})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top-left",
});

function Userinfo() {
    const navigate = useNavigate();

  const [listofUsers, setlistofUsers] = useState([]);
  const [Search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/user").then((response) => {
      setlistofUsers(response.data);
      console.log(response);
    });
  }, []);

 const handleLogout = () => {
    console.log("User Logged Out");
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  
  return (
    <MainDiv>
      <Grid container>
        <Grid item xs={0.5} sm={1.5} md={2.5} lg={2}></Grid>
        <Grid
          item
          xs={11}
          sm={9}
          md={7}
          lg={8}
          sx={{
            backgroundColor: "white",
            padding: { xs: 2, md: 3 },
            borderRadius: 4,
            width: "100%",
            minHeight: "70vh",
            minWidth:"100vh",
          }}
        >
          <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  }}
>
  <Typography
    fontWeight={"bold"}
    sx={{ fontSize: { xs: "18px", md: "25px" } }}
  >
    
  </Typography>
  <Typography
    fontWeight={"bold"}
    sx={{ fontSize: { xs: "18px", md: "25px" } }}
  >
    Users
  </Typography>

 <Button
            sx={{ backgroundColor: "#ff1c07", color: "white" }}
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
</Box>
          <Box
            className="userinfo"
            sx={{
              maxHeight: { xs: "500px", md: "400px" },
              overflow: "auto",
              width: "100%",
            }}
          >
            <table sx={{ minWidth: 800 }} aria-label="simple table">
              <thead>
                <tr>
                  <th>No</th>
                  <th align="right">Name</th>
                  <th align="right">Email</th>
                
                </tr>
              </thead>
              <tbody>
                {listofUsers
                  .filter((user) =>
                    Search.toLowerCase() === ""
                      ? user
                      : user.firstName.toLowerCase().includes(Search) ||
                        user.lastName.toLowerCase().includes(Search)
                  )
                  .map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td align="right">
                        {user.first_Name + " " + user.last_Name}
                      </td>
                      <td align="right">{user.email}</td>
                      
                    </tr>
                  ))}
              </tbody>
            </table>
          </Box>
          <Box
            sx={{
              mt: 2,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              placeholder="Search User"
              multiline
              maxRows={2}
              size="small"
              sx={{
                width: "200px",
                borderRadius: "12px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </MainDiv>
  );
}

export default Userinfo;
