import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../utils/config";
import register from "../assets/register.png";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    
    if (!name || !email || !password || !confirmPassword) {
      toast.warning("Please fill in all fields");
      return;
    }
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post(`${config.API_URL}auth/register`, {
        name,
        email,
        password,
      });
  
      if (response.data.success) {
        toast.success("Registration successful");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
  
      if (error.response) {
        const { status, data } = error.response;
  
        if (status === 400) {
          toast.error(data.error || "Invalid request");
        } else if (status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("Unexpected error occurred.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ width: "50%", height: "100%" }}>
        <img
          src={register}
          alt="Register Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B1F2A",
        }}
      >
        <Typography sx={{
          color: "#00E5FF",
          fontSize: "4rem",
          fontWeight: "bold",
          marginBottom: 6,
        }}>Welcome To SQL Query</Typography>
        <Paper elevation={3} sx={{ padding: 4, width: "80%", maxWidth: 550, backgroundColor: "#f2ebe3", borderRadius: "20px", border: "3px solid #18FFFF" }}>
          <Typography variant="h5" gutterBottom sx={{color:"#1B394C", fontWeight: "bold", fontSize:"2rem", textAlign: "center"}}>
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleRegister}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleFieldChange}
            />
            <TextField
              fullWidth
              margin="normal"
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleFieldChange}
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleFieldChange}
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleFieldChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: 4, marginBottom: 2 }}
            >
              {!loading ? 'Register' : 'Registering...'}
            </Button>
            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Button
                color="primary"
                onClick={() => navigate("/login")}
                sx={{ textTransform: "none" }}
              >
                Login
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;
