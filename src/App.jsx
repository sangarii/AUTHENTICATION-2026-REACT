import React from "react";
import "./App.css";
import Register from "./pages/Register/Register";
import OTP from "./pages/OTP/OTP";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Register
            title="Register to Admin Panel"
            subTitle="Enter your email id and password below"
            accountText="Already have an account?"
            linkText="Login"
          />
        }
      />
      <Route
        path="/otp"
        element={
          <OTP
            title="Verify your email"
            subTitle="Enter the OTP from your register email id"
          />
        }
      />
      <Route
        path="/login"
        element={
          <Login
            title="Log In to Admin Panel"
            subTitle="Enter your email id and password below"
            accountText="Don't have an account?"
            linkText="Register"
          />
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
// props
