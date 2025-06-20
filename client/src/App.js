import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import palette from "./theme/palette";
import typography from "./theme/typography";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Login = React.lazy(() => import("./pages/login/Login"));
const Register = React.lazy(() => import("./pages/register/Register"));
const Home = React.lazy(() => import("./pages/home/Home"));
const Userinfo = React.lazy(() => import("./pages/Userinfo/userinfo"));


const theme = createTheme({
  palette: palette.light,
  typography,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/userinfo",
    element: (
     // <ProtectedRoute allowedRoles={["admin"]}>
        <Userinfo />
     // </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
