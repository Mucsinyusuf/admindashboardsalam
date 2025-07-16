import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import bgImage from "../../../assets/img/company/AdminDashboardBackground@2x.png";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      const replyCode = data?.payload?.replyCode;

      if (!res.ok || replyCode !== 200) {
        const message = data.payload?.replyMessage || "Login failed";
        throw new Error(message);
      }

      Cookies.set("pendingLogin", JSON.stringify({ username }));
      navigate("/otp");
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
         // image pulled slightly lower
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: "460px",
          minHeight: "540px",
          padding: "50px 40px",
          borderRadius: "24px",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: "#fff", fontWeight: "bold" }}
        >
          Admin Sign In
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            InputProps={{
              style: { color: "#212121" }, // dark input text
            }}
            InputLabelProps={{
              style: { color: "#666" },
            }}
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              style: { color: "#212121" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    style={{ color: "#333" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: { color: "#666" },
            }}
          />

          {error && (
            <Alert severity="error" className="mt-2">
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className="mt-4"
            disabled={loading}
            style={{ fontWeight: "bold" }}
          >
            {loading ? "Logging in..." : "Sign In"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Signin;
