import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../../../context/AuthContext";
import {
  TextField,
  Button,
  Alert,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import bgImage from "../../../assets/img/company/AdminDashboardBackground@2x.png";

const OTPVerify = () => {
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const raw = Cookies.get("pendingLogin");
    try {
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.username) {
          setUsername(parsed.username);
          return;
        }
      }
    } catch (err) {
      console.error("Cookie parse error", err);
    }
    navigate("/signin");
  }, [navigate]);

  useEffect(() => {
    inputRef.current?.focus(); // Automatically focus OTP field
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, otp }),
      });

      const data = await res.json();
      const payload = data?.payload;

      if (!res.ok || payload?.replyCode !== 200) {
        throw new Error(payload?.replyMessage || "OTP verification failed");
      }

      const { token, tokenExpiry } = payload;
      login(token, tokenExpiry, { username });
      Cookies.remove("pendingLogin");

      navigate("/overview");
    } catch (err) {
      console.error("OTP Error:", err);
      setError(err.message || "OTP verification failed.");
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
        backgroundPosition: "center bottom",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: "440px",
          minHeight: "500px",
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
          variant="h5"
          align="center"
          gutterBottom
          style={{ color: "#212121", fontWeight: "bold" }}
        >
          OTP Verification
        </Typography>

        <Typography
          align="center"
          variant="body1"
          gutterBottom
          style={{ color: "#444", marginBottom: "20px" }}
        >
          Enter the OTP sent to your email or phone
        </Typography>

        <form onSubmit={handleVerify}>
          <TextField
            inputRef={inputRef}
            label="Enter OTP"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
           InputProps={{
    style: {
      color: "#212121",
      fontSize: "35px",       
      fontWeight: "bold",     
      letterSpacing: "8px",   
    },
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
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default OTPVerify;
